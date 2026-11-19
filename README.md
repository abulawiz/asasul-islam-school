# ASASUL ISLAM SCHOOL — Complete Full-Stack Web Application

A modern, visually stunning, fully functional educational institution web application for **ASASUL ISLAM SCHOOL (NIGERIA)**. Built with React.js, Tailwind CSS v4, Lucide React icons, React Router, and a dedicated **Node.js + Express + SQLite** backend with JWT authentication and EduPortal management.

Designed with an elegant, Nigerian Islamic educational identity utilizing an **Emerald Green**, **Alabaster White**, and **Soft Gold** design palette, authentic Nigerian educational photography, accessible Dark & Light modes, and agency-level UI/UX polish.

---

## 🌟 Key Features & Functional Modules

### 1. Full-Stack EduPortal (`/portal`)
- **Dual-Role Authentication:** Secured via bcrypt password hashing and JSON Web Tokens (JWT) with case-insensitive login.
- **Student / Parent Dashboard:**
  - Official Termly Report Card (CA Tests, Exams, Grades, Class Teacher & Principal remarks).
  - Tahfeez-ul-Qur'an Progress Tracker (Juz' completed, current Surah under study, Tajweed evaluation, Muraja'ah revision circle status, assigned Huffaz Sheikh).
  - Bursary & Fee Records (Tuition balance, paid receipts, payment method verification).
  - Quick Print / Export button for printable report cards.
- **School Administrator Control Center:**
  - Live metric counters: Total Admissions, Pending Reviews, Enquiries, Campus Tours, Newsletter Subscribers.
  - **Admissions Management:** Filter applications by status (`All`, `Pending Review`, `Screening Scheduled`, `Admitted`).
  - **Interactive Screening Scheduler:** Assign formal assessment dates, session times (e.g. `09:00 AM - Batch B`), and instructions for parents which sync directly to the public tracker.
  - **Parent Inquiries Inbox:** View incoming contact messages, inspect full details in modal, and toggle status between `New` and `Resolved`.
  - **Campus Walkthroughs Schedule:** Manage prospective family tour reservations with 1-click completion status toggling.

### 2. Live Admission Application & Real-Time Tracker (`/admissions`)
- **Direct Online Enrollment:** Submits applications directly to the backend SQLite registry and issues unique reference numbers (e.g. `AIS-2026-9526`).
- **Real-Time Status Tracker (`#tracker`):** Parents can enter their reference code to view their current screening status, scheduled assessment date, and admissions secretariat notes.

### 3. Contact & Tour Scheduling (`/contact`)
- **General & Academic Inquiries:** Direct submission to the backend database with instant confirmation feedback.
- **Campus Tour Booking:** Allows prospective families to reserve guided walkthroughs with preferred date and time slots.

### 4. Interactive Pages
- **Home (`/`):** Hero carousel with authentic Nigerian student photography, institutional ethos, principal's preview, academic pathways, facilities showcase, news preview, and footer.
- **About (`/about`):** Heritage timeline, vision, mission, 6 core moral values, leadership profiles.
- **Academics (`/academics`):** Early Years, Primary, Secondary, Tahfeez tracks, STEM labs, co-curricular clubs.
- **News & Events (`/news` & `/news/:id`):** Filterable school news archive, urgent alert ticker, full article detail view.
- **Gallery (`/gallery`):** Category-filtered photo gallery with accessible fullscreen lightbox preview.
- **Theme Switcher:** Seamless Dark & Light mode toggle with automatic persistence.

---

## 🔐 Demo Credentials

| Role | Portal Identifier | Password | Access / Scope |
| :--- | :--- | :--- | :--- |
| **School Administrator** | `admin@asasulislam.edu.ng` | `Admin@2026` | Admin dashboard, application review, screening scheduler, enquiries inbox, tours |
| **Student / Parent** | `AIS/2026/0842` | `Student@2026` | Academic report card (89.7% average), 16 Juz' Tahfeez log, bursary clearance receipt |
| **Admission Tracker** | `AIS-2026-1042` or `AIS-2026-9526` | *(No password)* | Public tracker on `/admissions#tracker` |

*Note: 1-click Quick-Fill buttons on `/portal` and `/admissions#tracker` allow immediate testing.*

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js (v24)** | Backend runtime environment |
| **Express 5** | RESTful API server (`/api/auth`, `/api/portal`, `/api/admissions`, `/api/contact`) |
| **SQLite (`node:sqlite`)** | Zero-config, persistent relational database (`school.db`) |
| **JWT & BcryptJS** | Secure token-based session management and password hashing |
| **React 19** | Modern reactive frontend UI architecture |
| **Tailwind CSS v4** | Custom Emerald & Soft Gold aesthetic styling |
| **React Router v7** | Single Page Application (SPA) multi-page client routing |
| **Lucide React** | Accessible, crisp iconography |
| **Vite 8** | High-performance frontend dev server and production builder |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Full Application
In terminal 1 (start the Backend Server on port 5000):
```bash
npm run server
```

In terminal 2 (start the Frontend Vite dev server on port 5173):
```bash
npm run dev
```

Visit **`http://localhost:5173/`** in your browser. The Vite development server automatically proxies all `/api` requests to the Express backend.

### 3. Production Build & Linting
```bash
# Verify code health (0 errors, 0 warnings)
npm run lint

# Compile production bundle
npm run build
```
