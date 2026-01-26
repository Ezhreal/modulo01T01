import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Se o repositório não estiver na raiz do GitHub Pages, 
// descomente e ajuste o base abaixo:
// Exemplo: se o repositório for "usuario/modulos", use base: '/modulos/'
export default defineConfig({
  plugins: [react()],
  base: '/', // Para GitHub Pages na raiz, mantenha '/'
  server: {
    port: 3099,
    open: true
  }
})
