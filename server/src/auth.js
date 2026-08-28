import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set. Copy .env.example to .env and configure it.')
}

export function signToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Authentification requise.' })
  }

  try {
    req.admin = jwt.verify(token, JWT_SECRET)
    return next()
  } catch {
    return res.status(401).json({ error: 'Session invalide ou expirée.' })
  }
}
