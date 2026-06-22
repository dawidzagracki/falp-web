import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, Settings, X } from 'lucide-react'

const STORAGE_KEY = 'falp_cookie_consent_v1'

// Pomocnik dla innych komponentów (np. SocialFeed) — czy jest zgoda marketingowa?
export function hasMarketingConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    return !!saved?.marketing
  } catch { return false }
}

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const [enter, setEnter] = useState(false)
  const [settings, setSettings] = useState(false)
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, marketing: false })

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) setShow(true)
      else setPrefs(JSON.parse(saved))
    } catch { setShow(true) }
  }, [])

  useEffect(() => {
    if (!show) return
    const id = requestAnimationFrame(() => setEnter(true))
    return () => cancelAnimationFrame(id)
  }, [show])

  const save = (next) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
    setPrefs(next)
    setShow(false)
    setSettings(false)
    window.dispatchEvent(new CustomEvent('falp-consent-change', { detail: next }))
  }

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true })
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false })
  const saveCustom = () => save(prefs)

  if (!show) return null

  return (
    <div
      className={`fixed bottom-28 lg:bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[55] safe-bottom transition-all duration-500 ${enter ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      role="dialog"
      aria-labelledby="cookie-title"
    >
      <div className="card p-5 sm:p-6 border-brand/30 shadow-soft-lg glow-ring">
        {!settings ? (
          <>
            <div className="flex items-start gap-3 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand-text shrink-0">
                <Cookie size={20} />
              </div>
              <div>
                <h3 id="cookie-title" className="font-bold text-base sm:text-lg mb-1 text-ink-900">Pliki cookies</h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed text-pretty">
                  Używamy cookies, aby zapewnić najlepsze doświadczenia. Zgoda marketingowa włącza m.in. feed z Instagrama i Facebooka.
                  Szczegóły w <Link to="/polityka-prywatnosci" className="text-brand-text underline underline-offset-2">Polityce prywatności</Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button onClick={acceptAll} className="btn-primary !py-2.5 text-sm flex-1 !min-h-0">
                Akceptuję wszystkie
              </button>
              <button onClick={rejectAll} className="btn-secondary !py-2.5 text-sm flex-1 !min-h-0">
                Tylko niezbędne
              </button>
            </div>
            <button onClick={() => setSettings(true)} className="mt-3 w-full text-xs text-ink-muted hover:text-brand-text transition inline-flex items-center justify-center gap-1.5">
              <Settings size={12} /> Dostosuj
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base sm:text-lg text-ink-900">Ustawienia cookies</h3>
              <button onClick={() => setSettings(false)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream" aria-label="Zamknij">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { key: 'necessary', label: 'Niezbędne', desc: 'Wymagane do działania strony. Nie można wyłączyć.', disabled: true },
                { key: 'analytics', label: 'Analityczne', desc: 'Pomagają nam zrozumieć, jak korzystasz ze strony.' },
                { key: 'marketing', label: 'Marketingowe', desc: 'Feed social media, spersonalizowane treści.' }
              ].map(o => (
                <label key={o.key} className={`flex items-start gap-3 p-3 rounded-xl border border-ink-900/10 ${o.disabled ? 'opacity-60' : 'cursor-pointer hover:border-brand/40'}`}>
                  <input
                    type="checkbox"
                    checked={prefs[o.key]}
                    disabled={o.disabled}
                    onChange={(e) => setPrefs(p => ({ ...p, [o.key]: e.target.checked }))}
                    className="mt-1 h-4 w-4 accent-brand shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink-900">{o.label}</div>
                    <div className="text-xs text-ink-muted mt-0.5 text-pretty">{o.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <button onClick={saveCustom} className="btn-primary !py-2.5 text-sm w-full !min-h-0">
              Zapisz ustawienia
            </button>
          </>
        )}
      </div>
    </div>
  )
}
