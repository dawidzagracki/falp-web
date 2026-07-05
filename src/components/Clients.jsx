import { useState } from 'react'
import { clients } from '../data/clients.js'
import SectionLabel from './SectionLabel.jsx'

const logoUrl = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`

function LogoTile({ client }) {
  const [error, setError] = useState(false)

  return (
    <div
      className="group relative shrink-0 card grid place-items-center h-20 sm:h-24 w-44 sm:w-52 px-6 transition duration-500 hover:border-brand/40 hover:shadow-card-hover hover:-translate-y-0.5 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, #${client.color}22, transparent 70%)` }}
      />

      {error || !client.slug ? (
        <span className="relative font-bold text-center text-sm sm:text-base tracking-wide whitespace-nowrap" style={{ color: `#${client.color}` }}>
          {client.name}
        </span>
      ) : (
        <img
          src={logoUrl(client.slug, client.color)}
          alt={`${client.name} — logo`}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
          className="relative max-h-7 sm:max-h-9 w-auto object-contain opacity-70 transition duration-500 group-hover:opacity-100 group-hover:scale-110"
          draggable={false}
        />
      )}
    </div>
  )
}

export default function Clients() {
  const row1 = [...clients, ...clients]
  const row2 = [...clients.slice().reverse(), ...clients.slice().reverse()]

  return (
    <section className="py-16 sm:py-20 lg:py-24 border-y border-ink-900/[0.07] bg-cream overflow-hidden">
      <div className="container-x">
        <div className="text-center mb-10 sm:mb-12 flex flex-col items-center">
          <SectionLabel index="07" className="mb-5">Zaufali nam</SectionLabel>
          <h2 className="text-fluid-h2 font-black text-balance">
            Pracujemy z <span className="grad-text">najlepszymi</span>
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {[row1, row2].map((row, idx) => (
          <div key={idx} className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
            <div
              className={`flex gap-4 ${idx === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
              style={{ width: 'max-content' }}
            >
              {row.map((c, i) => (
                <LogoTile key={`${c.name}-${idx}-${i}`} client={c} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
