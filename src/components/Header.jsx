import { useState } from 'react'
import logoImage from '../assets/images/icon-header-logo.png'
import Menu from './Menu'
import { useAudioContext } from '../contexts/AudioContext'
import './Header.css'

const Header = ({ currentTela }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isGlobalMuted, toggleMute } = useAudioContext()

  const handleAudioToggle = () => {
    toggleMute()
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img src={logoImage} alt="Logo" />
        </div>

        {/* Botões */}
        <div className="header-buttons">
          {/* Botão Menu */}
          <button 
            className="header-button"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <div className="header-button-circle">
              <div className="header-button-inner">
                <svg 
                  className="header-icon" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  {isMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </div>
            </div>
          </button>

          {/* Botão Mute/Som */}
          <button 
            className="header-button"
            onClick={handleAudioToggle}
            aria-label={isGlobalMuted ? "Ativar som" : "Desativar som"}
          >
            <div className="header-button-circle">
              <div className="header-button-inner">
                <svg 
                  className="header-icon" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  {isGlobalMuted ? (
                    <>
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </>
                  ) : (
                    <>
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </>
                  )}
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      
      {/* Menu lateral */}
      <Menu isOpen={isMenuOpen} onClose={closeMenu} currentTela={currentTela} />
    </header>
  )
}

export default Header
