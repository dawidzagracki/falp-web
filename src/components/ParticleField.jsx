import { useEffect, useRef } from 'react'

/**
 * Interaktywna sieć cząstek (constellation) na <canvas>.
 * - cząstki łączą się liniami, reagują na kursor
 * - mocny kontrast (ciemniejsza zieleń), gęstsza siatka, więcej ruchu
 * - lekka: liczba skalowana do powierzchni, pauza poza ekranem
 * - szanuje prefers-reduced-motion (statyczne kropki)
 */
export default function ParticleField({ className = '', density = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let particles = []
    let raf = null
    let running = true
    const mouse = { x: -9999, y: -9999 }

    const DOT = '91,168,42'    // brand-dark — mocniejszy kontrast na jasnym tle
    const LINE = '70,144,31'   // brand-text

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const isMobile = w < 640
      const base = isMobile ? 15000 : 10000
      const count = Math.min(170, Math.floor((w * h) / base * density))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1.4
      }))
    }

    const linkDist = () => (w < 640 ? 120 : 170)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const LD = linkDist()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const dxm = mouse.x - p.x, dym = mouse.y - p.y
        const dm = Math.hypot(dxm, dym)
        if (dm < 180) {
          p.x += dxm * 0.0012 * (180 - dm) / 180 * 6
          p.y += dym * 0.0012 * (180 - dm) / 180 * 6
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${DOT},0.8)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d = Math.hypot(dx, dy)
          if (d < LD) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${LINE},${0.32 * (1 - d / LD)})`
            ctx.lineWidth = 1.1
            ctx.stroke()
          }
        }

        if (dm < 220) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${LINE},${0.45 * (1 - dm / 220)})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }
      if (running) raf = requestAnimationFrame(draw)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${DOT},0.6)`
        ctx.fill()
      })
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !reduced
      if (running && !raf) raf = requestAnimationFrame(draw)
      if (!running && raf) { cancelAnimationFrame(raf); raf = null }
    }, { threshold: 0 })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    if (reduced) drawStatic()
    else raf = requestAnimationFrame(draw)

    return () => {
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [density])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
