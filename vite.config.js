import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base relativo: um único build funciona em qualquer caminho
// (raiz, /modulo01/, /modulo01/topico01/, etc.). O cliente só sobe a pasta.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3099,
    open: true
  }
})
