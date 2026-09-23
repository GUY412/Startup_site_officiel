import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, toList } from '../lib/api.js'
import { ServiceIcon } from '../components/icons.jsx'
import Slideshow from '../components/Slideshow.jsx'
import slide1 from '../assets/slides/slide-cybersecurite.svg'
import slide2 from '../assets/slides/slide-design.svg'
import slide3 from '../assets/slides/slide-marketing.svg'
import './Home.css'

const heroSlides = [
  { src: slide1, alt: 'Cybersécurité & sécurité des réseaux' },
  { src: slide2, alt: 'Design & multimédia' },
  { src: slide3, alt: 'Marketing & communication digitale' },
]

export default function Home() {
  const [settings, setSettings] = useState({})
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.settings.get().then(setSettings).catch(() => setSettings({}))
    api.services.list().then(setServices).catch(() => setServices([]))
    api.projects
      .list()
      .then((data) => setProjects(data.slice(0, 3)))
      .catch(() => setProjects([]))
  }, [])

  const featured = services.slice(0, 3)
  const floatCards = services.slice(0, 4)
  const mainCategories = toList(settings.main_categories)
  const heroTitleLines = (settings.home_hero_title || '').split('\n').filter(Boolean)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>
              {settings.home_hero_eyebrow}
            </span>
            <h1>
              {heroTitleLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < heroTitleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="hero-lead">{settings.home_hero_lead}</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Demander un devis
              </Link>
              <Link to="/services" className="btn btn-outline">
                Découvrir nos services
              </Link>
            </div>
            <ul className="hero-tags">
              {mainCategories.map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <div className="hero-blob hero-blob-1" aria-hidden="true" />
            <div className="hero-blob hero-blob-2" aria-hidden="true" />
            <Slideshow slides={heroSlides} className="hero-slideshow" />
            <div className="hero-chip hero-chip-1" aria-hidden="true">
              <ServiceIcon name="shield" />
            </div>
            <div className="hero-chip hero-chip-2" aria-hidden="true">
              <ServiceIcon name="palette" />
            </div>
            <div className="hero-chip hero-chip-3" aria-hidden="true">
              <ServiceIcon name="rocket" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="hero-float-cards">
            {floatCards.map((service) => (
              <Link to="/services" className="hero-float-card" key={service.id}>
                <span className="hero-float-icon">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="hero-float-title">{service.title}</span>
                <span className="hero-float-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '112px' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Nos domaines d'expertise</span>
            <h2>Une équipe pluridisciplinaire à votre service</h2>
            <p>
              OKNOK combine plusieurs pôles de compétences pour concevoir des solutions à forte valeur
              ajoutée, adaptées à vos besoins.
            </p>
          </div>

          <div className="home-services-grid">
            {featured.map((service) => (
              <div className="card home-service-card" key={service.id}>
                <div className="home-service-icon">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          <div className="home-services-cta">
            <Link to="/services" className="btn btn-dark-outline">
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-projects">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Portfolio</span>
            <h2>Nos réalisations</h2>
            <p>Un aperçu des projets que nous accompagnons.</p>
          </div>

          {projects.length === 0 ? (
            <p className="home-empty-note">Nos réalisations seront bientôt présentées ici.</p>
          ) : (
            <div className="home-projects-grid">
              {projects.map((project) => (
                <div className="card home-project-card" key={project.id}>
                  {project.category && <span className="badge">{project.category}</span>}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="home-services-cta">
            <Link to="/realisations" className="btn btn-dark-outline">
              Voir toutes nos réalisations
            </Link>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Un projet en tête ?</h2>
            <p>Parlons de vos besoins et construisons ensemble une solution sur mesure.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Contactez-nous
          </Link>
        </div>
      </section>
    </>
  )
}
