import React from 'react'
import './NumberCircle.css'

const NumberCircle = React.forwardRef(({ number, color = 'var(--cor-azul)', borderColor }, ref) => {
  const finalBorderColor = borderColor || color
  return (
    <div 
      ref={ref}
      className="number-circle"
      style={{
        '--circle-color': color,
        '--circle-border-color': finalBorderColor,
      }}
    >
      <span className="number-circle-text">{String(number).padStart(2, '0')}</span>
    </div>
  )
})

NumberCircle.displayName = 'NumberCircle'

export default NumberCircle
