import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Heart } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { team } from '../data/team.js'

const initials = (name) => name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()

export default function Team() {
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Nasi pracownicy', path: '/zespol' }
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FALP Event',
    url: 'https://falp.pl/',
    employee: team.map(m => ({ '@type': 'Person', name: m.name, jobTitle: m.role }))
  }

  return (
    <>
      <SEO
        title="Nasi pracownicy"
        description="Poznaj zespół FALP Event — ludzi pełnych pasji, którzy stoją za każdym udanym wydarzeniem."
        path="/zespol"
        breadcrumbs={breadcrumbs}
        schema={schema}
      />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="Nasi pracownicy"
        title="Ludzie, którzy tworzą"
        highlight="magię eventów"
        subtitle="Za każdym dobrym wydarzeniem stoją ludzie pełni pasji. Poznaj zespół, któremu zaufały największe marki."
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-x">
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <motion.article
                key={i}
                initial={{ y: 28 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="card card-hover group overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${m.color} grid place-items-center`}>
                      <span className="text-6xl font-black text-white/90 font-display">{initials(m.name)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Bio reveal on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold">{m.name}</h3>
                    <p className="text-sm text-brand-light font-medium mb-2">{m.role}</p>
                    <p className="text-sm text-white/80 leading-relaxed text-pretty max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      {m.bio}
                    </p>
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-white/90 hover:text-brand-light transition" aria-label={`Napisz do: ${m.name}`}>
                        <Mail size={14} /> {m.email}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Dołącz do nas (DNA careers) */}
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-cream p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-brand/10 blur-[100px]" />
            <div className="relative max-w-2xl mx-auto flex flex-col items-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand-text mb-6">
                <Heart size={26} />
              </div>
              <h2 className="text-fluid-h3 font-black mb-4 text-balance">Dołącz do <span className="grad-text">zespołu FALP</span></h2>
              <p className="text-ink-muted text-pretty mb-8">
                Szukasz pracy w branży eventowej? Cenisz energię, kreatywność i działanie? Napisz do nas — zawsze szukamy ludzi z pasją.
              </p>
              <Link to="/kontakt" className="btn-primary group">
                Aplikuj / napisz do nas
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
