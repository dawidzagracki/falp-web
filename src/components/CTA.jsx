import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-light via-brand to-brand-dark p-8 sm:p-12 lg:p-16 shadow-glow-brand-lg"
        >
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-dark/40 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-30" style={{ maskImage: 'none' }} />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 bg-white/30 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-ink-900 mb-5 sm:mb-6">
                <Sparkles size={11} /> Bezpłatna wycena
              </div>
              <h2 className="text-fluid-h2 font-black leading-[1.05] mb-4 max-w-2xl text-balance text-ink-900">
                Zaplanujmy Twoje<br />
                wydarzenie marzeń
              </h2>
              <p className="text-ink-900/75 max-w-xl text-pretty font-medium">
                Odpowiadamy w ciągu 24h. Bez zobowiązań, bez ukrytych kosztów — wycena dopasowana do Twoich potrzeb.
              </p>
            </div>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-7 py-4 text-base font-semibold text-white shadow-soft-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800 active:scale-[0.97] shrink-0 whitespace-nowrap group"
            >
              Porozmawiajmy
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
