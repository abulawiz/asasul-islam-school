// src/services/api.js - Client API Service for ASASUL ISLAM SCHOOL

const API_BASE = '/api';

export async function loginUser(identifier, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Authentication failed');
  return data;
}

export async function getStudentPortalData(token) {
  const res = await fetch(`${API_BASE}/portal/student-data`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch student data');
  return data;
}

export async function getAdminOverview(token) {
  const res = await fetch(`${API_BASE}/portal/admin-overview`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch admin overview');
  return data;
}

export async function submitAdmissionApplication(formData) {
  const res = await fetch(`${API_BASE}/admissions/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit application');
  return data;
}

export async function checkAdmissionStatus(refNumber) {
  const res = await fetch(`${API_BASE}/admissions/status/${encodeURIComponent(refNumber)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Application not found');
  return data;
}

export async function updateAdmissionStatus(token, id, payload) {
  const res = await fetch(`${API_BASE}/admissions/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update status');
  return data;
}

export async function submitContactEnquiry(payload) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
  return data;
}

export async function bookCampusTour(payload) {
  const res = await fetch(`${API_BASE}/contact/tours`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to book tour');
  return data;
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/contact/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to subscribe');
  return data;
}

export async function getAllAdmissions(token) {
  const res = await fetch(`${API_BASE}/admissions`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch admissions');
  return data;
}

export async function getAllEnquiries(token) {
  const res = await fetch(`${API_BASE}/contact/admin/enquiries`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch enquiries');
  return data;
}

export async function getAllTours(token) {
  const res = await fetch(`${API_BASE}/contact/admin/tours`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch campus tours');
  return data;
}

export async function updateTourStatus(token, id, status) {
  const res = await fetch(`${API_BASE}/contact/admin/tours/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update tour status');
  return data;
}

export async function updateEnquiryStatus(token, id, status) {
  const res = await fetch(`${API_BASE}/contact/admin/enquiries/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update enquiry status');
  return data;
}
