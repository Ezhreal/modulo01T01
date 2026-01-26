import { useState } from 'react'
import './Tabs.css'

const Tabs = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="tabs">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tabs-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs[activeTab] && (
          <div className="tabs-panel">
            {tabs[activeTab].content}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tabs
