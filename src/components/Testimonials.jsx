import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials, reviewsStats } from '../data/testimonials.js'
import SectionLabel from './SectionLabel.jsx'

const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5" aria-label={`${n} z 5 gwiazdek`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} fill={i < n ? '#FFC107' : 'none'} className={i < n ? 'text-amber-400' : 'text-ink-900/15'} />
    ))}
  </div>
)

const initials = (name) => name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const perPage = 3
  const pages = Math.ceil(testimonials.length / perPage)
  const items = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-brand/6 blur-[140px] -z-10" />

      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <SectionLabel index="06" className="mb-5">Opinie</SectionLabel>
            <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance">
              Co mówią <span className="grad-text">nasi klienci</span>
            </h2>
          </div>

          <div className="card p-5 sm:p-6 flex items-center gap-5 self-start lg:self-end">
            <div className="text-4xl sm:text-5xl font-black grad-text font-display leading-none">{reviewsStats.average}</div>
            <div>
              <Stars n={5} />
              <p className="text-xs sm:text-sm text-ink-muted mt-1">{reviewsStats.count}+ opinii w Google</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((t, i) => (
                <motion.article
                  key={`${page}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-6 sm:p-7 flex flex-col h-full relative overflow-hidden group hover:border-brand/40 transition"
                >
                  <Quote size={48} className="absolute -top-2 -right-2 text-brand/12" />

                  <Stars n={t.rating} />
                  <p className="mt-4 text-ink-700 leading-relaxed text-pretty flex-1 text-sm sm:text-base">
                    „{t.text}"
                  </p>

                  <div className="mt-5 pt-5 border-t border-ink-900/[0.07] flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-ink-900 font-bold text-sm shrink-0">
                      {initials(t.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate text-ink-900">{t.name}</div>
                      <div className="text-xs text-ink-muted">{t.when} · Google</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage(p => (p - 1 + pages) % pages)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 bg-white shadow-soft hover:border-brand/50 hover:text-brand-text transition active:scale-95"
                aria-label="Poprzednie opinie"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Strona ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === page ? 'w-8 bg-brand' : 'w-2 bg-ink-900/15 hover:bg-ink-900/30'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setPage(p => (p + 1) % pages)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 bg-white shadow-soft hover:border-brand/50 hover:text-brand-text transition active:scale-95"
                aria-label="Następne opinie"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
