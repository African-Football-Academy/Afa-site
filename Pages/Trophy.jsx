import { useState, useEffect } from 'react'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { motion, AnimatePresence } from 'framer-motion'
import { HiTrophy } from 'react-icons/hi2'
import { HiX, HiStar, HiCalendar, HiSparkles, HiArrowRight, HiCheckCircle } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'
import trophyMain from '../img/trophy/trophy.png'
import trophy2 from '../img/trophy/trophy 2.png'
import trophy3 from '../img/trophy/trophy 3.png'
import trophy4 from '../img/trophy/trophy 4.png'
import trophy5 from '../img/trophy/trophy 5.png'

const fallbackTrophies = [
  {
    $id: 't-1',
    title: 'Champion Régional du Littoral',
    num_title: 'Saison 2025/2026',
    year: '2026',
    category: 'Championnat',
    trophy_img: trophyMain,
    desc: "Titre suprême de la ligue régionale de football du Littoral (FECAFOOT). L'AFA termine première et invaincue avec la meilleure attaque et la meilleure défense du tournoi.",
    score: 'Finale : AFA 3 - 1 Canon Littoral',
    stade: 'Stade de la Réunification, Douala',
  },
  {
    $id: 't-2',
    title: 'Coupe des Espoirs U17',
    num_title: 'Édition 2025',
    year: '2025',
    category: 'Coupe',
    trophy_img: trophy2,
    desc: 'Victoire éclatante de nos cadets lors du grand tournoi de détection rassemblant les 16 meilleures académies de la sous-région Afrique Centrale.',
    score: 'Finale : AFA U17 2 - 0 AS Stars',
    stade: 'Complexe Omnisports Bépanda',
  },
  {
    $id: 't-3',
    title: 'Tournoi National de Détection',
    num_title: 'Édition 2024',
    year: '2024',
    category: 'Tournoi',
    trophy_img: trophy3,
    desc: 'Consécration nationale récompensant le jeu collectif, la créativité et la rigueur tactique de la promotion 2024.',
    score: 'Finale : AFA 1 - 0 Coton Espoirs',
    stade: 'Stade Ahmadou Ahidjo',
  },
  {
    $id: 't-4',
    title: 'Super Coupe Jeunes FECAFOOT',
    num_title: 'Saison 2024',
    year: '2024',
    category: 'Super Coupe',
    trophy_img: trophy4,
    desc: 'Match des champions opposant le vainqueur du championnat régional au vainqueur de la coupe des jeunes.',
    score: 'Score Final : AFA 2 - 1 Union Junior',
    stade: 'Stade Omnisports de Bafoussam',
  },
  {
    $id: 't-5',
    title: 'Coupe de la Ville de Douala',
    num_title: 'Édition 2023',
    year: '2023',
    category: 'Coupe',
    trophy_img: trophy5,
    desc: 'Trophée d’honneur municipal récompensant l’académie la plus performante et disciplinée de la métropole économique.',
    score: 'Finale : AFA 4 - 2 Eding FC',
    stade: 'Stade Mbappé Léppé, Douala',
  },
  {
    $id: 't-6',
    title: 'Championnat Minimes U12',
    num_title: 'Saison 2023',
    year: '2023',
    category: 'Championnat',
    trophy_img: trophyMain,
    desc: 'Couronnement de notre école de football minime avec un parcours parfait de 14 victoires en 14 journées.',
    score: 'Score Final : AFA U12 5 - 0 Panther Junior',
    stade: 'Centre Technique AFA',
  },
]

