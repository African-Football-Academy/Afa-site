import { useEffect, useState } from 'react'
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { motion } from 'framer-motion'
import { BsTwitterX } from 'react-icons/bs'
import { databases } from '../AppwriteConfig'

const socials = [
  { icon: <FaFacebook size={18} />, label: 'Facebook', color: 'hover:bg-blue-600 hover:border-blue-500', text: 'text-blue-400 group-hover:text-white' },
  { icon: <MdEmail size={18} />, label: 'Email', color: 'hover:bg-red-600 hover:border-red-500', text: 'text-red-400 group-hover:text-white' },
  { icon: <BsTwitterX size={16} />, label: 'Twitter/X', color: 'hover:bg-gray-700 hover:border-gray-500', text: 'text-gray-300 group-hover:text-white' },
  { icon: <FaLinkedin size={18} />, label: 'LinkedIn', color: 'hover:bg-blue-700 hover:border-blue-600', text: 'text-blue-300 group-hover:text-white' },
  { icon: <FaYoutube size={18} />, label: 'YouTube', color: 'hover:bg-red-600 hover:border-red-500', text: 'text-red-400 group-hover:text-white' },
]

export default function Profile() {
  const [profile, setProfile] = useState([])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b7474a00087b92a06a'
        )
        setProfile(response.documents)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    getProfile()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950">

      {profile.map((prof) => (
        <div key={prof.$id}>

          {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-gray-950 py-20 px-6">
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-10"
                 style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            {/* Bottom diagonal cut */}
            <div className="absolute bottom-0 left-0 right-0 h-20"
                 style={{ background: 'linear-gradient(to bottom right, transparent 50%, #030712 50%)' }} />
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 text-center"
            >
              <span className="inline-flex items-center gap-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 shadow">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                African Football Academy
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[0.15em] text-white">
                Pro<span className="text-blue-400">fil</span>
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              />
            </motion.div>
          </div>

          {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-start">

            {/* ── Left: Image ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-blue-600/20 blur-xl group-hover:bg-blue-600/30 transition-colors duration-500" />

              <div className="relative overflow-hidden rounded-3xl border border-blue-800/40 shadow-2xl">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-red-500 to-transparent z-10" />
                <img
                  src={prof.image}
                  alt="Profile"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-103"
                  style={{ transform: 'scale(1.01)' }}
                />
                {/* Bottom gradient on image */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950/80 to-transparent" />

                {/* Name tag overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 bg-blue-600/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-400/30">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    Direction · AFA
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Bio ───────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              {/* Biographie section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-1 h-7 rounded-full bg-red-500" />
                  <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-300">
                    Biographie
                  </h2>
                  <span className="flex-1 h-px bg-gradient-to-r from-blue-800 to-transparent" />
                </div>

                <p className="text-gray-300 text-sm leading-relaxed text-justify">
                  {prof.desc}
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-blue-800/60 to-transparent" />

              {/* Administration */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-1 h-7 rounded-full bg-blue-500" />
                  <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-300">
                    Administration
                  </h2>
                  <span className="flex-1 h-px bg-gradient-to-r from-blue-800 to-transparent" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Club', value: 'African Football Academy' },
                    { label: 'Région', value: 'Littoral, Cameroun' },
                    { label: 'Fondé', value: '2015' },
                    { label: 'Statut', value: 'Actif' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-blue-950/60 border border-blue-800/40 rounded-xl p-3">
                      <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-white text-xs font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-blue-800/60 to-transparent" />

              {/* Socials */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-1 h-7 rounded-full bg-blue-500" />
                  <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-300">
                    Réseaux Sociaux
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {socials.map(({ icon, label, color, text }, i) => (
                    <motion.button
                      key={label}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 200 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      title={label}
                      className={`group flex items-center gap-2 bg-blue-950/60 border border-blue-800/40 px-4 py-2 rounded-full transition-all duration-200 ${color}`}
                    >
                      <span className={`transition-colors duration-200 ${text}`}>{icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 group-hover:text-white transition-colors">
                        {label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  )
}
