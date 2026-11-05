import img1 from '../img/bg.png'
import img2 from '../img/afabg.png'
import imgo from '../img/orange money.png'
import imgmomo from '../img/momo.png'
import imgv from '../img/Bitcoin.svg.webp'
import { MdMail } from 'react-icons/md'
import { HiX, HiHeart, HiClipboardCopy, HiShieldCheck } from 'react-icons/hi'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'

const WALLET = 'Rv3We39Zxy79Evjw$9oipa28CVbw3'
const PHONE_ORANGE = '(+237) 696 169 216'
const PHONE_MTN = '(+237) 670 000 000'

export default function DonatePg() {
  const [showOrange, setShowOrange] = useState(false)
  const [showMtn, setShowMtn] = useState(false)
  const [showBtc, setShowBtc] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = (text, label = 'Information copiée !') => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success(label)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-100 font-sans pb-24 overflow-hidden">
      <ToastContainer theme="dark" position="top-right" autoClose={2500} />

      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${img1})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center gap-12">

        {/* ── Club Identity Header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 text-center max-w-2xl"
        >
          {/* Logo with emerald halo */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-50 blur-xl animate-pulse" />
            <img
              src={img2}
              alt="AFA Logo"
              className="relative w-32 h-32 rounded-full object-cover ring-4 ring-emerald-500/40 shadow-2xl bg-slate-900"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full mb-3">
              <HiHeart className="text-red-400" size={13} />
              Programme Mécénat & Sponsoring
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display">
              Soutenir <span className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-blue-400 to-blue-300">African Football Academy</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
              Chaque contribution permet de financer des bourses d'entraînement, des équipements complets, des frais scolaires et des soins médicaux pour nos jeunes prodiges.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            <a
              href="mailto:africanfootballacademy@gmail.com"
              className="flex items-center gap-1.5 hover:text-white bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full transition-colors"
            >
              <MdMail size={16} className="text-amber-400" />
              <span>africanfootballacademy@gmail.com</span>
            </a>
            <span className="flex items-center gap-1.5 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full">
              <HiShieldCheck className="text-emerald-400" size={16} />
              <span>100% Dédié aux Jeunes Académiciens</span>
            </span>
          </div>
        </motion.div>

        {/* ── Impact Milestones ──────────────────────────────────────────────── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              amount: '15 000 FCFA',
              title: 'Kit d’Entraînement',
              desc: 'Fourniture complète : maillots, protège-tibias, chaussettes et gourde pour 1 joueur.',
              icon: '👕',
            },
            {
              amount: '50 000 FCFA',
              title: 'Prise en Charge Médicale & Nutrition',
              desc: 'Suivi par un médecin du sport, bilan ostéopathique et compléments de récupération.',
              icon: '🏥',
            },
            {
              amount: '150 000 FCFA',
              title: 'Bourse Annuelle Sport-Études',
              desc: 'Frais de scolarité, fournitures et licence officielle FECAFOOT pour la saison.',
              icon: '🎓',
            },
          ].map((tier, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-emerald-900/40 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{tier.icon}</span>
                  <span className="text-xs font-black uppercase text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                    {tier.amount}
                  </span>
                </div>
                <h3 className="text-white font-black text-base uppercase font-display mb-1.5">
                  {tier.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Section Title ──────────────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase text-white font-display">
            Choisissez votre Moyen de Contribution
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Sélectionnez une option sécurisée ci-dessous pour afficher les détails.
          </p>
        </div>

        {/* ── Payment Options Grid ───────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-5 w-full">

          {/* Orange Money */}
          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => setShowOrange(true)}
            className="group relative overflow-hidden rounded-3xl border border-orange-700/40 hover:border-orange-500 bg-gradient-to-b from-slate-900 via-orange-950/20 to-slate-900 p-6 flex flex-col items-center text-center gap-4 cursor-pointer shadow-xl transition-all"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-500 absolute top-0 left-0 right-0" />
            <div className="w-20 h-20 rounded-2xl bg-slate-950 p-2 flex items-center justify-center shadow-lg group-hover:scale-108 transition-transform">
              <img src={imgo} alt="Orange Money" className="w-full object-contain" />
            </div>
            <div>
              <p className="text-orange-400 font-black text-[10px] uppercase tracking-widest">Mobile Money</p>
              <h3 className="text-white font-black text-lg font-display">Orange Money</h3>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-300 bg-orange-500/20 px-4 py-1.5 rounded-full border border-orange-500/30">
              Afficher le Numéro →
            </span>
          </motion.div>

          {/* MTN Mobile Money */}
          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => setShowMtn(true)}
            className="group relative overflow-hidden rounded-3xl border border-yellow-700/40 hover:border-yellow-400 bg-gradient-to-b from-slate-900 via-yellow-950/20 to-slate-900 p-6 flex flex-col items-center text-center gap-4 cursor-pointer shadow-xl transition-all"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-yellow-500 to-amber-400 absolute top-0 left-0 right-0" />
            <div className="w-20 h-20 rounded-2xl bg-slate-950 p-2 flex items-center justify-center shadow-lg group-hover:scale-108 transition-transform">
              <img src={imgmomo} alt="MTN MoMo" className="w-full object-contain" />
            </div>
            <div>
              <p className="text-yellow-400 font-black text-[10px] uppercase tracking-widest">Mobile Money</p>
              <h3 className="text-white font-black text-lg font-display">MTN MoMo</h3>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-yellow-300 bg-yellow-500/20 px-4 py-1.5 rounded-full border border-yellow-500/30">
              Afficher le Numéro →
            </span>
          </motion.div>

          {/* Bitcoin / Crypto */}
          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => setShowBtc(true)}
            className="group relative overflow-hidden rounded-3xl border border-amber-600/40 hover:border-amber-400 bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-900 p-6 flex flex-col items-center text-center gap-4 cursor-pointer shadow-xl transition-all"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-yellow-300 absolute top-0 left-0 right-0" />
            <div className="w-20 h-20 rounded-2xl bg-slate-950 p-2 flex items-center justify-center shadow-lg group-hover:scale-108 transition-transform">
              <img src={imgv} alt="Bitcoin" className="w-16 object-contain" />
            </div>
            <div>
              <p className="text-amber-400 font-black text-[10px] uppercase tracking-widest">Paiement Crypto</p>
              <h3 className="text-white font-black text-lg font-display">Bitcoin (BTC)</h3>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-500/30">
              Adresse Portefeuille →
            </span>
          </motion.div>

        </div>

      </div>

      {/* ── Orange Money Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showOrange && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setShowOrange(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-slate-900 border border-orange-500/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 absolute top-0 left-0 right-0" />
              <button
                onClick={() => setShowOrange(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <HiX size={18} />
              </button>

              <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-950 p-2 flex items-center justify-center shadow-lg mb-3">
                <img src={imgo} alt="Orange Money" className="w-full object-contain" />
              </div>

              <h2 className="text-xl font-black uppercase text-white font-display">Don via Orange Money</h2>
              <p className="text-xs text-slate-400 mt-1 mb-4">Transfert direct au compte officiel de l'Académie</p>

              <div className="bg-slate-950 rounded-2xl p-4 border border-orange-800/40 mb-5 flex items-center justify-between">
                <span className="text-white font-black text-sm">{PHONE_ORANGE}</span>
                <button
                  onClick={() => copy(PHONE_ORANGE, 'Numéro Orange Money copié !')}
                  className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
                >
                  <HiClipboardCopy size={14} />
                  <span>Copier</span>
                </button>
              </div>

              <p className="text-xs text-emerald-400 font-semibold mb-5">
                🙏 Merci infiniment pour votre générosité !
              </p>

              <button
                onClick={() => setShowOrange(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase py-3 rounded-full"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MTN MoMo Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showMtn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setShowMtn(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-slate-900 border border-yellow-400/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 absolute top-0 left-0 right-0" />
              <button
                onClick={() => setShowMtn(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <HiX size={18} />
              </button>

              <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-950 p-2 flex items-center justify-center shadow-lg mb-3">
                <img src={imgmomo} alt="MTN MoMo" className="w-full object-contain" />
              </div>

              <h2 className="text-xl font-black uppercase text-white font-display">Don via MTN MoMo</h2>
              <p className="text-xs text-slate-400 mt-1 mb-4">Transfert direct Mobile Money Cameroun</p>

              <div className="bg-slate-950 rounded-2xl p-4 border border-yellow-800/40 mb-5 flex items-center justify-between">
                <span className="text-white font-black text-sm">{PHONE_ORANGE}</span>
                <button
                  onClick={() => copy(PHONE_ORANGE, 'Numéro MTN MoMo copié !')}
                  className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
                >
                  <HiClipboardCopy size={14} />
                  <span>Copier</span>
                </button>
              </div>

              <p className="text-xs text-emerald-400 font-semibold mb-5">
                🙏 Merci infiniment pour votre générosité !
              </p>

              <button
                onClick={() => setShowMtn(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase py-3 rounded-full"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bitcoin Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBtc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setShowBtc(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-slate-900 border border-amber-400/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 absolute top-0 left-0 right-0" />
              <button
                onClick={() => setShowBtc(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <HiX size={18} />
              </button>

              <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-950 p-2 flex items-center justify-center shadow-lg mb-3">
                <img src={imgv} alt="Bitcoin" className="w-14 object-contain" />
              </div>

              <h2 className="text-xl font-black uppercase text-white font-display">Don en Bitcoin (BTC)</h2>
              <p className="text-xs text-slate-400 mt-1 mb-4">Réseau natif Bitcoin</p>

              <div className="bg-slate-950 rounded-2xl p-4 border border-amber-800/40 mb-5 flex items-center justify-between gap-2">
                <span className="text-white font-mono text-[11px] truncate">{WALLET}</span>
                <button
                  onClick={() => copy(WALLET, 'Adresse Bitcoin copiée !')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 flex-shrink-0 transition-all"
                >
                  <HiClipboardCopy size={14} />
                  <span>Copier</span>
                </button>
              </div>

              <p className="text-xs text-emerald-400 font-semibold mb-5">
                🙏 Merci pour votre soutien précieux !
              </p>

              <button
                onClick={() => setShowBtc(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase py-3 rounded-full"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
