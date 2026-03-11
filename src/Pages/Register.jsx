import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img2 from '../img/afabg.png'
import { account } from '../AppwriteConfig'
import { ID } from 'appwrite'
import { toast, ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiLockClosed, HiArrowRight, HiCheck } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const passwordStrength = () => {
    const p = user.password
    if (p.length === 0) return null
    if (p.length < 6) return { label: 'Faible', color: 'bg-red-500', width: 'w-1/3' }
    if (p.length < 10) return { label: 'Moyen', color: 'bg-yellow-500', width: 'w-2/3' }
    return { label: 'Fort', color: 'bg-green-500', width: 'w-full' }
  }

  const strength = passwordStrength()

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await account.create(ID.unique(), user.email, user.password, user.name)
      toast.success('Compte créé! Redirection...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      console.log(error)
      toast.error("Échec de la création du compte. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-img2 bg-cover">
      <ToastContainer theme="dark" position="top-right" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-gray-950/90 to-gray-950" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div className="relative overflow-hidden rounded-3xl border border-blue-800/40 bg-gradient-to-b from-blue-900/50 to-gray-900/80 backdrop-blur-md shadow-2xl shadow-blue-950/60">

          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent" />

          <div className="p-8 flex flex-col items-center gap-6">

            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl scale-125" />
              <img
                src={img2}
                alt="AFA"
                className="relative w-20 h-20 rounded-full object-cover ring-2 ring-white/10 ring-offset-2 ring-offset-blue-950 shadow-xl"
              />
            </motion.div>

            {/* Heading */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-700/40 border border-blue-600/30 text-blue-200 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                <MdSportsSoccer size={11} />
                African Football Academy
              </div>
              <h1 className="text-white font-black text-2xl uppercase tracking-[0.1em]">
                Ins<span className="text-blue-400">cription</span>
              </h1>
              <p className="text-blue-400 text-xs mt-1">Créez votre espace personnel</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-700/50 to-transparent" />

            {/* Form */}
            <form onSubmit={signup} className="w-full flex flex-col gap-4">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <HiUser size={11} /> Nom d'utilisateur
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                    className="w-full bg-blue-950/60 border border-blue-800/50 focus:border-blue-500 text-white placeholder-blue-700 text-sm rounded-xl pl-4 pr-10 py-3 outline-none transition-colors"
                  />
                  <HiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700" size={15} />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <HiMail size={11} /> Adresse Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                    className="w-full bg-blue-950/60 border border-blue-800/50 focus:border-blue-500 text-white placeholder-blue-700 text-sm rounded-xl pl-4 pr-10 py-3 outline-none transition-colors"
                  />
                  <HiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700" size={15} />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <HiLockClosed size={11} /> Mot de Passe
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••••"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                    className="w-full bg-blue-950/60 border border-blue-800/50 focus:border-blue-500 text-white placeholder-blue-700 text-sm rounded-xl pl-4 pr-16 py-3 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-400 transition-colors text-[10px] font-black uppercase"
                  >
                    {showPass ? 'Cacher' : 'Voir'}
                  </button>
                </div>

                {/* Password strength bar */}
                {strength && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-blue-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: strength.width === 'w-1/3' ? '33%' : strength.width === 'w-2/3' ? '66%' : '100%' }}
                        transition={{ duration: 0.3 }}
                        className={`h-full rounded-full ${strength.color}`}
                      />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      strength.label === 'Faible' ? 'text-red-400' :
                      strength.label === 'Moyen' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                )}

                <p className="text-blue-600 text-[10px] flex items-center gap-1">
                  <HiCheck size={10} /> 8 caractères minimum
                </p>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs py-3.5 rounded-full transition-all mt-1 ${
                  loading
                    ? 'bg-blue-800/50 text-blue-400 cursor-not-allowed border border-blue-700/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 border border-blue-400/20'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Création...
                  </>
                ) : (
                  <>
                    Créer mon Compte
                    <HiArrowRight size={14} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-700/30 to-transparent" />

            <p className="text-center text-xs">
              <span className="text-blue-400">Déjà un compte? </span>
              <Link to="/login" className="text-white font-black hover:text-blue-300 transition-colors uppercase tracking-widest">
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
