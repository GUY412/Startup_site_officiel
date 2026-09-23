import { useEffect, useState } from 'react'
import { api, mediaUrl } from '../lib/api.js'
import './Portfolio.css'

function initials(category) {
  if (!category) return '—'
  return category
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.projects
      .list()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

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
          {loading ? (
            <p className="portfolio-note">Chargement…</p>
          ) : projects.length === 0 ? (
            <p className="portfolio-note">Nos réalisations seront bientôt présentées ici.</p>
          ) : (
            <>
              <div className="portfolio-grid">
                {projects.map((project) => (
                  <a
                    className="card portfolio-card"
                    key={project.id}
                    href={project.link || undefined}
                    target={project.link ? '_blank' : undefined}
                    rel={project.link ? 'noopener noreferrer' : undefined}
                    style={{ cursor: project.link ? 'pointer' : 'default' }}
                    onClick={(e) => !project.link && e.preventDefault()}
                  >
                    {project.photo_path ? (
                      <img className="portfolio-thumb-img" src={mediaUrl(project.photo_path)} alt="" />
                    ) : (
                      <div className="portfolio-thumb" aria-hidden="true">
                        {initials(project.category)}
                      </div>
                    )}
                    <div className="portfolio-body">
                      {project.category && <span className="badge">{project.category}</span>}
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              <p className="portfolio-note">
                Nos prochaines réalisations seront présentées ici au fur et à mesure des projets livrés.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
