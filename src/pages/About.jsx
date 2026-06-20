import { Award, Heart, Sparkles, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Stats from '../components/Stats.jsx'
import Clients from '../components/Clients.jsx'
import CTA from '../components/CTA.jsx'

const values = [
  { icon: Sparkles, title: 'Kreatywność', desc: 'Każdy event to autorski koncept — nigdy nie powielamy szablonów.' },
  { icon: Heart, title: 'Pasja', desc: 'Tworzenie wydarzeń to nasza pasja. Czujesz to w każdym detalu.' },
  { icon: Target, title: 'Skuteczność', desc: 'Dotrzymujemy terminów i budżetów. Twoje cele to nasze cele.' },
  { icon: Award, title: 'Jakość', desc: 'Pracujemy tylko ze sprawdzonymi partnerami i najlepszym sprzętem.' }
]

export default function About() {
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'O nas', path: '/o-nas' }
  ]
  return (
    <>
      <SEO title="O nas" description="15 lat doświadczenia w organizacji imprez firmowych i eventów na Śląsku. Poznaj zespół FALP Event." path="/o-nas" breadcrumbs={breadcrumbs} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="O nas"
        title="15 lat tworzenia"
        highlight="emocji"
        subtitle="Jesteśmy agencją eventową z siedzibą na Śląsku. Od 2011 roku tworzymy wydarzenia, o których się mówi."
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-x grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-7 sm:p-10 space-y-5 text-ink-700 leading-relaxed text-pretty glow-ring"
          >
            <p>FALP Event powstał z pasji do tworzenia wyjątkowych chwil. Przez 15 lat zrealizowaliśmy ponad 400 imprez — od kameralnych spotkań firmowych po wielkie gale dla tysięcy gości.</p>
            <p>Nasz park technologiczny to ponad 100 ekranów LED, profesjonalne nagłośnienie i oświetlenie. Współpracujemy z najlepszymi artystami i partnerami w Polsce.</p>
            <p>Zaufały nam takie marki jak BMW, Porsche, Amazon, Leroy Merlin czy Lidl — i to jest nasza najlepsza wizytówka.</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card card-hover p-5 sm:p-6"
              >
                <div className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl bg-brand/15 text-brand-text mb-4">
                  <v.icon size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-ink-900">{v.title}</h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed text-pretty">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Clients />
      <CTA />
    </>
  )
}
