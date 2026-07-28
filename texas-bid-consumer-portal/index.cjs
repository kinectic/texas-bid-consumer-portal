const http = require('node:http')
const { readFile } = require('node:fs/promises')
const path = require('node:path')

const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 4173)

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.ico', 'image/x-icon'],
  ['.webmanifest', 'application/manifest+json'],
])

async function sendFile(res, filePath, fallback = false) {
  try {
    const data = await readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, {
      'Content-Type': contentTypes.get(ext) || 'application/octet-stream',
      'Cache-Control': fallback ? 'no-cache' : 'public, max-age=31536000, immutable',
    })
    res.end(data)
    return true
  } catch (error) {
    return false
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    const pathname = decodeURIComponent(requestUrl.pathname)
    const safePath = pathname === '/' ? '/index.html' : pathname
    const filePath = path.join(distDir, safePath)

    if (await sendFile(res, filePath)) {
      return
    }

    await sendFile(res, path.join(distDir, 'index.html'), true)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Texas Bid Consumer Portal listening on ${port}`)
})
