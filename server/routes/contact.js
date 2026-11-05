import express from 'express';
import { db } from '../database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
  const { fullName, email, phone, enquiryType, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    db.prepare(`
      INSERT INTO enquiries (full_name, email, phone, enquiry_type, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      fullName.trim(),
      email.trim(),
      phone ? phone.trim() : '',
      enquiryType || 'General Enquiry',
      message.trim()
    );

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been logged successfully. The school administrative team will respond shortly.'
    });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to submit enquiry.' });
  }
});

// POST /api/tours
router.post('/tours', (req, res) => {
  const { parentName, tourDate, preferredTime } = req.body;

  if (!parentName || !tourDate) {
    return res.status(400).json({ error: 'Parent name and tour date are required.' });
  }

  try {
    db.prepare(`
      INSERT INTO campus_tours (parent_name, tour_date, preferred_time)
      VALUES (?, ?, ?, ?)
    `).run(parentName.trim(), tourDate, preferredTime || '10:00 AM', 'Scheduled');

    res.status(201).json({
      success: true,
      message: `Campus walkthrough reserved for ${parentName} on ${tourDate} at ${preferredTime || '10:00 AM'}.`
    });
  } catch (err) {
    console.error('Tour booking error:', err);
    res.status(500).json({ error: 'Failed to reserve tour appointment.' });
  }
});

// POST /api/newsletter
router.post('/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  try {
    const existing = db.prepare('SELECT id FROM subscribers WHERE email = ?').get(email.trim().toLowerCase());
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed to termly updates.' });
    }

    db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(email.trim().toLowerCase());
    res.status(201).json({ success: true, message: 'Thank you for subscribing to our school termly bulletin.' });
  } catch (err) {
    console.error('Newsletter error:', err);
    res.status(500).json({ error: 'Failed to subscribe.' });
  }
});

// GET /api/contact/admin/enquiries (Admin only)
router.get('/admin/enquiries', authenticateToken, requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
    res.json({ enquiries: list });
  } catch (err) {
    console.error('Get enquiries error:', err);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// GET /api/contact/admin/tours (Admin only)
router.get('/admin/tours', authenticateToken, requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM campus_tours ORDER BY id DESC').all();
    res.json({ tours: list });
  } catch (err) {
    console.error('Get tours error:', err);
    res.status(500).json({ error: 'Failed to fetch campus tours' });
  }
});

export default router;
