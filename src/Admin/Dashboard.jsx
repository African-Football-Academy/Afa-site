import { useEffect, useState } from 'react'
import DashSidebar from '../Component/Dashsidebar'
import { account, databases } from '../AppwriteConfig'
import { BiVideo, BiStats } from "react-icons/bi"
import { HiCollection, HiPhotograph, HiPlus, HiArrowRight, HiShieldCheck } from 'react-icons/hi'
import { TbSoccerField } from 'react-icons/tb'
import { GiTrophyCup } from 'react-icons/gi'
import { FaTags, FaLock, FaUsers } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import afaLogo from '../img/AFRICAN FOOTBALL  ACADEMY.png'

export default function Dashboard() {
  const [category, setCategory] = useState([])
  const [blogs, setBlog] = useState([])
  const [trophy, setTrophy] = useState([])
  const [video, setVideo] = useState([])
  const [gallery, setGallery] = useState([])
  const [stats, setStat] = useState([])
  const [matches, setMatches] = useState([])
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await account.get()
        setUserData(response)
      } catch (err) {
        setUserData(null)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const fetchAllCounts = async () => {
      // 1. Stats
      try {
        const res = await databases.listDocuments('67b7400000011dbf91e6', '67b747a4000895f519b2')
        setStat(res.documents)
      } catch (e) {
        setStat([])
      }

      // 2. Gallery
      try {
        const res = await databases.listDocuments('67b7400000011dbf91e6', '67b741e4000a15a0cce3')
        setGallery(res.documents)
      } catch (e) {
        setGallery([])
      }

      // 3. Videos
      try {
        const res = await databases.listDocuments('67b7400000011dbf91e6', '67b745140039f51d91f4')
        setVideo(res.documents)
      } catch (e) {
        setVideo([])
      }

      // 4. Trophy
      try {
        const res = await databases.listDocuments('67b7400000011dbf91e6', '67b748dc00341a15de29')
        setTrophy(res.documents)
      } catch (e) {
        setTrophy([])
      }

      // 5. Blog
      try {
        const res = await databases.listDocuments('67b7400000011dbf91e6', '67b74017001ae7cc6a35')
        setBlog(res.documents)
      } catch (e) {
        setBlog([])
      }

      // 6. Category
      try {
        const res = await databases.listDocuments('67b7400000011dbf91e6', '67b740ac0030d5738225')
        setCategory(res.documents)
      } catch (e) {
        setCategory([])
      }

      // 7. Matches
      try {
        const res = await databases.listDocuments('67b7400000011dbf91e6', '67b745fa000be05b76e5')
        setMatches(res.documents)
      } catch (e) {
        setMatches([])
      }
    }

    fetchAllCounts()
  }, [])

  const isAdmin = userData?.labels?.includes('admin') || userData?.labels?.[0] === 'admin'

  const statCards = [
    {
      title: "Actualités & Blog",
      count: blogs.length,
      icon: HiCollection,
      color: "from-blue-600 to-indigo-600",
      glow: "rgba(37,99,235,0.25)",
      link: "/blogs",
      addLink: "/addblog",
      addText: "Nouvel Article"
    },
    {
      title: "Vidéos AFA TV",
      count: video.length,
      icon: BiVideo,
      color: "from-rose-600 to-red-600",
      glow: "rgba(225,29,72,0.25)",
      link: "/videos",
      addLink: "/addvid",
      addText: "Nouvelle Vidéo"
    },
    {
      title: "Galerie Photos",
      count: gallery.length,
      icon: HiPhotograph,
      color: "from-amber-500 to-yellow-600",
      glow: "rgba(217,119,6,0.25)",
      link: "/getgallery",
      addLink: "/addgal",
      addText: "Ajouter Photo"
    },
    {
      title: "Palmarès & Trophées",
      count: trophy.length,
      icon: GiTrophyCup,
      color: "from-amber-400 to-amber-600",
      glow: "rgba(251,191,36,0.25)",
      link: "/trophys",
      addLink: "/addtrophy",
      addText: "Ajouter Trophée"
    },
    {
      title: "Pôles & Catégories",
      count: category.length,
      icon: FaTags,
      color: "from-emerald-500 to-teal-600",
      glow: "rgba(16,185,129,0.25)",
      link: "/category",
      addLink: "/addcat",
      addText: "Créer Catégorie"
    },
    {
      title: "Fiches Joueurs & Stats",
      count: stats.length,
      icon: BiStats,
      color: "from-sky-500 to-blue-600",
      glow: "rgba(14,165,233,0.25)",
      link: "/stats",
      addLink: "/addstats",
      addText: "Ficher Joueur"
    },
  ]

  const quickActions = [
    { label: "Programmer un Match", to: "/addmatch", icon: TbSoccerField, color: "bg-blue-600/20 text-blue-400 border-blue-500/30" },
    { label: "Publier une Actualité", to: "/addblog", icon: HiCollection, color: "bg-red-600/20 text-red-400 border-red-500/30" },
    { label: "Ajouter un Partenaire", to: "/addpartners", icon: HiShieldCheck, color: "bg-amber-600/20 text-amber-400 border-amber-500/30" },
    { label: "Mettre à jour le Profil Club", to: "/getprofile", icon: FaUsers, color: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30" },
  ]

  // Render Access Denied state if not admin
  if (!loading && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full p-8 rounded-3xl bg-[#070e22] border border-white/10 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-afa-red via-afa-gold to-afa-blue" />
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 shadow-xl shadow-red-500/10">
            <FaLock className="w-9 h-9" />
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-widest text-afa-red block mb-1">
            Sécurité & Accréditation
          </span>
          <h2 className="text-2xl font-black uppercase font-display text-white tracking-wide mb-3">
            Accès Réservé
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-8">
            Le tableau de bord administratif est exclusivement réservé à la direction et au staff technique de l'African Football Academy.
          </p>

          <div className="space-y-3">
            <Link
              to="/login"
              className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-afa-blue hover:bg-blue-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              Se Connecter comme Administrateur
            </Link>
            <Link
              to="/"
              className="w-full py-2.5 px-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              Retour à l'Accueil
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row">
      {/* Executive Sidebar */}
      <DashSidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* ── HEADER BANNER ── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#070e22] via-[#0b1739] to-[#070e22] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                    Système Opérationnel · Saison 2025/2026
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-display text-white tracking-tight">
                  Centre de Contrôle AFA
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Gestion centralisée des effectifs, actualités, vidéos et palmarès du club.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/addmatch"
                  className="px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-afa-red to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <HiPlus className="w-4 h-4" />
                  <span>Programmer un Match</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── QUICK ACTIONS STRIP ── */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">
              Actions Rapides
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon
                return (
                  <Link
                    key={i}
                    to={action.to}
                    className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all flex flex-col items-start gap-3 group"
                  >
                    <div className={`p-2.5 rounded-xl border ${action.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
                      {action.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* ── METRIC STAT CARDS ── */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">
              Statistiques de la Base de Données
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {statCards.map((card, idx) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="p-6 rounded-3xl bg-[#070e22] border border-white/10 hover:border-white/20 shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                  >
                    {/* Top colored highlight */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {card.title}
                        </span>
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-black font-display text-white">
                          {card.count}
                        </span>
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                          éléments enregistrés
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <Link
                        to={card.link}
                        className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <span>Gérer la liste</span>
                        <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        to={card.addLink}
                        className="text-[11px] font-bold uppercase tracking-wider text-afa-gold hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <HiPlus className="w-3 h-3" />
                        <span>{card.addText}</span>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── CLUB STATUS CARD ── */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={afaLogo}
                alt="AFA"
                className="w-12 h-12 rounded-full p-1 bg-slate-900 border border-white/15 object-contain"
              />
              <div>
                <h4 className="font-extrabold uppercase font-display text-sm tracking-wider text-white">
                  Centre d'Excellence Footballistique · Douala
                </h4>
                <p className="text-xs text-slate-400">
                  Affilié FÉCAFOOT · Partenaire Officiel Nike Academy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Appwrite Cloud Connecté
              </span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
