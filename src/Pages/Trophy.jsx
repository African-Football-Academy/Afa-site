import { useState, useEffect } from 'react'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { motion, AnimatePresence } from 'framer-motion'
import { HiTrophy } from 'react-icons/hi2'
import { HiX, HiStar, HiCalendar } from 'react-icons/hi'

export default function Trophy() {
  const [showModal, setShowModal] = useState(false)
  const [trophy, setTrophy] = useState([])
  const [trophydetails, setTrophydetails] = useState(null)
  const [trophyId, setTrophyId] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const getTrophy = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b748dc00341a15de29',
          [Query.orderDesc('createdAt')]
        )
        setTrophy(response.documents)
      } catch (error) {
        console.error('Error fetching trophies:', error)
      }
    }
    getTrophy()
  }, [])

  useEffect(() => {
    if (!trophyId) return
    const getTrophydetails = async () => {
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b748dc00341a15de29',
          trophyId
        )
        setTrophydetails(response)
      } catch (error) {
        console.error('Error fetching trophy detail:', error)
      }
    }
    getTrophydetails()
  }, [trophyId])

  const handleOpen = (id) => {
    setTrophyId(id)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-img1 bg-cover">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-900/80 to-gray-950" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        {/* Diagonal accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
             style={{ background: 'linear-gradient(to bottom right, transparent 50%, #030712 50%)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center py-28 px-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
            className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/30 mb-6"
          >
            <HiTrophy size={40} className="text-white drop-shadow" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-[0.15em] mb-3"
          >
            Trophy <span className="text-yellow-400">Room</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-blue-300 uppercase tracking-[0.3em] text-xs font-semibold"
          >
            African Football Academy · Palmarès
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          />

          {/* Count badge */}
          {trophy.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full"
            >
              <HiStar className="text-yellow-400" />
              {trophy.length} Titres Remportés
            </motion.div>
          )}
        </div>
      </div>

      {/* ── TROPHY GRID ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-1 h-7 rounded-full bg-yellow-400" />
          <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-300">
            Tous les Trophées
          </h2>
          <span className="flex-1 h-px bg-gradient-to-r from-blue-800 to-transparent" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trophy.map((trop, i) => (
            <motion.div
              key={trop.$id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              onClick={() => handleOpen(trop.$id)}
              className="group relative cursor-pointer bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700/50 hover:border-yellow-500/60 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-full rounded-t-2xl transition-all duration-500" />

              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Glow circle behind image */}
                <div className="absolute inset-0 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors duration-300 blur-sm" />
                <img
                  src={trop.trophy_img}
                  alt={trop.title}
                  className="relative w-16 h-16 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="text-center">
                <p className="text-white font-bold text-sm leading-tight group-hover:text-yellow-300 transition-colors">
                  {trop.title}
                </p>
                {trop.num_title && (
                  <span className="mt-1 inline-block bg-yellow-500/20 text-yellow-400 text-xs font-black px-2 py-0.5 rounded-full">
                    ×{trop.num_title}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CUSTOM MODAL ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && trophydetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              {/* Top gradient strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600" />

              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <HiX size={16} className="text-white" />
              </button>

              {/* Content */}
              <div className="p-8 flex flex-col items-center text-center gap-5">
                {/* Trophy image with glow */}
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-yellow-400/30 rounded-full scale-125" />
                  <motion.img
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 150 }}
                    src={trophydetails.trophy_img}
                    alt={trophydetails.title}
                    className="relative w-28 h-28 object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Title */}
                <div>
                  <p className="text-red-400 uppercase tracking-widest text-xs font-black mb-1">
                    Titre Officiel
                  </p>
                  <h2 className="text-white text-2xl font-black leading-tight">
                    {trophydetails.title}
                  </h2>
                  {trophydetails.num_title && (
                    <span className="mt-2 inline-block bg-yellow-500/20 text-yellow-400 text-xs font-black px-3 py-1 rounded-full">
                      ×{trophydetails.num_title} fois
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                {/* Year & Winner */}
                <div className="flex items-center justify-center gap-6 w-full">
                  <div className="flex flex-col items-center gap-1">
                    <HiCalendar className="text-blue-400" size={20} />
                    <span className="text-blue-300 text-xs uppercase tracking-wider font-semibold">Année</span>
                    <span className="text-white font-black text-lg">
                      {trophydetails.year || '—'}
                    </span>
                  </div>
                  <div className="w-px h-12 bg-gray-700" />
                  <div className="flex flex-col items-center gap-1">
                    <HiTrophy className="text-yellow-400" size={20} />
                    <span className="text-blue-300 text-xs uppercase tracking-wider font-semibold">Statut</span>
                    <span className="text-yellow-400 font-black text-lg">Winner</span>
                  </div>
                </div>

                {/* CTA button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-full transition-all shadow-lg shadow-blue-900/40"
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
