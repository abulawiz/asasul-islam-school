import express from 'express';
import { db } from '../database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/admissions/apply
router.post('/apply', (req, res) => {
  const {
    studentFirstName,
    studentLastName,
    dateOfBirth,
    gender,
    gradeApplying,
    tahfeezPreference,
    previousSchool,
    parentName,
    parentRelationship,
    parentPhone,
    parentEmail,
    homeAddress,
    medicalNotes
  } = req.body;

  if (!studentFirstName || !studentLastName || !dateOfBirth || !parentName || !parentPhone || !parentEmail) {
    return res.status(400).json({ error: 'Please fill in all mandatory fields.' });
  }

  try {
    const year = new Date().getFullYear();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref_number = `AIS-${year}-${randomCode}`;

    const stmt = db.prepare(`
      INSERT INTO admissions (
        ref_number, student_first_name, student_last_name, dob, gender,
        grade_applying, tahfeez_preference, previous_school, parent_name,
        parent_relationship, parent_phone, parent_email, address, medical_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      ref_number,
      studentFirstName.trim(),
      studentLastName.trim(),
      dateOfBirth,
      gender || 'Male',
      gradeApplying || 'Basic 1 (Primary 1)',
      tahfeezPreference || 'Integrated Standard Tahfeez',
      previousSchool ? previousSchool.trim() : null,
      parentName.trim(),
      parentRelationship || 'Parent/Guardian',
      parentPhone.trim(),
      parentEmail.trim(),
      homeAddress ? homeAddress.trim() : '',
      medicalNotes ? medicalNotes.trim() : null
    );

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully to Asasul Islam School registry.',
      ref_number,
      applicantName: `${studentFirstName} ${studentLastName}`,
      grade: gradeApplying
    });
  } catch (err) {
    console.error('Admission apply error:', err);
    res.status(500).json({ error: 'Failed to process admission application.' });
  }
});

// GET /api/admissions/status/:ref
router.get('/status/:ref', (req, res) => {
  const { ref } = req.params;

  try {
    const cleaned = ref.trim().toUpperCase();
    const application = db.prepare(`
      SELECT 
        ref_number, student_first_name, student_last_name, grade_applying,
        tahfeez_preference, parent_name, status, assessment_date, admin_notes, created_at
      FROM admissions 
      WHERE ref_number = ?
    `).get(cleaned);

    if (!application) {
      return res.status(404).json({ error: `No application found with reference code "${cleaned}". Please verify your reference number.` });
    }

    res.json({ application });
  } catch (err) {
    console.error('Status lookup error:', err);
    res.status(500).json({ error: 'Error querying application status.' });
  }
});

// GET /api/admissions (Admin only)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM admissions ORDER BY id DESC').all();
    res.json({ admissions: list });
  } catch (err) {
    console.error('Fetch admissions error:', err);
    res.status(500).json({ error: 'Failed to load admissions' });
  }
});

// PATCH /api/admissions/:id/status (Admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, assessment_date, admin_notes } = req.body;

  try {
    const existing = db.prepare('SELECT id FROM admissions WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Application not found' });
    }

    db.prepare(`
      UPDATE admissions 
      SET status = COALESCE(?, status),
          assessment_date = COALESCE(?, assessment_date),
          admin_notes = COALESCE(?, admin_notes)
      WHERE id = ?
    `).run(status || null, assessment_date || null, admin_notes || null, id);

    res.json({ message: 'Application status updated successfully.' });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ error: 'Failed to update application status.' });
  }
});

export default router;
