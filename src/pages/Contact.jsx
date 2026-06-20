import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ContactForm from '../components/ContactForm.jsx'

const info = [
  { icon: Phone, label: 'Telefon', value: '+48 000 000 000', href: 'tel:+48000000000' },
  { icon: Mail, label: 'E-mail', value: 'biuro@falp.pl', href: 'mailto:biuro@falp.pl' },
  { icon: MapPin, label: 'Adres', value: 'ul. Przykładowa 12\n42-500 Będzin' },
  { icon: Clock, label: 'Godziny pracy', value: 'Pn-Pt: 9:00–17:00\nSo-Nd: na umówione' }
]

export default function Contact() {
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Kontakt', path: '/kontakt' }
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Kontakt — FALP Event',
    url: 'https://falp.pl/kontakt'
  }
  return (
    <>
      <SEO title="Kontakt" description="Skontaktuj się z FALP Event. Bezpłatna wycena w 24h." path="/kontakt" breadcrumbs={breadcrumbs} schema={schema} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="Kontakt"
        title="Porozmawiajmy o"
        highlight="Twoim evencie"
        subtitle="Wypełnij formularz lub zadzwoń. Odpowiadamy w ciągu 24 godzin, bez zobowiązań."
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10">
          <div className="space-y-3 sm:space-y-4">
            {info.map(item => {
              const Wrapper = item.href ? 'a' : 'div'
              return (
                <Wrapper
                  key={item.label}
                  {...(item.href ? { href: item.href } : {})}
                  className={`card p-5 sm:p-6 flex items-start gap-4 ${item.href ? 'card-hover' : ''}`}
                >
                  <div className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl bg-brand/15 text-brand-text shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink-muted font-semibold mb-1">{item.label}</div>
                    <div className="font-semibold whitespace-pre-line break-words text-ink-900">{item.value}</div>
                  </div>
                </Wrapper>
              )
            })}

            <div className="card overflow-hidden aspect-video p-0">
              <iframe
                title="Mapa lokalizacji FALP Event - Będzin"
                src="https://www.google.com/maps?q=Będzin&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
