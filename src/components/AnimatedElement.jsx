import React, { useRef, useEffect, useState } from 'react'
import './AnimatedElement.css'

const AnimatedElement = ({ 
  children, 
  animation = 'fadeUp', 
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Para a capa (threshold 0), anima imediatamente após um pequeno delay
    if (threshold === 0) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasAnimated(true)
      }, 100)
      return () => clearTimeout(timer)
    }

    // Pequeno delay para garantir que o elemento está no DOM
    let observer = null
    
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (!hasAnimated) {
              setHasAnimated(true)
            }
            if (once) {
              observer.disconnect()
            }
          } else if (!once) {
            setIsVisible(false)
          }
        },
        {
          threshold: threshold,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      if (element) {
        observer.observe(element)
      }
    }, 50)

    return () => {
      clearTimeout(timer)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [threshold, once, hasAnimated])

  // Aplica as classes diretamente no primeiro filho se for um único elemento
  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: (node) => {
        elementRef.current = node
        if (children.ref) {
          if (typeof children.ref === 'function') {
            children.ref(node)
          } else if (children.ref.current !== undefined) {
            children.ref.current = node
          }
        }
      },
      className: `${children.props.className || ''} animated-element ${animation} ${isVisible ? 'visible' : ''}`.trim(),
      style: {
        ...children.props.style,
        '--animation-delay': `${delay}s`,
        '--animation-duration': `${duration}s`
      }
    })
  }

  // Fallback para múltiplos children
  return (
    <div
      ref={elementRef}
      className={`animated-element ${animation} ${isVisible ? 'visible' : ''}`}
      style={{
        '--animation-delay': `${delay}s`,
        '--animation-duration': `${duration}s`
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedElement
