/**
 * Code-style label sekcji (DNA monstermedia), np. "02 — Nasza oferta".
 */
export default function SectionLabel({ index, children, className = '' }) {
  return (
    <div className={`section-label ${className}`}>
      {index && <span className="text-ink-900/40">{index}</span>}
      <span className="h-px w-6 bg-brand/50" aria-hidden />
      {children}
    </div>
  )
}
