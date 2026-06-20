import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Music, PartyPopper, Megaphone, Lightbulb, Camera, Users, Check } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CTA from '../components/CTA.jsx'
import { services } from '../data/services.js'

const iconMap = { Music, PartyPopper, Megaphone, Lightbulb, Camera, Users }

export default function Offer() {
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Oferta', path: '/oferta' }
  ]
  return (
    <>
      <SEO
        title="Oferta"
        description="Pełen zakres usług eventowych — agencja artystyczna, imprezy firmowe, PR events, technika sceniczna, agencja reklamowa, hostessy."
        path="/oferta"
        breadcrumbs={breadcrumbs}
      />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="Oferta"
        title="Wszystko, czego potrzebuje"
        highlight="Twoje wydarzenie"
        subtitle="Sześć kompleksowych obszarów usług. Wybierz pojedynczy lub zaufaj nam w pełnej organizacji od koncepcji po sprzątanie."
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-x space-y-4 sm:space-y-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon]
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              >
                <Link to={`/oferta/${s.slug}`} className="card card-hover group block p-6 sm:p-8 lg:p-10">
                  <div className="grid lg:grid-cols-[auto_1fr_auto] gap-5 sm:gap-8 lg:gap-10 items-start">
                    <div className={`grid h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 place-items-center rounded-2xl bg-gradient-to-br ${s.color} ring-1 ring-brand/30 text-brand-text transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}>
                      <Icon size={32} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-ink-900 group-hover:text-brand-text transition">{s.title}</h2>
                      <p className="text-ink-muted mb-4 max-w-2xl text-pretty">{s.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                        {s.bullets.slice(0, 4).map(b => (
                          <li key={b} className="flex items-start gap-2 text-sm text-ink-700">
                            <Check size={14} className="mt-1 text-brand-text shrink-0" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:self-center shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-brand-text font-semibold whitespace-nowrap">
                        Szczegóły <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      <CTA />
    </>
  )
}
