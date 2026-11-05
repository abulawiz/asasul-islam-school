import React, { useState } from 'react';
import { 
  CheckCircle2, ChevronDown, Send, Check, FileText 
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { faqs, admissionRequirements, admissionSteps } from '../data/schoolData';

export default function AdmissionsPage() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(1);

  // Application form state
  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    dateOfBirth: '',
    gender: 'Male',
    gradeApplying: 'Primary 1 (Grade 1)',
    tahfeezPreference: 'Integrated Standard Tahfeez',
    previousSchool: '',
    parentName: '',
    parentRelationship: 'Father',
    parentPhone: '',
    parentEmail: '',
    homeAddress: '',
    medicalNotes: '',
    agreedToTerms: false
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentFirstName.trim()) errors.studentFirstName = 'Student first name is required';
    if (!formData.studentLastName.trim()) errors.studentLastName = 'Student last name is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.parentName.trim()) errors.parentName = 'Parent/Guardian full name is required';
    if (!formData.parentPhone.trim() || formData.parentPhone.length < 8) {
      errors.parentPhone = 'Valid parent phone number is required';
    }
    if (!formData.parentEmail.trim() || !formData.parentEmail.includes('@')) {
      errors.parentEmail = 'Valid parent email address is required';
    }
    if (!formData.homeAddress.trim()) errors.homeAddress = 'Residential address is required';
    if (!formData.agreedToTerms) errors.agreedToTerms = 'You must agree to the admission policies';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const generatedRef = `AIS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setApplicationRef(generatedRef);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      studentFirstName: '',
      studentLastName: '',
      dateOfBirth: '',
      gender: 'Male',
      gradeApplying: 'Primary 1 (Grade 1)',
      tahfeezPreference: 'Integrated Standard Tahfeez',
      previousSchool: '',
      parentName: '',
      parentRelationship: 'Father',
      parentPhone: '',
      parentEmail: '',
      homeAddress: '',
      medicalNotes: '',
      agreedToTerms: false
    });
    setFormErrors({});
  };

  return (
    <div className="bg-stone-50 dark:bg-[#05100c] min-h-screen transition-colors duration-300">
      
      {/* Page Header */}
      <section className="relative bg-emerald-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest inline-block mb-3 bg-emerald-900/80 px-4 py-1 rounded-full border border-amber-400/30">
            Admissions 2026/2027
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Begin Your Child's Journey of Excellence
          </h1>
          <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            We welcome Nigerian and international families who seek balanced, high-standard contemporary academics unified with authentic Islamic values and Quranic memorization.
          </p>
        </div>
      </section>

      {/* 1. Admission Procedures & Steps */}
      <section id="procedures" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Simple 4-Step Process"
            arabicSubtitle="إِجْرَاءَاتُ القُبُولِ وَالتَّسْجِيلِ"
            title="Admission Procedures"
            subtitle="Our straightforward enrollment pathway designed to ensure the right academic and pastoral fit for every child."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-stone-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-700/50 dark:hover:border-emerald-500/50 hover:shadow-lg transition-all group relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 font-extrabold font-heading text-lg flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-sm">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-amber-400">
                  <Check className="w-4 h-4 text-amber-500" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Admission Requirements by Level */}
      <section id="requirements" className="py-20 bg-stone-50 dark:bg-[#071510] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Checklist"
            arabicSubtitle="شُرُوطُ وَمُتَطَلَّبَاتُ القُبُولِ"
            title="Entry Requirements & Document Checklist"
            subtitle="Please review the age criteria and mandatory Nigerian scholastic documents required for enrollment."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {admissionRequirements.map((req, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-700/40 dark:hover:border-emerald-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-700/50">
                      {req.age}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 dark:text-amber-400">Tier 0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {req.title}
                  </h3>

                  <div className="space-y-3">
                    {req.documents.map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-700 dark:text-amber-400" />
                  <span>Submit physical or digital copies upon request</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Comprehensive Application Form Interface */}
      <section id="apply" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Online Application"
            arabicSubtitle="نَمُوذَجُ طَلَبِ التَّسْجِيلِ"
            title="Student Admission Application Form"
            subtitle="Fill out the preliminary enrollment application. Our admissions office will process your submission and contact you within 2 business days."
          />

          <div className="bg-stone-50 dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Student Information */}
              <div>
                <h3 className="text-base font-extrabold text-emerald-950 dark:text-amber-300 uppercase tracking-wider mb-4 pb-2 border-b border-emerald-900/10 dark:border-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">1</span>
                  <span>Student Bio & Class Preference</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Student First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="studentFirstName"
                      value={formData.studentFirstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Zayd"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        formErrors.studentFirstName 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.studentFirstName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.studentFirstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Student Last / Family Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="studentLastName"
                      value={formData.studentLastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Al-Mansoor"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        formErrors.studentLastName 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.studentLastName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.studentLastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        formErrors.dateOfBirth 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.dateOfBirth}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Grade / Level Applying For <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gradeApplying"
                      value={formData.gradeApplying}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Playgroup / Creche (Ages 2-3)">Playgroup / Creche (Ages 2-3)</option>
                      <option value="Nursery 1 & 2 (Ages 3-5)">Nursery 1 & 2 (Ages 3-5)</option>
                      <option value="Basic 1 (Primary 1)">Basic 1 (Primary 1)</option>
                      <option value="Basic 2 (Primary 2)">Basic 2 (Primary 2)</option>
                      <option value="Basic 3 - 5">Basic 3 - 5</option>
                      <option value="Basic 6 / Pre-Junior">Basic 6 / Pre-Junior</option>
                      <option value="Junior Secondary 1 (JSS 1)">Junior Secondary 1 (JSS 1)</option>
                      <option value="Junior Secondary 2 - 3">Junior Secondary 2 - 3</option>
                      <option value="Senior Secondary 1 (SSS 1 - Science)">Senior Secondary 1 (SSS 1 - Science)</option>
                      <option value="Senior Secondary 1 (SSS 1 - Commercial / Arts)">Senior Secondary 1 (SSS 1 - Commercial / Arts)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tahfeez Stream Preference
                    </label>
                    <select
                      name="tahfeezPreference"
                      value={formData.tahfeezPreference}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Integrated Standard Tahfeez">Integrated Standard Tahfeez (Curriculum-aligned)</option>
                      <option value="Accelerated Intensive Huffaz Track">Accelerated Intensive Huffaz Track (Morning & Weekend)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Previous School Attended (if applicable)
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      placeholder="Name and city of previous educational institution"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Parent / Guardian Information */}
              <div>
                <h3 className="text-base font-extrabold text-emerald-950 dark:text-amber-300 uppercase tracking-wider mb-4 pb-2 border-b border-emerald-900/10 dark:border-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">2</span>
                  <span>Parent / Guardian Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Parent / Guardian Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alhaji Mansoor Sani"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        formErrors.parentName 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.parentName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.parentName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Relationship to Student <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="parentRelationship"
                      value={formData.parentRelationship}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Phone Number (Nigeria) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. +234 803 000 0000"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        formErrors.parentPhone 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.parentPhone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.parentPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. guardian@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        formErrors.parentEmail 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.parentEmail && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.parentEmail}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Residential Home Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="2"
                      name="homeAddress"
                      value={formData.homeAddress}
                      onChange={handleInputChange}
                      placeholder="House Number, Street Name, Estate or Area, City/Town"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                        formErrors.homeAddress 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-700'
                      }`}
                    ></textarea>
                    {formErrors.homeAddress && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.homeAddress}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Health & Additional Notes */}
              <div>
                <h3 className="text-base font-extrabold text-emerald-950 dark:text-amber-300 uppercase tracking-wider mb-4 pb-2 border-b border-emerald-900/10 dark:border-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">3</span>
                  <span>Health, Dietary or Learning Considerations</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Special Medical or Dietary Information (Optional)
                  </label>
                  <textarea
                    rows="2"
                    name="medicalNotes"
                    value={formData.medicalNotes}
                    onChange={handleInputChange}
                    placeholder="e.g., Asthma, food allergies, reading eyeglasses, etc."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  ></textarea>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    I confirm that the information provided is accurate and truthful. I agree to abide by the Islamic code of conduct and Nigerian educational guidelines of <strong className="text-emerald-950 dark:text-amber-300">ASASUL ISLAM SCHOOL</strong> upon admission.
                  </span>
                </label>
                {formErrors.agreedToTerms && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.agreedToTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-white font-extrabold text-base shadow-lg shadow-emerald-950/20 active:scale-98 transition-all flex items-center justify-center gap-2 border border-amber-400/40"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Submit Application for Screening</span>
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* 4. Frequently Asked Questions Accordion */}
      <section id="faqs" className="py-20 bg-stone-50 dark:bg-[#071510] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Got Questions?"
            arabicSubtitle="الأَسْئِلَةُ الشَّائِعَةُ"
            title="Frequently Asked Questions"
            subtitle="Find quick answers regarding tuition, curriculum, transportation in Nigeria, Tahfeez schedules, and entrance screening."
          />

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                  >
                    <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 border-emerald-300' : 'text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Application Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 mx-auto flex items-center justify-center border-4 border-emerald-50 dark:border-emerald-900">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 dark:text-amber-400" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-700/50">
                Application Received Successfully
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                Alhamdulillah! Submission Complete
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Thank you for applying to <strong className="text-emerald-900 dark:text-amber-300">ASASUL ISLAM SCHOOL</strong>. Your application has been logged into our preliminary registry.
              </p>
            </div>

            {/* Reference Card */}
            <div className="bg-stone-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Application Reference:</span>
                <span className="font-mono font-bold text-emerald-800 dark:text-amber-300 text-sm">{applicationRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Applicant Name:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.studentFirstName} {formData.studentLastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Grade Level:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.gradeApplying}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Contact Email:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.parentEmail}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Our Admissions Secretary will review the submission and reach out via phone/email to schedule the entrance diagnostic assessment.
            </p>

            <button
              onClick={resetForm}
              className="w-full py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-colors"
            >
              Done / Return to Admissions
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
