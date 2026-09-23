import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import { requireAuth } from '../auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const uploadsDir = path.join(__dirname, '..', '..', 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
const EXT_BY_TYPE = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = EXT_BY_TYPE[file.mimetype] || path.extname(file.originalname) || ''
    cb(null, `${crypto.randomUUID()}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      return cb(new Error('Format d’image non supporté (jpg, png, webp, gif, svg uniquement).'))
    }
    return cb(null, true)
  },
})

const router = Router()

router.post('/', requireAuth, (req, res) => {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier reçu.' })
    }
    return res.status(201).json({ url: `/uploads/${req.file.filename}` })
  })
})

const MAX_DOWNLOAD_BYTES = 5 * 1024 * 1024
const BLOCKED_HOST_PREFIXES = ['localhost', '127.', '0.', '169.254.', '10.', '192.168.']

function isBlockedHost(hostname) {
  const h = hostname.toLowerCase()
  if (h === '::1' || h === '[::1]') return true
  if (BLOCKED_HOST_PREFIXES.some((p) => h.startsWith(p))) return true
  // 172.16.0.0 – 172.31.255.255
  const m = h.match(/^172\.(\d{1,3})\./)
  if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true
  return false
}

// Admin: fetch an image from a URL server-side and store it like an upload,
// so the admin can paste a link instead of uploading a file.
router.post('/from-url', requireAuth, async (req, res) => {
  const { url } = req.body || {}

  let parsed
  try {
    parsed = new URL(String(url || ''))
  } catch {
    return res.status(400).json({ error: 'URL invalide.' })
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return res.status(400).json({ error: 'Seuls les liens http(s) sont acceptés.' })
  }
  if (isBlockedHost(parsed.hostname)) {
    return res.status(400).json({ error: 'Cette adresse n’est pas autorisée.' })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const response = await fetch(parsed, { signal: controller.signal })
    clearTimeout(timeout)

    if (!response.ok) {
      return res.status(400).json({ error: `Le lien a répondu avec le statut ${response.status}.` })
    }

    const contentType = (response.headers.get('content-type') || '').split(';')[0].trim()
    if (!ALLOWED_TYPES.has(contentType)) {
      return res.status(400).json({ error: 'Le lien ne pointe pas vers une image supportée (jpg, png, webp, gif, svg).' })
    }

    const contentLength = Number(response.headers.get('content-length') || 0)
    if (contentLength && contentLength > MAX_DOWNLOAD_BYTES) {
      return res.status(400).json({ error: 'Image trop volumineuse (5 Mo max).' })
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    if (buffer.length > MAX_DOWNLOAD_BYTES) {
      return res.status(400).json({ error: 'Image trop volumineuse (5 Mo max).' })
    }

    const ext = EXT_BY_TYPE[contentType] || path.extname(parsed.pathname) || '.jpg'
    const filename = `${crypto.randomUUID()}${ext}`
    fs.writeFileSync(path.join(uploadsDir, filename), buffer)

    return res.status(201).json({ url: `/uploads/${filename}` })
  } catch (err) {
    clearTimeout(timeout)
    if (err.name === 'AbortError') {
      return res.status(400).json({ error: 'Le téléchargement a pris trop de temps.' })
    }
    return res.status(400).json({ error: 'Impossible de récupérer cette image.' })
  }
})

export default router
