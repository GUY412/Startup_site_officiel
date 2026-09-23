export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'
const TOKEN_KEY = 'oknok_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// Builds a full URL for a photo_path returned by the API (e.g. "/uploads/xyz.png").
export function mediaUrl(photoPath) {
  if (!photoPath) return null
  return `${API_URL}${photoPath}`
}

// Newline-separated TEXT columns (services.items, services.tools, settings lists) <-> array.
export function toList(value) {
  if (!value) return []
  return value
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean)
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const message = data?.error || `Erreur ${res.status}`
    const error = new Error(message)
    error.status = res.status
    throw error
  }

  return data
}

// A public-read / admin-write REST resource (team, projects, links, posts).
function makeCrud(resource) {
  return {
    list: () => request(`/api/${resource}`),
    create: (payload) => request(`/api/${resource}`, { method: 'POST', body: payload, auth: true }),
    update: (id, payload) =>
      request(`/api/${resource}/${id}`, { method: 'PUT', body: payload, auth: true }),
    remove: (id) => request(`/api/${resource}/${id}`, { method: 'DELETE', auth: true }),
  }
}

async function uploadPhoto(file) {
  const token = getToken()
  const formData = new FormData()
  formData.append('photo', file)

  const res = await fetch(`${API_URL}/api/uploads`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error || `Erreur ${res.status}`)
  }

  return data // { url }
}

function uploadPhotoFromUrl(url) {
  return request('/api/uploads/from-url', { method: 'POST', body: { url }, auth: true })
}

// Fire-and-forget visit/click tracking — never surfaces errors to the UI.
function trackVisit(path, referrer) {
  request('/api/track/visit', { method: 'POST', body: { path, referrer } }).catch(() => {})
}

function trackClick(page, label, target) {
  request('/api/track/click', { method: 'POST', body: { page, label, target } }).catch(() => {})
}

export const api = {
  submitDevis: (payload) => request('/api/devis', { method: 'POST', body: payload }),
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),
  listDevis: () => request('/api/devis', { auth: true }),
  updateDevisStatus: (id, status) =>
    request(`/api/devis/${id}`, { method: 'PATCH', body: { status }, auth: true }),
  deleteDevis: (id) => request(`/api/devis/${id}`, { method: 'DELETE', auth: true }),

  team: makeCrud('team'),
  projects: makeCrud('projects'),
  links: makeCrud('links'),
  posts: makeCrud('posts'),
  services: makeCrud('services'),
  uploadPhoto,
  uploadPhotoFromUrl,

  settings: {
    get: () => request('/api/settings'),
    update: (payload) => request('/api/settings', { method: 'PUT', body: payload, auth: true }),
  },

  trackVisit,
  trackClick,
  getAnalytics: () => request('/api/analytics', { auth: true }),
}
