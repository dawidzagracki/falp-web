import { Play, Images } from 'lucide-react'

/**
 * Kafel realizacji — okładka (zdjęcie WebP lub poster wideo) + nazwa + liczba zdjęć.
 * Klik → onOpen(event) otwiera lightbox.
 */
export default function RealizationCard({ event, onOpen }) {
  const isVideo = event.coverKind === 'video'
  const count = event.photoCount + event.videoCount

  return (
    <button
      onClick={() => onOpen(event)}
      className="group relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-soft text-left"
      aria-label={`Zobacz galerię: ${event.title}`}
    >
      {event.cover ? (
        <img
          src={event.cover}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* ikona typu */}
      <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition">
        {isVideo ? <Play size={18} fill="currentColor" className="ml-0.5" /> : <Images size={18} />}
      </div>

      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white">
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm mb-3">
          {event.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold mb-1 leading-tight transition group-hover:translate-x-1">{event.title}</h3>
        <p className="text-sm text-white/80">
          {isVideo ? `${event.videoCount} ${event.videoCount === 1 ? 'film' : 'filmy'}` : `${count} zdjęć`}
        </p>
      </div>
    </button>
  )
}
