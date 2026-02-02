import { useState } from 'react'
import './Slide.css'

const Slide = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  if (slides.length === 0) return null

  const currentSlide = slides[currentIndex]

  return (
    <div className="slide-container">
      <div className="slide-content">
        <div className="slide-imagem">
          <img src={currentSlide.image} alt={currentSlide.alt || ''} />
        </div>
        <div className="slide-texto">
          <p
            className="slide-texto-paragrafo font-inter-regular text-20"
            {...(typeof currentSlide.text === 'string'
              ? { dangerouslySetInnerHTML: { __html: currentSlide.text } }
              : {})}
          >
            {typeof currentSlide.text !== 'string' ? currentSlide.text : null}
          </p>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="slide-buttons">
          {currentIndex > 0 && (
            <button className="slide-button slide-button-prev" onClick={goToPrevious}>
              <span className="slide-button-text">ver anterior</span>
              <span className="slide-button-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </span>
            </button>
          )}
          {currentIndex < slides.length - 1 && (
            <button className="slide-button slide-button-next" onClick={goToNext}>
              <span className="slide-button-text">ver próximo</span>
              <span className="slide-button-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Slide
