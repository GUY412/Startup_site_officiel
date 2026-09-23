import EntityManager from './EntityManager.jsx'
import { api } from '../../lib/api.js'
import { ServiceIcon, ICONS } from '../../components/icons.jsx'

const iconOptions = Object.keys(ICONS).map((key) => ({ value: key, label: key }))

const fields = [
  { key: 'title', label: 'Titre', type: 'text', required: true },
  { key: 'icon', label: 'Icône', type: 'select', options: iconOptions },
  { key: 'photo_path', label: 'Photo d’illustration', type: 'photo' },
  { key: 'description', label: 'Description courte', type: 'textarea' },
  { key: 'items', label: 'Prestations (une par ligne)', type: 'textarea' },
  { key: 'tools', label: 'Outils (un par ligne, optionnel)', type: 'textarea' },
  { key: 'display_order', label: 'Ordre d’affichage', type: 'number' },
]

const columns = [
  {
    key: 'icon',
    label: '',
    render: (val) => (
      <span style={{ display: 'inline-flex', color: 'var(--color-accent)' }}>
        <ServiceIcon name={val} />
      </span>
    ),
  },
  { key: 'title', label: 'Titre' },
  { key: 'display_order', label: 'Ordre' },
]

export default function AdminServices() {
  return (
    <EntityManager
      title="Services"
      description="Domaines d'expertise affichés sur la page Services et en aperçu sur l'accueil."
      resource={api.services}
      fields={fields}
      columns={columns}
    />
  )
}