export default function Trophy() {
  const [showModal, setShowModal] = useState(false)
  const [trophy, setTrophy] = useState([])
  const [trophydetails, setTrophydetails] = useState(null)
  const [trophyId, setTrophyId] = useState('')
  const [filter, setFilter] = useState('Tous')

  useEffect(() => {
    const getTrophy = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b748dc00341a15de29',
          [Query.orderDesc('createdAt')]
        )
        if (response.documents && response.documents.length > 0) {
          setTrophy(response.documents)
        } else {
          setTrophy(fallbackTrophies)
        }
      } catch (error) {
        console.warn('Trophy fetch fallback:', error)
        setTrophy(fallbackTrophies)
      }
    }
    getTrophy()
  }, [])

  const displayTrophies = trophy.length > 0 ? trophy : fallbackTrophies

  const categories = ['Tous', 'Championnat', 'Coupe', 'Tournoi']

  const filteredTrophies = displayTrophies.filter((t) => {
    if (filter === 'Tous') return true
    return t.category?.toLowerCase() === filter.toLowerCase()
  })

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
        // Fallback local search
        const found = fallbackTrophies.find((t) => t.$id === trophyId)
        if (found) setTrophydetails(found)
      }
    }
    getTrophydetails()
  }, [trophyId])

  const handleOpen = (id) => {
    setTrophyId(id)
    const localItem = displayTrophies.find((t) => t.$id === id)
    setTrophydetails(localItem)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950 py-24 px-6 border-b border-amber-900/40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-amber-950/40 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 140, delay: 0.1 }}
            className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/40 mb-6 border-2 border-amber-300/40"
          >
            <HiTrophy size={44} className="text-slate-950 drop-shadow" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display mb-3"
          >
            Salle des <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">Trophées</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-amber-200/90 uppercase tracking-[0.25em] text-xs font-semibold max-w-xl"
          >
            African Football Academy · Le Palmarès & Les Titres Historiques
          </motion.p>

          <div className="mt-5 w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 rounded-full" />

          {/* Count Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
            <HiStar className="text-amber-400" size={15} />
            <span>{displayTrophies.length} Titres Officiels Remportés</span>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-black uppercase tracking-wider px-5 py-2 rounded-full border transition-all duration-200 ${
                filter === cat
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-900/50'
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── TROPHIES GRID ────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrophies.map((trop, i) => (
            <motion.div
              key={trop.$id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => handleOpen(trop.$id)}
              className="group relative cursor-pointer bg-gradient-to-b from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-900/40 hover:border-amber-400/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Glowing Top Foil Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />

              <div>
                {/* Year Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                    {trop.category || 'Titre Officiel'}
                  </span>
                  <span className="text-xs font-extrabold text-slate-400 flex items-center gap-1">
                    <HiCalendar size={13} className="text-amber-400" />
                    {trop.year || '2026'}
                  </span>
                </div>

                {/* Trophy Image Showcase */}
                <div className="relative w-full h-44 my-2 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full bg-amber-400/10 blur-xl group-hover:bg-amber-400/20 transition-all pointer-events-none" />
                  <img
                    src={trop.trophy_img || trophyMain}
                    alt={trop.title}
                    className="relative max-h-36 max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="text-center mt-3">
                  <h3 className="text-white font-black text-lg uppercase leading-tight font-display group-hover:text-amber-300 transition-colors">
                    {trop.title}
                  </h3>
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mt-1">
                    {trop.num_title || 'Championnat Régional'}
                  </p>
                  <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                    {trop.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-400 group-hover:text-white transition-colors">
                <span>Détails du Sacre</span>
                <HiArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DETAIL MODAL ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && trophydetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-900 border border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Fermer"
              >
                <HiX size={20} />
              </button>

              {/* Modal Content */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 my-3">
                  <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl" />
                  <img
                    src={trophydetails.trophy_img || trophyMain}
                    alt={trophydetails.title}
                    className="relative w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 mb-2">
                  {trophydetails.category || 'Titre Officiel'} · {trophydetails.year || '2026'}
                </span>

                <h2 className="text-2xl font-black uppercase text-white font-display">
                  {trophydetails.title}
                </h2>
                
                <p className="text-amber-300 text-xs font-bold uppercase tracking-wider mt-1 mb-4">
                  {trophydetails.num_title || 'Palmarès AFA'}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {trophydetails.desc}
                </p>

                {/* Score & Venue info */}
                <div className="w-full bg-slate-950/70 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 text-xs text-left mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Résultat :</span>
                    <span className="text-amber-400 font-extrabold">{trophydetails.score || 'Victoire AFA'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Stade :</span>
                    <span className="text-white font-semibold">{trophydetails.stade || 'Douala, Cameroun'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Statut :</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <HiCheckCircle />
                      Trophée Exposé au Siège
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-widest py-3 rounded-full transition-all shadow-lg"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
