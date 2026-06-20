import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHeader({ chip, title, highlight, subtitle, breadcrumbs }) {
  return (
    <section className="pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg -z-10" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-brand/10 blur-[120px] -z-10" />

      <div className="container-x">
        {breadcrumbs && (
          <nav aria-label="Okruszki" className="mb-5 flex items-center gap-1.5 text-xs sm:text-sm text-ink-muted flex-wrap">
            {breadcrumbs.map((b, i) => (
              <div key={b.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} className="text-ink-900/30" />}
                {i === breadcrumbs.length - 1
                  ? <span className="text-brand-text font-medium">{b.name}</span>
                  : <Link to={b.path} className="hover:text-ink-900 transition">{b.name}</Link>}
              </div>
            ))}
          </nav>
        )}
        {chip && <div className="chip mb-5">{chip}</div>}
        <h1 className="text-fluid-h1 font-black leading-[1.02] max-w-4xl text-balance">
          {title} {highlight && <span className="grad-text">{highlight}</span>}
        </h1>
        {subtitle && <p className="mt-5 sm:mt-6 text-base sm:text-lg text-ink-muted max-w-2xl text-pretty">{subtitle}</p>}
      </div>
    </section>
  )
}
