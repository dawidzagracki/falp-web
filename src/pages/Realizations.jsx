import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CTA from '../components/CTA.jsx'
import RealizationCard from '../components/RealizationCard.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { realizations } from '../data/realizations.js'

const categories = ['Wszystkie', ...new Set(realizations.map(r => r.category))]

export default function Realizations() {
  const [filter, setFilter] = useState('Wszystkie')
  const [active, setActive] = useState(null)
  const items = filter === 'Wszystkie' ? realizations : realizations.filter(r => r.category === filter)

  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Realizacje', path: '/realizacje' }
  ]

  return (
    <>
      <SEO title="Realizacje" description="Galeria zrealizowanych eventów — zobacz zdjęcia z naszych wydarzeń." path="/realizacje" breadcrumbs={breadcrumbs} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="Realizacje"
        title="Wydarzenia, z których"
        highlight="jesteśmy dumni"
        subtitle="Kliknij wydarzenie, aby zobaczyć galerię zdjęć. Oto wybrane realizacje z ostatnich lat."
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
              {items.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.03 }}
                >
                  <RealizationCard event={ev} onOpen={setActive} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTA />

      {active && <Lightbox event={active} onClose={() => setActive(null)} />}
    </>
  )
}
