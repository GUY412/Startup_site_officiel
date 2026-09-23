import { useEffect, useState } from 'react'
import { api, mediaUrl } from '../../lib/api.js'
import './EntityManager.css'

const emptyValues = (fields) =>
  Object.fromEntries(fields.map((f) => [f.key, f.type === 'number' ? 0 : '']))

export default function EntityManager({ title, description, resource, fields, columns }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(undefined) // undefined = closed, null = new, id = editing
  const [values, setValues] = useState({})
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState('')
  const [downloadingPhoto, setDownloadingPhoto] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setItems(await resource.list())
    } catch (err) {
      setError(err.message || 'Chargement impossible.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openCreate = () => {
    setEditingId(null)
    setValues(emptyValues(fields))
    setPhotoFile(null)
    setPhotoUrl('')
  }

  const openEdit = (item) => {
    setEditingId(item.id)
    setValues(Object.fromEntries(fields.map((f) => [f.key, item[f.key] ?? ''])))
    setPhotoFile(null)
    setPhotoUrl('')
  }

  const closeForm = () => {
    setEditingId(undefined)
    setPhotoFile(null)
    setPhotoUrl('')
  }

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleDownloadPhoto = async (key) => {
    if (!photoUrl.trim()) return
    setDownloadingPhoto(true)
    setError('')
    try {
      const { url } = await api.uploadPhotoFromUrl(photoUrl.trim())
      handleChange(key, url)
      setPhotoFile(null)
      setPhotoUrl('')
    } catch (err) {
      setError(err.message || 'Téléchargement impossible.')
    } finally {
      setDownloadingPhoto(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = { ...values }

      if (photoFile) {
        const { url } = await api.uploadPhoto(photoFile)
        payload.photo_path = url
      }

      if (editingId === null) {
        await resource.create(payload)
      } else {
        await resource.update(editingId, payload)
      }

      closeForm()
      await load()
    } catch (err) {
      setError(err.message || 'Enregistrement impossible.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer définitivement cet élément ?')) return
    try {
      await resource.remove(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      setError(err.message || 'Suppression impossible.')
    }
  }

  const isFormOpen = editingId !== undefined

  return (
    <div className="entity-manager">
      <div className="entity-manager-head">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {!isFormOpen && (
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + Ajouter
          </button>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      {isFormOpen && (
        <form className="card entity-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.key} className="entity-field">
              {field.label}

              {field.type === 'textarea' && (
                <textarea
                  rows={4}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}

              {field.type === 'select' && (
                <select
                  value={values[field.key] ?? field.options[0].value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'photo' && (
                <div className="entity-photo-field">
                  <div className="entity-photo-row">
                    {values[field.key] && !photoFile && (
                      <img src={mediaUrl(values[field.key])} alt="" className="entity-photo-preview" />
                    )}
                    {photoFile && (
                      <img
                        src={URL.createObjectURL(photoFile)}
                        alt=""
                        className="entity-photo-preview"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setPhotoFile(e.target.files?.[0] || null)
                        setPhotoUrl('')
                      }}
                    />
                  </div>
                  <div className="entity-photo-url-row">
                    <input
                      type="url"
                      placeholder="Ou coller un lien d’image (https://…)"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-dark-outline"
                      disabled={!photoUrl.trim() || downloadingPhoto}
                      onClick={() => handleDownloadPhoto(field.key)}
                    >
                      {downloadingPhoto ? 'Téléchargement…' : 'Télécharger'}
                    </button>
                  </div>
                </div>
              )}

              {(field.type === 'text' || field.type === 'url' || field.type === 'number') && (
                <input
                  type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}
            </label>
          ))}

          <div className="entity-form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button type="button" className="btn btn-dark-outline" onClick={closeForm} disabled={saving}>
              Annuler
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="admin-empty">Chargement…</p>
      ) : items.length === 0 ? (
        <p className="admin-empty">Aucun élément pour le moment.</p>
      ) : (
        <div className="admin-table-wrap card">
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key] === null || item[col.key] === undefined || item[col.key] === ''
                          ? '—'
                          : item[col.key]}
                    </td>
                  ))}
                  <td className="entity-row-actions">
                    <button type="button" className="admin-link-action" onClick={() => openEdit(item)}>
                      Modifier
                    </button>
                    <button type="button" className="admin-delete" onClick={() => handleDelete(item.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
