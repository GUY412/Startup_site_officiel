import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext.jsx'
import './Admin.css'

const TABS = [
  { to: '/admin', label: 'Devis', end: true },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/equipe', label: 'Équipe' },
  { to: '/admin/realisations', label: 'Réalisations' },
  { to: '/admin/liens', label: 'Liens' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/parametres', label: 'Paramètres' },
  { to: '/admin/statistiques', label: 'Statistiques' },
]

export default function AdminLayout() {
  const { logout } = useAuth()

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <div>
            <h1>Espace admin</h1>
            <p>Gérez le contenu et les demandes du site OKNOK.</p>
          </div>
          <button type="button" className="btn btn-dark-outline" onClick={logout}>
            Se déconnecter
          </button>
        </div>
        <div className="container admin-tabs">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) => `admin-tab ${isActive ? 'is-active' : ''}`}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </header>

      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
