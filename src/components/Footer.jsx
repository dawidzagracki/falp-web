import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import { services } from '../data/services.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="mt-24 sm:mt-32 border-t border-ink-900/[0.07] bg-cream relative z-10">
      <div className="container-x py-12 sm:py-16">
        <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo to="/" className="mb-5" />
            <p className="text-sm text-ink-muted leading-relaxed mb-5 text-pretty">
              Tworzymy niezapomniane wydarzenia od 15 lat. Agencja eventowa z pełnym zakresem usług.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Facebook, label: 'Facebook', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' }
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="grid h-10 w-10 place-items-center rounded-lg border border-ink-900/10 bg-white text-ink-700 transition hover:border-brand/50 hover:text-brand-text hover:-translate-y-0.5">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Oferta">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text mb-4">Oferta</h2>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s.slug}>
                  <Link to={`/oferta/${s.slug}`} className="text-sm text-ink-muted hover:text-brand-text transition">{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Nawigacja">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text mb-4">Nawigacja</h2>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-ink-muted hover:text-brand-text transition">Strona główna</Link></li>
              <li><Link to="/realizacje" className="text-sm text-ink-muted hover:text-brand-text transition">Realizacje</Link></li>
              <li><Link to="/zespol" className="text-sm text-ink-muted hover:text-brand-text transition">Nasi pracownicy</Link></li>
              <li><Link to="/blog" className="text-sm text-ink-muted hover:text-brand-text transition">Blog</Link></li>
              <li><Link to="/faq" className="text-sm text-ink-muted hover:text-brand-text transition">FAQ</Link></li>
              <li><Link to="/o-nas" className="text-sm text-ink-muted hover:text-brand-text transition">O nas</Link></li>
              <li><Link to="/kontakt" className="text-sm text-ink-muted hover:text-brand-text transition">Kontakt</Link></li>
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text mb-4">Kontakt</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-ink-muted">
                <MapPin size={16} className="mt-0.5 text-brand-text shrink-0" />
                <span>ul. Przykładowa 12<br />42-500 Będzin</span>
              </li>
              <li className="flex items-center gap-3 text-ink-muted">
                <Phone size={16} className="text-brand-text shrink-0" />
                <a href="tel:+48000000000" className="hover:text-brand-text transition">+48 000 000 000</a>
              </li>
              <li className="flex items-center gap-3 text-ink-muted">
                <Mail size={16} className="text-brand-text shrink-0" />
                <a href="mailto:biuro@falp.pl" className="hover:text-brand-text transition">biuro@falp.pl</a>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-900/[0.07] pt-6 sm:pt-8 md:flex-row">
          <p className="text-xs text-ink-muted">© {new Date().getFullYear()} FALP Event. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-5 sm:gap-6 text-xs text-ink-muted">
            <Link to="/polityka-prywatnosci" className="hover:text-brand-text transition">Polityka prywatności</Link>
            <Link to="/faq" className="hover:text-brand-text transition">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
