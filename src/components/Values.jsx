import { motion } from 'framer-motion'
import { ShieldCheck, Lightbulb, Handshake } from 'lucide-react'
import SectionLabel from './SectionLabel.jsx'

const values = [
  {
    icon: ShieldCheck,
    title: 'Profesjonalizm',
    desc: '15 lat doświadczenia i setki zrealizowanych eventów. Dopinamy każdy szczegół — terminowo i bezstresowo.',
    no: '01'
  },
  {
    icon: Lightbulb,
    title: 'Kreatywność',
    desc: 'Nie powielamy szablonów. Każde wydarzenie projektujemy od zera, pod Twoją markę i cele.',
    no: '02'
  },
  {
    icon: Handshake,
    title: 'Zaufanie',
    desc: 'Zaufały nam BMW, Porsche, Amazon czy Lidl. Budujemy długofalowe relacje, nie jednorazowe zlecenia.',
    no: '03'
  }
]

export default function Values() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container-x">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SectionLabel index="01" className="mb-5">Dlaczego my</SectionLabel>
          <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance">
            Więcej niż agencja eventowa —<br />
            <span className="grad-text">Twój partner</span> w emocjach
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card card-hover group relative p-7 sm:p-8 lg:p-10 overflow-hidden"
            >
              <span className="absolute top-5 right-6 text-5xl font-black text-ink-900/[0.04] font-display group-hover:text-brand/15 transition-colors duration-500">{v.no}</span>
              <div className="relative">
                <div className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-2xl bg-brand/15 ring-1 ring-brand/30 text-brand-text mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <v.icon size={28} strokeWidth={1.8} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-ink-900">{v.title}</h3>
                <p className="text-ink-muted leading-relaxed text-pretty">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
