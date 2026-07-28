import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { execSync } from 'node:child_process'

const root = resolve(dirname(new URL(import.meta.url).pathname), '..')
const appDir = join(root, 'texas-bid-consumer-portal')
const distDir = join(root, 'dist')
const appDistDir = join(appDir, 'dist')

execSync('npm --prefix texas-bid-consumer-portal ci', {
  cwd: root,
  stdio: 'inherit',
})

execSync('npm --prefix texas-bid-consumer-portal run build', {
  cwd: root,
  stdio: 'inherit',
})

rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })
cpSync(appDistDir, distDir, { recursive: true })

mkdirSync(join(distDir, 'server'), { recursive: true })
writeFileSync(
  join(distDir, 'server', 'index.js'),
  `import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const distRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

function sendFile(response, filePath) {
  const type = mimeTypes[extname(filePath)] ?? 'application/octet-stream'
  response.writeHead(200, { 'content-type': type })
  createReadStream(filePath).pipe(response)
}

const server = createServer((request, response) => {
  const urlPath = new URL(request.url ?? '/', 'http://localhost').pathname
  const safePath = urlPath === '/' ? '/index.html' : urlPath
  const filePath = join(distRoot, safePath)

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    sendFile(response, filePath)
    return
  }

  sendFile(response, join(distRoot, 'index.html'))
})

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000)
  server.listen(port, '0.0.0.0')
}

export default server
`,
)

mkdirSync(join(distDir, '.openai'), { recursive: true })
cpSync(join(appDir, '.openai', 'hosting.json'), join(distDir, '.openai', 'hosting.json'))
