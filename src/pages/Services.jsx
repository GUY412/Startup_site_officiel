import { useEffect, useMemo, useState } from 'react'
import { api, mediaUrl } from '../lib/api.js'
import { ServiceIcon } from '../components/icons.jsx'
import ServiceModal from '../components/ServiceModal.jsx'
import './Services.css'

const PAGE_SIZE = 6

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [activeService, setActiveService] = useState(null)

  useEffect(() => {
    api.services
      .list()
      .then(setServices)
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  const pageCount = Math.max(1, Math.ceil(services.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageServices = useMemo(
    () => services.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [services, currentPage],
  )

  const goToPage = (p) => {
    setPage(p)
    window.scrollTo({ top: document.querySelector('.services-grid')?.offsetTop - 100 || 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>Nos services</span>
          <h1>Des solutions numériques sur mesure</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <p className="admin-empty">Chargement…</p>
          ) : services.length === 0 ? (
            <p className="admin-empty">Aucun service pour le moment.</p>
          ) : (
            <>
              <div className="services-grid">
                {pageServices.map((service) => (
                  <button
                    type="button"
                    className="service-card"
                    key={service.id}
                    onClick={() => setActiveService(service)}
                  >
                    <div className="service-card-media">
                      {service.photo_path ? (
                        <img src={mediaUrl(service.photo_path)} alt="" />
                      ) : (
                        <div className="service-card-placeholder" aria-hidden="true">
                          <ServiceIcon name={service.icon} />
                        </div>
                      )}
                      <span className="service-card-icon">
                        <ServiceIcon name={service.icon} />
                      </span>
                    </div>
                    <div className="service-card-body">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <span className="service-card-link">Voir le détail →</span>
                    </div>
                  </button>
                ))}
              </div>

              {pageCount > 1 && (
                <nav className="pagination" aria-label="Pagination des services">
                  <button
                    type="button"
                    className="pagination-arrow"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    ← Précédent
                  </button>

                  <div className="pagination-pages">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                      <button
                        type="button"
                        key={p}
                        className={`pagination-pill ${p === currentPage ? 'is-active' : ''}`}
                        onClick={() => goToPage(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="pagination-arrow"
                    disabled={currentPage === pageCount}
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Suivant →
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  )
}
