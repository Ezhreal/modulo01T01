import { useState } from 'react'
import './CardFlip.css'

const CardFlip = ({ front, back, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={`card-flip ${isFlipped ? 'flipped' : ''} ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-flip-inner">
        <div className="card-flip-front">
          {front}
        </div>
        <div className="card-flip-back">
          {back}
        </div>
      </div>
    </div>
  )
}

export default CardFlip
