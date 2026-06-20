import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const words = ['EVENTY', 'KONFERENCJE', 'GALE', 'PREMIERY', 'INTEGRACJE', 'TARGI', 'PIKNIKI', 'KONGRESY']

/**
 * Wielki tekst przesuwany w poziomie w zależności od scrolla (efekt agency).
 * Dwa rzędy w przeciwnych kierunkach.
 */
export default function ScrollMarquee() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['2%', '-28%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-28%', '2%'])

  const Row = ({ x, outline }) => (
    <motion.div style={{ x }} className="flex gap-8 whitespace-nowrap will-change-transform">
      {[...words, ...words].map((wd, i) => (
        <span
          key={i}
          className={`text-[12vw] lg:text-[8vw] font-black font-display leading-none tracking-tight ${
            outline ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(70,144,31,0.35)]' : 'grad-text'
          }`}
        >
          {wd} <span className="text-brand">✦</span>
        </span>
      ))}
    </motion.div>
  )

  return (
    <section ref={ref} className="py-10 sm:py-14 overflow-hidden select-none" aria-hidden>
      <Row x={x1} outline={false} />
      <Row x={x2} outline={true} />
    </section>
  )
}
