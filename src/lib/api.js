const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001'
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

export const api = {
  submitDevis: (payload) => request('/api/devis', { method: 'POST', body: payload }),
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),
  listDevis: () => request('/api/devis', { auth: true }),
  updateDevisStatus: (id, status) =>
    request(`/api/devis/${id}`, { method: 'PATCH', body: { status }, auth: true }),
  deleteDevis: (id) => request(`/api/devis/${id}`, { method: 'DELETE', auth: true }),
}
