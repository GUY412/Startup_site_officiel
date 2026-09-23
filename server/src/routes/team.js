import { createCrudRouter } from '../crudFactory.js'

export default createCrudRouter({
  table: 'team_members',
  fields: ['name', 'role', 'bio', 'photo_path', 'display_order'],
})
