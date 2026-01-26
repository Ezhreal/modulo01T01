import './DecorativeOverlay.css'

const DecorativeOverlay = ({ lines = [], stars = [] }) => {
  return (
    <div className="decorative-overlay">
      {/* Linhas */}
      {lines.map((line, index) => {
        const isHorizontal = line.type === 'horizontal'
        const style = {
          position: 'absolute',
          backgroundColor: line.color || 'var(--cor-azul)',
          zIndex: line.zIndex || 10,
          pointerEvents: 'none',
        }

        if (isHorizontal) {
          style.top = line.position || '0'
          style.left = line.left || '0'
          style.width = line.width || '100%'
          style.height = line.height || '2px'
        } else {
          style.top = line.top || '0'
          style.width = line.width || '2px'
          style.height = line.height || '100%'
          
          // Para linhas verticais, se tiver containerWidth, calcula posição relativa ao container centralizado
          if (line.containerWidth) {
            const containerWidth = parseInt(line.containerWidth)
            const positionPercent = parseFloat(line.position) / 100
            // Calcula: 50% (centro) - metade do container + posição percentual do container
            style.left = `calc(50% - ${containerWidth / 2}px + ${containerWidth * positionPercent}px)`
          } else {
            style.left = line.position || '0'
          }
        }

        return (
          <div
            key={`line-${index}`}
            className="decorative-line"
            style={style}
          />
        )
      })}

      {/* Estrelinhas */}
      {stars.map((star, index) => {
        const style = {
          position: 'absolute',
          zIndex: star.zIndex || 10,
          pointerEvents: 'none',
          ...star.position,
        }

        return (
          <div
            key={`star-${index}`}
            className="decorative-star"
            style={style}
          >
            {star.image ? (
              <img src={star.image} alt="Star" />
            ) : (
              <div className="star-shape" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DecorativeOverlay
