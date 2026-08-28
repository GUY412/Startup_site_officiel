import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()
const VALID_STATUSES = ['nouveau', 'contacte', 'archive']

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// Public: submit a quote request from the site's contact form.
router.post('/', (req, res) => {
  const { name, email, service, message } = req.body || {}

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Le nom est requis.' })
  }
  if (!email || !isEmail(String(email).trim())) {
    return res.status(400).json({ error: 'Une adresse email valide est requise.' })
  }
  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: 'Le message est requis.' })
  }

  const stmt = db.prepare(
    'INSERT INTO devis_requests (name, email, service, message) VALUES (?, ?, ?, ?)',
  )
  const result = stmt.run(
    String(name).trim().slice(0, 200),
    String(email).trim().slice(0, 200),
    service ? String(service).trim().slice(0, 200) : null,
    String(message).trim().slice(0, 5000),
  )

  return res.status(201).json({ id: Number(result.lastInsertRowid) })
})

// Admin: list all requests, newest first.
router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM devis_requests ORDER BY created_at DESC').all()
  return res.json(rows)
})

// Admin: update a request's status.
router.patch('/:id', requireAuth, (req, res) => {
  const { status } = req.body || {}
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Statut invalide. Valeurs possibles : ${VALID_STATUSES.join(', ')}.` })
  }

  const result = db
    .prepare('UPDATE devis_requests SET status = ? WHERE id = ?')
    .run(status, Number(req.params.id))

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Demande introuvable.' })
  }

  return res.json({ ok: true })
})

// Admin: delete a request.
router.delete('/:id', requireAuth, (req, res) => {
  const result = db.prepare('DELETE FROM devis_requests WHERE id = ?').run(Number(req.params.id))

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Demande introuvable.' })
  }

  return res.status(204).end()
})

export default router
