import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import CTA from '../components/CTA.jsx'
import { getPost, blogPosts } from '../data/blog.js'

const formatDate = (iso) => new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />

  const others = blogPosts.filter(p => p.slug !== slug).slice(0, 2)
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${slug}` }
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'FALP Event' },
    publisher: { '@type': 'Organization', name: 'FALP Event', logo: { '@type': 'ImageObject', url: 'https://falp.pl/logo-mark.jpg' } },
    mainEntityOfPage: `https://falp.pl/blog/${slug}`
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} path={`/blog/${slug}`} breadcrumbs={breadcrumbs} schema={schema} />

      <article className="pt-28 sm:pt-32 lg:pt-40 pb-16 relative">
        <div className="absolute inset-0 grid-bg -z-10" />

        <div className="container-x max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-text mb-6 sm:mb-8 transition">
            <ArrowLeft size={16} /> Wróć do bloga
          </Link>

          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="chip">{post.category}</span>
            <span className="flex items-center gap-1.5 text-xs text-ink-muted"><Calendar size={12} /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5 text-xs text-ink-muted"><Clock size={12} /> {post.readTime} min czytania</span>
          </div>

          <h1 className="text-fluid-h1 font-black leading-[1.02] mb-6 text-balance">{post.title}</h1>
          <p className="text-base sm:text-lg text-ink-muted text-pretty mb-10">{post.excerpt}</p>

          <div className="aspect-[16/8] rounded-2xl mb-10 overflow-hidden relative shadow-soft bg-cream">
            {post.image
              ? <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
              : <div className={`absolute inset-0 bg-gradient-to-br ${post.color}`} />}
          </div>

          <div className="space-y-5 text-ink-700 leading-relaxed text-pretty text-base sm:text-lg">
            {post.content.map((block, i) => block.type === 'h'
              ? <h2 key={i} className="text-2xl sm:text-3xl font-bold mt-10 mb-3 text-ink-900 text-balance">{block.text}</h2>
              : <p key={i}>{block.text}</p>
            )}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="pb-16 sm:pb-20">
          <div className="container-x">
            <h2 className="text-fluid-h3 font-black mb-8">Czytaj <span className="grad-text">również</span></h2>
            <div className="grid gap-5 md:grid-cols-2">
              {others.map(o => (
                <Link key={o.slug} to={`/blog/${o.slug}`} className="card card-hover group p-6 flex gap-5 items-start">
                  <div className="shrink-0 h-20 w-20 rounded-xl overflow-hidden bg-cream">
                    {o.image
                      ? <img src={o.image} alt={o.title} loading="lazy" className="h-full w-full object-cover" />
                      : <div className={`h-full w-full bg-gradient-to-br ${o.color}`} />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-brand-text font-semibold uppercase tracking-wider">{o.category}</span>
                    <h3 className="font-bold mt-1 mb-1 text-ink-900 group-hover:text-brand-text transition line-clamp-2">{o.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm text-ink-muted">
                      Czytaj <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  )
}
