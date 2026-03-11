import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../AppwriteConfig'
import { toast, ToastContainer } from 'react-toastify'
import img1 from '../img/profile.png'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiPhone, HiLogout, HiPencil, HiCheck } from 'react-icons/hi'
import { IoCloudOffline } from 'react-icons/io5'

export default function Account() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
      setName(response.name)
      setEmail(response.email)
      setPhone(response.phone)
    }
    getData()
  }, [])

  const Signout = async () => {
    try {
      await account.deleteSession('current')
      navigate('/login')
      window.location.reload()
    } catch (error) {
      toast.error('Logout failed: ' + error.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (name !== userData?.name) await account.updateName(name)
      if (email !== userData?.email) await account.updateEmail(email)
      if (phone !== userData?.phone) await account.updatePhone(phone)
      toast.success('Profil mis à jour avec succès!')
    } catch (error) {
      toast.error('Erreur: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-950 bg-img1 bg-cover flex flex-col items-center justify-center px-4">
        <div className="absolute inset-0 bg-blue-950/90" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center gap-5 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-blue-800/60 border border-blue-700 flex items-center justify-center">
            <HiUser size={28} className="text-blue-400" />
          </div>
          <h2 className="text-white font-black text-xl uppercase tracking-widest">Aucun Compte</h2>
          <p className="text-blue-300 text-sm">Vous devez être connecté pour accéder à cette page.</p>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs px-8 py-3 rounded-full transition-all shadow-lg"
            >
              Se Connecter
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  // ── Logged in ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950">
      <ToastContainer theme="dark" position="top-right" />

      {/* ── HERO HEADER ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-gray-950 py-20 px-6">
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-20"
             style={{ background: 'linear-gradient(to bottom right, transparent 50%, #030712 50%)' }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <span className="inline-flex items-center gap-2 bg-blue-700/60 border border-blue-600/40 text-blue-200 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <HiUser size={12} />
            Espace Personnel
          </span>
          <h1 className="text-5xl font-black uppercase tracking-[0.15em] text-white mb-2">
            Mon <span className="text-blue-400">Compte</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-6 items-start">

        {/* ── Profile Card ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-blue-800/40 bg-gradient-to-b from-blue-900/40 to-blue-950/80 shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-red-500 to-transparent" />

          <div className="p-6 flex flex-col items-center text-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />
              <img
                src={img1}
                alt="profile"
                className="relative w-24 h-24 rounded-full object-cover ring-2 ring-blue-500/40 ring-offset-2 ring-offset-blue-950 shadow-xl"
              />
              {/* Online dot */}
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-blue-950" />
            </div>

            {/* Name */}
            <div>
              <h2 className="text-white font-black text-xl uppercase tracking-wide">{userData.name}</h2>
              {userData?.labels?.[0] === 'admin' && (
                <span className="inline-block bg-red-600/30 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mt-1">
                  Admin
                </span>
              )}
            </div>

            <div className="w-full h-px bg-blue-700/40" />

            {/* Info rows */}
            <div className="w-full flex flex-col gap-3">
              {[
                { icon: <HiMail size={14} />, value: userData.email, label: 'Email' },
                { icon: <HiPhone size={14} />, value: userData.phone || 'Non renseigné', label: 'Téléphone' },
              ].map(({ icon, value, label }) => (
                <div key={label} className="flex items-center gap-3 bg-blue-950/50 border border-blue-800/30 rounded-xl px-4 py-2.5">
                  <span className="text-blue-400">{icon}</span>
                  <div className="text-left min-w-0">
                    <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest">{label}</p>
                    <p className="text-white text-xs font-semibold truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-blue-700/40" />

            {/* Sign out */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={Signout}
              className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 hover:text-red-300 font-black uppercase tracking-widest text-xs py-3 rounded-full transition-all"
            >
              <IoCloudOffline size={16} />
              Se Déconnecter
            </motion.button>
          </div>
        </motion.div>

        {/* ── Update Form ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-blue-800/40 bg-gradient-to-b from-blue-900/40 to-blue-950/80 shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent" />

          <div className="p-6">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-1 h-7 rounded-full bg-blue-500" />
              <h2 className="uppercase tracking-[0.2em] text-xs font-black text-blue-300">
                Modifier le Profil
              </h2>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <HiUser size={11} /> Nom complet
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full bg-blue-950/60 border border-blue-800/50 focus:border-blue-500 text-white placeholder-blue-600 text-sm font-semibold rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                  <HiPencil className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" size={14} />
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <HiMail size={11} /> Adresse Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full bg-blue-950/60 border border-blue-800/50 focus:border-blue-500 text-white placeholder-blue-600 text-sm font-semibold rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                  <HiPencil className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" size={14} />
                </div>
              </div>

              {/* Phone field — only if user has phone */}
              {userData?.phone && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <HiPhone size={11} /> Téléphone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Votre téléphone"
                      className="w-full bg-blue-950/60 border border-blue-800/50 focus:border-blue-500 text-white placeholder-blue-600 text-sm font-semibold rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                    <HiPencil className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" size={14} />
                  </div>
                </div>
              )}

              <div className="h-px bg-blue-700/40 my-1" />

              {/* Submit */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs py-3.5 rounded-full transition-all shadow-lg ${
                  loading
                    ? 'bg-blue-800/50 text-blue-400 cursor-not-allowed border border-blue-700/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30 shadow-blue-900/40'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <HiCheck size={16} />
                    Enregistrer les Modifications
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
