import { useState } from 'react'
import './Accordion.css'

const Accordion = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleItem(index)}
          >
            <span>{item.title}</span>
            <span className="accordion-icon">{activeIndex === index ? '−' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="accordion-content">
              <div className="accordion-body">{item.content}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Accordion
