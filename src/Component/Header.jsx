import { useEffect, useState } from 'react'
import logo from '../img/afa.png'
import { account } from '../AppwriteConfig'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoCloudOffline } from 'react-icons/io5'
import { HiMenu, HiX, HiHeart, HiLocationMarker, HiPhone } from 'react-icons/hi'
import { toast } from 'react-toastify'

const mainNavLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Club', to: '/about' },
  { label: 'Stats', to: '/stat' },
  { label: 'Trophées', to: '/trophy', badge: '' },
  { label: 'Galerie', to: '/gallery' },
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [userData, setUserData] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await account.get()
        setUserData(response)
      } catch (_) {}
    }
    getData()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const Signout = async () => {
    try {
      await account.deleteSession('current')
      navigate('/login')
      window.location.reload()
    } catch (error) {
      toast.error('Déconnexion échouée: ' + error.message)
    }
  }

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const mobileLinks = [
    ...mainNavLinks,
    ...(userData ? [{ label: 'Mon Espace', to: '/account' }] : []),
    ...(userData?.labels?.[0] === 'admin' ? [{ label: 'Dashboard Admin', to: '/dashboard', isAdmin: true }] : []),
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* ── Top Micro Bar: Sleek & Compact Official Status ────────────── */}
        <div className="bg-slate-950/95 border-b border-white/5 text-[10px] text-slate-300 py-1 px-4 hidden md:block backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1 bg-red-600/90 text-white font-black uppercase tracking-wider text-[8px] px-2 py-0.5 rounded-full shadow-sm">
                <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                Officiel
              </span>
              <span className="font-semibold tracking-wide text-slate-200">
                🏆 African Football Academy · Champion Régional Littoral 2026
              </span>
              <span className="text-blue-400 font-bold hidden lg:inline">· Inscriptions Ouvertes</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 font-medium">
              <span className="flex items-center gap-1 hover:text-white transition-colors">
                <HiLocationMarker className="text-red-500" size={11} />
                Douala, Cameroun
              </span>
              <span className="flex items-center gap-1 hover:text-white transition-colors">
                <HiPhone className="text-blue-400" size={11} />
                (+237) 696 169 216
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Glassmorphic Navigation Bar ────────────────────────────── */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-slate-950/90 backdrop-blur-xl border-b border-blue-900/40 shadow-xl shadow-black/80 py-2'
              : 'bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent backdrop-blur-md border-b border-white/10 py-2.5'
          }`}
        >
          <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* ── Club Logo & Name ────────────────────────────────────────── */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-red-600 opacity-50 blur-sm group-hover:opacity-100 transition-opacity" />
                <img
                  src={logo}
                  alt="AFA Logo"
                  className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-white/20 group-hover:ring-blue-400/80 transition-all object-cover bg-slate-900"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider text-white leading-none font-athletic group-hover:text-blue-400 transition-colors">
                  African Football
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400 font-bold text-[9px] uppercase tracking-widest mt-0.5">
                  Academy · Littoral
                </span>
              </div>
            </Link>

            {/* ── Desktop Streamlined Navigation Links ─────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5 bg-slate-900/50 p-1 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 rounded-full flex items-center gap-1.5 ${
                    isActive(link.to)
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive(link.to) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-md shadow-blue-600/30 border border-blue-400/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {link.badge && (
                    <span className="relative z-10 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] px-1.5 py-0.2 rounded-full font-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Right Controls: Donate & Auth ────────────────────────────── */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Donate Button */}
              <Link to="/donate" className="hidden sm:inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md shadow-emerald-950/40 border border-emerald-400/30 flex items-center gap-1.5 transition-all"
                >
                  <HiHeart className="text-red-300 group-hover:scale-110 transition-transform" size={13} />
                  <span>Soutenir</span>
                </motion.button>
              </Link>

              {/* User / Login */}
              {userData ? (
                <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-full py-1 px-2.5 backdrop-blur-md">
                  {userData?.labels?.[0] === 'admin' && (
                    <Link
                      to="/dashboard"
                      className="text-[9px] uppercase font-black px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-colors"
                    >
                      Admin
                    </Link>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={Signout}
                    title="Se déconnecter"
                    className="w-7 h-7 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-full flex items-center justify-center transition-colors text-red-400"
                  >
                    <IoCloudOffline size={13} />
                  </motion.button>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-blue-400/30 transition-all shadow-md shadow-blue-900/30"
                  >
                    Connexion
                  </motion.button>
                </Link>
              )}

              {/* Mobile Hamburger Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen((p) => !p)}
                className="lg:hidden w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center transition-colors text-white"
                aria-label="Toggle Navigation Menu"
              >
                {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer Menu ─────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-slate-950/98 backdrop-blur-2xl border-b border-blue-900/40 shadow-2xl"
            >
              <div className="px-5 py-5 flex flex-col gap-2 max-w-lg mx-auto">
                {/* User mobile banner */}
                {userData && (
                  <div className="flex items-center justify-between px-4 py-3 mb-2 bg-gradient-to-r from-blue-950 to-slate-900 rounded-2xl border border-blue-700/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center font-black text-white text-xs">
                        {userData.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs leading-tight">{userData.name}</p>
                        <p className="text-slate-400 text-[11px]">{userData.email}</p>
                      </div>
                    </div>
                    {userData?.labels?.[0] === 'admin' && (
                      <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                )}

                {mobileLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        isActive(link.to)
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive(link.to) ? 'bg-amber-400' : 'bg-slate-600'
                          }`}
                        />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.2 rounded-full font-black">
                          {link.badge}
                        </span>
                      )}
                      {link.isAdmin && (
                        <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] px-1.5 py-0.2 rounded-full font-black">
                          ADMIN
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Donate CTA */}
                <Link to="/donate" className="mt-2">
                  <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black uppercase tracking-wider py-2.5 rounded-xl shadow-lg border border-emerald-400/30">
                    <HiHeart className="text-red-300" size={15} />
                    <span>Faire un Don au Club</span>
                  </div>
                </Link>

                <div className="pt-3 mt-1 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Douala, Cameroun</span>
                  <a href="tel:+237696169216" className="text-blue-400 font-bold hover:underline">
                    (+237) 696 169 216
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content is not obscured by fixed header */}
      <div className="h-16 md:h-20" />
    </>
  )
}
