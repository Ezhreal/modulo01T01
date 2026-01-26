import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Se o repositório não estiver na raiz do GitHub Pages, 
// descomente e ajuste o base abaixo:
// Exemplo: se o repositório for "usuario/modulos", use base: '/modulos/'
export default defineConfig({
  plugins: [react()],
  base: '/modulo01T01/', // Nome do repositório no GitHub Pages
  server: {
    port: 3099,
    open: true
  }
})
