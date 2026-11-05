import express from 'express';
import { db } from '../database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/portal/student-data
router.get('/student-data', authenticateToken, (req, res) => {
  try {
    let student = null;

    if (req.user.role === 'admin') {
      // If admin tests this endpoint, return the first sample student
      student = db.prepare('SELECT * FROM students LIMIT 1').get();
    } else {
      student = db.prepare('SELECT * FROM students WHERE user_id = ?').get(req.user.id);
    }

    if (!student) {
      return res.status(404).json({ error: 'No student profile associated with this account' });
    }

    // Fetch report cards
    const reportCard = db.prepare(`
      SELECT * FROM report_cards WHERE student_id = ? ORDER BY id DESC LIMIT 1
    `).get(student.id);

    if (reportCard && reportCard.subjects_json) {
      try {
        reportCard.subjects = JSON.parse(reportCard.subjects_json);
      } catch {
        reportCard.subjects = [];
      }
    }

    // Fetch Tahfeez progress
    const tahfeez = db.prepare(`
      SELECT * FROM tahfeez_records WHERE student_id = ? ORDER BY id DESC LIMIT 1
    `).get(student.id);

    // Fetch Fee Record
    const feeRecord = db.prepare(`
      SELECT * FROM fee_records WHERE student_id = ? ORDER BY id DESC LIMIT 1
    `).get(student.id);

    res.json({
      student,
      reportCard,
      tahfeez,
      feeRecord
    });
  } catch (err) {
    console.error('Portal student data error:', err);
    res.status(500).json({ error: 'Failed to retrieve portal data' });
  }
});

// GET /api/portal/admin-overview
router.get('/admin-overview', authenticateToken, requireAdmin, (req, res) => {
  try {
    const totalAdmissions = db.prepare('SELECT COUNT(*) as count FROM admissions').get().count;
    const pendingAdmissions = db.prepare("SELECT COUNT(*) as count FROM admissions WHERE status = 'Pending Review'").get().count;
    const totalEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries').get().count;
    const totalTours = db.prepare('SELECT COUNT(*) as count FROM campus_tours').get().count;
    const totalSubscribers = db.prepare('SELECT COUNT(*) as count FROM subscribers').get().count;

    const recentAdmissions = db.prepare('SELECT * FROM admissions ORDER BY id DESC LIMIT 8').all();
    const recentEnquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC LIMIT 5').all();
    const upcomingTours = db.prepare('SELECT * FROM campus_tours ORDER BY id DESC LIMIT 5').all();

    res.json({
      stats: {
        totalAdmissions,
        pendingAdmissions,
        totalEnquiries,
        totalTours,
        totalSubscribers
      },
      recentAdmissions,
      recentEnquiries,
      upcomingTours
    });
  } catch (err) {
    console.error('Admin overview error:', err);
    res.status(500).json({ error: 'Failed to retrieve administrative statistics' });
  }
});

export default router;
