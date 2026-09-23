import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

router.get('/', requireAuth, (req, res) => {
  const totalVisits = db.prepare('SELECT COUNT(*) AS n FROM page_visits').get().n
  const visits7d = db
    .prepare("SELECT COUNT(*) AS n FROM page_visits WHERE created_at >= datetime('now', '-7 days')")
    .get().n
  const visits30d = db
    .prepare("SELECT COUNT(*) AS n FROM page_visits WHERE created_at >= datetime('now', '-30 days')")
    .get().n

  const topPages = db
    .prepare(
      'SELECT path, COUNT(*) AS count FROM page_visits GROUP BY path ORDER BY count DESC LIMIT 20',
    )
    .all()

  const dailyVisits = db
    .prepare(
      `SELECT date(created_at) AS day, COUNT(*) AS count
       FROM page_visits
       WHERE created_at >= datetime('now', '-14 days')
       GROUP BY day
       ORDER BY day ASC`,
    )
    .all()

  const recentVisits = db
    .prepare('SELECT * FROM page_visits ORDER BY created_at DESC LIMIT 100')
    .all()

  const totalClicks = db.prepare('SELECT COUNT(*) AS n FROM click_events').get().n

  const topClicks = db
    .prepare(
      `SELECT label, target, COUNT(*) AS count
       FROM click_events
       GROUP BY label, target
       ORDER BY count DESC
       LIMIT 20`,
    )
    .all()

  const recentClicks = db
    .prepare('SELECT * FROM click_events ORDER BY created_at DESC LIMIT 100')
    .all()

  return res.json({
    totalVisits,
    visits7d,
    visits30d,
    topPages,
    dailyVisits,
    recentVisits,
    totalClicks,
    topClicks,
    recentClicks,
  })
})

export default router
