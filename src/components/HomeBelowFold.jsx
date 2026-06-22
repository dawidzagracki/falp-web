import Values from './Values.jsx'
import Services from './Services.jsx'
import Gallery from './Gallery.jsx'
import ScrollMarquee from './ScrollMarquee.jsx'
import SocialFeed from './SocialFeed.jsx'
import Process from './Process.jsx'
import Testimonials from './Testimonials.jsx'
import Clients from './Clients.jsx'
import FAQ from './FAQ.jsx'
import CTA from './CTA.jsx'

/**
 * Wszystkie sekcje poniżej pierwszego ekranu. Ładowane leniwie (osobny chunk),
 * dzięki czemu framer-motion i ten kod NIE wchodzą do initial bundla → szybsze
 * pierwsze wczytanie. content-visibility pomija render sekcji poza ekranem.
 */
export default function HomeBelowFold() {
  return (
    <>
      <div className="cv-section"><Values /></div>
      <div className="cv-section"><Services /></div>
      <div className="cv-section"><Gallery /></div>
      <div className="cv-section"><ScrollMarquee /></div>
      <div className="cv-section"><SocialFeed /></div>
      <div className="cv-section"><Process /></div>
      <div className="cv-section"><Testimonials /></div>
      <div className="cv-section"><Clients /></div>
      <div className="cv-section"><FAQ /></div>
      <div className="cv-section"><CTA /></div>
    </>
  )
}
