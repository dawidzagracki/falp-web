import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import ParticleField from './ParticleField.jsx'
import HeroStage from './HeroStage.jsx'
import HeroMarquee from './HeroMarquee.jsx'

export default function Hero() {
  const ref = useRef(null)
  // Cząstki montujemy po pierwszym renderze (hero wstaje natychmiast)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 80])
  const yParticles = useTransform(scrollYProgress, [0, 1], [0, 160])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section ref={ref} className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Interaktywne tło — sieć cząstek (montowana po pierwszym renderze) */}
      <motion.div style={{ y: yParticles, scale }} className="absolute inset-0 -z-10">
        {ready
          ? <ParticleField className="h-full w-full" />
          : <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(125,209,63,0.12),transparent_70%)]" />}
      </motion.div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand/15 blur-[120px] animate-glow-pulse" />
        <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-brand/12 blur-[120px]" />
      </div>

      {/* Wielkie napisy w tle — nad siecią kropek, pod treścią */}
      <HeroMarquee />

      <motion.div style={{ y: yContent }} className="container-x grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center relative">
        <div className="relative isolate">
          {/* mleczny woal — oddziela tekst od napisów w tle */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-12 -inset-y-16 -z-10 blur-2xl"
            style={{ background: 'radial-gradient(72% 78% at 38% 46%, rgba(255,255,255,0.94), rgba(247,249,244,0.7) 46%, transparent 78%)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="chip mb-6 sm:mb-8"
          >
            <Sparkles size={11} /> 15 lat doświadczenia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-fluid-h1 font-black leading-[0.98] mb-5 sm:mb-6 text-balance"
          >
            Tworzymy<br />
            <span className="grad-text relative inline-block">
              niezapomniane
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" aria-hidden>
                <path d="M2 9C50 3 150 3 298 7" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
                <defs><linearGradient id="g" x1="0" x2="300"><stop stopColor="#A8FF6C" stopOpacity="0"/><stop offset="0.5" stopColor="#7DD13F"/><stop offset="1" stopColor="#5BA82A" stopOpacity="0"/></linearGradient></defs>
              </svg>
            </span><br />
            wydarzenia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base sm:text-lg text-ink-muted max-w-xl mb-8 sm:mb-10 leading-relaxed text-pretty"
          >
            Agencja eventowa z pełnym zakresem usług. Organizujemy imprezy firmowe, eventy, konferencje i gale na najwyższym poziomie.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/kontakt" className="btn-primary group">
              Zapytaj o wycenę
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="btn-secondary group" aria-label="Obejrzyj showreel">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/20 ring-1 ring-brand/50 transition group-hover:scale-110">
                <Play size={12} fill="currentColor" className="text-brand-text ml-0.5" />
              </span>
              Showreel
            </button>
          </motion.div>

          <div className="mt-10 sm:mt-12 flex items-center gap-5 text-xs text-ink-muted">
            <div className="flex -space-x-2">
              {[0,1,2,3].map(i => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-paper bg-gradient-to-br from-brand to-brand-dark grid place-items-center text-[10px] font-bold text-ink-900">
                  {['LM','AM','BM','PO'][i]}
                </div>
              ))}
            </div>
            <span><span className="text-brand-text font-bold">250+</span> zaufanych klientów</span>
          </div>
        </div>

        {/* Soundsystem — interaktywna scena */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <HeroStage />
        </motion.div>
      </motion.div>
    </section>
  )
}
