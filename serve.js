import { createServer } from 'http'
import { readFileSync, existsSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = 3000
const DIST_DIR = join(__dirname, 'dist')

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4'
}

const server = createServer((req, res) => {
  let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url)
  
  // Remove query string
  filePath = filePath.split('?')[0]
  
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    // Se não encontrar, tenta index.html (para rotas do React Router)
    filePath = join(DIST_DIR, 'index.html')
  }
  
  try {
    const ext = extname(filePath).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'
    
    const content = readFileSync(filePath)
    
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content)
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>404 - Arquivo não encontrado</h1>')
  }
})

server.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em: http://localhost:${PORT}`)
  console.log(`📁 Servindo arquivos de: ${DIST_DIR}`)
  console.log(`\n💡 Para compartilhar, use seu IP local ou um serviço como ngrok\n`)
})
