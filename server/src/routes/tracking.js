import { Router } from 'express'
import { db } from '../db.js'

const router = Router()

router.post('/visit', (req, res) => {
  const { path: visitedPath, referrer } = req.body || {}

  if (!visitedPath || typeof visitedPath !== 'string') {
    return res.status(400).json({ error: 'Le champ path est requis.' })
  }

  db.prepare('INSERT INTO page_visits (path, referrer, user_agent) VALUES (?, ?, ?)').run(
    visitedPath.slice(0, 300),
    referrer ? String(referrer).slice(0, 500) : null,
    (req.headers['user-agent'] || '').slice(0, 300),
  )

  return res.status(204).end()
})

router.post('/click', (req, res) => {
  const { page, label, target } = req.body || {}

  if (!page || typeof page !== 'string') {
    return res.status(400).json({ error: 'Le champ page est requis.' })
  }

  db.prepare('INSERT INTO click_events (page, label, target) VALUES (?, ?, ?)').run(
    page.slice(0, 300),
    label ? String(label).slice(0, 200) : null,
    target ? String(target).slice(0, 500) : null,
  )

  return res.status(204).end()
})

export default router
