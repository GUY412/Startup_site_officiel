import EntityManager from './EntityManager.jsx'
import { api } from '../../lib/api.js'

const fields = [
  { key: 'label', label: 'Libellé', type: 'text', required: true, placeholder: 'ex : LinkedIn, Instagram, Catalogue PDF…' },
  {
    key: 'url',
    label: 'URL',
    type: 'text',
    required: true,
    placeholder: 'ex : https://linkedin.com/company/oknok ou /contact',
  },
  {
    key: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { value: 'external', label: 'Externe (réseau social, site partenaire…)' },
      { value: 'internal', label: 'Interne (page du site)' },
    ],
  },
  { key: 'display_order', label: 'Ordre d’affichage', type: 'number' },
]

const columns = [
  { key: 'label', label: 'Libellé' },
  { key: 'url', label: 'URL' },
  { key: 'type', label: 'Type', render: (val) => (val === 'internal' ? 'Interne' : 'Externe') },
  { key: 'display_order', label: 'Ordre' },
]

export default function AdminLinks() {
  return (
    <EntityManager
      title="Liens"
      description="Liens affichés dans le pied de page du site (réseaux sociaux, sites partenaires, pages internes)."
      resource={api.links}
      fields={fields}
      columns={columns}
    />
  )
}
