import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle } from 'lucide-react'

const eventTypes = [
  'Impreza firmowa', 'Konferencja', 'Gala / Bal', 'Premiera produktu',
  'Targi / Kongres', 'Piknik / Integracja', 'Wesele', 'Inne'
]

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', eventType: '', guests: '', message: '', consent: false, _hp: ''
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Podaj imię'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Niepoprawny e-mail'
    if (form.phone && !form.phone.match(/^[+\d\s()-]{7,}$/)) e.phone = 'Niepoprawny telefon'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Min. 10 znaków'
    if (!form.consent) e.consent = 'Zaakceptuj zgodę'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (form._hp) return // honeypot
    if (!validate()) return
    setStatus('sending')
    const subject = encodeURIComponent(`Zapytanie z falp.pl — ${form.eventType || 'Wycena'}`)
    const body = encodeURIComponent(
      `Imię: ${form.name}\nFirma: ${form.company}\nE-mail: ${form.email}\nTelefon: ${form.phone}\n` +
      `Typ wydarzenia: ${form.eventType}\nLiczba gości: ${form.guests}\n\nWiadomość:\n${form.message}`
    )
    setTimeout(() => {
      window.location.href = `mailto:biuro@falp.pl?subject=${subject}&body=${body}`
      setStatus('sent')
    }, 600)
  }

  const field = "peer w-full rounded-xl border border-ink-900/15 bg-paper px-4 pt-5 pb-2 text-ink-900 placeholder-transparent outline-none transition focus:border-brand focus:bg-white"
  const label = "absolute left-4 top-3.5 text-sm text-ink-muted transition-all pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-brand-text peer-focus:uppercase peer-focus:tracking-wider peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider"

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-10 sm:p-12 text-center glow-ring"
      >
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-brand/20 text-brand-text">
          <Check size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-ink-900">Dziękujemy!</h3>
        <p className="text-ink-muted text-pretty">Otworzyliśmy Twojego klienta poczty z gotową wiadomością. Odpowiemy w ciągu 24h.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8 lg:p-10" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" value={form._hp} onChange={set('_hp')} className="hidden" aria-hidden />

      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
        <div className="relative">
          <input id="name" className={field} value={form.name} onChange={set('name')} placeholder="Imię" />
          <label htmlFor="name" className={label}>Imię *</label>
          {errors.name && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
        </div>
        <div className="relative">
          <input id="company" className={field} value={form.company} onChange={set('company')} placeholder="Firma" />
          <label htmlFor="company" className={label}>Firma</label>
        </div>
        <div className="relative">
          <input id="email" type="email" inputMode="email" autoComplete="email" className={field} value={form.email} onChange={set('email')} placeholder="E-mail" />
          <label htmlFor="email" className={label}>E-mail *</label>
          {errors.email && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
        </div>
        <div className="relative">
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} value={form.phone} onChange={set('phone')} placeholder="Telefon" />
          <label htmlFor="phone" className={label}>Telefon</label>
          {errors.phone && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
        </div>
        <div className="relative">
          <select id="eventType" className={field + ' appearance-none cursor-pointer'} value={form.eventType} onChange={set('eventType')}>
            <option value="">Wybierz...</option>
            {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <label htmlFor="eventType" className="absolute left-4 top-1.5 text-[10px] uppercase tracking-wider text-brand-text">Typ wydarzenia</label>
        </div>
        <div className="relative">
          <input id="guests" inputMode="numeric" className={field} value={form.guests} onChange={set('guests')} placeholder="Liczba gości" />
          <label htmlFor="guests" className={label}>Liczba gości</label>
        </div>
        <div className="relative sm:col-span-2">
          <textarea id="message" rows={5} className={field + ' resize-none pt-6'} value={form.message} onChange={set('message')} placeholder="Wiadomość" />
          <label htmlFor="message" className={label}>Wiadomość *</label>
          {errors.message && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>}
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={form.consent} onChange={set('consent')} className="mt-1 h-4 w-4 accent-brand shrink-0" />
        <span className="text-xs text-ink-muted leading-relaxed text-pretty">
          Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z Polityką Prywatności w celu odpowiedzi na zapytanie. *
        </span>
      </label>
      {errors.consent && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.consent}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-7 w-full sm:w-auto group">
        {status === 'sending' ? 'Wysyłanie...' : <>Wyślij zapytanie <Send size={16} className="transition group-hover:translate-x-1" /></>}
      </button>
    </form>
  )
}
