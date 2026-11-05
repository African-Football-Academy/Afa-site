import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../AppwriteConfig'
import { toast, ToastContainer } from 'react-toastify'
import imgProfile from '../img/profile.png'
import afaLogo from '../img/afa.png'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiPhone, HiLogout, HiPencil, HiCheck, HiSparkles, HiShieldCheck } from 'react-icons/hi'
import { IoCloudOffline } from 'react-icons/io5'
import { MdSportsSoccer } from 'react-icons/md'

export default function Account() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await account.get()
        setUserData(response)
        setName(response.name || '')
        setEmail(response.email || '')
        setPhone(response.phone || '')
      } catch (_) {}
    }
    getData()
  }, [])

  const Signout = async () => {
    try {
      await account.deleteSession('current')
      navigate('/login')
      window.location.reload()
    } catch (error) {
      toast.error('Déconnexion échouée: ' + error.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (name !== userData?.name) await account.updateName(name)
      if (email !== userData?.email) await account.updateEmail(email)
      if (phone !== userData?.phone && phone) await account.updatePhone(phone)
      toast.success('Profil mis à jour avec succès !')
    } catch (error) {
      toast.error('Erreur: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Not logged in
  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-slate-900 border border-blue-900/50 rounded-3xl p-8 sm:p-10 max-w-md w-full flex flex-col items-center gap-5 text-center shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
            <HiUser size={30} className="text-blue-400" />
          </div>
          <h2 className="text-white font-black text-2xl uppercase tracking-tight font-display">
            Accès Membre Requis
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Vous devez être connecté à votre compte pour consulter vos informations personnelles et votre badge officiel.
          </p>
          <Link to="/login" className="w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-full transition-all shadow-lg shadow-blue-900/40">
              Se Connecter
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      <ToastContainer theme="dark" position="top-right" autoClose={2500} />

      {/* ── HERO BANNER ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950 py-20 px-6 border-b border-blue-900/40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-blue-500 to-amber-400" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full mb-3">
            <HiShieldCheck size={14} className="text-emerald-400" />
            Espace Membre Officiel
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-display">
            Mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Profil</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Gérez vos informations de compte et visualisez votre Pass Académie
          </p>
        </div>
      </div>

      {/* ── CONTENT GRID ─────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-start">
        
        {/* ── Left: Digital Membership Pass ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-blue-800/50 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950/60 shadow-2xl p-6 sm:p-8"
        >
          {/* Top Foil */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-red-500" />

          {/* Pass Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src={afaLogo} alt="AFA" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-white font-black text-xs uppercase tracking-wider font-athletic">African Football</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Academy Pass</p>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Actif 2026/27
            </span>
          </div>

          {/* Member Card Profile */}
          <div className="py-6 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center text-2xl font-black text-white font-display">
                {userData.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>

            <h2 className="text-xl font-black uppercase text-white font-display">
              {userData.name}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">{userData.email}</p>

            {userData?.labels?.[0] === 'admin' ? (
              <span className="mt-3 bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Administrateur Club
              </span>
            ) : (
              <span className="mt-3 bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Membre Officiel
              </span>
            )}
          </div>

          {/* Account Details Box */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-white/5 flex flex-col gap-2.5 text-xs text-slate-300 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Identifiant (ID) :</span>
              <span className="font-mono text-[11px] text-slate-300 truncate max-w-[180px]">{userData.$id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Statut Licence :</span>
              <span className="text-emerald-400 font-bold">Licence Validée</span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={Signout}
            className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-black uppercase tracking-widest text-xs py-3 rounded-full transition-all"
          >
            <IoCloudOffline size={16} />
            <span>Se Déconnecter de la Session</span>
          </button>
        </motion.div>

        {/* ── Right: Profile Update Form ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-blue-800/50 bg-slate-900/90 shadow-2xl p-6 sm:p-8"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-blue-600" />

          <h3 className="text-xl font-black uppercase text-white font-display mb-1 flex items-center gap-2">
            <HiPencil size={18} className="text-blue-400" />
            <span>Modifier mes Informations</span>
          </h3>
          <p className="text-slate-400 text-xs mb-6">
            Mettez à jour vos coordonnées personnelles associées à l'AFA
          </p>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-slate-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <HiUser className="text-blue-400" size={14} />
                Nom Complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-white/10 focus:border-blue-400 text-white text-sm rounded-xl px-4 py-3 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-slate-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <HiMail className="text-blue-400" size={14} />
                Adresse Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-white/10 focus:border-blue-400 text-white text-sm rounded-xl px-4 py-3 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-slate-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <HiPhone className="text-amber-400" size={14} />
                Numéro de Téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(+237) 6XX XXX XXX"
                className="w-full bg-slate-950 border border-white/10 focus:border-blue-400 text-white text-sm rounded-xl px-4 py-3 outline-none transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs py-3.5 rounded-full transition-all mt-4 ${
                loading
                  ? 'bg-blue-800/50 text-blue-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-900/50 border border-blue-400/40'
              }`}
            >
              {loading ? (
                <span>Mise à jour en cours...</span>
              ) : (
                <>
                  <HiCheck size={16} />
                  <span>Enregistrer les Modifications</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  )
}
