import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import './db.js'
import authRoutes from './routes/auth.js'
import devisRoutes from './routes/devis.js'

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

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/devis', devisRoutes)

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
