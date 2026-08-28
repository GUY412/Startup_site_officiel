import { Link } from 'react-router-dom'
import { serviceCategories, mainCategories } from '../data/services.js'
import { projects } from '../data/projects.js'
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
  const featured = serviceCategories.slice(0, 3)
  const floatCards = serviceCategories.slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>
              Solutions numériques & innovation digitale
            </span>
            <h1>
              Innover.
              <br />
              Transformer.
              <br />
              Croître.
            </h1>
            <p className="hero-lead">
              OKNOK accompagne entreprises, organisations et entrepreneurs dans leur transformation
              digitale : cybersécurité, design, communication, marketing et gestion de projets
              innovants.
            </p>
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
              <Link to="/services" className="hero-float-card" key={service.title}>
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
              <div className="card home-service-card" key={service.title}>
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

          <div className="home-projects-grid">
            {projects.slice(0, 3).map((project) => (
              <div className="card home-project-card" key={project.title + project.category}>
                <span className="badge">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>

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
