import { posts } from '../data/posts.js'
import './Blog.css'

export default function Blog() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>Blog</span>
          <h1>Actualités & réflexions</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-list">
            {posts.map((post) => (
              <article className="card blog-card" key={post.title}>
                <span className="badge">{post.date}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
