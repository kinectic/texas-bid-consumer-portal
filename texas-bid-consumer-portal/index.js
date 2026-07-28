export default {
  async fetch(request, env) {
    const assets = env?.ASSETS
    if (!assets?.fetch) {
      return new Response('Missing ASSETS binding', { status: 500 })
    }

    const url = new URL(request.url)
    const assetResponse = await assets.fetch(request)

    if (assetResponse.status !== 404) {
      return assetResponse
    }

    if (url.pathname === '/' || url.pathname.endsWith('.html')) {
      return assets.fetch(new Request(new URL('/index.html', url), request))
    }

    return assets.fetch(new Request(new URL('/index.html', url), request))
  },
}
