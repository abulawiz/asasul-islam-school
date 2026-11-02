import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  MessageSquare, Calendar, ShieldCheck, ArrowRight, User 
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { schoolInfo } from '../data/schoolData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: 'General Enquiry',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [tourBooked, setTourBooked] = useState(false);
  const [tourData, setTourData] = useState({
    parentName: '',
    tourDate: '',
    preferredTime: '10:00 AM'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Please provide a message with at least 10 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          enquiryType: 'General Enquiry',
          message: ''
        });
      }, 1000);
    }
  };

  const handleTourSubmit = (e) => {
    e.preventDefault();
    if (tourData.parentName && tourData.tourDate) {
      setTourBooked(true);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Banner */}
      <section className="relative bg-emerald-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest inline-block mb-3 bg-emerald-900/80 px-4 py-1 rounded-full border border-amber-400/30">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Contact Asasul Islam School
          </h1>
          <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Our admissions counselors and administrative staff are ready to assist you with inquiries, enrollment procedures, or scheduling a visit to our campus.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Campus Location</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                {schoolInfo.contact.address}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{schoolInfo.contact.cityState}, {schoolInfo.contact.country}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Enquiries</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                {schoolInfo.contact.phonePrimary}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {schoolInfo.contact.phoneSecondary}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Inquiries</h4>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold truncate">
                {schoolInfo.contact.emailAdmissions}
              </p>
              <p className="text-xs text-slate-600 mt-0.5 truncate">
                {schoolInfo.contact.emailGeneral}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Office Hours</h4>
              <p className="text-xs text-slate-800 font-semibold">
                Mon – Thu: 7:30 AM – 3:30 PM
              </p>
              <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                Fri: 7:30 AM – 1:00 PM
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Form and Tour Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Form Interface */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <div className="mb-8">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Direct Communication
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                Send Us a Message
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Have a question regarding admissions, school bus routes, or curriculum? Fill out the form below.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Asasul Islam School. Our administrative office will review your enquiry and respond within 24 to 48 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Amina Yusuf"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50 focus:outline-none focus:ring-2 ${
                        formErrors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. parent@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50 focus:outline-none focus:ring-2 ${
                        formErrors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +234 803 123 4567"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50 focus:outline-none focus:ring-2 ${
                        formErrors.phone ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-700'
                      }`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nature of Enquiry
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Admissions & Testing">Admissions & Entrance Assessment</option>
                      <option value="Tahfeez Programme">Tahfeez-ul-Qur'an Track</option>
                      <option value="Tuition & Fees Schedule">Tuition & Fees Schedule</option>
                      <option value="School Bus Transportation">School Bus Transportation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please tell us how we can help you and your child..."
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50 focus:outline-none focus:ring-2 ${
                      formErrors.message ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-700'
                    }`}
                  ></textarea>
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-amber-400/30"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Send Message to School</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Schedule Campus Tour & Campus Map Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Tour Scheduler Card */}
            <div className="bg-emerald-950 text-white p-7 rounded-3xl border border-amber-400/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-amber-400/5 blur-2xl"></div>
              
              <div className="relative z-10">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                  In-Person Experience
                </span>
                <h3 className="text-xl font-extrabold text-white mb-2">
                  Schedule a Campus Tour
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed mb-5">
                  Walk through our science laboratories, quiet Tahfeez halaqahs, and modern classrooms with an Admissions Guide.
                </p>

                {tourBooked ? (
                  <div className="p-4 rounded-xl bg-emerald-900/90 border border-emerald-700 text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-amber-300 mx-auto" />
                    <h4 className="text-sm font-bold text-white">Tour Appointment Reserved!</h4>
                    <p className="text-xs text-emerald-200">
                      We look forward to welcoming {tourData.parentName} on {tourData.tourDate} at {tourData.preferredTime}. An SMS reminder has been simulated.
                    </p>
                    <button
                      onClick={() => setTourBooked(false)}
                      className="text-xs text-amber-300 underline font-semibold mt-2 block mx-auto"
                    >
                      Reschedule
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleTourSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-emerald-200 mb-1 font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={tourData.parentName}
                        onChange={(e) => setTourData({ ...tourData, parentName: e.target.value })}
                        placeholder="Parent / Guardian Name"
                        className="w-full px-3 py-2 rounded-lg bg-emerald-900/80 border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-200 mb-1 font-semibold">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={tourData.tourDate}
                        onChange={(e) => setTourData({ ...tourData, tourDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-emerald-900/80 border border-emerald-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-200 mb-1 font-semibold">Preferred Time</label>
                      <select
                        value={tourData.preferredTime}
                        onChange={(e) => setTourData({ ...tourData, preferredTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-emerald-900/80 border border-emerald-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      >
                        <option value="9:00 AM">9:00 AM (Morning Assembly session)</option>
                        <option value="11:30 AM">11:30 AM (Laboratory & Academic walk)</option>
                        <option value="2:00 PM">2:00 PM (Afternoon Zuhr Prayer & Tahfeez)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition shadow-sm mt-2"
                    >
                      Reserve Campus Walkthrough
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Stylized Simulated Map Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-800" />
                  <h4 className="font-bold text-sm text-slate-900">Campus Location Map</h4>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Phase II GRA
                </span>
              </div>

              {/* Graphical Simulated Campus Map Preview */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-center p-4">
                {/* Background grid lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
                
                {/* Street simulation lines */}
                <div className="absolute inset-x-0 top-1/2 h-4 bg-slate-300 -translate-y-1/2"></div>
                <div className="absolute inset-y-0 left-1/3 w-4 bg-slate-300"></div>

                {/* Pin Point */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-amber-300 border-2 border-white shadow-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="bg-emerald-950 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md mt-1 border border-amber-400/40">
                    Asasul Islam School Campus
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 text-[10px] font-medium text-slate-500 bg-white/90 px-2 py-0.5 rounded shadow-xs">
                  GPS: 9.0820° N, 8.6753° E
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 bg-stone-50 p-3 rounded-xl border border-slate-100">
                <p className="font-semibold text-slate-800">Landmarks & Directions:</p>
                <p>Located directly opposite the Central Islamic Cultural Center, 300 meters off the Northern Ring Expressway.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
