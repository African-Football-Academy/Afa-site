import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { HiX, HiPhotograph, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

export default function Gallery() {
  const [gallery, setGallery] = useState([])
  const [lightbox, setLightbox] = useState(null) // index of open image
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const getGallery = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b741e4000a15a0cce3',
          [Query.orderDesc('createdAt')]
        )
        setGallery(response.documents)
      } catch (error) {
        console.error('Error fetching gallery:', error)
      }
    }
    getGallery()
  }, [])

  const openLightbox = (i) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i - 1 + gallery.length) % gallery.length)
  const next = () => setLightbox((i) => (i + 1) % gallery.length)

  // keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-img1 bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-900/80 to-gray-950" />
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-20"
             style={{ background: 'linear-gradient(to bottom right, transparent 50%, #030712 50%)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-5"
          >
            <HiPhotograph size={30} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-6xl font-black uppercase tracking-[0.15em] text-white mb-3"
          >
            Gal<span className="text-blue-400">lery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-blue-300 uppercase tracking-[0.3em] text-xs font-semibold"
          >
            African Football Academy · Photos
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-5 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />

          {gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-5 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full"
            >
              <HiPhotograph className="text-blue-400" size={14} />
              {gallery.length} Photos
            </motion.div>
          )}
        </div>
      </div>

      {/* ── GALLERY GRID ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-1 h-7 rounded-full bg-blue-500" />
          <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-300">
            Toutes les Photos
          </h2>
          <span className="flex-1 h-px bg-gradient-to-r from-blue-800 to-transparent" />
        </div>

        {/* Masonry-style grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          {gallery.map((gall, i) => (
            <motion.div
              key={gall.$id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(i)}
              className="group relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
            >
              <img
                src={gall.img}
                alt={gall.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />

              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-black uppercase tracking-wider line-clamp-1">
                  {gall.title}
                </p>
                <p className="text-blue-400 text-[10px] uppercase tracking-widest font-bold mt-0.5">
                  Voir →
                </p>
              </div>

              {/* Index badge */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-[9px] font-black">{i + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── LIGHTBOX ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && gallery[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* Image card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-w-3xl w-full"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-wider line-clamp-1">
                    {gallery[lightbox].title}
                  </p>
                  <p className="text-blue-400 text-[10px] uppercase tracking-widest">
                    {lightbox + 1} / {gallery.length}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={closeLightbox}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiX size={18} className="text-white" />
                </motion.button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={gallery[lightbox].img}
                  alt={gallery[lightbox].title}
                  className="w-full max-h-[70vh] object-contain bg-gray-900"
                />
              </div>

              {/* Nav arrows */}
              <div className="flex justify-between mt-4 px-1">
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                  className="flex items-center gap-2 bg-white/10 hover:bg-blue-600/60 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/10 transition-all"
                >
                  <HiChevronLeft size={16} /> Précédent
                </motion.button>
                <motion.button
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  className="flex items-center gap-2 bg-white/10 hover:bg-blue-600/60 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/10 transition-all"
                >
                  Suivant <HiChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
