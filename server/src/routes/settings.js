import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

// Public: the site reads all settings as a flat { key: value } object.
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM site_settings').all()
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  res.json(settings)
})

// Admin: upsert any number of key/value pairs in one call.
router.put('/', requireAuth, (req, res) => {
  const body = req.body || {}
  const entries = Object.entries(body)

  if (entries.length === 0) {
    return res.status(400).json({ error: 'Aucun paramètre fourni.' })
  }

  const stmt = db.prepare(
    `INSERT INTO site_settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  )
  for (const [key, value] of entries) {
    stmt.run(key, value == null ? '' : String(value))
  }

  const rows = db.prepare('SELECT key, value FROM site_settings').all()
  return res.json(Object.fromEntries(rows.map((r) => [r.key, r.value])))
})

export default router
