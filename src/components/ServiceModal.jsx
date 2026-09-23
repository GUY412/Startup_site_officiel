import { useEffect } from 'react'
import { mediaUrl, toList } from '../lib/api.js'
import { ServiceIcon } from './icons.jsx'
import './ServiceModal.css'

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!service) return null

  const items = toList(service.items)
  const tools = toList(service.tools)

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="service-modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        <div className="service-modal-media">
          {service.photo_path ? (
            <img src={mediaUrl(service.photo_path)} alt={service.title} />
          ) : (
            <div className="service-modal-media-placeholder">
              <ServiceIcon name={service.icon} />
            </div>
          )}
        </div>

        <div className="service-modal-body">
          <span className="service-modal-icon">
            <ServiceIcon name={service.icon} />
          </span>
          <h2>{service.title}</h2>
          <p className="service-modal-description">{service.description}</p>

          {items.length > 0 && (
            <>
              <h4>Ce que nous faisons</h4>
              <ul className="service-modal-items">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {tools.length > 0 && (
            <>
              <h4>Outils</h4>
              <div className="service-modal-tools">
                {tools.map((tool) => (
                  <span className="service-modal-tool" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
