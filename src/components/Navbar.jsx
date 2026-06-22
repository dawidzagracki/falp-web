import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
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

        <Link to="/kontakt" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm !min-h-0">
          Wycena
          <ArrowRight size={14} />
        </Link>
      </div>
    </header>
  )
}
