import { Router } from 'express'
import { db } from './db.js'
import { requireAuth } from './auth.js'

// Builds a small public-read / admin-write REST router over a single table.
// `fields` lists the writable columns (order matters only for readability);
// values are always bound via parameterized SQL, never interpolated.
export function createCrudRouter({ table, fields, orderBy = 'display_order ASC, id ASC' }) {
  const router = Router()

  router.get('/', (req, res) => {
    const rows = db.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy}`).all()
    res.json(rows)
  })

  router.post('/', requireAuth, (req, res) => {
    const body = req.body || {}
    const columns = fields.filter((f) => f in body)

    if (columns.length === 0) {
      return res.status(400).json({ error: 'Aucun champ valide fourni.' })
    }

    const placeholders = columns.map(() => '?').join(', ')
    const stmt = db.prepare(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
    )
    const result = stmt.run(...columns.map((c) => body[c] ?? null))
    const created = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(Number(result.lastInsertRowid))
    return res.status(201).json(created)
  })

  router.put('/:id', requireAuth, (req, res) => {
    const body = req.body || {}
    const columns = fields.filter((f) => f in body)

    if (columns.length === 0) {
      return res.status(400).json({ error: 'Aucun champ valide fourni.' })
    }

    const setClause = columns.map((c) => `${c} = ?`).join(', ')
    const stmt = db.prepare(`UPDATE ${table} SET ${setClause} WHERE id = ?`)
    const result = stmt.run(...columns.map((c) => body[c] ?? null), Number(req.params.id))

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Élément introuvable.' })
    }

    const updated = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(Number(req.params.id))
    return res.json(updated)
  })

  router.delete('/:id', requireAuth, (req, res) => {
    const result = db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(Number(req.params.id))
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Élément introuvable.' })
    }
    return res.status(204).end()
  })

  return router
}
