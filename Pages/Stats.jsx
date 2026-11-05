import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiSparkles, HiSearch, HiX, HiFilter } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'
import player1 from '../img/afa4.jpg'
import player2 from '../img/afa5.jpg'
import player3 from '../img/afa6.jpg'
import player4 from '../img/afa2.jpg'
import player5 from '../img/afa3.jpg'
import player6 from '../img/afab.jpg'

const fallbackStats = [
  {
    $id: 'stat-p1',
    name: 'Samuel M. Eyong',
    nationality: 'Cameroun',
    position: 'Attaquant (BU)',
    rating: 94,
    category: 'Pôle Élite U17',
    player: player1,
    pace: 96,
    shooting: 92,
    passing: 85,
    dribbling: 94,
    defense: 45,
    physical: 88,
  },
  {
    $id: 'stat-p2',
    name: 'Franck O. Kamga',
    nationality: 'Cameroun',
    position: 'Milieu (MC)',
    rating: 91,
    category: 'Promotion 2026',
    player: player2,
    pace: 88,
    shooting: 84,
    passing: 93,
    dribbling: 90,
    defense: 78,
    physical: 85,
  },
  {
    $id: 'stat-p3',
    name: 'Junior N. Bassong',
    nationality: 'Cameroun',
    position: 'Ailier Droit (AD)',
    rating: 89,
    category: 'Pôle Espoirs U15',
    player: player3,
    pace: 95,
    shooting: 86,
    passing: 82,
    dribbling: 91,
    defense: 40,
    physical: 76,
  },
  {
    $id: 'stat-p4',
    name: 'Eric T. Moukandjo',
    nationality: 'Cameroun',
    position: 'Défenseur Central (DC)',
    rating: 88,
    category: 'Pôle Élite U17',
    player: player4,
    pace: 84,
    shooting: 60,
    passing: 78,
    dribbling: 75,
    defense: 92,
    physical: 94,
  },
  {
    $id: 'stat-p5',
    name: 'Stephane M. Aboubakar',
    nationality: 'Cameroun',
    position: 'Ailier Gauche (AG)',
    rating: 92,
    category: 'Promotion 2026',
    player: player5,
    pace: 97,
    shooting: 89,
    passing: 84,
    dribbling: 95,
    defense: 42,
    physical: 82,
  },
  {
    $id: 'stat-p6',
    name: 'Andre O. Nsamé',
    nationality: 'Cameroun',
    position: 'Gardien de But (GK)',
    rating: 90,
    category: 'Équipe Première',
    player: player6,
    pace: 75,
    shooting: 50,
    passing: 82,
    dribbling: 70,
    defense: 94,
    physical: 89,
  },
]

