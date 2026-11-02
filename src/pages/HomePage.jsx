import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WelcomeBanner from '../components/home/WelcomeBanner';
import AboutPreview from '../components/home/AboutPreview';
import AcademicsPreview from '../components/home/AcademicsPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PrincipalMessage from '../components/home/PrincipalMessage';
import FacilitiesShowcase from '../components/home/FacilitiesShowcase';
import NewsPreview from '../components/home/NewsPreview';
import GalleryPreview from '../components/home/GalleryPreview';
import AdmissionCTA from '../components/home/AdmissionCTA';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section with dynamic photography & stats */}
      <HeroSection />

      {/* 2. Welcome Message & Islamic Ethos */}
      <WelcomeBanner />

      {/* 3. About the School Preview */}
      <AboutPreview />

      {/* 4. Academic Programmes Preview */}
      <AcademicsPreview />

      {/* 5. Why Choose Our School */}
      <WhyChooseUs />

      {/* 6. Principal's Welcome Message */}
      <PrincipalMessage />

      {/* 7. School Facilities Showcase */}
      <FacilitiesShowcase />

      {/* 8. Latest News & Announcements */}
      <NewsPreview />

      {/* 9. Photo Gallery Preview */}
      <GalleryPreview />

      {/* 10. Admission Call-To-Action */}
      <AdmissionCTA />
    </div>
  );
}
