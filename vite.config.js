import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deve ser o nome do repositório no GitHub (ex.: usuario.github.io/modulo01T01/)
export default defineConfig({
  plugins: [react()],
  base: '/modulo01T01/',
  server: {
    port: 3099,
    open: true
  }
})
