import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve, relative, sep } from 'node:path'
import { execSync } from 'node:child_process'

const root = resolve(new URL('..', import.meta.url).pathname)
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

function collectFiles(baseDir) {
  const results = []

  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      const relPath = relative(baseDir, fullPath).split(sep).join('/')
      results.push({
        path: `/${relPath}`,
        content: readFileSync(fullPath, 'utf8'),
      })
    }
  }

  walk(baseDir)
  return results
}

const assetMap = Object.fromEntries(
  collectFiles(appDistDir)
    .filter((item) => item.path !== '/server/index.js')
    .map((item) => [item.path, item.content]),
)

mkdirSync(join(distDir, 'server'), { recursive: true })
writeFileSync(
  join(distDir, 'server', 'index.js'),
  `const assets = ${JSON.stringify(assetMap, null, 2)}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
}

function contentTypeFor(pathname) {
  const dotIndex = pathname.lastIndexOf('.')
  if (dotIndex === -1) {
    return 'text/plain; charset=utf-8'
  }

  return contentTypes[pathname.slice(dotIndex)] ?? 'application/octet-stream'
}

function assetForPath(pathname) {
  if (pathname === '/' || pathname === '') {
    return assets['/index.html']
  }

  if (assets[pathname]) {
    return assets[pathname]
  }

  if (!pathname.includes('.')) {
    return assets['/index.html']
  }

  return assets['/404.html'] ?? assets['/index.html']
}

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const content = assetForPath(pathname)
  return new Response(content ?? '', {
    headers: {
      'content-type': contentTypeFor(pathname === '/' ? '/index.html' : pathname),
      'cache-control': 'no-store',
    },
  })
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
`,
)

mkdirSync(join(distDir, '.openai'), { recursive: true })
cpSync(join(appDir, '.openai', 'hosting.json'), join(distDir, '.openai', 'hosting.json'))
