import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            OK<span>NOK</span>
          </div>
          <p>
            Startup de solutions numériques, cybersécurité, communication digitale, design et
            innovation technologique.
          </p>
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
          <a href="mailto:contact@oknok.africa">contact@oknok.africa</a>
          <Link to="/contact">Demander un devis</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} OKNOK. Tous droits réservés.</div>
      </div>
    </footer>
  )
}
