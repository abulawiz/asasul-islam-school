# ASASUL ISLAM SCHOOL — Complete Full-Stack Web Application

A modern, visually stunning, fully functional educational institution web application for **ASASUL ISLAM SCHOOL (NIGERIA)**. Built with React.js, Tailwind CSS v4, Lucide React icons, React Router, and a dedicated **Node.js + Express + SQLite** backend with JWT authentication and EduPortal management.

Designed with an elegant, Islamic educational identity utilizing an **Emerald Green**, **Alabaster White**, and **Soft Gold** design palette, authentic Nigerian educational photography, accessible Dark & Light modes, and agency-level UI/UX polish.

---

## 🌟 Key Features & Functional Modules

### 1. Full-Stack EduPortal (`/portal`)
- **Dual-Role Authentication:** Secured via bcrypt password hashing and JSON Web Tokens (JWT).
- **Student / Parent Dashboard:**
  - Official Termly Report Card (CA Tests, Exams, Grades, Class Teacher & Principal remarks).
  - Tahfeez-ul-Qur'an Progress Tracker (Juz' completed, current Surah under study, Tajweed evaluation, Muraja'ah revision circle status, assigned Huffaz Sheikh).
  - Bursary & Fee Records (Tuition balance, paid receipts, payment method verification).
  - Quick Print / Export button for printable report cards.
- **School Administrator Dashboard:**
  - Live metric counters: Total Admissions, Pending Reviews, Enquiries, Campus Tours, Newsletter Subscribers.
  - Interactive Admission Management: Instant "Schedule Screening" and "Admit" actions updating applicant statuses in real time.
  - Direct audit log of parent contact submissions and tour bookings.

### 2. Live Admission Application & Real-Time Tracker (`/admissions`)
- **Direct Online Enrollment:** Submits applications directly to the backend SQLite registry.
- **Real-Time Status Tracker (`#tracker`):** Parents can enter their reference code (e.g. `AIS-2026-1042` or `AIS-2026-2189`) to view their current screening status, scheduled assessment date, and admissions secretariat notes.

### 3. Contact & Tour Scheduling (`/contact`)
- **General & Academic Inquiries:** Direct submission to the backend database with instant user confirmation.
- **Campus Tour Booking:** Allows prospective families to reserve guided walkthroughs with the Admissions Secretariat.

### 4. Interactive Pages
- **Home (`/`):** Hero carousel with authentic Nigerian student photography, Islamic ethos, principal's preview, academic pathways, facilities showcase, news preview, and footer.
- **About (`/about`):** Heritage timeline, vision, mission, 6 core Islamic values (Arabic & English), leadership profiles.
- **Academics (`/academics`):** Early Years, Primary, Secondary, Tahfeez tracks, STEM labs, co-curricular clubs.
- **News & Events (`/news` & `/news/:id`):** Filterable school news archive, urgent alert ticker, full article detail view.
- **Gallery (`/gallery`):** Category-filtered photo gallery with accessible fullscreen lightbox preview.
- **Theme Switcher:** Seamless Dark & Light mode toggle with automatic persistence.

---

## 🔐 Demo Credentials

| Role | Portal Identifier | Password | Access / Features |
| :--- | :--- | :--- | :--- |
| **School Administrator** | `admin@asasulislam.edu.ng` | `Admin@2026` | Admin dashboard, live application review, applicant status updater |
| **Student / Parent** | `AIS/2026/0842` | `Student@2026` | Academic report card (9 subjects), 16 Juz' Tahfeez log, fee clearance receipt |

*Note: Demo buttons on the `/portal` and `/admissions#tracker` pages allow 1-click quick-fill for immediate testing.*

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js (v24)** | Backend runtime environment |
| **Express 5** | RESTful API server (`/api/auth`, `/api/portal`, `/api/admissions`, `/api/contact`) |
| **SQLite (`node:sqlite`)** | Zero-config, persistent relational database (`school.db`) |
| **JWT & BcryptJS** | Secure token-based session management and password hashing |
| **React 19** | Modern reactive frontend UI architecture |
| **Tailwind CSS v4** | Custom Emerald & Soft Gold Islamic aesthetic styling |
| **React Router v7** | Single Page Application (SPA) multi-page client routing |
| **Lucide React** | Accessible, crisp iconography |
| **Vite 8** | High-performance frontend dev server and production builder |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd asasul-islam-school
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

---

## 🌟 Key Features & Pages

