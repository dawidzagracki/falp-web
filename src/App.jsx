import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import AmbientBackground from './components/AmbientBackground.jsx'
import Home from './pages/Home.jsx'

const Offer = lazy(() => import('./pages/Offer.jsx'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'))
const Realizations = lazy(() => import('./pages/Realizations.jsx'))
const Team = lazy(() => import('./pages/Team.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const FAQPage = lazy(() => import('./pages/FAQPage.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

const Loader = () => (
  <div className="min-h-[60vh] grid place-items-center">
    <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-brand animate-spin" />
  </div>
)

export default function App() {
  // Odrocz ciężkie tło (rozmyte orby) do po pierwszym renderze — hero wstaje natychmiast
  const [showBg, setShowBg] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShowBg(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="flex min-h-screen flex-col relative">
      {showBg && <AmbientBackground />}
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oferta" element={<Offer />} />
            <Route path="/oferta/:slug" element={<ServiceDetail />} />
            <Route path="/realizacje" element={<Realizations />} />
            <Route path="/zespol" element={<Team />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/polityka-prywatnosci" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </div>
  )
}
