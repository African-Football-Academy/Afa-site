import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiClock, HiCalendar, HiTag } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

export default function Matchdetail() {
  const { matchId } = useParams()
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const getMatch = async () => {
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b745ae00108a8e6895',
          matchId
        )
        setMatch(response)
      } catch (error) {
        console.error('Error fetching match:', error)
      }
    }
    if (matchId) getMatch()
  }, [matchId])

  return (
    <div className="min-h-screen bg-gray-950 bg-img3 bg-cover relative">

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-gray-950/90 to-gray-950" />
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 110 }}
          className="w-full max-w-2xl"
        >

          {/* ── Card ── */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-800/40 bg-gradient-to-b from-blue-900/50 to-gray-900/80 backdrop-blur-md shadow-2xl shadow-blue-950/60">

            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent" />

            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center">
              <div className="inline-flex items-center gap-2 bg-red-600/80 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow border border-red-400/20">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Match à Venir
              </div>
              <h1 className="text-white font-black text-2xl uppercase tracking-[0.1em]">
                Fiche <span className="text-blue-400">Match</span>
              </h1>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-blue-700/50 to-transparent mb-6" />

            {/* ── Teams ── */}
            {!match ? (
              <div className="flex items-center justify-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <MdSportsSoccer size={40} className="text-blue-700" />
                </motion.div>
              </div>
            ) : (
              <>
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between gap-4">

                    {/* Home */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex-1 flex flex-col items-center gap-3"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-md scale-110" />
                        <div className="relative w-28 h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 overflow-hidden">
                          <img
                            src={match.home_team}
                            alt="Home"
                            className="w-full h-full object-contain drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <p className="text-white font-black text-sm uppercase tracking-wide text-center line-clamp-2 max-w-[120px]">
                        {match.home_name}
                      </p>
                      <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest bg-blue-900/40 border border-blue-700/30 px-3 py-1 rounded-full">
                        Domicile
                      </span>
                    </motion.div>

                    {/* VS */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-xl shadow-red-900/40 border border-red-500/20">
                        <span className="text-white font-black text-sm">VS</span>
                      </div>
                      <div className="w-px h-8 bg-gradient-to-b from-blue-700/60 to-transparent" />
                    </div>

                    {/* Away */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex-1 flex flex-col items-center gap-3"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-red-500/10 blur-md scale-110" />
                        <div className="relative w-28 h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 overflow-hidden">
                          <img
                            src={match.away_team}
                            alt="Away"
                            className="w-full h-full object-contain drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <p className="text-white font-black text-sm uppercase tracking-wide text-center line-clamp-2 max-w-[120px]">
                        {match.away_name}
                      </p>
                      <span className="text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-900/30 border border-red-700/30 px-3 py-1 rounded-full">
                        Extérieur
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* ── Match Info Grid ── */}
                <div className="mx-6 h-px bg-gradient-to-r from-transparent via-blue-700/40 to-transparent mb-5" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="px-6 pb-8 grid grid-cols-2 gap-3"
                >
                  {[
                    { icon: <HiLocationMarker size={16} className="text-red-400" />, label: 'Stade', value: match.stade },
                    { icon: <HiCalendar size={16} className="text-blue-400" />, label: 'Date', value: match.date },
                    { icon: <HiClock size={16} className="text-blue-400" />, label: 'Heure', value: match.time },
                    { icon: <HiTag size={16} className="text-yellow-400" />, label: 'Catégorie', value: match.category },
                  ].map(({ icon, label, value }) => (
                    <div key={label}
                         className="bg-blue-950/50 border border-blue-800/30 rounded-xl px-4 py-3 flex items-start gap-3">
                      <div className="mt-0.5">{icon}</div>
                      <div className="min-w-0">
                        <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest mb-0.5">{label}</p>
                        <p className="text-white text-xs font-bold truncate">{value || '—'}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
