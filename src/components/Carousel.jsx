import { useState, useEffect } from 'react'
import './Carousel.css'

const Carousel = ({ items = [], autoPlay = false, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoPlay && items.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
      }, interval)
      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, items.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (items.length === 0) return null

  return (
    <div className="carousel">
      <div className="carousel-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button className="carousel-button carousel-button-prev" onClick={goToPrevious}>
            ‹
          </button>
          <button className="carousel-button carousel-button-next" onClick={goToNext}>
            ›
          </button>

          <div className="carousel-indicators">
            {items.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Carousel
