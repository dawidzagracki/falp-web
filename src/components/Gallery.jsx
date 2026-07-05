import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { realizations } from '../data/realizations.js'
import RealizationCard from './RealizationCard.jsx'
import Lightbox from './Lightbox.jsx'
import SectionLabel from './SectionLabel.jsx'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Gallery() {
  // losowe wydarzenia na każde wejście
  const shown = useMemo(() => shuffle(realizations).slice(0, 6), [])
  const [active, setActive] = useState(null)

  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-brand/6 blur-[140px] -z-10" />

      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <SectionLabel index="03" className="mb-5">Realizacje</SectionLabel>
            <h2 className="text-fluid-h2 font-black leading-[1.05] text-balance">
              Nasze <span className="grad-text">najnowsze</span><br />projekty
            </h2>
          </div>
          <Link to="/realizacje" className="btn-secondary self-start lg:self-end group">
            Zobacz wszystkie
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map(ev => (
            <RealizationCard key={ev.id} event={ev} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active && <Lightbox event={active} onClose={() => setActive(null)} />}
    </section>
  )
}
