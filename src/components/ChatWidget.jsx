import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

const quickReplies = [
  { q: 'Jaką macie ofertę?', a: 'Realizujemy 6 obszarów usług: agencja artystyczna, imprezy firmowe, PR events, technika sceniczna, agencja reklamowa oraz hostessy i hości. Zerknij na 👉 [Ofertę](/oferta).' },
  { q: 'Gdzie jest wasze biuro?', a: 'Nasze biuro mieści się w Będzinie (woj. śląskie). Działamy w całej Polsce — przyjeżdżamy tam, gdzie jest Twoje wydarzenie.' },
  { q: 'Jak się z wami skontaktować?', a: 'Najszybciej przez 👉 [formularz kontaktowy](/kontakt). Możesz też napisać na biuro@falp.pl lub zadzwonić: +48 000 000 000.' },
  { q: 'Czy macie wolny termin?', a: 'Terminy potwierdzamy indywidualnie. Wypełnij krótki 👉 [formularz](/kontakt) z datą i typem wydarzenia — odpowiemy w 24h.' },
  { q: 'Ile kosztuje organizacja eventu?', a: 'Każdy event wyceniamy indywidualnie — zależy od skali, lokalizacji i zakresu. Bezpłatną wycenę otrzymasz po wypełnieniu 👉 [formularza](/kontakt).' }
]

function renderMessage(text) {
  const parts = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0, m
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text', value: text.slice(last, m.index) })
    parts.push({ type: 'link', label: m[1], to: m[2] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })
  return parts.map((p, i) => p.type === 'link'
    ? <Link key={i} to={p.to} className="text-brand-text underline underline-offset-2 font-semibold">{p.label}</Link>
    : <span key={i}>{p.value}</span>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Cześć! 👋 Jestem asystentem FALP Event. W czym mogę pomóc?' }
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, open])

  const handleQuick = (item) => {
    setMessages(m => [...m, { from: 'user', text: item.q }, { from: 'bot', text: item.a }])
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-ink-900 shadow-glow-brand-lg transition hover:scale-110 ${open ? 'rotate-90' : ''}`}
        aria-label="Asystent"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-ink-900/10 bg-white shadow-soft-lg overflow-hidden animate-fade-up">
          <div className="flex items-center gap-3 border-b border-ink-900/[0.07] bg-gradient-to-r from-brand/15 to-transparent p-4">
            <img src="/logo-mark.svg" alt="FALP Event" className="h-10 w-10 rounded-full" />
            <div>
              <div className="font-bold text-sm text-ink-900">Asystent FALP Event</div>
              <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                Zazwyczaj odpowiada od razu
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="max-h-80 overflow-y-auto p-4 space-y-3 bg-paper">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.from === 'user'
                    ? 'bg-brand text-ink-900 font-medium rounded-br-sm'
                    : 'bg-white border border-ink-900/[0.07] text-ink-800 rounded-bl-sm'
                }`}>
                  {renderMessage(m.text)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-ink-900/[0.07] p-3 space-y-2 bg-white">
            <p className="text-xs text-ink-muted px-1">Szybkie pytania:</p>
            <div className="flex flex-wrap gap-1.5">
              {quickReplies.map(q => (
                <button
                  key={q.q}
                  onClick={() => handleQuick(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-ink-900/10 bg-paper text-ink-700 hover:border-brand/50 hover:text-brand-text transition"
                >
                  {q.q}
                </button>
              ))}
            </div>
            <Link to="/kontakt" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 w-full rounded-xl bg-brand text-ink-900 font-semibold py-2.5 text-sm">
              Przejdź do formularza <Send size={14} />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
