import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import './EntityManager.css'

const GROUPS = [
  {
    title: 'Accueil',
    fields: [
      { key: 'home_hero_eyebrow', label: 'Étiquette au-dessus du grand titre', type: 'text' },
      {
        key: 'home_hero_title',
        label: 'Grand titre (une ligne par phrase)',
        type: 'textarea',
        rows: 3,
      },
      { key: 'home_hero_lead', label: 'Texte d’introduction', type: 'textarea' },
      {
        key: 'main_categories',
        label: 'Étiquettes de domaines (une par ligne — aussi utilisées dans le formulaire de devis)',
        type: 'textarea',
      },
    ],
  },
  {
    title: 'À propos',
    fields: [
      { key: 'about_lead', label: 'Paragraphe d’introduction', type: 'textarea' },
      { key: 'about_mission', label: 'Mission', type: 'textarea' },
      { key: 'about_description', label: 'Description de l’équipe', type: 'textarea' },
      { key: 'about_vision', label: 'Vision', type: 'textarea' },
      { key: 'soft_skills', label: 'Compétences transversales (une par ligne)', type: 'textarea' },
    ],
  },
  {
    title: 'Contact',
    fields: [
      { key: 'contact_email', label: 'Adresse email de contact', type: 'text' },
      { key: 'contact_intro', label: 'Texte d’introduction', type: 'textarea' },
    ],
  },
  {
    title: 'Pied de page',
    fields: [{ key: 'footer_description', label: 'Description de la société', type: 'textarea' }],
  },
]

export default function AdminSettings() {
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.settings
      .get()
      .then(setValues)
      .catch((err) => setError(err.message || 'Chargement impossible.'))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (key, value) => {
    setSaved(false)
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await api.settings.update(values)
      setSaved(true)
    } catch (err) {
      setError(err.message || 'Enregistrement impossible.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-empty">Chargement…</p>

  return (
    <div className="entity-manager">
      <div className="entity-manager-head">
        <div>
          <h2>Paramètres du site</h2>
          <p>Textes affichés sur les pages publiques (accueil, à propos, contact, pied de page).</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {saved && <div className="settings-saved">Enregistré.</div>}

      <form className="card entity-form" onSubmit={handleSubmit}>
        {GROUPS.map((group) => (
          <fieldset key={group.title} className="settings-group">
            <legend>{group.title}</legend>
            {group.fields.map((field) => (
              <label key={field.key} className="entity-field">
                {field.label}
                {field.type === 'textarea' ? (
                  <textarea
                    rows={field.rows || 4}
                    value={values[field.key] ?? ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    value={values[field.key] ?? ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )}
              </label>
            ))}
          </fieldset>
        ))}

        <div className="entity-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer les paramètres'}
          </button>
        </div>
      </form>
    </div>
  )
}
