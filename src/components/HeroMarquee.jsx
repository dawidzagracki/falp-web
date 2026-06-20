import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Wielkie napisy w tle hero — warstwa pod treścią, nad siecią kropek.
 * Każdy rząd przesuwa się w poziomie zależnie od scrolla (jak pasek na dole strony).
 */

const rows = [
  { words: ['EVENTY', 'GALE', 'KONFERENCJE'], dir: 1, range: 12, fill: false },
  { words: ['PREMIERY', 'INTEGRACJE', 'TARGI'], dir: -1, range: 18, fill: true },
  { words: ['KONGRESY', 'PIKNIKI', 'POKAZY'], dir: 1, range: 15, fill: false },
  { words: ['EMOCJE', 'ENERGIA', 'PASJA'], dir: -1, range: 20, fill: true },
  { words: ['WE CREATE MEMORIES'], dir: 1, range: 10, fill: false }
]

function Row({ progress, dir, range, words, fill }) {
  const x = useTransform(
    progress,
    [0, 1],
    dir > 0 ? [`-${range}%`, `${range}%`] : [`${range}%`, `-${range}%`]
  )
  return (
    <motion.div style={{ x }} className="flex gap-10 whitespace-nowrap will-change-transform">
      {[...words, ...words, ...words].map((wd, i) => (
        <span
          key={i}
          className={`text-[8.5vw] font-black font-display leading-[1.04] tracking-tight ${
            fill ? 'text-brand/[0.16]' : 'text-transparent'
          }`}
          style={fill ? undefined : { WebkitTextStroke: '2.5px rgba(70,144,31,0.32)' }}
        >
          {wd} <span className="text-brand/40">✦</span>
        </span>
      ))}
    </motion.div>
  )
}

export default function HeroMarquee() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  return (
    <div ref={ref} className="absolute inset-0 -z-10 flex flex-col justify-center gap-[0.5vw] overflow-hidden pointer-events-none select-none" aria-hidden>
      {rows.map((r, i) => (
        <Row key={i} progress={scrollYProgress} dir={r.dir} range={r.range} words={r.words} fill={r.fill} />
      ))}
    </div>
  )
}
