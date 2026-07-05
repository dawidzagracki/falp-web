import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Calendar } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CTA from '../components/CTA.jsx'
import { blogPosts } from '../data/blog.js'

const formatDate = (iso) => new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Blog() {
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Blog', path: '/blog' }
  ]
  return (
    <>
      <SEO title="Blog" description="Porady, trendy i case studies z branży eventowej. Czytaj na blogu FALP Event." path="/blog" breadcrumbs={breadcrumbs} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="Blog"
        title="Wiedza"
        highlight="z branży eventowej"
        subtitle="Porady, trendy, case studies. Wszystko, czego potrzebujesz, by zorganizować lepszy event."
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-x">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ y: 28 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link to={`/blog/${p.slug}`} className="card card-hover group h-full overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {p.image
                      ? <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      : <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">{p.category}</span>
                    </div>
                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md grid place-items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 text-ink-900 group-hover:text-brand-text transition text-balance">{p.title}</h2>
                    <p className="text-sm text-ink-muted leading-relaxed text-pretty flex-1">{p.excerpt}</p>
                    <div className="mt-5 pt-5 border-t border-ink-900/[0.07] flex items-center gap-4 text-xs text-ink-muted">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(p.date)}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {p.readTime} min</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
