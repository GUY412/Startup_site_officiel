import { useEffect, useMemo, useState } from 'react'
import { api } from '../../lib/api.js'
import './Admin.css'

const STATUS_LABELS = {
  nouveau: 'Nouveau',
  contacte: 'Contacté',
  archive: 'Archivé',
}

const FILTERS = ['tous', 'nouveau', 'contacte', 'archive']

export default function AdminDashboard() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('tous')
  const [busyId, setBusyId] = useState(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.listDevis()
      setRequests(data)
    } catch (err) {
      setError(err.message || 'Impossible de charger les demandes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(
    () => (filter === 'tous' ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter],
  )

  const counts = useMemo(() => {
    const c = { tous: requests.length, nouveau: 0, contacte: 0, archive: 0 }
    for (const r of requests) c[r.status] = (c[r.status] || 0) + 1
    return c
  }, [requests])

  const handleStatusChange = async (id, status) => {
    setBusyId(id)
    try {
      await api.updateDevisStatus(id, status)
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch (err) {
      setError(err.message || 'Mise à jour impossible.')
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer définitivement cette demande ?')) return
    setBusyId(id)
    try {
      await api.deleteDevis(id)
      setRequests((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      setError(err.message || 'Suppression impossible.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="admin-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`admin-filter ${filter === f ? 'is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'tous' ? 'Tous' : STATUS_LABELS[f]} ({counts[f] || 0})
          </button>
        ))}
        <button type="button" className="admin-refresh" onClick={load} disabled={loading}>
          ↻ Actualiser
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p className="admin-empty">Chargement…</p>
      ) : filtered.length === 0 ? (
        <p className="admin-empty">Aucune demande pour le moment.</p>
      ) : (
        <div className="admin-table-wrap card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Service</th>
                <th>Message</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.created_at.replace(' ', 'T') + 'Z').toLocaleString('fr-FR')}</td>
                  <td>{r.name}</td>
                  <td>
                    <a href={`mailto:${r.email}`}>{r.email}</a>
                  </td>
                  <td>{r.service || '—'}</td>
                  <td className="admin-message-cell">{r.message}</td>
                  <td>
                    <select
                      value={r.status}
                      disabled={busyId === r.id}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-delete"
                      disabled={busyId === r.id}
                      onClick={() => handleDelete(r.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
