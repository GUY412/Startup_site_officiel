import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { db } from '../src/db.js'

const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD || ''

if (!email || !password) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env before running this script.')
  process.exit(1)
}

if (password.length < 8) {
  console.error('ADMIN_PASSWORD must be at least 8 characters.')
  process.exit(1)
}

const passwordHash = bcrypt.hashSync(password, 10)

const existing = db.prepare('SELECT id FROM admins WHERE email = ?').get(email)

if (existing) {
  db.prepare('UPDATE admins SET password_hash = ? WHERE email = ?').run(passwordHash, email)
  console.log(`Admin account updated: ${email}`)
} else {
  db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(email, passwordHash)
  console.log(`Admin account created: ${email}`)
}
