import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { account } from '../AppwriteConfig'
import { 
  HiChartPie, 
  HiCollection, 
  HiPlusCircle, 
  HiOutlineUserGroup, 
  HiPhotograph,
  HiOutlineLogout,
  HiOutlineHome,
  HiSparkles
} from 'react-icons/hi'
import { BiVideo, BiStats } from "react-icons/bi"
import { TbSoccerField } from 'react-icons/tb'
import { GiTrophyCup } from 'react-icons/gi'
import { FaHandshake, FaTags, FaImages } from 'react-icons/fa6'
import afaLogo from '../img/AFRICAN FOOTBALL  ACADEMY.png'

export default function DashSidebar() {
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await account.get()
        setUser(res)
      } catch (e) {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  const handleSignout = async () => {
    try {
      await account.deleteSession('current')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error.message)
      navigate('/login')
    }
  }

  // Navigation structure
  const navSections = [
    {
      title: "Vue Générale",
      items: [
        { label: "Tableau de Bord", to: "/dashboard", icon: HiChartPie, match: ["/dashboard"] },
        { label: "Profil Académie", to: "/getprofile", icon: HiOutlineUserGroup, match: ["/getprofile", "/addprofile", "/updateprofile"] },
      ]
    },
    {
      title: "Gestion Contenu",
      items: [
        { label: "Actualités & Blog", to: "/blogs", icon: HiCollection, add: "/addblog", match: ["/blogs", "/addblog", "/updateblog"] },
        { label: "Vidéos AFA TV", to: "/videos", icon: BiVideo, add: "/addvid", match: ["/videos", "/addvid", "/updatevideo"] },
        { label: "Galerie Photos", to: "/getgallery", icon: HiPhotograph, add: "/addgal", match: ["/getgallery", "/addgal", "/updategallery"] },
        { label: "Bannières Hero", to: "/hero", icon: FaImages, add: "/addhero", match: ["/hero", "/addhero", "/updatehero"] },
      ]
    },
    {
      title: "Compétitions & Équipes",
      items: [
        { label: "Calendrier Matches", to: "/matches", icon: TbSoccerField, add: "/addmatch", match: ["/matches", "/addmatch", "/updatematch"] },
        { label: "Palmarès & Trophées", to: "/trophys", icon: GiTrophyCup, add: "/addtrophy", match: ["/trophys", "/addtrophy", "/updatetrophy"] },
        { label: "Stats Joueurs", to: "/stats", icon: BiStats, add: "/addstats", match: ["/stats", "/addstats", "/updatestat"] },
        { label: "Catégories", to: "/category", icon: FaTags, add: "/addcat", match: ["/category", "/addcat", "/updatecategory"] },
        { label: "Partenaires", to: "/partners", icon: FaHandshake, add: "/addpartners", match: ["/partners", "/addpartners", "/updatepartner"] },
      ]
    }
  ]

  return (
    <aside className="w-full md:w-64 bg-[#03091e] border-r border-white/10 flex flex-col justify-between min-h-screen text-slate-200">
      
      {/* ── TOP BRAND STRIP ── */}
      <div>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={afaLogo}
              alt="AFA"
              className="w-9 h-9 rounded-full bg-slate-900 p-1 border border-afa-blue/40 object-contain shadow-md group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="block font-black text-sm font-display uppercase tracking-wider text-white">
                AFA Admin
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-afa-gold">
                Centre de Contrôle
              </span>
            </div>
          </Link>

          <Link
            to="/"
            title="Aller sur le site public"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <HiOutlineHome className="w-4 h-4" />
          </Link>
        </div>

        {/* Current Admin User Badge */}
        {user && (
          <div className="mx-4 my-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-afa-red to-afa-blue flex items-center justify-center font-black text-xs text-white uppercase shadow">
              {user.name?.[0] || user.email?.[0] || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">
                {user.name || user.email}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Admin Connecté
              </span>
            </div>
          </div>
        )}

        {/* ── NAVIGATION GROUPS ── */}
        <div className="p-3 space-y-5">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon
                  const isActive = item.match.some(m => path.startsWith(m))

                  return (
                    <div key={iIdx} className="flex items-center gap-1 group">
                      <Link
                        to={item.to}
                        className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-afa-blue to-blue-700 text-white shadow-lg shadow-blue-700/30'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-afa-gold'}`} />
                        <span className="truncate">{item.label}</span>
                      </Link>

                      {/* Fast "+ Ajouter" Button if available */}
                      {item.add && (
                        <Link
                          to={item.add}
                          title={`Ajouter ${item.label}`}
                          className={`p-2 rounded-xl text-xs transition-colors ${
                            path === item.add
                              ? 'bg-afa-red text-white'
                              : 'text-slate-500 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <HiPlusCircle className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LOGOUT FOOTER ── */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleSignout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
        >
          <HiOutlineLogout className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>

    </aside>
  )
}
