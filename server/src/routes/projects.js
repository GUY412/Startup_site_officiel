import { createCrudRouter } from '../crudFactory.js'

export default createCrudRouter({
  table: 'projects',
  fields: ['title', 'category', 'description', 'photo_path', 'link', 'display_order'],
})
