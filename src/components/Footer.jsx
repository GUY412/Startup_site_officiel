import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api.js'
import logo from '../assets/logo-oknok-stacked-onDark.png'
import './Footer.css'

export default function Footer() {
  const [links, setLinks] = useState([])
  const [settings, setSettings] = useState({})

  useEffect(() => {
    api.links
      .list()
      .then(setLinks)
      .catch(() => setLinks([]))
    api.settings.get().then(setSettings).catch(() => setSettings({}))
  }, [])

  const contactEmail = settings.contact_email || ''

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img className="footer-logo" src={logo} alt="OKNOK" />
          <p>{settings.footer_description}</p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <Link to="/a-propos">À propos</Link>
          <Link to="/services">Services</Link>
          <Link to="/realisations">Réalisations</Link>
          <Link to="/blog">Blog</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
          <Link to="/contact">Demander un devis</Link>
        </div>

        {links.length > 0 && (
          <div className="footer-col">
            <h4>Liens</h4>
            {links.map((link) =>
              link.type === 'internal' ? (
                <Link key={link.id} to={link.url}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ),
            )}
          </div>
        )}
      </div>

      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} OKNOK. Tous droits réservés.</div>
      </div>
    </footer>
  )
}
