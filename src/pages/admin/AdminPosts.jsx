import EntityManager from './EntityManager.jsx'
import { api, mediaUrl } from '../../lib/api.js'

const fields = [
  { key: 'title', label: 'Titre', type: 'text', required: true },
  { key: 'excerpt', label: 'Résumé (affiché dans la liste)', type: 'textarea' },
  { key: 'content', label: 'Contenu complet', type: 'textarea' },
  { key: 'photo_path', label: 'Photo', type: 'photo' },
  { key: 'published_at', label: 'Date de publication (AAAA-MM-JJ)', type: 'text' },
]

const columns = [
  {
    key: 'photo_path',
    label: '',
    render: (val) =>
      val ? <img src={mediaUrl(val)} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} /> : '—',
  },
  { key: 'title', label: 'Titre' },
  { key: 'published_at', label: 'Publié le' },
]

export default function AdminPosts() {
  return (
    <EntityManager
      title="Blog"
      description="Articles affichés sur la page Blog du site."
      resource={api.posts}
      fields={fields}
      columns={columns}
    />
  )
}
