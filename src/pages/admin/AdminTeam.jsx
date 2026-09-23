import EntityManager from './EntityManager.jsx'
import { api, mediaUrl } from '../../lib/api.js'

const fields = [
  { key: 'name', label: 'Nom', type: 'text', required: true },
  { key: 'role', label: 'Rôle', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
  { key: 'photo_path', label: 'Photo', type: 'photo' },
  { key: 'display_order', label: 'Ordre d’affichage', type: 'number' },
]

const columns = [
  {
    key: 'photo_path',
    label: '',
    render: (val) =>
      val ? <img src={mediaUrl(val)} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} /> : '—',
  },
  { key: 'name', label: 'Nom' },
  { key: 'role', label: 'Rôle' },
  { key: 'display_order', label: 'Ordre' },
]

export default function AdminTeam() {
  return (
    <EntityManager
      title="Équipe"
      description="Membres affichés sur la page À propos, avec photo et bio."
      resource={api.team}
      fields={fields}
      columns={columns}
    />
  )
}
