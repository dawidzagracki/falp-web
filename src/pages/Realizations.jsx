import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CTA from '../components/CTA.jsx'
import { realizations } from '../data/realizations.js'

const categories = ['Wszystkie', ...new Set(realizations.map(r => r.category))]

export default function Realizations() {
  const [filter, setFilter] = useState('Wszystkie')
  const items = filter === 'Wszystkie' ? realizations : realizations.filter(r => r.category === filter)

  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Realizacje', path: '/realizacje' }
  ]

  return (
    <>
      <SEO title="Realizacje" description="Ponad 400 zrealizowanych eventów — galeria naszych najlepszych projektów." path="/realizacje" breadcrumbs={breadcrumbs} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="Realizacje"
        title="Wydarzenia, z których"
        highlight="jesteśmy dumni"
        subtitle="Ponad 400 zrealizowanych imprez. Oto wybrane projekty z ostatnich lat."
      />

      <section className="pb-12 sm:pb-16">
        <div className="container-x">
          <div className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  filter === c
                    ? 'bg-brand text-ink-900 shadow-glow-brand'
                    : 'border border-ink-900/10 bg-white text-ink-700 hover:border-brand/40 hover:text-brand-text'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((r, i) => (
                <motion.article
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-soft"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${r.color} transition-transform duration-700 group-hover:scale-110`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white">
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm mb-3">{r.category}</span>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 transition group-hover:translate-x-1">{r.title}</h3>
                    <p className="text-sm text-white/80">{r.client} · {r.year}</p>
                  </div>
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md grid place-items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight size={18} />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  )
}
