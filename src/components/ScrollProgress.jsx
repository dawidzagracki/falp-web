import { useEffect, useRef } from 'react'

/**
 * Pasek postępu scrolla — lekki handler (rAF-throttled), bez biblioteki animacji.
 */
export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand/60 via-brand to-brand-light origin-left z-[60]"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden
    />
  )
}
