import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { db } from '../db.js'
import { signToken } from '../auth.js'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' })
  }

  const admin = db
    .prepare('SELECT * FROM admins WHERE email = ?')
    .get(String(email).trim().toLowerCase())

  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Identifiants invalides.' })
  }

  const token = signToken(admin)
  return res.json({ token, admin: { id: admin.id, email: admin.email } })
})

export default router
