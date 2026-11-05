import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imgLogo from '../img/afa.png'
import { account } from '../AppwriteConfig'
import { ID } from 'appwrite'
import { toast, ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiLockClosed, HiArrowRight, HiCheck, HiEye, HiEyeOff } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const passwordStrength = () => {
    const p = user.password
    if (p.length === 0) return null
    if (p.length < 6) return { label: 'Faible', color: 'bg-red-500', width: '33%' }
    if (p.length < 10) return { label: 'Moyen', color: 'bg-amber-500', width: '66%' }
    return { label: 'Sécurisé', color: 'bg-emerald-500', width: '100%' }
  }

  const strength = passwordStrength()

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await account.create(ID.unique(), user.email, user.password, user.name)
      toast.success('Compte créé avec succès ! Redirection...')
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      console.log(error)
      toast.error('Échec de la création du compte. Vérifiez vos informations.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-slate-950 py-16 px-4 overflow-hidden">
      <ToastContainer theme="dark" position="top-right" autoClose={2500} />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05]"
           style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-blue-900/50 bg-slate-900/90 backdrop-blur-2xl shadow-2xl p-8 sm:p-10">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-blue-500 to-amber-400" />

          {/* Logo & Heading */}
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-600/30 blur-md" />
              <img
                src={imgLogo}
                alt="AFA Logo"
                className="relative w-16 h-16 rounded-full object-cover ring-2 ring-white/10 shadow-xl"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                <MdSportsSoccer size={12} className="text-amber-300" />
                Inscription Membre AFA
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-display">
                Créer un Compte
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                Rejoignez la communauté de l'African Football Academy
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={signup} className="flex flex-col gap-4">
            {/* Nom */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-slate-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <HiUser className="text-blue-400" size={14} />
                Nom Complet
              </label>
              <input
                type="text"
                placeholder="Votre nom complet"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
                className="w-full bg-slate-950 border border-white/10 focus:border-blue-400 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3.5 outline-none transition-all shadow-inner"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-slate-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <HiMail className="text-blue-400" size={14} />
                Adresse Email
              </label>
              <input
                type="email"
                placeholder="votre.email@exemple.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                className="w-full bg-slate-950 border border-white/10 focus:border-blue-400 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3.5 outline-none transition-all shadow-inner"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-slate-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <HiLockClosed className="text-red-400" size={14} />
                Mot de Passe
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                  className="w-full bg-slate-950 border border-white/10 focus:border-blue-400 text-white placeholder-slate-500 text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPass ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>

              {/* Password strength bar */}
              {strength && (
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: strength.width }}
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                    />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs py-4 rounded-full transition-all mt-3 ${
                loading
                  ? 'bg-blue-800/50 text-blue-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-900/50 border border-blue-400/40'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Création du compte...</span>
                </>
              ) : (
                <>
                  <span>Créer mon Compte</span>
                  <HiArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Vous possédez déjà un compte ?{' '}
              <Link to="/login" className="text-blue-400 font-extrabold hover:text-white transition-colors uppercase tracking-wider block sm:inline mt-1 sm:mt-0">
                Se Connecter →
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Register
