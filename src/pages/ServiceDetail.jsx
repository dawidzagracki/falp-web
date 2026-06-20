import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Music, PartyPopper, Megaphone, Lightbulb, Camera, Users } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import CTA from '../components/CTA.jsx'
import { getService, services } from '../data/services.js'

const iconMap = { Music, PartyPopper, Megaphone, Lightbulb, Camera, Users }

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <Navigate to="/oferta" replace />
  const Icon = iconMap[service.icon]
  const others = services.filter(s => s.slug !== slug).slice(0, 3)

  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Oferta', path: '/oferta' },
    { name: service.title, path: `/oferta/${slug}` }
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Organization', name: 'FALP Event', url: 'https://falp.pl/' },
    areaServed: 'PL',
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock' }
  }

  return (
    <>
      <SEO title={service.title} description={service.short} path={`/oferta/${slug}`} breadcrumbs={breadcrumbs} schema={schema} />

      <section className="pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 relative overflow-hidden">
        <div className={`absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br ${service.color} blur-[120px] -z-10 opacity-50`} />
        <div className="absolute inset-0 grid-bg -z-10" />

        <div className="container-x">
          <Link to="/oferta" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-text mb-6 sm:mb-8 transition">
            <ArrowLeft size={16} /> Wróć do oferty
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className={`grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${service.color} ring-1 ring-brand/30 text-brand-text mb-6`}>
                <Icon size={36} strokeWidth={1.8} />
              </div>
              <div className="chip mb-5">Oferta</div>
              <h1 className="text-fluid-h1 font-black leading-[1.02] mb-5 text-balance">{service.title}</h1>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed mb-8 text-pretty">{service.description}</p>
              <Link to="/kontakt" className="btn-primary">
                Zapytaj o tę usługę <ArrowRight size={18} />
              </Link>
            </div>

            <div className="card p-7 sm:p-10 glow-ring">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-text mb-6">Co obejmuje usługa</h2>
              <ul className="space-y-4">
                {service.bullets.map(b => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/20 text-brand-text shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="text-ink-700 leading-relaxed text-pretty">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <h2 className="text-fluid-h2 font-black mb-8 sm:mb-10 text-balance">Sprawdź też <span className="grad-text">inne usługi</span></h2>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(o => {
              const OIcon = iconMap[o.icon]
              return (
                <Link key={o.slug} to={`/oferta/${o.slug}`} className="card card-hover group p-6 block">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand-text mb-4 transition group-hover:scale-110">
                    <OIcon size={22} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-ink-900 group-hover:text-brand-text transition">{o.title}</h3>
                  <p className="text-sm text-ink-muted text-pretty">{o.short}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
