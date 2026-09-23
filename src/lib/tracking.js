import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from './api.js'

function getClickLabel(el) {
  const text = el.getAttribute('aria-label') || el.textContent || ''
  return text.replace(/\s+/g, ' ').trim().slice(0, 120) || null
}

// Tracks page visits on route change and clicks on links/buttons site-wide.
// Admin routes are excluded — we only care about visitor behaviour on the public site.
export function useSiteTracking() {
  const location = useLocation()
  const firstRun = useRef(true)

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return
    api.trackVisit(location.pathname, firstRun.current ? document.referrer : window.location.href)
    firstRun.current = false
  }, [location.pathname])

  useEffect(() => {
    const handleClick = (event) => {
      if (window.location.pathname.startsWith('/admin')) return

      const el = event.target.closest('a, button')
      if (!el) return

      const target = el.tagName === 'A' ? el.getAttribute('href') : null
      api.trackClick(window.location.pathname, getClickLabel(el), target)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])
}
