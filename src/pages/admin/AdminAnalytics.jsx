import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import './EntityManager.css'
import './AdminAnalytics.css'

function formatDate(value) {
  return new Date(value.replace(' ', 'T') + 'Z').toLocaleString('fr-FR')
}

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setData(await api.getAnalytics())
    } catch (err) {
      setError(err.message || 'Chargement impossible.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p className="admin-empty">Chargement…</p>
  if (error) return <div className="error-banner">{error}</div>
  if (!data) return null

  const maxDaily = Math.max(1, ...data.dailyVisits.map((d) => d.count))

  return (
    <div className="entity-manager">
      <div className="entity-manager-head">
        <div>
          <h2>Statistiques</h2>
          <p>Visites et clics enregistrés sur le site public.</p>
        </div>
        <button type="button" className="btn btn-dark-outline" onClick={load}>
          ↻ Actualiser
        </button>
      </div>

      <div className="analytics-cards">
        <div className="card analytics-card">
          <span className="analytics-card-value">{data.totalVisits}</span>
          <span className="analytics-card-label">Visites au total</span>
        </div>
        <div className="card analytics-card">
          <span className="analytics-card-value">{data.visits7d}</span>
          <span className="analytics-card-label">7 derniers jours</span>
        </div>
        <div className="card analytics-card">
          <span className="analytics-card-value">{data.visits30d}</span>
          <span className="analytics-card-label">30 derniers jours</span>
        </div>
        <div className="card analytics-card">
          <span className="analytics-card-value">{data.totalClicks}</span>
          <span className="analytics-card-label">Clics au total</span>
        </div>
      </div>

      <div className="card analytics-chart">
        <h3>Visites — 14 derniers jours</h3>
        {data.dailyVisits.length === 0 ? (
          <p className="admin-empty">Aucune visite récente.</p>
        ) : (
          <div className="analytics-bars">
            {data.dailyVisits.map((d) => (
              <div key={d.day} className="analytics-bar-col" title={`${d.day} : ${d.count} visite(s)`}>
                <div className="analytics-bar" style={{ height: `${(d.count / maxDaily) * 100}%` }} />
                <span className="analytics-bar-label">{d.day.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="analytics-two-col">
        <div className="admin-table-wrap card">
          <h3 className="analytics-table-title">Pages les plus visitées</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Visites</th>
              </tr>
            </thead>
            <tbody>
              {data.topPages.length === 0 ? (
                <tr>
                  <td colSpan={2} className="admin-empty">
                    Aucune donnée.
                  </td>
                </tr>
              ) : (
                data.topPages.map((p) => (
                  <tr key={p.path}>
                    <td>{p.path}</td>
                    <td>{p.count}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-table-wrap card">
          <h3 className="analytics-table-title">Clics les plus fréquents</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Élément</th>
                <th>Vers</th>
                <th>Clics</th>
              </tr>
            </thead>
            <tbody>
              {data.topClicks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="admin-empty">
                    Aucune donnée.
                  </td>
                </tr>
              ) : (
                data.topClicks.map((c) => (
                  <tr key={`${c.label}-${c.target}`}>
                    <td>{c.label || '—'}</td>
                    <td>{c.target || '—'}</td>
                    <td>{c.count}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-table-wrap card">
        <h3 className="analytics-table-title">Dernières visites</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Page</th>
              <th>Provenance</th>
              <th>Navigateur</th>
            </tr>
          </thead>
          <tbody>
            {data.recentVisits.length === 0 ? (
              <tr>
                <td colSpan={4} className="admin-empty">
                  Aucune visite pour le moment.
                </td>
              </tr>
            ) : (
              data.recentVisits.map((v) => (
                <tr key={v.id}>
                  <td>{formatDate(v.created_at)}</td>
                  <td>{v.path}</td>
                  <td className="analytics-ellipsis">{v.referrer || '—'}</td>
                  <td className="analytics-ellipsis">{v.user_agent || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-table-wrap card">
        <h3 className="analytics-table-title">Derniers clics</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Page</th>
              <th>Élément cliqué</th>
              <th>Vers</th>
            </tr>
          </thead>
          <tbody>
            {data.recentClicks.length === 0 ? (
              <tr>
                <td colSpan={4} className="admin-empty">
                  Aucun clic pour le moment.
                </td>
              </tr>
            ) : (
              data.recentClicks.map((c) => (
                <tr key={c.id}>
                  <td>{formatDate(c.created_at)}</td>
                  <td>{c.page}</td>
                  <td>{c.label || '—'}</td>
                  <td className="analytics-ellipsis">{c.target || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