### 1. Home Page (`/`)
- **Top Notification Bar:** Prayer & study times, hotline, admissions email, and a simulated Parent/Staff EduPortal modal gateway.
- **Header & Navigation:** Sticky elevation, Islamic school crest logo, dropdown navigation for sections, and mobile drawer menu.
- **Hero Carousel:** Auto-sliding banner showcasing authentic photography, high-impact titles, key benefit tags, and animated indicators.
- **Islamic Ethos & Welcome Message:** Classical Bismillah header, foundational pillars (Harmonized Curriculum, Tahfeez Focus, Future-Ready STEM).
- **Institutional Overview Preview:** Heritage card, 16+ years experience badge, and dual-curriculum checklist.
- **Academic Pathways Preview:** 4 distinct stages (Early Childhood, Primary, Junior & Senior Secondary) with curriculum highlights.
- **Why Choose Us:** 6 core pillars featuring custom icons and gold hover accents.
- **Principal's Welcome Address:** Portrait, qualifications, signature block, and welcoming message.
- **School Facilities Showcase:** Interactive category tabs for the Central Masjid & Tahfeez Sanctuary, Science Labs, ICT Center, Resource Library, Sports Grounds, and Infirmary.
- **Latest News & Announcements:** Preview of upcoming events, competitions, and examinations.
- **Photo Gallery Preview:** 6-photo mosaic with click-to-open lightbox.
- **Admission Call-to-Action:** High-conversion emerald and gold banner.
- **Professional Footer:** Prophetic Hadith banner, accreditations, quick links, termly newsletter subscribe simulation, and copyright.

### 2. About Page (`/about`)
- **School Profile:** Mission of dual excellence without moral compromise.
- **Vision & Mission:** Strategic institutional commitments in prominent cards.
- **Core Values (Arabic & English):** Taqwa, Ihsan, Amanah & Sidq, Ta'allum, Rahmah, Inkishaf.
- **School History Timeline:** Interactive chronological milestones from 2008 founding to present.
- **Detailed Principal's Address:** Formal welcome letter and educational philosophy.
- **School Leadership Team:** Profiles of the Principal, Vice Principal, Head of Tahfeez, and Head of Primary.

### 3. Academics Page (`/academics`)
- **Comprehensive Stage Details:** Curricular outcomes for Early Years, Primary, and Secondary.
- **Subject Offerings Matrix:** Full breakdown of Primary and Secondary science/arts/commercial streams.
- **Specialized Tahfeez Department:** Regular Tahfeez track and accelerated intensive Huffaz stream.
- **Teaching Methodologies:** Inquiry-based learning, moral integration, differentiated pacing, and computational thinking.
- **Co-Curricular Clubs:** JETS, Debating, Robotics, Red Cross, and Cultural Troupes.

### 4. Admissions Page (`/admissions`)
- **Admission Procedures:** 4-step roadmap (Apply → Assessment → Family Interaction → Offer).
- **Entry Requirements:** Document checklists organized by developmental level.
- **Frontend Application Form Interface:**
  - Multi-section form: Student Bio, Grade selection, Parent/Guardian contact, Medical notes.
  - Live frontend validation and helpful error feedback.
  - Instant submission confirmation modal generating a unique Application Reference Number (e.g. `AIS-2026-XXXX`).
- **Frequently Asked Questions:** Interactive collapsible accordions covering tuition, transport, uniforms, and entrance screening.

### 5. News & Events (`/news` & `/news/:id`)
- **Filterable News Listing:** Category tabs (Academic, Islamic Events, Sports, Announcements) + live search filter.
- **School Notice Ticker:** Live alert strip for entrance examination registration.
- **Article Details View (`/news/:id`):** Full read, metadata, breadcrumbs, social share simulation, and related news cards.

### 6. Photo Gallery (`/gallery`)
- **Filterable Archive:** Campus Life, Tahfeez, STEM Labs, Classrooms, Sports, Celebrations.
- **Interactive Lightbox:** Fullscreen overlay with Next, Previous, keyboard navigation (Arrow keys, Esc), and photo captions.

### 7. Contact Page (`/contact`)
- **Contact Info Cards:** Address, direct phones, emails, and office/visitor hours.
- **Interactive Contact Form:** Validated inputs with success confirmation feedback.
- **Interactive Simulated Campus Map:** Stylized map with GPS coordinates, landmarks, and driving directions.
- **Campus Tour Scheduler:** Interactive booking tool allowing parents to pick a preferred tour date and time.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-based modern UI architecture |
| **Tailwind CSS v4** | Rapid styling with custom Emerald & Soft Gold theme |
| **React Router v7** | Single Page Application (SPA) multi-page client routing |
| **Lucide React** | Clean, accessible iconography |
| **Framer Motion** | Smooth interactive animations and transitions |
| **Vite 8** | High-speed frontend build tooling |

---

## 🚀 Getting Started

To run the project locally on your machine:

```bash
# 1. Navigate to the project directory
cd asasul-islam-school

# 2. Start the development server
npm run dev

# 3. Open your browser at the URL shown in terminal (usually http://localhost:5173/)
```

To create a production-ready static build:

```bash
npm run build
npm run preview
```

---

## 🔒 Architectural Note

This project is built **strictly as a frontend application** in accordance with specifications. All state, mock datasets, form validations, and interactive components operate on the client without requiring or establishing a connection to an external database, API, or backend service. It is architected so that any future backend (REST or GraphQL API) can easily plug into the existing data models.
