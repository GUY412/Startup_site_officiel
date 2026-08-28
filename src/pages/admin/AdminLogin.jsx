import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext.jsx'
import './Admin.css'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Connexion impossible.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-auth-page">
      <form className="card admin-auth-card" onSubmit={handleSubmit}>
        <h1>Espace admin</h1>
        <p className="admin-auth-sub">Connectez-vous pour consulter les demandes de devis.</p>

        {error && <div className="error-banner">{error}</div>}

        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
