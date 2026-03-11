import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

export default function Stats() {
  const [stats, setStat] = useState([])
  const [search, setSearch] = useState('')
  const [activePos, setActivePos] = useState('Tous')

  useEffect(() => {
    const getStat = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b747a4000895f519b2',
          [Query.orderDesc('createdAt')]
        )
        setStat(response.documents)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    getStat()
  }, [])

  // Derive unique positions for filter
  const positions = ['Tous', ...Array.from(new Set(stats.map((s) => s.position).filter(Boolean)))]

  const filtered = stats.filter((s) => {
    const matchPos = activePos === 'Tous' || s.position === activePos
    const matchSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.nationality?.toLowerCase().includes(search.toLowerCase())
    return matchPos && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-gray-950 py-20 px-6">
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-20"
             style={{ background: 'linear-gradient(to bottom right, transparent 50%, #030712 50%)' }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 shadow">
            <MdSportsSoccer size={12} />
            African Football Academy
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-[0.15em] text-white mb-3">
            Team <span className="text-blue-400">Squad</span>
          </h1>
          <p className="text-blue-300 uppercase tracking-[0.3em] text-xs font-semibold">
            {stats.length} Joueurs · Saison en cours
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
        </motion.div>
      </div>

      {/* ── FILTERS ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-4">
        {/* Search */}
        <div className="relative mb-5 max-w-sm">
          <input
            type="text"
            placeholder="Rechercher un joueur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-blue-950/60 border border-blue-800/50 focus:border-blue-500 text-white placeholder-blue-400 text-xs font-semibold uppercase tracking-widest rounded-full px-5 py-3 outline-none transition-colors"
          />
          <MdSportsSoccer className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
        </div>

        {/* Position filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {positions.map((pos) => (
            <motion.button
              key={pos}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePos(pos)}
              className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activePos === pos
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-transparent border-blue-800/50 text-blue-400 hover:border-blue-500 hover:text-white'
              }`}
            >
              {pos}
            </motion.button>
          ))}
        </div>

        {/* Section label */}
        <div className="flex items-center gap-3 mb-7">
          <span className="block w-1 h-7 rounded-full bg-red-500" />
          <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-300">
            {filtered.length} Joueur{filtered.length !== 1 ? 's' : ''}
          </h2>
          <span className="flex-1 h-px bg-gradient-to-r from-blue-800 to-transparent" />
        </div>
      </div>

      {/* ── PLAYER CARDS GRID ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((stat, i) => (
            <motion.div
              key={stat.$id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-blue-800/40 hover:border-blue-500/60 bg-gradient-to-b from-blue-900/40 to-blue-950/80 shadow-xl hover:shadow-blue-900/40 transition-all duration-300"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-red-500 to-transparent" />

              {/* Background glow */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-5 group-hover:opacity-10 transition-opacity"
                   style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />

              <div className="flex items-end gap-4 p-4">

                {/* Player image */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur group-hover:bg-blue-500/20 transition-colors" />
                  <img
                    src={stat.player}
                    alt={stat.name}
                    className="relative w-28 h-32 object-cover rounded-xl shadow-lg ring-2 ring-white/10 group-hover:ring-blue-400/40 transition-all duration-300"
                  />
                  {/* Rating badge */}
                  <div className="absolute -top-2 -right-2 w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex flex-col items-center justify-center shadow-lg shadow-yellow-500/30 z-10">
                    <span className="text-white text-[10px] font-black leading-none">{stat.rating}</span>
                    <HiStar size={8} className="text-white opacity-80" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pb-1">
                  <h3 className="text-white font-black text-base uppercase leading-tight truncate group-hover:text-blue-200 transition-colors mb-0.5">
                    {stat.name}
                  </h3>
                  <p className="text-green-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
                    {stat.nationality}
                  </p>

                  <div className="w-full h-px bg-blue-700/40 mb-3" />

                  <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                    <div>
                      <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Position</p>
                      <p className="text-white text-xs font-bold truncate">{stat.position}</p>
                    </div>
                    <div>
                      <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Rating</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 font-black text-xs">{stat.rating}</span>
                        <div className="flex-1 h-1 bg-blue-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min((stat.rating / 100) * 100, 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.04 }}
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Catégorie</p>
                      <span className="inline-block bg-blue-600/30 border border-blue-500/30 text-blue-200 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                        {stat.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <MdSportsSoccer size={48} className="text-blue-800 mb-4" />
            <p className="text-blue-400 font-black uppercase tracking-widest text-sm">Aucun joueur trouvé</p>
            <p className="text-blue-600 text-xs mt-1">Essayez une autre recherche ou position</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
