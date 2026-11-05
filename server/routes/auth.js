import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database.js';
import { JWT_SECRET, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Portal ID / Email and password are required' });
  }

  try {
    const trimmed = identifier.trim();
    // Look up by portal_id or email
    const user = db.prepare(`
      SELECT * FROM users WHERE portal_id = ? OR email = ? COLLATE NOCASE
    `).get(trimmed, trimmed);

    if (!user) {
      return res.status(401).json({ error: 'Invalid Portal ID or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid Portal ID or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, portal_id: user.portal_id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        portal_id: user.portal_id,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server authentication failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, portal_id, role FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch {
    res.status(500).json({ error: 'Failed to fetch user session' });
  }
});

export default router;
