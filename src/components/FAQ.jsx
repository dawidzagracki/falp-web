import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { faqItems } from '../data/faq.js'
import SectionLabel from './SectionLabel.jsx'

export default function FAQ({ withSchema = true }) {
  const [open, setOpen] = useState(0)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }

  return (
    <section className="py-16 sm:py-20 lg:py-28 relative">
      {withSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}

      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="08" className="mb-5">FAQ</SectionLabel>
            <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance mb-5">
              Często zadawane <span className="grad-text">pytania</span>
            </h2>
            <p className="text-ink-muted text-pretty">
              Nie znalazłeś odpowiedzi? Napisz do nas — chętnie wyjaśnimy wszystkie wątpliwości.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={i} className={`card overflow-hidden transition ${isOpen ? 'border-brand/40 shadow-card-hover' : ''}`}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-base sm:text-lg pr-2 text-ink-900">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`grid h-9 w-9 place-items-center rounded-full shrink-0 transition ${
                        isOpen ? 'bg-brand text-ink-900' : 'bg-cream text-ink-700'
                      }`}
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-ink-muted leading-relaxed text-pretty">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
