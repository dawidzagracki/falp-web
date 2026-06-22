import { useEffect, useRef } from 'react'

/**
 * Interaktywna sieć cząstek (constellation) na <canvas>.
 * - ruch oparty na DELTA-TIME (spójny na 60/120/144 Hz)
 * - render ograniczony do ~60 fps (na ekranach 144 Hz nie próbuje gonić odświeżania → brak zacinania)
 * - reaguje na kursor, pauza poza ekranem, statyczne przy prefers-reduced-motion
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
    let running = false
    let lastDraw = 0
    let lastSim = 0
    const FRAME = 1000 / 60        // limit ~60 fps
    const mouse = { x: -9999, y: -9999 }

    const DOT = '91,168,42'
    const LINE = '70,144,31'

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const isMobile = w < 640
      const base = isMobile ? 16000 : 13000
      const count = Math.min(130, Math.floor((w * h) / base * density))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1.4
      }))
    }

    const linkDist = () => (w < 640 ? 120 : 150)

    const render = (dt) => {
      ctx.clearRect(0, 0, w, h)
      const LD = linkDist()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx * dt; p.y += p.vy * dt
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const dxm = mouse.x - p.x, dym = mouse.y - p.y
        const dm = Math.hypot(dxm, dym)
        if (dm < 180) {
          p.x += dxm * 0.0012 * (180 - dm) / 180 * 6 * dt
          p.y += dym * 0.0012 * (180 - dm) / 180 * 6 * dt
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
    }

    const loop = (now) => {
      if (running) raf = requestAnimationFrame(loop)
      if (now - lastDraw < FRAME - 0.5) return
      const dt = Math.min((now - lastSim) / 16.667, 3) || 1
      lastSim = now
      lastDraw = now
      render(dt)
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
      if (entry.isIntersecting && !reduced && !running) {
        running = true
        lastSim = performance.now()
        raf = requestAnimationFrame(loop)
      } else if (!entry.isIntersecting && running) {
        running = false
        if (raf) { cancelAnimationFrame(raf); raf = null }
      }
    }, { threshold: 0 })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    if (reduced) drawStatic()

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
