import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!hasAnimated) {
            setHasAnimated(true)
          }
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin, hasAnimated])

  return [elementRef, isVisible, hasAnimated]
}

export default useIntersectionObserver
