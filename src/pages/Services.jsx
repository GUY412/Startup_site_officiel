import { Link } from 'react-router-dom'
import { serviceCategories } from '../data/services.js'
import { ServiceIcon } from '../components/icons.jsx'
import './Services.css'

export default function Services() {
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
          <div className="services-list">
            {serviceCategories.map((service) => (
              <div className="card service-block" key={service.title}>
                <div className="service-block-header">
                  <span className="service-block-icon">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>
                </div>

                <ul className="service-items">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {service.tools && (
                  <div className="service-tools">
                    {service.tools.map((tool) => (
                      <span className="badge" key={tool}>
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="home-services-cta">
            <Link to="/contact" className="btn btn-primary">
              Discuter de votre projet
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
