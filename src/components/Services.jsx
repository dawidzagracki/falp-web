import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Music, PartyPopper, Megaphone, Lightbulb, Camera, Users } from 'lucide-react'
import { services } from '../data/services.js'
import SectionLabel from './SectionLabel.jsx'

const iconMap = { Music, PartyPopper, Megaphone, Lightbulb, Camera, Users }

export default function Services() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <SectionLabel index="02" className="mb-5">Nasza oferta</SectionLabel>
            <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance">
              Obsługa <span className="grad-text">wydarzeń</span><br />od A do Z
            </h2>
          </div>
          <p className="text-ink-muted max-w-md lg:text-right text-pretty">
            Sześć kompleksowych obszarów usług — wybierz to, czego potrzebujesz, albo zaufaj nam w pełnej organizacji.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon]
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/oferta/${s.slug}`}
                  className="card card-hover group relative block h-full overflow-hidden p-6 sm:p-7 lg:p-8"
                >
                  <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.color} blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-80`} />

                  <div className="relative">
                    <div className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-2xl bg-brand/15 ring-1 ring-brand/30 text-brand-text mb-5 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand/25 group-hover:rotate-6">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-2.5 text-ink-900 group-hover:text-brand-text transition-colors duration-300">{s.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed mb-6 text-pretty">{s.short}</p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text">
                      Dowiedz się więcej
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
