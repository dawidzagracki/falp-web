import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 15, suffix: '+', label: 'Lat doświadczenia' },
  { value: 400, suffix: '+', label: 'Zrealizowanych imprez' },
  { value: 250, suffix: '+', label: 'Zadowolonych klientów' },
  { value: 100, suffix: '+', label: 'Ekranów LED' }
]

function Counter({ value, suffix, inView }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const t0 = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span>{n}{suffix}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="border-y border-ink-900/[0.07] bg-cream relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="container-x py-12 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-12 gap-x-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 24 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left relative"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black grad-text mb-2 font-display leading-none">
                <Counter value={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.2em] text-ink-muted font-semibold">{s.label}</div>
              {i < 3 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-ink-900/10" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
