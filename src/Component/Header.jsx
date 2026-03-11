import { useEffect, useState } from 'react'
import logo from '../img/afa.png'
import { account } from '../AppwriteConfig'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoCloudOffline } from 'react-icons/io5'
import { HiMenu, HiX } from 'react-icons/hi'
import { toast } from 'react-toastify'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Stats', to: '/stat' },
  { label: 'Profil', to: '/about' },
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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const Signout = async () => {
    try {
      await account.deleteSession('current')
      navigate('/login')
      window.location.reload()
    } catch (error) {
      toast.error('Logout failed: ' + error.message)
    }
  }

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const allLinks = [
    ...navLinks,
    ...(userData ? [{ label: 'Compte', to: '/account' }] : []),
    ...(userData?.labels?.[0] === 'admin' ? [{ label: 'Tableau De Bord', to: '/dashboard' }] : []),
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-blue-950/95 backdrop-blur-md shadow-xl shadow-blue-950/40 border-b border-blue-800/50'
            : 'bg-gradient-to-b from-blue-950/90 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-sm group-hover:bg-blue-400/30 transition-colors" />
              <img
                src={logo}
                alt="AFA Logo"
                className="relative w-10 h-10 rounded-full ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-black text-xs uppercase tracking-widest leading-none">African Football</p>
              <p className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em]">Academy</p>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {allLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors duration-200 rounded-lg ${
                  isActive(link.to)
                    ? 'text-white'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                {isActive(link.to) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-blue-700/60 rounded-lg border border-blue-500/40"
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* ── Right: User ───────────────────────────────── */}
          <div className="flex items-center gap-3">
            {userData ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-white text-xs font-bold leading-none">{userData.name}</span>
                  {userData?.labels?.[0] === 'admin' && (
                    <span className="text-red-400 text-[10px] uppercase font-black tracking-widest">Admin</span>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={Signout}
                  title="Se déconnecter"
                  className="w-9 h-9 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <IoCloudOffline color="#f87171" size={18} />
                </motion.button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full border border-blue-400/30 transition-colors shadow-lg shadow-blue-900/30"
                >
                  Connecter
                </motion.button>
              </Link>
            )}

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              {menuOpen ? <HiX size={18} className="text-white" /> : <HiMenu size={18} className="text-white" />}
            </motion.button>
          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-blue-950/98 backdrop-blur-md border-t border-blue-800/50"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {/* User info mobile */}
                {userData && (
                  <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-blue-900/40 rounded-xl border border-blue-700/30">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-black">
                        {userData.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{userData.name}</p>
                      {userData?.labels?.[0] === 'admin' && (
                        <p className="text-red-400 text-[10px] uppercase font-black tracking-widest">Admin</p>
                      )}
                    </div>
                  </div>
                )}

                {allLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-colors ${
                        isActive(link.to)
                          ? 'bg-blue-700/50 text-white border border-blue-500/30'
                          : 'text-blue-300 hover:bg-blue-800/40 hover:text-white'
                      }`}
                    >
                      {isActive(link.to) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer so content isn't hidden under fixed header */}
      <div className="h-16" />
    </>
  )
}
