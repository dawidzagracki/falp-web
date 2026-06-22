import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import ParticleField from './ParticleField.jsx'
import HeroStage from './HeroStage.jsx'
import HeroMarquee from './HeroMarquee.jsx'

export default function Hero() {
  const [ready, setReady] = useState(false)
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setDesktop(mq.matches)
    const onMq = () => setDesktop(mq.matches)
    mq.addEventListener('change', onMq)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    return () => { mq.removeEventListener('change', onMq); cancelAnimationFrame(id) }
  }, [])

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* tło — cząstki tylko desktop (po pierwszym renderze), na mobile statyczny gradient */}
      <div className="absolute inset-0 -z-10">
        {ready && desktop
          ? <ParticleField className="h-full w-full" />
          : <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(125,209,63,0.12),transparent_70%)]" />}
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-brand/12 blur-[120px]" />
      </div>

      <HeroMarquee />

      <div className="container-x grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center relative">
        <div className="relative isolate animate-fade-up">
          {/* mleczny woal — oddziela tekst od napisów w tle */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-12 -inset-y-16 -z-10 blur-2xl"
            style={{ background: 'radial-gradient(72% 78% at 38% 46%, rgba(255,255,255,0.94), rgba(247,249,244,0.7) 46%, transparent 78%)' }}
          />

          <div className="chip mb-6 sm:mb-8"><Sparkles size={11} /> 15 lat doświadczenia</div>

          <h1 className="text-fluid-h1 font-black leading-[0.98] mb-5 sm:mb-6 text-balance">
            Tworzymy<br />
            <span className="grad-text relative inline-block">
              niezapomniane
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" aria-hidden>
                <path d="M2 9C50 3 150 3 298 7" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
                <defs><linearGradient id="g" x1="0" x2="300"><stop stopColor="#A8FF6C" stopOpacity="0"/><stop offset="0.5" stopColor="#7DD13F"/><stop offset="1" stopColor="#5BA82A" stopOpacity="0"/></linearGradient></defs>
              </svg>
            </span><br />
            wydarzenia
          </h1>

          <p className="text-base sm:text-lg text-ink-muted max-w-xl mb-8 sm:mb-10 leading-relaxed text-pretty">
            Agencja eventowa z pełnym zakresem usług. Organizujemy imprezy firmowe, eventy, konferencje i gale na najwyższym poziomie.
          </p>

          <div className="flex flex-wrap gap-3">
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
          </div>

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

        {/* Scena soundsystemu — tylko desktop */}
        <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
          <HeroStage />
        </div>
      </div>
    </section>
  )
}
