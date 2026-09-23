import { createCrudRouter } from '../crudFactory.js'

export default createCrudRouter({
  table: 'services',
  fields: ['icon', 'title', 'description', 'items', 'tools', 'photo_path', 'display_order'],
})
