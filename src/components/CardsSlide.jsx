import React, { useState, useEffect } from 'react'
import CardFlip from './CardFlip'
import Slide from './Slide'
import './CardsSlide.css'

const CardsSlide = React.forwardRef(({ cards }, ref) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // No mobile, transforma em slide
  if (isMobile) {
    // Converte cards para formato de slide
    const slides = cards.map((card) => {
      // Extrai a imagem do front (JSX img)
      let image = null
      if (card.front && card.front.props && card.front.props.src) {
        image = card.front.props.src
      }
      
      // Extrai o texto do back (JSX p)
      let text = ''
      if (card.back && card.back.props && card.back.props.children) {
        const children = card.back.props.children
        if (typeof children === 'string') {
          text = children
        } else if (children && children.props && children.props.children) {
          text = children.props.children
        }
      }

      return {
        image: image,
        text: text
      }
    }).filter(slide => slide.image && slide.text) // Remove slides inválidos

    return (
      <div className="tela14-cards-mobile-slide">
        <Slide slides={slides} />
      </div>
    )
  }

  // No desktop, mostra os cards normalmente
  return (
    <div className="tela14-cards">
      <div className="tela14-cards-linha-1">
        {cards.slice(0, 3).map((card, index) => (
          <CardFlip
            key={index}
            front={card.front}
            back={card.back}
            className="tela14-card"
          />
        ))}
      </div>
      <div className="tela14-cards-linha-2">
        {cards.slice(3, 5).map((card, index) => (
          <CardFlip
            key={index + 3}
            front={card.front}
            back={card.back}
            className="tela14-card"
          />
        ))}
      </div>
    </div>
  )
})

CardsSlide.displayName = 'CardsSlide'

export default CardsSlide
