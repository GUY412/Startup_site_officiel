import { useEffect, useState } from 'react'
import './Slideshow.css'

export default function Slideshow({ slides, interval = 4500, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, interval)
    return () => clearInterval(id)
  }, [slides.length, interval])

  if (!slides.length) return null

  return (
    <div className={`slideshow ${className}`}>
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`slideshow-slide ${i === index ? 'is-active' : ''}`}
        />
      ))}

      {slides.length > 1 && (
        <div className="slideshow-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className={`slideshow-dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Voir : ${slide.alt}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
