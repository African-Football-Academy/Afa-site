import { useEffect, useState } from 'react'
import { FaFacebook, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import { MdEmail, MdSportsSoccer, MdSecurity, MdEmojiEvents } from 'react-icons/md'
import { motion } from 'framer-motion'
import { BsTwitterX } from 'react-icons/bs'
import { HiAcademicCap, HiSparkles, HiLocationMarker, HiPhone } from 'react-icons/hi'
import { HiTrophy } from 'react-icons/hi2'
import { databases } from '../AppwriteConfig'
import defaultProfileImg from '../img/profile.png'
import bgImage from '../img/building.jpg'

const socials = [
  { icon: <FaFacebook size={16} />, label: 'Facebook', color: 'hover:bg-blue-600 hover:border-blue-500', text: 'text-blue-400 group-hover:text-white', url: 'https://facebook.com' },
  { icon: <MdEmail size={16} />, label: 'Email', color: 'hover:bg-red-600 hover:border-red-500', text: 'text-red-400 group-hover:text-white', url: 'mailto:africanfootballacademy0@gmail.com' },
  { icon: <BsTwitterX size={15} />, label: 'X / Twitter', color: 'hover:bg-slate-700 hover:border-slate-500', text: 'text-slate-300 group-hover:text-white', url: 'https://twitter.com' },
  { icon: <FaYoutube size={16} />, label: 'YouTube', color: 'hover:bg-red-600 hover:border-red-500', text: 'text-red-400 group-hover:text-white', url: 'https://youtube.com' },
]

const fallbackProfile = {
  $id: 'profile-afa-official',
  image: defaultProfileImg,
  name: "Direction Générale & Encadrement Technique",
  desc: "L'African Football Academy est née d'une vision inébranlable : offrir à la jeunesse camerounaise et africaine un cadre d'apprentissage du football conforme aux standards professionnels internationaux. Fondée dans la région du Littoral, l'AFA conjugue développement athlétique, maîtrise technique, intelligence tactique et double projet scolaire. Notre méthodologie rigoureuse a permis de hisser notre équipe au rang de Champion Régional du Littoral et de remporter plus de 12 trophées majeurs, tout en propulsant nos pépites vers des horizons professionnels.",
}

export default function Profile() {
  const [profile, setProfile] = useState([])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b7474a00087b92a06a'
        )
        if (response.documents && response.documents.length > 0) {
          setProfile(response.documents)
        } else {
          setProfile([fallbackProfile])
        }
      } catch (error) {
        console.warn('Profile fetch fallback:', error)
        setProfile([fallbackProfile])
      }
    }
    getProfile()
  }, [])

  const displayProfiles = profile.length > 0 ? profile : [fallbackProfile]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

      {displayProfiles.map((prof) => (
        <div key={prof.$id}>

          {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden bg-slate-950 py-24 px-6 border-b border-blue-900/40">
            {/* Background stadium image with heavy gradient */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-blue-950/85 to-slate-950" />
            <div className="absolute inset-0 opacity-[0.06]"
                 style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-blue-500 to-amber-400" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 text-white text-[11px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5 shadow-lg border border-red-400/30">
                <HiSparkles size={14} />
                African Football Academy · Douala
              </span>

              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display">
                Profil & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Histoire</span> du Club
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
                Découvrez la genèse, la vision managériale et l'équipe dirigeante qui forgent jour après jour les talents de demain.
              </p>

              <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-amber-400 rounded-full" />
            </motion.div>
          </div>

          {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">

              {/* ── Left: Image & Badge ────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-red-600/20 to-amber-400/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

                <div className="relative overflow-hidden rounded-3xl border border-blue-800/50 shadow-2xl bg-slate-900">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-red-500 z-10" />
                  
                  <img
                    src={prof.image || defaultProfileImg}
                    alt="Direction AFA"
                    className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-103"
                  />

                  {/* Gradient Scrim on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Image Overlay Tag */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 bg-blue-950/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-blue-500/40 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Direction Technique & Présidence
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── Right: Biography & Manifest ────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-8"
              >
                {/* Biography */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="block w-1.5 h-8 rounded-full bg-red-500" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Présentation</span>
                      <h2 className="uppercase tracking-tight text-xl sm:text-2xl font-black text-white font-display">
                        Vision & Philosophie
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
                    {prof.desc}
                  </p>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  {[
                    { label: 'Club Officiel', value: 'African Football Academy', icon: '⚽' },
                    { label: 'Région / Siège', value: 'Littoral, Douala', icon: '📍' },
                    { label: 'Année de Fondation', value: '2015', icon: '📅' },
                    { label: 'Palmarès Majeur', value: 'Champion Régional Littoral', icon: '🏆' },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-slate-900 border border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{label}</span>
                        <span>{icon}</span>
                      </div>
                      <p className="text-white text-sm font-extrabold uppercase mt-1 truncate">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Socials Connection */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
                    Canaux Officiels du Club :
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {socials.map(({ icon, label, color, text, url }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className={`group flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-full transition-all duration-200 ${color}`}
                      >
                        <span className={`${text}`}>{icon}</span>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                          {label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>

            {/* ── Core Values Section ────────────────────────────────────────── */}
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">ADN du Club</span>
                <h2 className="text-3xl font-black uppercase text-white font-display mt-1">
                  Nos Valeurs Fondatrices
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-2">
                  L'apprentissage du football à l'AFA repose sur des principes éthiques et humains inébranlables.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { title: 'Discipline', desc: 'Ponctualité, respect des consignes tactiques et rigueur morale au quotidien.' },
                  { title: 'Excellence', desc: 'Recherche permanente du geste juste, du dépassement de soi et de la performance.' },
                  { title: 'Double Projet', desc: 'Équilibre fondamental entre réussite scolaire/académique et formation footballistique.' },
                  { title: 'Solidarité', desc: 'Esprit de corps, fraternité sur le terrain et engagement envers la communauté.' },
                ].map((val, i) => (
                  <div key={i} className="bg-slate-900 border border-blue-900/40 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                    <div className="w-10 h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mb-4" />
                    <h3 className="text-white font-black text-lg uppercase font-display group-hover:text-blue-300 transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}
