// Generate the app's PWA/home-screen icons from the brand art shipped in the
// oasis-design skill (assets/app-icon.png — the illustrated cavern-oasis mark).
const sharp = require('sharp')
const { resolve } = require('node:path')

const src = resolve(__dirname, '..', '.claude', 'skills', 'oasis-design', 'assets', 'app-icon.png')
const out = resolve(__dirname, '..', 'public')

const targets = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-64.png', size: 64 },
]

;(async () => {
  for (const t of targets) {
    await sharp(src).resize(t.size, t.size, { fit: 'cover' }).png().toFile(resolve(out, t.name))
    console.log('wrote', t.name)
  }
})()
