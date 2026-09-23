import EntityManager from './EntityManager.jsx'
import { api, mediaUrl } from '../../lib/api.js'

const fields = [
  { key: 'title', label: 'Titre', type: 'text', required: true },
  { key: 'category', label: 'Catégorie', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'photo_path', label: 'Photo', type: 'photo' },
  { key: 'link', label: 'Lien (étude de cas, site du client…)', type: 'url' },
  { key: 'display_order', label: 'Ordre d’affichage', type: 'number' },
]

const columns = [
  {
    key: 'photo_path',
    label: '',
    render: (val) =>
      val ? <img src={mediaUrl(val)} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} /> : '—',
  },
  { key: 'title', label: 'Titre' },
  { key: 'category', label: 'Catégorie' },
  { key: 'display_order', label: 'Ordre' },
]

export default function AdminProjects() {
  return (
    <EntityManager
      title="Réalisations"
      description="Projets affichés sur la page Portfolio et en aperçu sur l’accueil."
      resource={api.projects}
      fields={fields}
      columns={columns}
    />
  )
}
