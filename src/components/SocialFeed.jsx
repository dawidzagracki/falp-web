import { useEffect, useRef, useState } from 'react'
import { Instagram, Facebook, ArrowUpRight, Lock } from 'lucide-react'
import { social } from '../data/social.js'
import { hasMarketingConsent } from './CookieBanner.jsx'
import SectionLabel from './SectionLabel.jsx'

const STORAGE_KEY = 'falp_cookie_consent_v1'

function grantMarketing() {
  let prefs = { necessary: true, analytics: false, marketing: true }
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (saved) prefs = { ...saved, marketing: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {}
  window.dispatchEvent(new CustomEvent('falp-consent-change', { detail: prefs }))
}

// Ładuje skrypt providera (Curator / Behold) raz
function useWidgetScript(active) {
  const loaded = useRef(false)
  useEffect(() => {
    if (!active || loaded.current || !social.feedId) return
    loaded.current = true

    if (social.provider === 'curator') {
      const s = document.createElement('script')
      s.async = true
      s.charset = 'UTF-8'
      s.src = `https://cdn.curator.io/published/${social.feedId}.js`
      document.body.appendChild(s)
    } else if (social.provider === 'behold') {
      const s = document.createElement('script')
      s.type = 'module'
      s.src = 'https://w.behold.so/widget.js'
      document.body.appendChild(s)
    }
  }, [active])
}

function Header() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
      <div>
        <SectionLabel index="04" className="mb-5">Social media</SectionLabel>
        <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance">
          Z naszego <span className="grad-text">Instagrama</span><br />i Facebooka
        </h2>
      </div>
      <div className="flex gap-3 self-start lg:self-end">
        <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary group !py-3 !px-5">
          <Instagram size={18} /> Instagram
          <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary group !py-3 !px-5">
          <Facebook size={18} /> Facebook
        </a>
      </div>
    </div>
  )
}

export default function SocialFeed() {
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    setConsent(hasMarketingConsent())
    const onChange = (e) => setConsent(!!e.detail?.marketing)
    window.addEventListener('falp-consent-change', onChange)
    return () => window.removeEventListener('falp-consent-change', onChange)
  }, [])

  const configured = !!social.feedId
  const showLive = configured && consent
  useWidgetScript(showLive)

  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-brand/6 blur-[140px] -z-10" />
      <div className="container-x">
        <Header />

        {showLive ? (
          // Żywy feed providera
          social.provider === 'curator' ? (
            <div id="curator-feed-default-feed-layout">
              <a href="https://curator.io" target="_blank" rel="noopener noreferrer" className="text-[11px] text-ink-muted/60">Powered by Curator.io</a>
            </div>
          ) : (
            <div data-behold-id={social.feedId} />
          )
        ) : configured && !consent ? (
          // Skonfigurowany, ale brak zgody marketingowej
          <div className="card p-8 sm:p-12 text-center max-w-2xl mx-auto glow-ring">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand/15 text-brand-text">
              <Lock size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-ink-900">Włącz żywy feed social media</h3>
            <p className="text-ink-muted text-pretty mb-6">
              Aby wyświetlić najnowsze posty z Instagrama i Facebooka, potrzebujemy Twojej zgody na cookies marketingowe.
            </p>
            <button onClick={grantMarketing} className="btn-primary">Akceptuję i pokaż feed</button>
          </div>
        ) : (
          // Placeholder (brak feedId) — stylowa siatka
          <PlaceholderGrid />
        )}
      </div>
    </section>
  )
}

function PlaceholderGrid() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {social.fallbackPosts.map((p) => (
          <a
            key={p.id}
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft"
          >
            {p.image
              ? <img src={p.image} alt={p.caption} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              : <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <Instagram size={20} className="absolute top-3 right-3 text-white/90 drop-shadow" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
              <p className="text-sm font-semibold leading-tight text-balance">{p.caption}</p>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-ink-muted">
        Podgląd poglądowy. Po podłączeniu konta IG/FB w pliku <code className="font-mono text-brand-text">src/data/social.js</code> pojawi się żywy feed.
      </p>
    </>
  )
}
