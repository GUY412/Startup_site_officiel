import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import './db.js'
import authRoutes from './routes/auth.js'
import devisRoutes from './routes/devis.js'
import teamRoutes from './routes/team.js'
import projectsRoutes from './routes/projects.js'
import linksRoutes from './routes/links.js'
import postsRoutes from './routes/posts.js'
import uploadsRoutes, { uploadsDir } from './routes/uploads.js'
import trackingRoutes from './routes/tracking.js'
import analyticsRoutes from './routes/analytics.js'
import servicesRoutes from './routes/services.js'
import settingsRoutes from './routes/settings.js'

const app = express()
const PORT = process.env.PORT || 4001
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin/non-browser requests (no Origin header) and configured origins.
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('Origin non autorisée par CORS.'))
    },
  }),
)
app.use(express.json({ limit: '100kb' }))
app.use('/uploads', express.static(uploadsDir))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/devis', devisRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/links', linksRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/uploads', uploadsRoutes)
app.use('/api/track', trackingRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/settings', settingsRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable.' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Erreur serveur.' })
})

app.listen(PORT, () => {
  console.log(`OKNOK API listening on http://localhost:${PORT}`)
})
