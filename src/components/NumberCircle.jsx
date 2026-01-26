import './NumberCircle.css'

const NumberCircle = ({ number, color = 'var(--cor-azul)', borderColor }) => {
  const finalBorderColor = borderColor || color
  return (
    <div 
      className="number-circle"
      style={{
        '--circle-color': color,
        '--circle-border-color': finalBorderColor,
      }}
    >
      <span className="number-circle-text">{String(number).padStart(2, '0')}</span>
    </div>
  )
}

export default NumberCircle
