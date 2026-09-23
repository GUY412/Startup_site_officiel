import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo-oknok-stacked.png'
import './Navbar.css'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/services', label: 'Services' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="OKNOK" />
        </NavLink>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn btn-primary navbar-cta" onClick={() => setOpen(false)}>
            Demander un devis
          </NavLink>
        </nav>

        <button
          className={`navbar-toggle ${open ? 'is-open' : ''}`}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
