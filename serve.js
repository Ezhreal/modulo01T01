import { createServer } from 'http'
import { readFileSync, existsSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 3000
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
  let urlPath = (req.url || '/').split('?')[0].replace(/\/$/, '') || '/'
  let filePath = join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)

  // Um único build funciona em qualquer subpasta: /modulo01/assets/x -> dist/assets/x
  while (!existsSync(filePath) || !statSync(filePath).isFile()) {
    const next = urlPath.replace(/^\/[^/]+/, '')
    if (next === urlPath) break
    urlPath = next || '/'
    filePath = join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)
  }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
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
  console.log(`\n✅ Servidor em http://localhost:${PORT}`)
  console.log(`📁 Pasta: ${DIST_DIR}`)
  console.log(`   Teste em subpasta: http://localhost:${PORT}/modulo01/ ou /modulo01/topico01/\n`)
})
