import { useRef, useEffect, useState } from 'react'
import './AnimatedText.css'

const AnimatedText = ({ 
  children, 
  animation = 'fadeIn',
  delay = 0,
  stagger = 0.1,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Para threshold 0, anima imediatamente
    if (threshold === 0) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasAnimated(true)
      }, 100)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true)
            setHasAnimated(true)
            observer.disconnect()
          }
        },
        {
          threshold: threshold,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      observer.observe(container)

      return () => {
        observer.disconnect()
      }
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [threshold, hasAnimated])

  // Se children não é string (contém JSX), processa de forma diferente
  if (typeof children !== 'string') {
    // Se for um array ou elemento React, renderiza com animação única
    return (
      <span ref={containerRef} className="animated-text-container">
        <span
          className={`animated-text-phrase ${animation} ${isVisible ? 'visible' : ''}`}
          style={{
            '--phrase-delay': `${delay}s`
          }}
        >
          {children}
        </span>
      </span>
    )
  }

  // Processa texto com <br /> tags
  const parts = children.split(/(<br\s*\/?>)/i)
  let wordIndex = 0

  return (
    <span ref={containerRef} className="animated-text-container">
      {parts.map((part, partIndex) => {
        if (part.match(/<br\s*\/?>/i)) {
          return <br key={partIndex} />
        }
        
        // Divide em palavras
        const words = part.split(/(\s+)/)
        return words.map((word, wordIdx) => {
          const currentIndex = wordIndex++
          return (
            <span
              key={`${partIndex}-${wordIdx}`}
              className={`animated-text-phrase ${animation} ${isVisible ? 'visible' : ''}`}
              style={{
                '--phrase-delay': `${delay + (currentIndex * stagger)}s`
              }}
            >
              {word}
            </span>
          )
        })
      })}
    </span>
  )
}

export default AnimatedText
