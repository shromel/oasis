const sharp = require('sharp')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')

const svg = readFileSync(resolve(__dirname, 'icon-source.svg'))
const out = resolve(__dirname, '..', 'public')

const targets = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
]

;(async () => {
  for (const t of targets) {
    await sharp(svg, { density: 384 }).resize(t.size, t.size).png().toFile(resolve(out, t.name))
    console.log('wrote', t.name)
  }
})()