export default function Stats() {
  const [stats, setStat] = useState([])
  const [search, setSearch] = useState('')
  const [activePos, setActivePos] = useState('Tous')
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  useEffect(() => {
    const getStat = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b747a4000895f519b2',
          [Query.orderDesc('createdAt')]
        )
        if (response.documents && response.documents.length > 0) {
          setStat(response.documents)
        } else {
          setStat(fallbackStats)
        }
      } catch (error) {
        console.warn('Stats fetch fallback:', error)
        setStat(fallbackStats)
      }
    }
    getStat()
  }, [])

  const displayStats = stats.length > 0 ? stats : fallbackStats

  const positions = ['Tous', 'Attaquant', 'Milieu', 'Défenseur', 'Gardien']

  const filtered = displayStats.filter((s) => {
    const pos = s.position?.toLowerCase() || ''
    const matchPos =
      activePos === 'Tous' ||
      (activePos === 'Attaquant' && (pos.includes('att') || pos.includes('bu') || pos.includes('ad') || pos.includes('ag') || pos.includes('ailier'))) ||
      (activePos === 'Milieu' && (pos.includes('mil') || pos.includes('mc') || pos.includes('mdc') || pos.includes('moc'))) ||
      (activePos === 'Défenseur' && (pos.includes('déf') || pos.includes('def') || pos.includes('dc') || pos.includes('dd') || pos.includes('dg'))) ||
      (activePos === 'Gardien' && (pos.includes('gard') || pos.includes('gk')))

    const matchSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.nationality?.toLowerCase().includes(search.toLowerCase()) ||
      s.position?.toLowerCase().includes(search.toLowerCase()) ||
      s.category?.toLowerCase().includes(search.toLowerCase())

    return matchPos && matchSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950 py-24 px-6 border-b border-blue-900/40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-blue-500 to-amber-400" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 text-white text-[11px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5 shadow-lg border border-red-400/30">
            <MdSportsSoccer size={14} className="text-amber-300" />
            <span>Effectif Officiel · Roster 2026/2027</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display mb-3">
            Fiches & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Statistiques</span> Joueurs
          </h1>

          <p className="text-slate-300 uppercase tracking-[0.25em] text-xs font-semibold max-w-xl mx-auto">
            {displayStats.length} Joueurs Référencés · Évaluations & Notes FIFA Pro
          </p>

          <div className="mt-5 mx-auto w-24 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-amber-400 rounded-full" />
        </motion.div>
      </div>

      {/* ── SEARCH & FILTERS BAR ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Rechercher par nom, poste, catégorie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-blue-900/50 focus:border-blue-400 text-white placeholder-slate-400 text-xs font-semibold rounded-full pl-11 pr-10 py-3.5 outline-none transition-all shadow-inner"
            />
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <HiX size={16} />
              </button>
            )}
          </div>

          {/* Player Count Indicator */}
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="text-amber-400 font-extrabold">{filtered.length}</span> joueur(s) affiché(s)
          </div>
        </div>

        {/* Position Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          {positions.map((pos) => (
            <motion.button
              key={pos}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePos(pos)}
              className={`text-xs font-black uppercase tracking-wider px-5 py-2 rounded-full border transition-all duration-200 ${
                activePos === pos
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/50'
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {pos}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── PLAYER CARDS GRID ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((stat, i) => (
            <motion.div
              key={stat.$id || i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPlayer(stat)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-blue-900/40 hover:border-amber-400/80 bg-slate-900 shadow-xl hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300"
            >
              {/* Card Holographic Top Foil */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500" />

              <div className="p-5 flex items-end gap-5">
                {/* Player Photo with Shield */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-400 to-blue-600 opacity-30 blur-sm group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-28 h-36 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-amber-400/80 shadow-xl bg-slate-950">
                    <img
                      src={stat.player || player1}
                      alt={stat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  </div>

                  {/* Rating Circle */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl border-2 border-slate-900 flex flex-col items-center justify-center shadow-lg shadow-amber-500/40">
                    <span className="text-slate-950 text-xs font-black leading-none font-display">
                      {stat.rating || 88}
                    </span>
                    <HiStar size={8} className="text-slate-950" />
                  </div>
                </div>

                {/* Player Stats Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase px-2 py-0.2 rounded-full">
                      {stat.nationality || 'Cameroun'}
                    </span>
                  </div>

                  <h3 className="text-white font-black text-base uppercase leading-tight truncate group-hover:text-amber-300 transition-colors font-display">
                    {stat.name}
                  </h3>

                  <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                    {stat.position}
                  </p>

                  <div className="w-full h-px bg-white/10 mb-2" />

                  {/* Rating Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                      <span className="text-slate-400">Note OVR</span>
                      <span className="text-amber-400 font-extrabold">{stat.rating || 88}/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${Math.min(stat.rating || 88, 100)}%` }}
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <span className="inline-block bg-blue-600/30 border border-blue-500/30 text-blue-200 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full truncate max-w-full">
                      {stat.category || 'Pôle Élite'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/50 rounded-3xl border border-white/5 p-8">
            <MdSportsSoccer size={48} className="text-blue-500 mb-3 animate-bounce" />
            <p className="text-white font-black uppercase tracking-wider text-base">Aucun joueur correspondant</p>
            <p className="text-slate-400 text-xs mt-1">Modifiez vos critères de recherche ou réinitialisez les filtres.</p>
            <button
              onClick={() => { setSearch(''); setActivePos('Tous'); }}
              className="mt-4 bg-blue-600 text-white text-xs font-black uppercase px-5 py-2 rounded-full"
            >
              Réinitialiser les Filtres
            </button>
          </div>
        )}
      </div>

      {/* ── PLAYER DETAIL MODAL ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedPlayer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-slate-900 border border-blue-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500" />
              
              <button
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <HiX size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-40 rounded-2xl overflow-hidden ring-4 ring-amber-400/60 shadow-2xl mb-4 bg-slate-950">
                  <img
                    src={selectedPlayer.player || player1}
                    alt={selectedPlayer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -top-2 -right-2 w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-black text-slate-950 font-display">
                    {selectedPlayer.rating || 90}
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-0.5 rounded-full border border-emerald-500/30 mb-1">
                  {selectedPlayer.nationality || 'Cameroun'} · {selectedPlayer.category || 'AFA Élite'}
                </span>

                <h2 className="text-2xl font-black uppercase text-white font-display">
                  {selectedPlayer.name}
                </h2>

                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                  {selectedPlayer.position}
                </p>

                {/* Stat Grid */}
                <div className="w-full grid grid-cols-3 gap-2.5 mb-6 text-left">
                  {[
                    { label: 'Vitesse (PAC)', val: selectedPlayer.pace || 92 },
                    { label: 'Tir (SHO)', val: selectedPlayer.shooting || 88 },
                    { label: 'Passe (PAS)', val: selectedPlayer.passing || 86 },
                    { label: 'Dribble (DRI)', val: selectedPlayer.dribbling || 90 },
                    { label: 'Défense (DEF)', val: selectedPlayer.defense || 70 },
                    { label: 'Physique (PHY)', val: selectedPlayer.physical || 85 },
                  ].map((s, idx) => (
                    <div key={idx} className="bg-slate-950 border border-white/5 rounded-xl p-2.5 text-center">
                      <p className="text-slate-400 text-[9px] font-bold uppercase truncate">{s.label}</p>
                      <p className="text-white font-black text-base font-display mt-0.5">{s.val}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest py-3 rounded-full transition-all"
                >
                  Fermer la Fiche
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
