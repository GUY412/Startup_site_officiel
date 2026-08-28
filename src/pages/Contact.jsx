import { useState } from 'react'
import { mainCategories } from '../data/services.js'
import { api } from '../lib/api.js'
import './Contact.css'

const CONTACT_EMAIL = 'contact@oknok.africa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: mainCategories[0], message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      await api.submitDevis(form)
      setStatus('sent')
      setForm({ name: '', email: '', service: mainCategories[0], message: '' })
    } catch (err) {
      setStatus('error')
      setError(err.message || "Une erreur est survenue. Réessayez ou écrivez-nous directement par email.")
    }
  }

  if (status === 'sent') {
    return (
      <>
        <section className="page-header">
          <div className="container">
            <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>Contact</span>
            <h1>Parlons de votre projet</h1>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="card contact-success">
              <h2>Merci, votre demande a bien été envoyée !</h2>
              <p>Nous revenons vers vous très rapidement à l’adresse indiquée.</p>
              <button type="button" className="btn btn-dark-outline" onClick={() => setStatus('idle')}>
                Envoyer une autre demande
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>Contact</span>
          <h1>Parlons de votre projet</h1>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Restons en contact</h2>
            <p>
              Décrivez-nous votre besoin — cybersécurité, design, communication, marketing ou gestion de
              projet — et nous reviendrons vers vous rapidement avec une proposition adaptée.
            </p>
            <div className="contact-info-item">
              <span className="eyebrow">Email</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>

          <form className="card contact-form" onSubmit={handleSubmit}>
            {status === 'error' && <div className="error-banner">{error}</div>}

            <label>
              Nom complet
              <input type="text" name="name" required value={form.name} onChange={handleChange} />
            </label>

            <label>
              Adresse email
              <input type="email" name="email" required value={form.email} onChange={handleChange} />
            </label>

            <label>
              Service concerné
              <select name="service" value={form.service} onChange={handleChange}>
                {mainCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Votre message
              <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi…' : 'Envoyer la demande'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
