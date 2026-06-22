import { NavLink } from 'react-router-dom'
import { Home, Sparkles, Images, Users, Mail } from 'lucide-react'

const items = [
  { to: '/', label: 'Start', icon: Home, end: true },
  { to: '/oferta', label: 'Oferta', icon: Sparkles },
  { to: '/realizacje', label: 'Realizacje', icon: Images },
  { to: '/zespol', label: 'Zespół', icon: Users },
  { to: '/kontakt', label: 'Kontakt', icon: Mail }
]

/**
 * Pływające menu na dole (tylko mobile/tablet) — kapsułka w stylu „liquid glass".
 * Zastępuje hamburger w nagłówku.
 */
export default function MobileNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50"
      aria-label="Nawigacja mobilna"
    >
      <div className="relative flex items-center gap-1 rounded-full border border-white/60 bg-white/55 px-2 py-2 shadow-[0_12px_40px_-10px_rgba(15,27,10,0.35)] backdrop-blur-xl overflow-hidden">
        {/* sheen — efekt płynnego szkła */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-t-full" aria-hidden />

        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            aria-label={label}
            className={({ isActive }) =>
              `relative grid place-items-center h-12 w-12 rounded-full transition-all duration-300 active:scale-90 ${
                isActive
                  ? 'bg-brand text-ink-900 shadow-[0_6px_18px_-6px_rgba(125,209,63,0.8)]'
                  : 'text-ink-700 hover:bg-white/70'
              }`
            }
          >
            <Icon size={20} strokeWidth={2} />
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
