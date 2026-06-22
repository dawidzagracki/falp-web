import SEO from '../components/SEO.jsx'
import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import Values from '../components/Values.jsx'
import Services from '../components/Services.jsx'
import Gallery from '../components/Gallery.jsx'
import ScrollMarquee from '../components/ScrollMarquee.jsx'
import SocialFeed from '../components/SocialFeed.jsx'
import Process from '../components/Process.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Clients from '../components/Clients.jsx'
import FAQ from '../components/FAQ.jsx'
import CTA from '../components/CTA.jsx'

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FALP Event',
    url: 'https://falp.pl/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://falp.pl/realizacje?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <SEO schema={schema} />
      <Hero />
      <Stats />
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
