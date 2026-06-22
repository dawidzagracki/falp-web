import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { realizations } from '../data/realizations.js'
import SectionLabel from './SectionLabel.jsx'

export default function Gallery() {
  const items = realizations.slice(0, 6)

  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-brand/6 blur-[140px] -z-10" />

      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <SectionLabel index="03" className="mb-5">Realizacje</SectionLabel>
            <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance">
              Nasze <span className="grad-text">najnowsze</span><br />projekty
            </h2>
          </div>
          <Link to="/realizacje" className="btn-secondary self-start lg:self-end group">
            Zobacz wszystkie
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-soft"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${r.color} transition-transform duration-700 group-hover:scale-110`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white">
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm mb-3">{r.category}</span>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 transition-transform duration-300 group-hover:translate-x-1">{r.title}</h3>
                <p className="text-sm text-white/80">{r.client} · {r.year}</p>
              </div>

              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md grid place-items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <ArrowUpRight size={18} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
