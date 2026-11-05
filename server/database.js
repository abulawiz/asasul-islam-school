import { DatabaseSync } from 'node:sqlite';
import bcrypt from 'bcryptjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'school.db');

export const db = new DatabaseSync(dbPath);

export function initDatabase() {
  // Enable foreign keys
  db.exec('PRAGMA foreign_keys = ON;');

  // 1. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      portal_id TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Students Profile Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      admission_no TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      gender TEXT NOT NULL,
      grade TEXT NOT NULL,
      guardian_name TEXT NOT NULL,
      guardian_phone TEXT NOT NULL,
      guardian_email TEXT NOT NULL,
      tahfeez_track TEXT NOT NULL,
      attendance_pct INTEGER DEFAULT 98,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  // 3. Report Cards Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS report_cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      session TEXT NOT NULL,
      term TEXT NOT NULL,
      total_score INTEGER NOT NULL,
      average REAL NOT NULL,
      position TEXT NOT NULL,
      principal_remark TEXT,
      teacher_remark TEXT,
      subjects_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `);

  // 4. Tahfeez Progress Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tahfeez_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      current_surah TEXT NOT NULL,
      juz_completed INTEGER NOT NULL,
      tajweed_grade TEXT NOT NULL,
      murajaah_status TEXT NOT NULL,
      mentor TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `);

  // 5. Fee Records Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS fee_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      term TEXT NOT NULL,
      amount_due REAL NOT NULL,
      amount_paid REAL NOT NULL,
      balance REAL NOT NULL,
      status TEXT NOT NULL,
      receipt_no TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `);

  // 6. Admissions Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ref_number TEXT UNIQUE NOT NULL,
      student_first_name TEXT NOT NULL,
      student_last_name TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT NOT NULL,
      grade_applying TEXT NOT NULL,
      tahfeez_preference TEXT NOT NULL,
      previous_school TEXT,
      parent_name TEXT NOT NULL,
      parent_relationship TEXT NOT NULL,
      parent_phone TEXT NOT NULL,
      parent_email TEXT NOT NULL,
      address TEXT NOT NULL,
      medical_notes TEXT,
      status TEXT NOT NULL DEFAULT 'Pending Review',
      assessment_date TEXT,
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. Enquiries Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      enquiry_type TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 8. Campus Tours Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS campus_tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_name TEXT NOT NULL,
      tour_date TEXT NOT NULL,
      preferred_time TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Scheduled',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 9. Newsletter Subscribers
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed Default Admin and Student if not present
  seedDefaultData();
}

function seedDefaultData() {
  const checkAdmin = db.prepare('SELECT id FROM users WHERE portal_id = ?').get('AIS-ADMIN');
  if (!checkAdmin) {
    const adminHash = bcrypt.hashSync('Admin@2026', 10);
    const studentHash = bcrypt.hashSync('Student@2026', 10);

    // Insert Admin
    db.prepare(`
      INSERT INTO users (name, email, portal_id, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('School Administrator', 'admin@asasulislam.edu.ng', 'AIS-ADMIN', adminHash, 'admin');

    // Insert Student User
    const studentInsert = db.prepare(`
      INSERT INTO users (name, email, portal_id, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('Zayd Mansoor Sani', 'zayd.mansoor@student.asasulislam.edu.ng', 'AIS/2026/0842', studentHash, 'student');

    const userId = Number(studentInsert.lastInsertRowid);

    // Insert Student Profile
    const studentProf = db.prepare(`
      INSERT INTO students (user_id, admission_no, full_name, gender, grade, guardian_name, guardian_phone, guardian_email, tahfeez_track, attendance_pct)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      'AIS/2026/0842',
      'Zayd Mansoor Sani',
      'Male',
      'Basic 5 (Primary 5 Gold)',
      'Alhaji Mansoor Sani',
      '+234 (0) 803 123 4567',
      'mansoor.sani@example.com',
      'Accelerated Intensive Huffaz Track',
      98
    );

    const studentId = Number(studentProf.lastInsertRowid);

    // Seed Report Card
    const subjects = JSON.stringify([
      { subject: "Mathematics & Numeracy", test: 28, exam: 62, total: 90, grade: "A+", remark: "Outstanding logic" },
      { subject: "English Literacy & Phonics", test: 27, exam: 61, total: 88, grade: "A", remark: "Eloquent speech" },
      { subject: "Tahfeez-ul-Qur'an (Tajweed)", test: 30, exam: 68, total: 98, grade: "A+", remark: "Exceptional memorization" },
      { subject: "Arabic Language & Grammar", test: 29, exam: 63, total: 92, grade: "A+", remark: "Strong vocabulary" },
      { subject: "Islamic Religious Studies", test: 28, exam: 64, total: 92, grade: "A+", remark: "Deep comprehension" },
      { subject: "Basic Science & Technology", test: 26, exam: 60, total: 86, grade: "A", remark: "Inquisitive mind" },
      { subject: "Computer Studies & Coding", test: 29, exam: 65, total: 94, grade: "A+", remark: "Excellent Python logic" },
      { subject: "Social Studies & Civic Adab", test: 27, exam: 58, total: 85, grade: "A", remark: "Courteous peer relations" },
      { subject: "Creative & Cultural Arts", test: 25, exam: 57, total: 82, grade: "B+", remark: "Good penmanship" }
    ]);

    db.prepare(`
      INSERT INTO report_cards (student_id, session, term, total_score, average, position, principal_remark, teacher_remark, subjects_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      studentId,
      '2025/2026 Academic Session',
      'First Term',
      807,
      89.7,
      '2nd out of 22 Pupils',
      'An exceptional scholar with deep Islamic adab and outstanding mathematical diligence. Keep the flag flying!',
      'Zayd consistently demonstrates exemplary concentration in Tahfeez circles and science workshops.',
      subjects
    );

    // Seed Tahfeez Record
    db.prepare(`
      INSERT INTO tahfeez_records (student_id, current_surah, juz_completed, tajweed_grade, murajaah_status, mentor)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      studentId,
      "Surah Maryam (Ayah 1 - 58)",
      16,
      "Mumtaz (Exemplary 98%)",
      "Daily 1.5 Juz' Revision Circle Complete",
      "Sheikh Abdul-Rahman Al-Baqir"
    );

    // Seed Fee Record
    db.prepare(`
      INSERT INTO fee_records (student_id, term, amount_due, amount_paid, balance, status, receipt_no)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      studentId,
      'First Term 2025/2026',
      285000,
      285000,
      0,
      'Fully Paid',
      'REC-AIS-2026-0914'
    );

    // Seed Initial Admission Demo Records
    db.prepare(`
      INSERT INTO admissions (ref_number, student_first_name, student_last_name, dob, gender, grade_applying, tahfeez_preference, previous_school, parent_name, parent_relationship, parent_phone, parent_email, address, status, assessment_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'AIS-2026-1042',
      'Fatima',
      'Bello',
      '2018-05-14',
      'Female',
      'Basic 1 (Primary 1)',
      'Integrated Standard Tahfeez',
      'Nurul Huda Pre-School, Kaduna',
      'Dr. Abubakar Bello',
      'Father',
      '+234 802 333 4455',
      'abubakar.bello@example.com',
      'No. 42 Crescent Way, Gwarinpa, Abuja',
      'Screening Scheduled',
      '2026-11-20 at 9:00 AM'
    );

    db.prepare(`
      INSERT INTO admissions (ref_number, student_first_name, student_last_name, dob, gender, grade_applying, tahfeez_preference, previous_school, parent_name, parent_relationship, parent_phone, parent_email, address, status, assessment_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'AIS-2026-2189',
      'Umar',
      'Faruk',
      '2014-08-22',
      'Male',
      'Junior Secondary 1 (JSS 1)',
      'Accelerated Intensive Huffaz Track',
      'Al-Manar Primary Academy, Abuja',
      'Hajia Zainab Faruk',
      'Mother',
      '+234 803 777 8899',
      'zainab.faruk@example.com',
      'Plot 18, Maitama Ext, Abuja',
      'Admitted',
      'Completed (Passed with Distinction)'
    );

    // Seed Sample Enquiry
    db.prepare(`
      INSERT INTO enquiries (full_name, email, phone, enquiry_type, message, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      'Barrister Ibrahim Danladi',
      'danladi@lawpractice.ng',
      '+234 803 555 1212',
      'School Bus Transportation',
      'Assalamu alaikum. We live along the Airport Road corridor. Does your school bus route cover our estate for morning pickup?',
      'New'
    );
  }
}
