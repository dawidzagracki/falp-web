import { useEffect, useRef } from 'react'
import { Radio } from 'lucide-react'

/**
 * Interaktywny soundsystem (bez 3D): equalizer + dwa głośniki.
 * - słupki i membrany pulsują w rytmie (beat)
 * - ruch myszką dokłada „energii" — słupki uderzają mocniej
 * - rAF zapisuje style bezpośrednio do DOM (bez re-renderów)
 */

const BAR_COUNT = 28
const arch = (i) => Math.sin((i / (BAR_COUNT - 1)) * Math.PI) // niżej po bokach, wyżej w środku

export default function HeroStage() {
  const barsRef = useRef([])
  const wooferL = useRef(null)
  const wooferR = useRef(null)
  const ringL = useRef(null)
  const ringR = useRef(null)
  const energy = useRef(0)
  const lastMouse = useRef({ x: 0, y: 0, t: 0 })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      barsRef.current.forEach((el, i) => { if (el) el.style.height = `${14 + arch(i) * 55}%` })
      return
    }

    const onMove = (e) => {
      const now = performance.now()
      const { x, y, t } = lastMouse.current
      if (t) {
        const dist = Math.hypot(e.clientX - x, e.clientY - y)
        const dt = Math.max(now - t, 16)
        energy.current = Math.min(1.4, energy.current + (dist / dt) * 0.22)
      }
      lastMouse.current = { x: e.clientX, y: e.clientY, t: now }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const start = performance.now()
    let raf
    const loop = () => {
      const t = (performance.now() - start) / 1000
      // rytm — krótki, „uderzający" puls ~1.9 Hz
      const pulse = Math.pow(Math.sin(t * Math.PI * 2 * 1.9) * 0.5 + 0.5, 3)
      energy.current *= 0.92
      const e = energy.current

      barsRef.current.forEach((el, i) => {
        if (!el) return
        const a = arch(i)
        const wob = Math.sin(t * 9 + i * 0.55) * 0.5 + 0.5
        const h = 12 + a * 46 * (0.45 + 0.55 * pulse) + wob * 18 * (0.35 + e) + e * 42 * a
        el.style.height = `${Math.min(100, h)}%`
      })

      const wscale = 1 + pulse * 0.16 + e * 0.18
      if (wooferL.current) wooferL.current.style.transform = `scale(${wscale})`
      if (wooferR.current) wooferR.current.style.transform = `scale(${wscale})`

      const rs = 1 + pulse * 0.7 + e * 0.5
      const ro = (pulse * 0.5 + e * 0.3)
      if (ringL.current) { ringL.current.style.transform = `scale(${rs})`; ringL.current.style.opacity = ro }
      if (ringR.current) { ringR.current.style.transform = `scale(${rs})`; ringR.current.style.opacity = ro }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  const Speaker = ({ wooferRef, ringRef }) => (
    <div className="relative h-[72%] w-14 sm:w-[4.5rem] shrink-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-2.5 sm:gap-3">
      {/* tweeter */}
      <div className="h-2.5 w-2.5 rounded-full bg-ink-700 border border-white/15" />
      {/* woofer */}
      <div className="relative grid place-items-center">
        <span ref={ringRef} className="absolute h-12 w-12 sm:h-16 sm:w-16 rounded-full border-2 border-brand-glow/70 will-change-transform" style={{ opacity: 0 }} />
        <div ref={wooferRef} className="relative h-11 w-11 sm:h-14 sm:w-14 rounded-full border border-brand/40 grid place-items-center will-change-transform shadow-[0_0_18px_rgba(125,209,63,0.35)]" style={{ background: 'radial-gradient(circle at 50% 40%, #214a12, #0a1606)' }}>
          <span className="absolute inset-1.5 rounded-full border border-white/5" />
          <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-gradient-to-br from-brand-glow to-brand-dark shadow-[0_0_10px_rgba(168,255,108,0.7)]" />
        </div>
      </div>
      {/* port */}
      <div className="h-1.5 w-6 rounded-full bg-ink-700/80" />
    </div>
  )

  return (
    <div className="relative aspect-[4/3] sm:aspect-video w-full rounded-[1.75rem] overflow-hidden glow-ring shadow-glow-brand-lg bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900">
      {/* szkło + poświata */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(125,209,63,0.18),transparent_60%)]" aria-hidden />
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 h-[60%] w-[70%] rounded-full bg-brand/25 blur-[70px]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />

      {/* układ: głośnik | equalizer | głośnik */}
      <div className="absolute inset-0 flex items-end justify-center gap-3 sm:gap-5 px-4 sm:px-6 pb-9 pt-16">
        <Speaker wooferRef={wooferL} ringRef={ringL} />

        <div className="flex-1 h-full flex items-end justify-center gap-[4px] sm:gap-[5px]">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              ref={(el) => (barsRef.current[i] = el)}
              className="flex-1 max-w-[11px] rounded-full bg-gradient-to-t from-brand-dark via-brand to-brand-glow origin-bottom shadow-[0_0_10px_rgba(168,255,108,0.3)]"
              style={{ height: '14%' }}
            />
          ))}
        </div>

        <Speaker wooferRef={wooferR} ringRef={ringR} />
      </div>

      {/* podłoga */}
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-ink-900 to-transparent" aria-hidden />
      <div className="absolute inset-x-6 bottom-8 h-px bg-gradient-to-r from-transparent via-brand-glow/60 to-transparent blur-[1px]" aria-hidden />

      {/* nagłówek — modern player */}
      <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        LIVE
      </div>
      <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white">
        <Radio size={13} className="text-brand-glow" /> FALP Sound System
      </div>

      {/* hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-white/55 font-medium tracking-wide whitespace-nowrap">
        Porusz myszką, aby rozkręcić scenę ✨
      </div>
    </div>
  )
}
