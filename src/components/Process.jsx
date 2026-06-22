import { motion } from 'framer-motion'
import { MessageSquare, Lightbulb, Calendar, PartyPopper } from 'lucide-react'
import SectionLabel from './SectionLabel.jsx'

const steps = [
  { icon: MessageSquare, title: 'Rozmowa', desc: 'Poznajemy Twoje potrzeby, budżet i wizję. Bezpłatna konsultacja.' },
  { icon: Lightbulb, title: 'Koncepcja', desc: 'Przygotowujemy autorską propozycję wraz z wyceną w 48h.' },
  { icon: Calendar, title: 'Realizacja', desc: 'Zajmujemy się wszystkim — logistyką, techniką, artystami, cateringiem.' },
  { icon: PartyPopper, title: 'Event', desc: 'Ty cieszysz się wydarzeniem. My dbamy o każdy szczegół na miejscu.' }
]

export default function Process() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container-x">
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto flex flex-col items-center">
          <SectionLabel index="05" className="mb-5">Jak pracujemy</SectionLabel>
          <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance">
            Od pomysłu do <span className="grad-text">realizacji</span>
          </h2>
          <p className="mt-5 text-ink-muted text-pretty">Prosty, transparentny proces. Od pierwszego maila do ostatniego oklasku.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <div className="card p-6 sm:p-7 h-full text-center group hover:border-brand/40 transition">
                <div className="relative inline-grid mb-5">
                  <div className="grid h-16 w-16 mx-auto place-items-center rounded-2xl bg-brand/15 ring-1 ring-brand/30 text-brand-text transition-transform duration-500 group-hover:scale-110">
                    <s.icon size={24} strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-brand text-ink-900 text-xs font-black">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-ink-900">{s.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed text-pretty">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
