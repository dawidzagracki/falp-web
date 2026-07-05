import { Link } from 'react-router-dom'

/**
 * Logo FALP Event.
 * Znak ładowany z /logo-mark.svg — gdy klient prześle pliki CI,
 * wystarczy podmienić public/logo-mark.svg (i favicon.svg).
 *
 * Propsy:
 *  - withWordmark: czy pokazać tekst "FALP EVENT" obok znaku (domyślnie true)
 *  - to: jeśli podane, całość jest linkiem (domyślnie "/")
 *  - className: dodatkowe klasy wrappera
 */
export default function Logo({ withWordmark = true, to = '/', className = '' }) {
  const inner = (
    <>
      <span className="relative shrink-0">
        <img
          src="/logo-mark.jpg"
          alt="FALP Event"
          width="44"
          height="44"
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl"
          draggable={false}
        />
        <span className="absolute inset-0 rounded-xl bg-brand blur-lg opacity-25 -z-10 hidden lg:block" aria-hidden />
      </span>
      {withWordmark && (
        <span className="text-base sm:text-lg font-extrabold tracking-tight text-ink-900">
          FALP <span className="text-brand-text">EVENT</span>
        </span>
      )}
    </>
  )

  const base = `flex items-center gap-2.5 sm:gap-3 group ${className}`

  if (to) {
    return (
      <Link to={to} className={base} aria-label="FALP Event — strona główna">
        {inner}
      </Link>
    )
  }
  return <div className={base}>{inner}</div>
}
