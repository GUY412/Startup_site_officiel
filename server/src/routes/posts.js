import { createCrudRouter } from '../crudFactory.js'

export default createCrudRouter({
  table: 'blog_posts',
  fields: ['title', 'excerpt', 'content', 'photo_path', 'published_at'],
  orderBy: 'published_at DESC, id DESC',
})
