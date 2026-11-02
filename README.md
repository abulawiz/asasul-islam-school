# ASASUL ISLAM SCHOOL — Modern Frontend Website

A modern, visually stunning, multi-page web application for **ASASUL ISLAM SCHOOL (مَدْرَسَةُ أَسَاسِ الإِسْلاَمِ)**. Built with React.js, Tailwind CSS v4, Lucide React icons, and React Router.

Designed with an elegant, Islamic educational identity utilizing an **Emerald Green**, **Alabaster White**, and **Soft Gold** design palette, authentic typography, and agency-level UI/UX polish.

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
