import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { HiX, HiPhotograph, HiChevronLeft, HiChevronRight, HiEye, HiSparkles } from 'react-icons/hi'
import imgChamp from '../img/afa champion.jpg'
import imgU12 from '../img/afa u12.jpg'
import imgAfa3 from '../img/afa3.jpg'
import imgAfa2 from '../img/afa2.jpg'
import imgTeam from '../img/afa team img.png'
import imgCup from '../img/afa cup.jpg'
import imgCupDg from '../img/afa dg cup.jpg'
import imgBuilding from '../img/building.jpg'

const fallbackGallery = [
  { $id: 'g-1', title: 'Célébration du Titre Régional du Littoral', category: 'Trophées', img: imgChamp },
  { $id: 'g-2', title: 'Match Officiel des Pépites U12 en Championnat', category: 'Matchs', img: imgU12 },
  { $id: 'g-3', title: "Séance d'Entraînement Tactique & Pressing", category: 'Entraînements', img: imgAfa3 },
  { $id: 'g-4', title: 'Préparation Physique et Récupération des Cadets', category: 'Entraînements', img: imgAfa2 },
  { $id: 'g-5', title: "Photo Officielle de l'Équipe Première 2026", category: 'Équipe', img: imgTeam },
  { $id: 'g-6', title: 'Présentation de la Coupe aux Supporters', category: 'Trophées', img: imgCup },
  { $id: 'g-7', title: 'Remise des Distinctions Individuelles & MVP', category: 'Trophées', img: imgCupDg },
  { $id: 'g-8', title: "Infrastructures & Centre d'Hébergement de l'Académie", category: 'Installations', img: imgBuilding },
]

export default function Gallery() {
  const [gallery, setGallery] = useState([])
  const [lightbox, setLightbox] = useState(null)
  const [filter, setFilter] = useState('Tous')

  useEffect(() => {
    const getGallery = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b741e4000a15a0cce3',
          [Query.orderDesc('createdAt')]
        )
        if (response.documents && response.documents.length > 0) {
          setGallery(response.documents)
        } else {
          setGallery(fallbackGallery)
        }
      } catch (error) {
        console.warn('Gallery fetch fallback:', error)
        setGallery(fallbackGallery)
      }
    }
    getGallery()
  }, [])

  const displayGallery = gallery.length > 0 ? gallery : fallbackGallery

  const categories = ['Tous', 'Matchs', 'Entraînements', 'Trophées', 'Équipe', 'Installations']

  const filteredItems = displayGallery.filter((item) => {
    if (filter === 'Tous') return true
    return item.category?.toLowerCase() === filter.toLowerCase()
  })

  const openLightbox = (i) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i - 1 + filteredItems.length) % filteredItems.length)
  const next = () => setLightbox((i) => (i + 1) % filteredItems.length)

  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, filteredItems])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950 py-24 px-6 border-b border-blue-900/40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950" />
        <div className="absolute inset-0 opacity-[0.06]"
             style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-blue-500 to-amber-400" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 140, delay: 0.1 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-5 border border-blue-400/30"
          >
            <HiPhotograph size={32} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display mb-3"
          >
            Galerie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Photos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 uppercase tracking-[0.25em] text-xs font-semibold max-w-xl"
          >
            African Football Academy · L'Aventure en Images
          </motion.p>

          <div className="mt-5 w-24 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-amber-400 rounded-full" />

          {/* Photo Count Pill */}
          <div className="mt-6 inline-flex items-center gap-2 bg-slate-900/90 border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            <HiSparkles className="text-amber-400" size={14} />
            <span>{filteredItems.length} Clichés Disponibles</span>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-black uppercase tracking-wider px-5 py-2 rounded-full border transition-all duration-200 ${
                filter === cat
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/50'
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── PHOTO GRID ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {filteredItems.map((gall, i) => (
            <motion.div
              layout
              key={gall.$id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => openLightbox(i)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer border border-blue-900/40 hover:border-blue-400/60 transition-all duration-300 shadow-xl bg-slate-900 h-72"
            >
              <img
                src={gall.img}
                alt={gall.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              
              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span className="bg-slate-950/80 backdrop-blur-md text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {gall.category || 'AFA'}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <HiEye size={22} />
                </div>
              </div>

              {/* Title & Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xs font-black uppercase tracking-wide line-clamp-2 font-display group-hover:text-amber-300 transition-colors">
                  {gall.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── FULLSCREEN LIGHTBOX MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && filteredItems[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 z-50"
              title="Fermer (Échap)"
            >
              <HiX size={24} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-all border border-white/20 z-50"
              title="Précédent"
            >
              <HiChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-all border border-white/20 z-50"
              title="Suivant"
            >
              <HiChevronRight size={28} />
            </button>

            {/* Image Container */}
            <div
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[lightbox].img}
                alt={filteredItems[lightbox].title}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />

              <div className="mt-4 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
                  {filteredItems[lightbox].category || 'AFA Academy'} · {lightbox + 1} / {filteredItems.length}
                </span>
                <p className="text-white text-base font-black uppercase tracking-wide mt-2 font-display">
                  {filteredItems[lightbox].title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
