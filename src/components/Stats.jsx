import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 15, suffix: '+', label: 'Lat doświadczenia' },
  { value: 400, suffix: '+', label: 'Zrealizowanych imprez' },
  { value: 250, suffix: '+', label: 'Zadowolonych klientów' },
  { value: 100, suffix: '+', label: 'Ekranów LED' }
]

function Counter({ value, suffix, run }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    const duration = 2000
    const t0 = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [run, value])
  return <span>{n}{suffix}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); io.disconnect() }
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="border-y border-ink-900/[0.07] bg-cream relative overflow-hidden">
      <div className="hidden lg:block absolute inset-0 grid-bg opacity-60" />
      <div className="container-x py-12 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-12 gap-x-4">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center lg:text-left relative">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black grad-text mb-2 font-display leading-none">
                <Counter value={s.value} suffix={s.suffix} run={run} />
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.2em] text-ink-muted font-semibold">{s.label}</div>
              {i < 3 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-ink-900/10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
