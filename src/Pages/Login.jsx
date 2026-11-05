import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../AppwriteConfig'
import { toast, ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
import img1 from '../img/afa.png'
import { HiMail, HiLockClosed, HiArrowRight, HiEye, HiEyeOff } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await account.createEmailPasswordSession(user.email, user.password)
      toast.success('Connexion réussie !')
      setTimeout(() => {
        navigate('/')
        window.location.reload()
      }, 800)
    } catch (error) {
      console.log(error)
      toast.error('Identifiants incorrects. Veuillez vérifier votre adresse et mot de passe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-slate-950 py-16 px-4 overflow-hidden">
      <ToastContainer theme="dark" position="top-right" autoClose={2500} />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05]"
           style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-blue-900/50 bg-slate-900/90 backdrop-blur-2xl shadow-2xl p-8 sm:p-10">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-red-500 to-amber-400" />

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-600/30 blur-md" />
              <img
                src={img1}
                alt="AFA Logo"
                className="relative w-16 h-16 rounded-full object-cover ring-2 ring-white/10 shadow-xl"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                <MdSportsSoccer size={12} className="text-amber-300" />
                Espace Membre AFA
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-display">
                Connexion
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                Accédez à votre compte officiel de l'Académie
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <span>Se Connecter</span>
                  <HiArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Pas encore inscrit sur la plateforme ?{' '}
              <Link to="/register" className="text-blue-400 font-extrabold hover:text-white transition-colors uppercase tracking-wider block sm:inline mt-1 sm:mt-0">
                Créer un compte →
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Login
