import { useEffect } from 'react'
import './Menu.css'

const Menu = ({ isOpen, onClose, currentTela }) => {
  // Previne scroll do body quando menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const telas = [
    { id: 'tela01', numero: 1, titulo: 'Capa' },
    { id: 'tela02', numero: 2, titulo: 'Conhecendo a história de Gailhac' },
    { id: 'tela03', numero: 3, titulo: 'Vídeo' },
    { id: 'tela04', numero: 4, titulo: 'Eu, Gailhac (criança)' },
    { id: 'tela05', numero: 5, titulo: 'Citação' },
    { id: 'tela06', numero: 6, titulo: 'Imagem e Textos' },
    { id: 'tela07', numero: 7, titulo: 'Eu, Gailhac (Jovem)' },
    { id: 'tela08', numero: 8, titulo: 'Três Colunas' },
    { id: 'tela09', numero: 9, titulo: 'Accordions' },
    { id: 'tela10', numero: 10, titulo: 'Citação e Box Azul' },
    { id: 'tela11', numero: 11, titulo: 'Eu, Gailhac (idoso)' },
    { id: 'tela12', numero: 12, titulo: 'Três Colunas e Imagem' },
    { id: 'tela13', numero: 13, titulo: 'Conteúdo Completo' },
    { id: 'tela14', numero: 14, titulo: 'Flip Cards' },
    { id: 'tela15', numero: 15, titulo: 'Slide' },
    { id: 'tela16', numero: 16, titulo: 'Três Colunas' },
    { id: 'tela17', numero: 17, titulo: 'Final' },
  ]

  const handleMenuClick = (telaId) => {
    const element = document.getElementById(telaId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay escuro */}
      <div className="menu-overlay" onClick={onClose}></div>
      
      {/* Menu lateral */}
      <nav className={`menu-sidebar ${isOpen ? 'menu-open' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-title">Menu</h2>
          <button className="menu-close" onClick={onClose} aria-label="Fechar menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <ul className="menu-list">
          {telas.map((tela, index) => (
            <li key={tela.id} className="menu-item">
              <button
                className={`menu-link ${currentTela === tela.numero ? 'menu-link-active' : ''}`}
                onClick={() => handleMenuClick(tela.id)}
              >
                <span className="menu-link-numero">{tela.numero}</span>
                <span className="menu-link-titulo">{tela.titulo}</span>
              </button>
              {index < telas.length - 1 && <div className="menu-divider"></div>}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Menu
