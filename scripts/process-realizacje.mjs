/**
 * Przetwarza foldery wydarzeń (nazwa = tytuł, w środku zdjęcia/filmy) na lekkie media
 * do public/realizacje/<slug>/ oraz generuje src/data/realizations.js.
 *
 * - HEIC → JPEG (heic-convert) → WebP (sharp)
 * - JPG/PNG → WebP (sharp), auto-rotate wg EXIF
 * - każde zdjęcie: duże (≤1400px) img-NN.webp + miniatura (≤700px) thumb-NN.webp
 * - filmy: kopiowane jako vid-NN.<ext>; jeśli jest ffmpeg → .mov→mp4 + poster-klatka
 * - kategoria przypisywana automatycznie po słowach w nazwie (edytowalna później)
 *
 * Wymaga (dev): npm i -D sharp heic-convert ffmpeg-static
 * Użycie:  node scripts/process-realizacje.mjs [ścieżka-do-folderu-źródłowego]
 * (folder-źródłowy: rozpakowany ZIP, w środku podfoldery = wydarzenia)
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
import heicConvert from 'heic-convert'
import ffmpegPath from 'ffmpeg-static'

const FFMPEG = ffmpegPath // ścieżka do przenośnej binarki ffmpeg (lub null)

const DEFAULT_SRC = 'C:/Users/yname/AppData/Local/Temp/claude/C--Users-yname-Desktop-FALP-WEB/36a8eb08-91a8-41b4-aab9-f2e8beba7980/scratchpad/realizacje_src/Nasze realizacje'
const SRC = process.argv[2] || DEFAULT_SRC
const OUT_DIR = path.resolve('public/realizacje')
const DATA_FILE = path.resolve('src/data/realizations.js')

const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const HEIC_EXT = new Set(['.heic', '.heif'])
const VID_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm'])

const slugify = (s) => s
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ł/gi, 'l')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const cleanTitle = (s) => s.trim().replace(/_/g, ' ').replace(/\s+/g, ' ').trim()

const categoryFor = (title) => {
  const t = title.toLowerCase()
  if (/maraton|koszyk|sportow|bieg/.test(t)) return 'Sport'
  if (/\bbal\b|charytat|\bgala\b/.test(t)) return 'Gala'
  if (/arcelor|tauron|warsztat|bhp|prezes|jadar|konferencj|firm/.test(t)) return 'Firmowe'
  if (/prl|talerz|syde|bailla|pa[lł]ac|piknik|party/.test(t)) return 'Kultura i rozrywka'
  return 'Inne'
}

async function toWebp(inputBuffer, isHeic) {
  let buf = inputBuffer
  if (isHeic) {
    buf = await heicConvert({ buffer: inputBuffer, format: 'JPEG', quality: 0.92 })
  }
  const base = sharp(buf).rotate()
  const large = await base.clone().resize(1400, 1400, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 75 }).toBuffer()
  const thumb = await base.clone().resize(700, 700, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 72 }).toBuffer()
  return { large, thumb }
}

async function run() {
  if (!fs.existsSync(SRC)) { console.error('Brak folderu źródłowego:', SRC); process.exit(1) }
  fs.rmSync(OUT_DIR, { recursive: true, force: true })
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const events = fs.readdirSync(SRC, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a, b) => a.localeCompare(b, 'pl'))

  const result = []
  let id = 0

  for (const folder of events) {
    const dir = path.join(SRC, folder)
    const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile())
    const images = files.filter(f => { const e = path.extname(f).toLowerCase(); return IMG_EXT.has(e) || HEIC_EXT.has(e) }).sort((a, b) => a.localeCompare(b, 'pl'))
    const videos = files.filter(f => VID_EXT.has(path.extname(f).toLowerCase())).sort((a, b) => a.localeCompare(b, 'pl'))

    if (images.length === 0 && videos.length === 0) { console.log('· pomijam (pusty):', folder); continue }

    id++
    const title = cleanTitle(folder)
    const slug = slugify(folder)
    const evOut = path.join(OUT_DIR, slug)
    fs.mkdirSync(evOut, { recursive: true })
    const media = []

    let n = 0
    for (const img of images) {
      n++
      const nn = String(n).padStart(2, '0')
      try {
        const input = fs.readFileSync(path.join(dir, img))
        const isHeic = HEIC_EXT.has(path.extname(img).toLowerCase())
        const { large, thumb } = await toWebp(input, isHeic)
        fs.writeFileSync(path.join(evOut, `img-${nn}.webp`), large)
        fs.writeFileSync(path.join(evOut, `thumb-${nn}.webp`), thumb)
        media.push({ type: 'image', src: `/realizacje/${slug}/img-${nn}.webp`, thumb: `/realizacje/${slug}/thumb-${nn}.webp` })
        process.stdout.write(`  ${slug}: img-${nn} ✓\r`)
      } catch (e) {
        console.warn(`\n  ! błąd zdjęcia ${img} w ${folder}:`, e.message)
      }
    }

    let posterSrc = null
    let v = 0
    for (const vid of videos) {
      v++
      const vv = String(v).padStart(2, '0')
      const inPath = path.join(dir, vid)
      const outPath = path.join(evOut, `vid-${vv}.mp4`)
      try {
        if (FFMPEG) {
          execFileSync(FFMPEG, ['-y', '-i', inPath, '-c:v', 'libx264', '-crf', '27', '-preset', 'fast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-vf', "scale='min(1280,iw)':-2", outPath], { stdio: 'ignore' })
          process.stdout.write(`  ${slug}: vid-${vv} ✓\r`)
        } else {
          fs.copyFileSync(inPath, outPath)
        }
        media.push({ type: 'video', src: `/realizacje/${slug}/vid-${vv}.mp4` })
        // poster-klatka dla wydarzeń bez zdjęć (okładka kafla)
        if (!posterSrc && images.length === 0 && FFMPEG) {
          const tmp = path.join(evOut, '_poster.jpg')
          execFileSync(FFMPEG, ['-y', '-ss', '1', '-i', inPath, '-frames:v', '1', tmp], { stdio: 'ignore' })
          if (fs.existsSync(tmp)) {
            const big = await sharp(tmp).rotate().resize(1400, 1400, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 75 }).toBuffer()
            const th = await sharp(tmp).rotate().resize(700, 700, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 72 }).toBuffer()
            fs.writeFileSync(path.join(evOut, 'poster.webp'), big)
            fs.writeFileSync(path.join(evOut, 'poster-thumb.webp'), th)
            fs.rmSync(tmp)
            posterSrc = `/realizacje/${slug}/poster-thumb.webp`
          }
        }
      } catch (e) {
        console.warn(`\n  ! błąd filmu ${vid} w ${folder}:`, e.message)
      }
    }

    const firstImage = media.find(m => m.type === 'image')
    const cover = firstImage ? firstImage.thumb : posterSrc
    const photoCount = media.filter(m => m.type === 'image').length
    const videoCount = media.filter(m => m.type === 'video').length

    result.push({
      id, slug, title, category: categoryFor(title),
      cover, coverKind: firstImage ? 'image' : 'video',
      photoCount, videoCount, media
    })
    console.log(`✓ ${title}  [${result.at(-1).category}]  zdj:${photoCount} wideo:${videoCount}`)
  }

  const header = `// AUTO-GENEROWANE przez scripts/process-realizacje.mjs — nie edytuj ręcznie media.\n// Możesz swobodnie poprawiać: title, category (do filtrów).\n\n`
  const body = `export const realizations = ${JSON.stringify(result, null, 2)}\n\nexport const getRealization = (slug) => realizations.find(r => r.slug === slug)\n`
  fs.writeFileSync(DATA_FILE, header + body)

  console.log(`\nGotowe. Wydarzeń: ${result.length}. ffmpeg: ${FFMPEG ? 'tak' : 'nie'}.`)
  console.log('Zapisano:', DATA_FILE)
}

run()
