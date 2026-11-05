import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, BookOpen, Award, CheckCircle2, 
  Printer, LogOut, ArrowRight 
} from 'lucide-react';
import { 
  loginUser, getStudentPortalData, getAdminOverview, updateAdmissionStatus 
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
  const [updatingId, setUpdatingId] = useState(null);

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
                Administrator Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                Welcome, {user.name} ({user.email})
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Quick Metrics */}
          {adminData?.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Applications</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-amber-400 mt-1">
                  {adminData.stats.totalAdmissions}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Pending Reviews</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-300 mt-1">
                  {adminData.stats.pendingAdmissions}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">General Enquiries</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                  {adminData.stats.totalEnquiries}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Scheduled Tours</span>
                <div className="text-2xl sm:text-3xl font-black text-teal-700 dark:text-teal-400 mt-1">
                  {adminData.stats.totalTours}
                </div>
              </div>
            </div>
          )}

          {/* Admission Applications Management */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  Incoming Admission Applications
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Manage application status, set screening dates, and review candidate details
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Ref Number</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Grade Applying</th>
                    <th className="py-3 px-4">Parent / Contact</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Screening Date</th>
                    <th className="py-3 px-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {adminData?.recentAdmissions?.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-800 dark:text-amber-400">
                        {app.ref_number}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {app.student_first_name} {app.student_last_name}
                      </td>
                      <td className="py-3.5 px-4">{app.grade_applying}</td>
                      <td className="py-3.5 px-4">
                        <div>{app.parent_name}</div>
                        <div className="text-[11px] text-slate-400">{app.parent_phone}</div>
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
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                        {app.assessment_date || 'Not scheduled'}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        {app.status !== 'Admitted' && (
                          <button
                            disabled={updatingId === app.id}
                            onClick={() => handleStatusUpdate(app.id, 'Admitted')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold transition"
                          >
                            Admit
                          </button>
                        )}
                        {app.status === 'Pending Review' && (
                          <button
                            disabled={updatingId === app.id}
                            onClick={() => handleStatusUpdate(app.id, 'Screening Scheduled')}
                            className="px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold transition"
                          >
                            Schedule
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
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
