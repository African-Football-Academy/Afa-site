import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiClock, HiCalendar, HiTag, HiArrowLeft, HiTicket, HiSparkles } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'
import afaLogo from '../img/afa.png'
import canonLogo from '../img/canon.png'
import stadiumBg from '../img/building.jpg'

const fallbackMatchDetail = {
  $id: 'match-default',
  home_name: 'AFA Academy',
  away_name: 'Canon Yaoundé',
  home_team: afaLogo,
  away_team: canonLogo,
  stade: 'Stade de la Réunification, Douala',
  date: 'Dimanche 15 Novembre 2026',
  time: '15:30 GMT',
  category: 'Championnat Régional Littoral (FECAFOOT)',
  arbitre: 'Commission Régionale des Arbitres',
  billet: 'Entrée Gratuite pour les Jeunes & Supporters',
}

export default function Matchdetail() {
  const { matchId } = useParams()
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)

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
        console.warn('Match detail fallback:', error)
        setMatch(fallbackMatchDetail)
      } finally {
        setLoading(false)
      }
    }
    if (matchId) {
      getMatch()
    } else {
      setMatch(fallbackMatchDetail)
      setLoading(false)
    }
  }, [matchId])

  const currentMatch = match || fallbackMatchDetail

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 relative overflow-hidden">
      {/* Stadium backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${stadiumBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-blue-500 to-amber-400" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10 sm:pt-16">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400 hover:text-white bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full mb-8 transition-colors backdrop-blur-md"
        >
          <HiArrowLeft size={16} />
          <span>Retour au Calendrier</span>
        </Link>

        {/* Main Scoreboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-blue-800/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-red-500 to-amber-400" />

          {/* Header */}
          <div className="px-6 pt-8 pb-4 text-center">
            <span className="inline-flex items-center gap-2 bg-red-600/90 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              Affiche Officielle · {currentMatch.category || 'Championnat Régional'}
            </span>
            <h1 className="text-white font-black text-2xl sm:text-3xl uppercase tracking-tight font-display">
              Fiche <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Matchday</span>
            </h1>
          </div>

          {/* Teams Faceoff */}
          <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
              
              {/* Home Team */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-3xl bg-blue-500/20 blur-md scale-110" />
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-800/90 border border-white/10 flex items-center justify-center p-3 shadow-2xl">
                    <img
                      src={currentMatch.home_team || afaLogo}
                      alt={currentMatch.home_name || 'Home'}
                      className="w-full h-full object-contain drop-shadow"
                    />
                  </div>
                </div>
                <p className="text-white font-black text-lg uppercase tracking-wide text-center font-display">
                  {currentMatch.home_name || 'AFA Academy'}
                </p>
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest bg-blue-900/50 border border-blue-700/40 px-3 py-1 rounded-full">
                  Domicile
                </span>
              </div>

              {/* VS Center */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-rose-700 border-2 border-red-400/40 flex items-center justify-center shadow-xl shadow-red-900/60">
                  <span className="text-white font-black text-sm font-athletic tracking-wider">VS</span>
                </div>
                <span className="text-amber-400 font-black text-xs uppercase tracking-widest mt-1">
                  {currentMatch.time || '15:30 GMT'}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-3xl bg-red-500/20 blur-md scale-110" />
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-800/90 border border-white/10 flex items-center justify-center p-3 shadow-2xl">
                    <img
                      src={currentMatch.away_team || canonLogo}
                      alt={currentMatch.away_name || 'Away'}
                      className="w-full h-full object-contain drop-shadow"
                    />
                  </div>
                </div>
                <p className="text-white font-black text-lg uppercase tracking-wide text-center font-display">
                  {currentMatch.away_name || 'Adversaire'}
                </p>
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest bg-slate-800 border border-white/10 px-3 py-1 rounded-full">
                  Extérieur
                </span>
              </div>

            </div>
          </div>

          {/* Match Details Grid */}
          <div className="mx-6 h-px bg-white/10" />

          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <HiLocationMarker size={18} className="text-red-400" />, label: 'Stade & Ville', value: currentMatch.stade || 'Stade de la Réunification, Douala' },
              { icon: <HiCalendar size={18} className="text-blue-400" />, label: 'Date du Match', value: currentMatch.date || 'Prochainement' },
              { icon: <HiClock size={18} className="text-amber-400" />, label: 'Coup d’envoi', value: currentMatch.time || '15:30 GMT' },
              { icon: <HiTicket size={18} className="text-emerald-400" />, label: 'Accès & Billetterie', value: currentMatch.billet || 'Entrée Libre / Ouverte à tous' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-slate-950/70 border border-white/5 rounded-2xl p-4 flex items-start gap-3">
                <div className="mt-0.5">{icon}</div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-white text-xs sm:text-sm font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Strip */}
          <div className="px-6 py-4 bg-slate-950 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <HiSparkles className="text-amber-400" />
              Venez nombreux soutenir les académiciens de l'AFA !
            </span>
            <Link to="/donate">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg transition-all">
                Soutenir le Déplacement
              </button>
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
