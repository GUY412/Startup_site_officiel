import { useEffect, useState } from 'react'
import { api, mediaUrl } from '../lib/api.js'
import './Blog.css'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.posts
      .list()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

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
          {loading ? (
            <p className="blog-empty">Chargement…</p>
          ) : posts.length === 0 ? (
            <p className="blog-empty">Aucun article pour le moment.</p>
          ) : (
            <div className="blog-list">
              {posts.map((post) => (
                <article className="card blog-card" key={post.id}>
                  {post.photo_path && (
                    <img className="blog-card-img" src={mediaUrl(post.photo_path)} alt="" />
                  )}
                  <div className="blog-card-body">
                    {post.published_at && <span className="badge">{post.published_at.slice(0, 10)}</span>}
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
