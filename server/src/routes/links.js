import { createCrudRouter } from '../crudFactory.js'

export default createCrudRouter({
  table: 'site_links',
  fields: ['label', 'url', 'type', 'display_order'],
})
