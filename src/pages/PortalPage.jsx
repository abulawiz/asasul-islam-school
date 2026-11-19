import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, BookOpen, Award, CheckCircle2, 
  Printer, LogOut, ArrowRight, Calendar, Mail, 
  Users, MessageSquare, Compass, X, Check, Clock
} from 'lucide-react';
import { 
  loginUser, getStudentPortalData, getAdminOverview, 
  updateAdmissionStatus, updateTourStatus, updateEnquiryStatus 
} from '../services/api';

export default function PortalPage() {
  const [token, setToken] = useState(() => localStorage.getItem('ais_token') || '');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ais_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Student / Parent Portal Data
  const [studentData, setStudentData] = useState(null);
  const [activeStudentTab, setActiveStudentTab] = useState('report');

  // Admin Portal Data
  const [adminData, setAdminData] = useState(null);
  const [adminTab, setAdminTab] = useState('admissions'); // 'admissions' | 'enquiries' | 'tours'
  const [admissionFilter, setAdmissionFilter] = useState('All');
  const [enquiryFilter, setEnquiryFilter] = useState('All');
  const [tourFilter, setTourFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  // Screening schedule modal state
  const [screeningModal, setScreeningModal] = useState({
    open: false,
    app: null,
    date: '2026-08-15',
    time: '09:00 AM',
    notes: 'Please arrive at the AIS Main Hall by 8:45 AM. Bring student birth certificate, previous academic term result sheets, and 2 recent passport photographs.'
  });

  // Message preview modal state
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (!token || !user) return;

    if (user.role === 'admin') {
      getAdminOverview(token)
        .then(data => {
          if (!ignore) setAdminData(data);
        })
        .catch(console.error);
    } else {
      getStudentPortalData(token)
        .then(data => {
          if (!ignore) setStudentData(data);
        })
        .catch(console.error);
    }

    return () => {
      ignore = true;
    };
  }, [token, user]);

  const refreshAdmin = async () => {
    if (!token) return;
    try {
      const data = await getAdminOverview(token);
      setAdminData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await loginUser(identifier, password);
      localStorage.setItem('ais_token', res.token);
      localStorage.setItem('ais_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ais_token');
    localStorage.removeItem('ais_user');
    setToken('');
    setUser(null);
    setStudentData(null);
    setAdminData(null);
  };

  const handleStatusUpdate = async (admissionId, newStatus) => {
    setUpdatingId(admissionId);
    try {
      await updateAdmissionStatus(token, admissionId, { status: newStatus });
      await refreshAdmin();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleScheduleSave = async (e) => {
    e.preventDefault();
    if (!screeningModal.app) return;
    setUpdatingId(screeningModal.app.id);
    try {
      const formattedDate = `${screeningModal.date} at ${screeningModal.time}`;
      await updateAdmissionStatus(token, screeningModal.app.id, {
        status: 'Screening Scheduled',
        assessment_date: formattedDate,
        admin_notes: screeningModal.notes
      });
      setScreeningModal({ open: false, app: null, date: '2026-08-15', time: '09:00 AM', notes: '' });
      await refreshAdmin();
    } catch (err) {
      alert(err.message || 'Failed to schedule screening');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTourStatusToggle = async (tourId, newStatus) => {
    setUpdatingId(tourId);
    try {
      await updateTourStatus(token, tourId, newStatus);
      await refreshAdmin();
    } catch (err) {
      alert(err.message || 'Failed to update tour status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleEnquiryStatusToggle = async (enquiryId, newStatus) => {
    setUpdatingId(enquiryId);
    try {
      await updateEnquiryStatus(token, enquiryId, newStatus);
      await refreshAdmin();
    } catch (err) {
      alert(err.message || 'Failed to update enquiry status');
    } finally {
      setUpdatingId(null);
    }
  };

  const quickFillStudent = () => {
    setIdentifier('AIS/2026/0842');
    setPassword('Student@2026');
  };

  const quickFillAdmin = () => {
    setIdentifier('admin@asasulislam.edu.ng');
    setPassword('Admin@2026');
  };

  // 1. LOGIN SCREEN
  if (!user || !token) {
    return (
      <div className="bg-stone-50 dark:bg-[#05100c] min-h-[85vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-6 text-white text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 mx-auto flex items-center justify-center mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-extrabold text-white">Asasul Islam EduPortal</h1>
            <p className="text-xs text-emerald-200 mt-1">Authorized Student, Parent & Staff Gateway</p>
          </div>

          <div className="p-6 sm:p-8">
            {loginError && (
              <div className="p-3 mb-5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Portal ID or Email Address
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. AIS/2026/0842 or admin@..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Access Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-amber-400/30"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </form>

            {/* Demo Quick-Fill Helpers */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                Click to Demo with Seeded Accounts:
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={quickFillStudent}
                  className="flex-1 py-2 px-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 transition"
                >
                  🎒 Student / Parent
                </button>
                <button
                  type="button"
                  onClick={quickFillAdmin}
                  className="flex-1 py-2 px-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-[11px] font-semibold text-amber-900 dark:text-amber-300 hover:bg-amber-100 transition"
                >
                  👑 Administrator
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 2. LOGGED-IN PORTAL: ADMIN VIEW
  if (user.role === 'admin') {
    const admissionsList = adminData?.recentAdmissions || [];
    const filteredAdmissions = admissionsList.filter(app => {
      if (admissionFilter === 'All') return true;
      return app.status === admissionFilter;
    });

    const enquiriesList = adminData?.recentEnquiries || [];
    const filteredEnquiries = enquiriesList.filter(item => {
      if (enquiryFilter === 'All') return true;
      return item.status === enquiryFilter;
    });

    const toursList = adminData?.upcomingTours || [];
    const filteredTours = toursList.filter(tour => {
      if (tourFilter === 'All') return true;
      return tour.status === tourFilter;
    });

    return (
      <div className="bg-stone-50 dark:bg-[#05100c] min-h-screen py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-400/30 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-emerald-900/80 px-3 py-1 rounded-full border border-amber-400/30">
                School Management System
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Administrator Control Center
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                Signed in as <strong className="text-amber-300">{user.name}</strong> ({user.email})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={refreshAdmin}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
              >
                <span>Refresh Data</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          {adminData?.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <button 
                onClick={() => setAdminTab('admissions')}
                className={`text-left p-5 rounded-2xl border transition shadow-sm ${
                  adminTab === 'admissions'
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Applications</span>
                  <Users className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-amber-400 mt-1">
                  {adminData.stats.totalAdmissions}
                </div>
                <div className="text-[11px] text-amber-600 dark:text-amber-300 mt-1">
                  {adminData.stats.pendingAdmissions} pending review
                </div>
              </button>

              <button 
                onClick={() => setAdminTab('enquiries')}
                className={`text-left p-5 rounded-2xl border transition shadow-sm ${
                  adminTab === 'enquiries'
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Parent Enquiries</span>
                  <MessageSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-teal-700 dark:text-teal-400 mt-1">
                  {adminData.stats.totalEnquiries}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Direct contact logs</div>
              </button>

              <button 
                onClick={() => setAdminTab('tours')}
                className={`text-left p-5 rounded-2xl border transition shadow-sm ${
                  adminTab === 'tours'
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Campus Tours</span>
                  <Compass className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                  {adminData.stats.totalTours}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Family visits scheduled</div>
              </button>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Subscribers</span>
                  <Mail className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 mt-1">
                  {adminData.stats.totalSubscribers}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Termly bulletin readers</div>
              </div>
            </div>
          )}

          {/* Tab Navigation Controls */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-2">
            <button
              onClick={() => setAdminTab('admissions')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
                adminTab === 'admissions'
                  ? 'border-emerald-600 text-emerald-800 dark:text-amber-400 dark:border-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Admissions & Applications ({admissionsList.length})</span>
            </button>
            <button
              onClick={() => setAdminTab('enquiries')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
                adminTab === 'enquiries'
                  ? 'border-emerald-600 text-emerald-800 dark:text-amber-400 dark:border-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Parent Inquiries ({enquiriesList.length})</span>
            </button>
            <button
              onClick={() => setAdminTab('tours')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
                adminTab === 'tours'
                  ? 'border-emerald-600 text-emerald-800 dark:text-amber-400 dark:border-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Campus Tours ({toursList.length})</span>
            </button>
          </div>

          {/* TAB 1: ADMISSIONS MANAGEMENT */}
          {adminTab === 'admissions' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8 animate-in fade-in duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    Candidate Applications Registry
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Review candidate details, schedule formal screening dates, and update enrollment decisions
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                  {['All', 'Pending Review', 'Screening Scheduled', 'Admitted'].map(st => (
                    <button
                      key={st}
                      onClick={() => setAdmissionFilter(st)}
                      className={`px-3 py-1 rounded-full transition ${
                        admissionFilter === st
                          ? 'bg-emerald-900 text-white dark:bg-amber-400 dark:text-emerald-950 font-bold'
                          : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Applicant Name</th>
                      <th className="py-3 px-4">Grade & Track</th>
                      <th className="py-3 px-4">Parent Details</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4">Screening Date</th>
                      <th className="py-3 px-4 text-right">Administrative Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredAdmissions.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          No admission applications found matching "{admissionFilter}".
                        </td>
                      </tr>
                    ) : (
                      filteredAdmissions.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-800 dark:text-amber-400">
                            {app.ref_number}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900 dark:text-white">
                              {app.student_first_name} {app.student_last_name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              DOB: {app.dob} ({app.gender})
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-900 dark:text-white">{app.grade_applying}</div>
                            <div className="text-[11px] text-emerald-700 dark:text-amber-400">{app.tahfeez_preference}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium">{app.parent_name}</div>
                            <div className="text-[11px] text-slate-400">{app.parent_phone}</div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{app.parent_email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              app.status === 'Admitted'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : app.status === 'Screening Scheduled'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {app.assessment_date ? (
                              <div className="text-slate-900 dark:text-white font-medium">
                                <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-amber-400">
                                  <Calendar className="w-3 h-3" />
                                  {app.assessment_date}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">Not scheduled</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              disabled={updatingId === app.id}
                              onClick={() => {
                                setScreeningModal({
                                  open: true,
                                  app,
                                  date: '2026-08-15',
                                  time: '09:00 AM',
                                  notes: app.admin_notes || 'Please arrive at the AIS Main Hall by 8:45 AM. Bring student birth certificate, previous academic term result sheets, and 2 recent passport photographs.'
                                });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold transition inline-flex items-center gap-1"
                              title="Set or reschedule screening date"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>{app.assessment_date ? 'Reschedule' : 'Schedule'}</span>
                            </button>

                            {app.status !== 'Admitted' ? (
                              <button
                                disabled={updatingId === app.id}
                                onClick={() => handleStatusUpdate(app.id, 'Admitted')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold transition inline-flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Admit</span>
                              </button>
                            ) : (
                              <button
                                disabled={updatingId === app.id}
                                onClick={() => handleStatusUpdate(app.id, 'Pending Review')}
                                className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-[10px] font-semibold transition"
                                title="Revert to pending review"
                              >
                                Revert
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PARENT ENQUIRIES INBOX */}
          {adminTab === 'enquiries' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8 animate-in fade-in duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    Parent & Community Inquiries Inbox
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Messages submitted via the public contact interface with real-time status tracking
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {['All', 'New', 'Resolved'].map(st => (
                    <button
                      key={st}
                      onClick={() => setEnquiryFilter(st)}
                      className={`px-3 py-1 rounded-full transition ${
                        enquiryFilter === st
                          ? 'bg-emerald-900 text-white dark:bg-amber-400 dark:text-emerald-950 font-bold'
                          : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Date Logged</th>
                      <th className="py-3 px-4">Sender</th>
                      <th className="py-3 px-4">Contact Channels</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Message Snippet</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          No enquiries found under "{enquiryFilter}".
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {item.created_at ? item.created_at.split(' ')[0] : 'Recent'}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            {item.full_name}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-700 dark:text-slate-300">{item.email}</div>
                            {item.phone && <div className="text-[11px] text-slate-400">{item.phone}</div>}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              {item.enquiry_type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 max-w-[220px]">
                            <p className="truncate text-slate-600 dark:text-slate-300" title={item.message}>
                              {item.message}
                            </p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              item.status === 'Resolved'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedEnquiry(item)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold transition inline-flex items-center gap-1"
                            >
                              <span>Read</span>
                            </button>
                            <button
                              disabled={updatingId === item.id}
                              onClick={() => handleEnquiryStatusToggle(item.id, item.status === 'Resolved' ? 'New' : 'Resolved')}
                              className={`px-2.5 py-1 rounded-lg text-white text-[11px] font-bold transition inline-flex items-center gap-1 ${
                                item.status === 'Resolved'
                                  ? 'bg-amber-600 hover:bg-amber-700'
                                  : 'bg-emerald-800 hover:bg-emerald-900'
                              }`}
                            >
                              {item.status === 'Resolved' ? 'Reopen' : 'Resolve'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CAMPUS TOURS SCHEDULE */}
          {adminTab === 'tours' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8 animate-in fade-in duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    Campus Walkthrough Appointments
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Parent bookings for school tour visits, classroom walk-ins, and facility previews
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {['All', 'Scheduled', 'Completed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setTourFilter(st)}
                      className={`px-3 py-1 rounded-full transition ${
                        tourFilter === st
                          ? 'bg-emerald-900 text-white dark:bg-amber-400 dark:text-emerald-950 font-bold'
                          : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Booking Date</th>
                      <th className="py-3 px-4">Parent / Visitor Name</th>
                      <th className="py-3 px-4">Scheduled Visit Date</th>
                      <th className="py-3 px-4">Preferred Time</th>
                      <th className="py-3 px-4">Visit Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredTours.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-slate-400">
                          No campus tour appointments under "{tourFilter}".
                        </td>
                      </tr>
                    ) : (
                      filteredTours.map((tour) => (
                        <tr key={tour.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {tour.created_at ? tour.created_at.split(' ')[0] : 'Recent'}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            {tour.parent_name}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-emerald-800 dark:text-amber-400">
                            {tour.tour_date}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {tour.preferred_time}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              tour.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            }`}>
                              {tour.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              disabled={updatingId === tour.id}
                              onClick={() => handleTourStatusToggle(tour.id, tour.status === 'Completed' ? 'Scheduled' : 'Completed')}
                              className={`px-3 py-1 rounded-lg text-white text-[11px] font-bold transition inline-flex items-center gap-1 ${
                                tour.status === 'Completed'
                                  ? 'bg-amber-600 hover:bg-amber-700'
                                  : 'bg-emerald-800 hover:bg-emerald-900'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>{tour.status === 'Completed' ? 'Mark Scheduled' : 'Mark Completed'}</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* MODAL: SCHEDULE SCREENING ASSESSMENT */}
        {screeningModal.open && screeningModal.app && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <button
                onClick={() => setScreeningModal({ ...screeningModal, open: false, app: null })}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1">
                <Calendar className="w-4 h-4" />
                <span>Admissions Committee</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Schedule Screening & Assessment
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
                Set the assessment date for <strong>{screeningModal.app.student_first_name} {screeningModal.app.student_last_name}</strong> ({screeningModal.app.ref_number}). This information immediately synchronizes with the parent's status tracker.
              </p>

              <form onSubmit={handleScheduleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Assessment Date
                    </label>
                    <input
                      type="date"
                      required
                      value={screeningModal.date}
                      onChange={(e) => setScreeningModal({ ...screeningModal, date: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Session Time
                    </label>
                    <select
                      value={screeningModal.time}
                      onChange={(e) => setScreeningModal({ ...screeningModal, time: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 outline-none"
                    >
                      <option value="08:30 AM">08:30 AM (Batch A)</option>
                      <option value="09:00 AM">09:00 AM (Batch B)</option>
                      <option value="10:30 AM">10:30 AM (Batch C)</option>
                      <option value="01:30 PM">01:30 PM (Afternoon)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Assessment Instructions & Required Documents
                  </label>
                  <textarea
                    rows="3"
                    value={screeningModal.notes}
                    onChange={(e) => setScreeningModal({ ...screeningModal, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-600 outline-none"
                    placeholder="Instructions for parents on assessment day..."
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setScreeningModal({ ...screeningModal, open: false, app: null })}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updatingId === screeningModal.app.id}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition shadow-md inline-flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm & Schedule</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: VIEW FULL PARENT ENQUIRY MESSAGE */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>{selectedEnquiry.enquiry_type}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Message from {selectedEnquiry.full_name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-4">
                Received: {selectedEnquiry.created_at || 'Recently'}
              </p>

              <div className="space-y-3 p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Email Address:</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-emerald-800 dark:text-amber-400 hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Phone Contact:</span>
                    <a href={`tel:${selectedEnquiry.phone}`} className="font-semibold text-slate-900 dark:text-white hover:underline">
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                )}
                <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Current Status:</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    selectedEnquiry.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {selectedEnquiry.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message Content:
                </label>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-800 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    handleEnquiryStatusToggle(selectedEnquiry.id, selectedEnquiry.status === 'Resolved' ? 'New' : 'Resolved');
                    setSelectedEnquiry(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition ${
                    selectedEnquiry.status === 'Resolved'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  {selectedEnquiry.status === 'Resolved' ? 'Mark as New' : 'Mark as Resolved'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // 3. LOGGED-IN PORTAL: STUDENT / PARENT VIEW
  const student = studentData?.student;
  const report = studentData?.reportCard;
  const tahfeez = studentData?.tahfeez;
  const fees = studentData?.feeRecord;

  return (
    <div className="bg-stone-50 dark:bg-[#05100c] min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Student Profile Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-400/30 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-2xl shrink-0">
              {student?.full_name ? student.full_name[0] : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {student?.full_name || user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-emerald-950">
                  Active Pupil
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-200 mt-1">
                <span>Admission No: <strong className="text-white font-mono">{student?.admission_no || user.portal_id}</strong></span>
                <span>•</span>
                <span>Class: <strong className="text-white">{student?.grade || 'Basic 5'}</strong></span>
                <span>•</span>
                <span>Attendance: <strong className="text-amber-300">{student?.attendance_pct || 98}%</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print Records</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveStudentTab('report')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeStudentTab === 'report'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Terminal Report Sheet</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('tahfeez')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeStudentTab === 'tahfeez'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Tahfeez & Quran Log</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('fees')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeStudentTab === 'fees'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Fee Statement & Receipts</span>
          </button>
        </div>

        {/* TAB 1: REPORT SHEET */}
        {activeStudentTab === 'report' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 animate-in fade-in duration-200">
            
            {/* Report Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 text-center md:text-left">
              <div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                  Official Academic Transcript
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {report?.session || '2025/2026 Academic Session'} — {report?.term || 'First Term'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Class: {student?.grade} | Position: <strong className="text-emerald-800 dark:text-amber-300">{report?.position}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded-2xl text-center border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Total Marks</span>
                  <span className="text-xl font-black text-emerald-900 dark:text-amber-300">{report?.total_score} / 900</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-2xl text-center border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Cumulative Avg</span>
                  <span className="text-xl font-black text-amber-900 dark:text-amber-300">{report?.average}%</span>
                </div>
              </div>
            </div>

            {/* Subject Scores Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">CA Test (30)</th>
                    <th className="py-3 px-4">Exam (70)</th>
                    <th className="py-3 px-4">Total (100)</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {report?.subjects?.map((sub, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{sub.subject}</td>
                      <td className="py-3 px-4 font-mono">{sub.test}</td>
                      <td className="py-3 px-4 font-mono">{sub.exam}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800 dark:text-amber-400">{sub.total}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded font-bold text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-amber-300">
                          {sub.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">{sub.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Class Teacher's Remark:</span>
                <p className="text-slate-600 dark:text-slate-300 italic">"{report?.teacher_remark}"</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
                <span className="font-bold text-emerald-900 dark:text-amber-300 uppercase tracking-wider block">Principal's Address:</span>
                <p className="text-emerald-950 dark:text-emerald-200 italic">"{report?.principal_remark}"</p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TAHFEEZ PROGRESS */}
        {activeStudentTab === 'tahfeez' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                Quranic Hifz & Tajweed Registry
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Tahfeez-ul-Qur'an Progress Log
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Juz' Completed</span>
                <div className="text-3xl font-extrabold text-emerald-800 dark:text-amber-300 mt-1">
                  {tahfeez?.juz_completed || 16} / 30
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-700 h-full rounded-full" style={{ width: '53%' }}></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Current Surah Under Study</span>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                  {tahfeez?.current_surah}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Tajweed Evaluation</span>
                <div className="text-base font-extrabold text-emerald-800 dark:text-amber-300 mt-2">
                  {tahfeez?.tajweed_grade}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex justify-between items-center">
                <span>Muraja'ah (Revision Schedule):</span>
                <strong className="text-emerald-900 dark:text-amber-300">{tahfeez?.murajaah_status}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Assigned Huffaz Sheikh:</span>
                <strong className="text-emerald-900 dark:text-amber-300">{tahfeez?.mentor}</strong>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FEES & RECEIPT */}
        {activeStudentTab === 'fees' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                School Bursary Department
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Fee Schedule & Payment Receipt
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Billing Term:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{fees?.term}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Total Tuition & Materials:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">₦{fees?.amount_due?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Amount Paid:</span>
                <span className="font-mono font-bold text-emerald-800 dark:text-amber-300">₦{fees?.amount_paid?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Outstanding Balance:</span>
                <span className="font-mono font-bold text-emerald-900 dark:text-emerald-400">₦{fees?.balance?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-500 dark:text-slate-400">Official Receipt Code:</span>
                <span className="font-mono font-bold text-emerald-800 dark:text-amber-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded">
                  {fees?.receipt_no}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full fee clearance certificate active for current academic period.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
