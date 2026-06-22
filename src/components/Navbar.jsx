import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo.jsx'

const links = [
  { to: '/', label: 'Strona główna', end: true },
  { to: '/oferta', label: 'Oferta' },
  { to: '/realizacje', label: 'Realizacje' },
  { to: '/zespol', label: 'Zespół' },
  { to: '/blog', label: 'Blog' },
  { to: '/o-nas', label: 'O nas' },
  { to: '/kontakt', label: 'Kontakt' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-paper/95 backdrop-blur-md border-b border-ink-900/[0.06] shadow-soft' : 'bg-transparent'}`}>
        <div className="container-x flex h-16 sm:h-20 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Główna nawigacja">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition ${isActive ? 'text-brand-text' : 'text-ink-700 hover:text-ink-900'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-brand" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/kontakt" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm !min-h-0">
              Wycena
              <ArrowRight size={14} />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden grid h-11 w-11 place-items-center rounded-xl border border-ink-900/10 bg-white shadow-soft active:scale-95 transition"
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* tło — pełne i NATYCHMIASTOWE, bez animacji = menu otwiera się od razu */}
          <div className="absolute inset-0 bg-paper" onClick={() => setOpen(false)} />
          <nav
            className="relative h-full flex flex-col justify-center container-x pt-20 pb-12 safe-bottom overflow-y-auto"
            aria-label="Menu mobilne"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `block rounded-2xl px-5 py-4 text-2xl font-bold font-display transition-colors ${
                      isActive ? 'bg-brand/12 text-brand-text border border-brand/30' : 'text-ink-800 hover:bg-cream'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
            <Link to="/kontakt" className="btn-primary mt-6 text-base w-full">
              Bezpłatna wycena <ArrowRight size={18} />
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
