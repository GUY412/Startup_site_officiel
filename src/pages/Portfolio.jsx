import { projects } from '../data/projects.js'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>Portfolio</span>
          <h1>Nos réalisations</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div className="card portfolio-card" key={project.title + index}>
                <div className="portfolio-thumb" aria-hidden="true">
                  {project.category
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="portfolio-body">
                  <span className="badge">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="portfolio-note">
            Nos prochaines réalisations seront présentées ici au fur et à mesure des projets livrés.
          </p>
        </div>
      </section>
    </>
  )
}
