import img1 from '../img/bg.png'
import img2 from '../img/afabg.png'
import imgo from '../img/orange money.png'
import imgv from '../img/Bitcoin.svg.webp'
import { MdMail } from 'react-icons/md'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { HiX, HiHeart, HiClipboardCopy, HiCheck } from 'react-icons/hi'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WALLET = 'Rv3We39Zxy79Evjw$9oipa28CVbw3'
const PHONE  = '(+237) 696 169 216'

export default function DonatePg() {
  const [showOrange, setShowOrange] = useState(false)
  const [showBtc, setShowBtc] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/80 to-gray-950/95" />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 flex flex-col items-center gap-8">

        {/* ── Club Identity ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {/* Logo */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl scale-125" />
            <img src={img2} alt="AFA" className="relative w-36 h-36 rounded-full object-cover ring-4 ring-white/10 ring-offset-4 ring-offset-blue-950 shadow-2xl" />
          </div>

          {/* Name + badge */}
          <div>
            <h1 className="text-white font-black text-3xl md:text-4xl uppercase tracking-[0.1em] leading-tight">
              African Football<br /><span className="text-blue-400">Academy</span>
            </h1>
            <span className="inline-block mt-2 bg-blue-700/60 border border-blue-500/40 text-blue-200 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
              Formation Club
            </span>
          </div>

          {/* Email */}
          <a href="mailto:africanfootballacademy0@gmail.com"
             className="flex items-center gap-2 text-blue-300 hover:text-white text-sm transition-colors">
            <MdMail size={18} className="text-red-400" />
            africanfootballacademy0@gmail.com
          </a>

          {/* Socials */}
          <div className="flex items-center gap-3 mt-1">
            {[
              { icon: <FaFacebook size={16} />, color: 'hover:bg-blue-600 hover:border-blue-500', text: 'text-blue-400' },
              { icon: <FaYoutube size={16} />, color: 'hover:bg-red-600 hover:border-red-500', text: 'text-red-400' },
              { icon: <FaInstagram size={16} />, color: 'hover:bg-pink-600 hover:border-pink-500', text: 'text-pink-400' },
            ].map(({ icon, color, text }, i) => (
              <motion.button key={i} whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}
                className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${text} ${color} transition-all duration-200`}>
                {icon}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Divider ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"
        />

        {/* ── Section label ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/40">
            <HiHeart size={22} className="text-white" />
          </div>
          <h2 className="text-white font-black text-xl uppercase tracking-[0.15em]">
            Soutenir l'Académie
          </h2>
          <p className="text-blue-300 text-sm max-w-sm">
            Votre don aide à former la prochaine génération de footballeurs africains.
          </p>
        </motion.div>

        {/* ── Payment options ────────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5 w-full">

          {/* Orange Money */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            whileHover={{ y: -5 }}
            onClick={() => setShowOrange(true)}
            className="group relative overflow-hidden rounded-2xl border border-orange-700/40 hover:border-orange-500/60 bg-gradient-to-b from-orange-950/40 to-orange-950/70 shadow-xl cursor-pointer transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500" />
            <div className="p-6 flex flex-col items-center gap-4 text-center">
              <img src={imgo} alt="Orange Money" className="w-24 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
              <div>
                <p className="text-orange-300 font-black text-xs uppercase tracking-widest mb-1">Mobile Money</p>
                <h3 className="text-white font-black text-lg">Orange Money</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
                Cliquez pour donner →
              </span>
            </div>
          </motion.div>

          {/* Bitcoin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
            onClick={() => setShowBtc(true)}
            className="group relative overflow-hidden rounded-2xl border border-yellow-700/40 hover:border-yellow-500/60 bg-gradient-to-b from-yellow-950/40 to-yellow-950/70 shadow-xl cursor-pointer transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300" />
            <div className="p-6 flex flex-col items-center gap-4 text-center">
              <img src={imgv} alt="Bitcoin" className="w-20 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
              <div>
                <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-1">Crypto</p>
                <h3 className="text-white font-black text-lg">Bitcoin</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full">
                Cliquez pour donner →
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Orange Money Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showOrange && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowOrange(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-gradient-to-b from-gray-800 to-gray-900 border border-orange-700/40 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500" />
              <button onClick={() => setShowOrange(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">
                <HiX size={16} className="text-white" />
              </button>
              <div className="p-8 flex flex-col items-center text-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-orange-400/20 rounded-full scale-150" />
                  <img src={imgo} alt="Orange Money" className="relative w-24 object-contain drop-shadow-2xl" />
                </div>
                <div>
                  <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-1">Mobile Money</p>
                  <h2 className="text-white font-black text-xl">Orange Money</h2>
                </div>
                <div className="w-full h-px bg-gray-700" />
                <div className="w-full">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Numéro de don</p>
                  <div className="flex items-center justify-between bg-orange-950/60 border border-orange-700/40 rounded-xl px-4 py-3">
                    <span className="text-white font-black text-sm">{PHONE}</span>
                    <button onClick={() => copy(PHONE)}
                      className="text-orange-400 hover:text-white transition-colors">
                      {copied ? <HiCheck size={16} className="text-green-400" /> : <HiClipboardCopy size={16} />}
                    </button>
                  </div>
                </div>
                <p className="text-orange-300 text-sm font-semibold">🙏 Merci pour votre générosité!</p>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setShowOrange(false)}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-full transition-all">
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bitcoin Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBtc && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowBtc(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-700/40 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500" />
              <button onClick={() => setShowBtc(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">
                <HiX size={16} className="text-white" />
              </button>
              <div className="p-8 flex flex-col items-center text-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-yellow-400/20 rounded-full scale-150" />
                  <img src={imgv} alt="Bitcoin" className="relative w-20 object-contain drop-shadow-2xl" />
                </div>
                <div>
                  <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-1">Crypto</p>
                  <h2 className="text-white font-black text-xl">Bitcoin</h2>
                </div>
                <div className="w-full h-px bg-gray-700" />
                <div className="w-full">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Adresse du Portefeuille</p>
                  <div className="flex items-center justify-between gap-2 bg-yellow-950/60 border border-yellow-700/40 rounded-xl px-4 py-3">
                    <span className="text-white font-bold text-xs truncate">{WALLET}</span>
                    <button onClick={() => copy(WALLET)}
                      className="text-yellow-400 hover:text-white transition-colors flex-shrink-0">
                      {copied ? <HiCheck size={16} className="text-green-400" /> : <HiClipboardCopy size={16} />}
                    </button>
                  </div>
                </div>
                <p className="text-yellow-300 text-sm font-semibold">🙏 Merci pour votre générosité!</p>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setShowBtc(false)}
                  className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-full transition-all">
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
