import { useEffect, useState } from 'react'
import afaLogo from '../img/afa.png'
import img2 from '../img/icon1.png'
import img3 from '../img/afa champion.jpg'
import img5 from '../img/afa u12.jpg'
import img6 from '../img/afa3.jpg'
import img7 from '../img/afa2.jpg'
import imgj from '../img/jessey.png'
import imgl from '../img/lineup.png'
import vid1 from '../img/afa trophy.mp4'
import fecaLogo from '../img/trophy/feca.png'
import nikeLogo from '../img/trophy/nike.png'
import msiLogo from '../img/trophy/msi.png'
import olaLogo from '../img/trophy/ola.png'
import { HiTrophy } from "react-icons/hi2"
import { HiSparkles, HiCalendar, HiArrowRight, HiCheckCircle, HiUserGroup, HiAcademicCap } from 'react-icons/hi'
import { MdSportsSoccer, MdSecurity, MdEmojiEvents } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import SimpleSlider from '../Component/Slider'
import Banner from '../Component/Banner'
import { Link } from 'react-router-dom'
import Media from '../Component/Media'
import Matches from '../Component/Matches'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import StatBanner from '../Component/StatBanner'

// ─── Section Header Component ────────────────────────────────────────────────
const SectionLabel = ({ title, subtitle, badge, accent = false, gold = false }) => (
  <div className="max-w-6xl mx-auto px-4 pt-12 pb-6">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="flex items-start gap-3">
        <span
          className={`block w-1.5 h-10 rounded-full mt-1 ${
            gold
              ? 'bg-gradient-to-b from-amber-400 to-amber-600'
              : accent
              ? 'bg-gradient-to-b from-red-500 to-red-700'
              : 'bg-gradient-to-b from-blue-500 to-blue-700'
          }`}
        />
        <div>
          {badge && (
            <span
              className={`inline-block text-[10px] font-black uppercase tracking-[0.22em] mb-1 px-2.5 py-0.5 rounded-full ${
                gold
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : accent
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}
            >
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-display">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="hidden sm:block flex-1 max-w-xs h-px bg-gradient-to-r from-blue-900/60 to-transparent self-center ml-4" />
    </div>
  </div>
)

const fallbackHero = {
  $id: 'hero-official',
  hero_desc: "L'African Football Academy est un centre d'excellence et de formation sportive dédié à l'éclosion des jeunes talents vers le football professionnel international, alliant rigueur tactique, éducation et passion.",
  logo: afaLogo,
}

const fallbackCategories = [
  { $id: 'cat-u12', cat: 'Pôle Élite U12 (Minimes)', img: img5, desc: 'Apprentissage technique fondamental et motricité' },
  { $id: 'cat-u15', cat: 'Pôle Formation U15 (Cadets)', img: img6, desc: 'Intelligence tactique, endurance et rigueur' },
  { $id: 'cat-u17', cat: 'Pôle Compétition U17 (Juniors)', img: img7, desc: 'Pré-professionnalisation et intensité athlétique' },
  { $id: 'cat-seniors', cat: 'Équipe Première (Régionale)', img: img3, desc: 'Championnat Régional FECAFOOT du Littoral' },
]

const fallbackPartners = [
  { $id: 'p-1', image: fecaLogo, name: 'FECAFOOT' },
  { $id: 'p-2', image: nikeLogo, name: 'Nike Football' },
  { $id: 'p-3', image: msiLogo, name: 'MSI' },
  { $id: 'p-4', image: olaLogo, name: 'Ola Energy' },
]

export default function Home() {
  const [partenaire, setPartenaire] = useState([])
  const [category, setCategory] = useState([])
  const [hero, setHero] = useState([])

  useEffect(() => {
    const getHero = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b742a30002b491452e')
        if (response.documents && response.documents.length > 0) {
          setHero(response.documents)
        } else {
          setHero([fallbackHero])
        }
      } catch (error) {
        console.warn('Hero fetch fallback:', error)
        setHero([fallbackHero])
      }
    }
    getHero()
  }, [])

  useEffect(() => {
    const getPartenaire = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b7470e000c26abd126', [Query.limit(4), Query.orderDesc('createdAt')])
        if (response.documents && response.documents.length > 0) {
          setPartenaire(response.documents)
        } else {
          setPartenaire(fallbackPartners)
        }
      } catch (error) {
        console.warn('Partners fetch fallback:', error)
        setPartenaire(fallbackPartners)
      }
    }
    getPartenaire()
  }, [])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b740ac0030d5738225')
        if (response.documents && response.documents.length > 0) {
          setCategory(response.documents)
        } else {
          setCategory(fallbackCategories)
        }
      } catch (error) {
        console.warn('Category fetch fallback:', error)
        setCategory(fallbackCategories)
      }
    }
    getCategory()
  }, [])

  const images = [img3, img5, img6, img7]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [images.length])

  const displayHero = hero.length > 0 ? hero : [fallbackHero]
  const displayCategories = category.length > 0 ? category : fallbackCategories
  const displayPartners = partenaire.length > 0 ? partenaire : fallbackPartners

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-600 selection:text-white">

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      {displayHero.map((head) => (
        <section key={head.$id} className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-blue-900/40">
          {/* Animated Background Carousel with Ken Burns subtle zoom */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            />
          </AnimatePresence>

          {/* Deep Cinematic Overlay Scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-blue-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

          {/* Stadium Light Beam & Mesh Texture */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-600/15 via-transparent to-transparent pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex-1 max-w-2xl text-left"
            >
              {/* Official Status Badge */}
              <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-slate-900/90 via-blue-950/80 to-slate-900/90 border border-blue-500/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-blue-950/50">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  Centre d'Élite & Détection de Talents · Douala
                </span>
                <span className="text-amber-400 text-xs hidden sm:inline tracking-widest">★★★★★</span>
              </div>

              {/* Cool Designed African Football Academy Brand Typography */}
              <div className="mb-6 select-none">
                {/* Line 1: AFRICAN */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight font-display text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                    AFRICAN
                  </span>
                  {/* African Tricolor Accent Line (Cameroon Green-Red-Yellow Energy) */}
                  <div className="hidden sm:flex items-center gap-1 flex-1 max-w-[130px]">
                    <span className="h-1 flex-1 bg-emerald-500 rounded-full" />
                    <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="h-1 flex-1 bg-amber-400 rounded-full" />
                  </div>
                </div>

                {/* Line 2: FOOTBALL */}
                <div className="relative my-0.5 sm:my-1">
                  <span className="text-4xl sm:text-6xl lg:text-7xl font-black italic uppercase font-display bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.65)] tracking-tighter">
                    FOOTBALL
                  </span>
                  {/* Ambient Electric Backlight */}
                  <div className="absolute -inset-2 bg-blue-500/15 blur-2xl -z-10 rounded-full pointer-events-none" />
                </div>

                {/* Line 3: ACADEMY */}
                <div className="flex items-center gap-3 sm:gap-4 mt-0.5">
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.26em] sm:tracking-[0.32em] font-athletic bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(245,158,11,0.5)]">
                    ACADEMY
                  </span>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-400/60 via-amber-400/30 to-transparent rounded-full hidden sm:block" />
                </div>

                {/* Academy Subtitle / Punchline */}
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-amber-400 rounded-full shrink-0" />
                  <h1 className="text-base sm:text-xl lg:text-2xl font-extrabold uppercase tracking-tight text-white font-display">
                    Forger les <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">Champions</span> de Demain
                  </h1>
                </div>

                {/* Academy Quick Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  <span className="bg-slate-900/80 border border-white/10 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Pôle U10 à Seniors
                  </span>
                  <span className="bg-slate-900/80 border border-white/10 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Champion FECAFOOT 2026
                  </span>
                  <span className="bg-slate-900/80 border border-white/10 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Sport-Études Agréé
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                {head.hero_desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="shimmer-btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black uppercase tracking-widest text-xs px-8 py-3.5 rounded-full border border-blue-400/40 shadow-xl shadow-blue-900/50 flex items-center gap-2 transition-all"
                  >
                    <span>Découvrir l'Académie</span>
                    <HiArrowRight size={15} />
                  </motion.button>
                </Link>

                <Link to="/trophy">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-slate-900/80 hover:bg-slate-800 text-amber-300 hover:text-white font-black uppercase tracking-widest text-xs px-8 py-3.5 rounded-full border border-amber-400/40 shadow-xl shadow-black/60 flex items-center gap-2 transition-all backdrop-blur-md"
                  >
                    <HiTrophy size={16} className="text-amber-400" />
                    <span>Salle des Trophées</span>
                  </motion.button>
                </Link>

                <Link to="/donate">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-black uppercase tracking-widest text-xs px-6 py-3.5 rounded-full border border-emerald-500/40 transition-all backdrop-blur-md"
                  >
                    Soutenir le Club
                  </motion.button>
                </Link>
              </div>

              {/* Slideshow Progress Dots */}
              <div className="flex mt-4 items-center gap-2.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    aria-label={`Image slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === currentImageIndex ? 'w-10 bg-gradient-to-r from-red-500 to-blue-500' : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
                <span className="text-[11px] text-slate-400 font-bold ml-2">
                  Galerie Live 0{currentImageIndex + 1} / 0{images.length}
                </span>
              </div>
            </motion.div>

            {/* Right Shield Crest Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex-1 flex justify-center relative"
            >
              <div className="relative">
                {/* Glow rings */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-600/30 via-red-600/20 to-amber-500/20 blur-3xl scale-125" />
                <div className="relative hidden w-[500px] h-[500px] rounded-full p-3 bg-slate-950/70 border-2 border-white/10 shadow-2xl backdrop-blur-md lg:flex items-center justify-center">
                  <img
                    src={head.logo || afaLogo}
                    alt="AFA Crest"
                    className="w-full h-full object-cover rounded-full ring-4 ring-blue-500/40 shadow-inner"
                  />
                  {/* Floating Gold Medal Badge */}
                  <div className="absolute -bottom-2 sm:bottom-2 -left-2 sm:left-2 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-2xl p-3 shadow-xl border-2 border-slate-900 flex items-center gap-2">
                    <HiTrophy size={24} className="text-slate-950" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider leading-none">Titre Régional</p>
                      <p className="text-xs font-black uppercase">Champion 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Live Key Achievement Metrics Strip ───────────────────────────── */}
          <div className="relative z-10 border-t border-white/10 bg-slate-950/90 backdrop-blur-md py-6 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <HiTrophy className="text-amber-400" size={24} />, value: '4', label: 'Trophées Officiels', desc: 'Régionaux & Coupes' },
                { icon: <HiUserGroup className="text-blue-400" size={24} />, value: '+50', label: 'Joueurs Formés', desc: 'Catégories U10 à Senior' },
                { icon: <HiAcademicCap className="text-emerald-400" size={24} />, value: '98%', label: 'Réussite Scolaire', desc: 'Double projet Sport-Études' },
                { icon: <MdSportsSoccer className="text-red-400" size={24} />, value: '100%', label: 'Engagement Regional', desc: 'Staff certifié UEFA & CAF' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3.5 border-r border-white/5 last:border-none pr-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-md">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl font-display leading-none">{stat.value}</p>
                    <p className="text-slate-200 text-xs font-bold uppercase tracking-wider mt-0.5">{stat.label}</p>
                    <p className="text-slate-400 text-[11px]">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── 2. FEATURE PILLARS ("NOS ATOUTS") ─────────────────────────────────── */}
      <section className="py-16 bg-slate-950 relative overflow-hidden">
        <SectionLabel
          badge="Excellence Sportive"
          title="Les 4 Piliers de l'Académie"
          subtitle="Une structure professionnelle complète pensée pour le développement intégral du jeune footballeur africain."
        />

        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {[
            {
              img: imgj,
              label: 'Détection & Talents',
              subtitle: 'Toutes Catégories',
              desc: 'Révélateur de pépites brutes à travers des tournois et des stages de détection rigoureux.',
              color: 'from-blue-600 to-indigo-700',
              borderColor: 'hover:border-blue-500',
            },
            {
              img: img2,
              label: 'Discipline & Rigueur',
              subtitle: 'Culture de la Gagne',
              desc: 'Nos joueurs sont polyvalents, humbles, assidus et formés au respect des règles du haut niveau.',
              color: 'from-red-600 to-rose-700',
              borderColor: 'hover:border-red-500',
            },
            {
              icon: <HiTrophy size={42} className="text-amber-400" />,
              label: 'Compétitions Officielles',
              subtitle: 'FECAFOOT & International',
              desc: 'Engagés dans tous les championnats du Littoral avec l’ambition constante de décrocher des titres.',
              color: 'from-amber-500 to-yellow-600',
              borderColor: 'hover:border-amber-400',
            },
            {
              img: imgl,
              label: 'Formation Tactique',
              subtitle: 'Staff Expert Qualifié',
              desc: 'Une équipe d’entraîneurs, préparateurs physiques et éducateurs dédiés à la performance.',
              color: 'from-emerald-600 to-teal-700',
              borderColor: 'hover:border-emerald-500',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl bg-slate-900 border border-blue-900/30 ${card.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Top Accent Strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} />

              <div className="p-6 flex flex-col items-center text-center gap-3">
                {card.img ? (
                  <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-blue-400/50 shadow-lg bg-slate-800 p-1 transition-all">
                    <img src={card.img} alt={card.label} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                )}

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {card.subtitle}
                </span>

                <h3 className="text-base font-black uppercase tracking-wide text-white font-display group-hover:text-blue-300 transition-colors">
                  {card.label}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="px-6 pb-5 pt-2 border-t border-white/5 flex items-center justify-center text-[11px] font-black uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">
                <span>En Savoir Plus →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. ACTUALITÉS EN BREF (BANNER) ──────────────────────────────────── */}
      <section className="py-12 bg-slate-900/60 border-y border-blue-900/30">
        <SectionLabel
          badge="Flash Info"
          title="Actualité Officielle en Bref"
          subtitle="Suivez les dernières annonces, signatures, tournois et performances de l'African Football Academy."
        />
        <Banner />
      </section>

      {/* ── 4. MATCH CENTER (PROCHAINS MATCHS) ───────────────────────────────── */}
      <section className="py-16 bg-slate-950">
        <SectionLabel
          accent
          badge="Matchday"
          title="Calendrier & Prochains Matchs"
          subtitle="Tous les rendez-vous officiels de nos équipes en Championnat Régional et Coupes du Littoral."
        />
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <Matches />
        </div>
      </section>

      {/* ── 5. ÉVÉNEMENTS DE LA SEMAINE (SLIDER) ─────────────────────────────── */}
      <section className="py-16 bg-slate-900/80 border-t border-blue-900/30">
        <SectionLabel
          badge="Vie du Club"
          title="Événements de la Semaine"
          subtitle="Reportages sur les séances d'entraînement, remises d'équipements et victoires marquantes."
        />
        <div className="mt-6">
          <SimpleSlider />
        </div>
      </section>

      {/* ── 6. SPOTLIGHT CHAMPION DU LITTORAL (VIDEO BLOCK) ──────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 border-y border-blue-900/40">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Video Showcase Frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-blue-600/30 to-red-600/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-blue-500 z-10" />
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-72 md:h-96 object-cover"
              >
                <source src={vid1} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Watermark */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <HiTrophy className="text-amber-400" size={16} />
                  <span className="text-white text-xs font-black uppercase tracking-wider">Célébration Officielle</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Accolades & Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full w-fit shadow-lg shadow-amber-500/20">
              <HiTrophy size={16} />
              <span>Sacre Historique Littoral</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-display leading-[1.05]">
                Champions <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                  Région du Littoral
                </span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mt-4">
                Une consécration sportive majeure qui récompense des années de travail acharné, de discipline tactique et de solidarité collective au sein de l'African Football Academy.
              </p>
            </div>

            {/* Achievement Highlights Box */}
            <div className="grid grid-cols-2 gap-3.5">
              {[
                { title: '1ère Place', subtitle: 'Invaincus sur la saison', badge: '🥇 Or' },
                { title: 'Meilleure Attaque', subtitle: '+45 Buts inscrits', badge: '⚽ Élite' },
                { title: 'Meilleure Défense', subtitle: 'Seulement 8 buts encaissés', badge: '🛡️ Mur' },
                { title: 'Trophée Régional', subtitle: 'FECAFOOT Cameroun', badge: '🏆 Officiel' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-blue-900/50 rounded-2xl p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-black text-sm uppercase font-display">{item.title}</span>
                    <span className="text-[10px] font-bold text-amber-400">{item.badge}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <Link to="/trophy" className="w-fit">
              <button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs px-8 py-3.5 rounded-full shadow-lg shadow-amber-900/40 flex items-center gap-2 transition-all">
                <span>Explorer Tout le Palmarès</span>
                <HiArrowRight size={15} />
              </button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── 7. HIGHLIGHTS & VIDÉOS ───────────────────────────────────────────── */}
      <section className="py-16 bg-slate-950">
        <SectionLabel
          badge="Vidéothèque"
          title="Résumés de Matchs & Immersion"
          subtitle="Plongez au cœur de l'action avec les plus beaux gestes, buts et entraînements de nos académiciens."
        />
        <div className="mt-4">
          <Media />
        </div>
      </section>

      {/* ── 8. RÉALISATIONS PARALLAX BANNER ───────────────────────────────────── */}
      <section className="relative overflow-hidden my-10">
        <div className="relative h-[480px] sm:h-[560px] overflow-hidden">
          <img
            src={img3}
            alt="Nos Réalisations AFA"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-blue-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-14 md:px-20 max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-4 shadow">
              <HiSparkles />
              Excellence & Réussite
            </span>
            <h2 className="text-white text-3xl sm:text-5xl font-black uppercase leading-tight font-display mb-3">
              Le Musée des Trophées de l'AFA
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Découvrez la chronologie de nos sacres régionaux, coupes des jeunes et tournois internationaux remportés par nos différentes promotions.
            </p>
            <Link to="/trophy">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black uppercase tracking-widest text-xs px-8 py-3.5 rounded-full shadow-xl shadow-red-950/60 border border-red-400/40 transition-all flex items-center gap-2"
              >
                <span>Consulter le Palmarès</span>
                <HiArrowRight size={15} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. STATS BANNER (JOUEURS EN VUE) ─────────────────────────────────── */}
      <StatBanner />

      {/* ── 10. CATÉGORIES & ÉQUIPES ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-950">
        <SectionLabel
          badge="Promotions"
          title="Nos Catégories & Pôles de Formation"
          subtitle="De l'initiation des minimes jusqu'à l'équipe première, chaque étape respecte les principes de la formation moderne."
        />

        <div className="max-w-6xl mx-auto px-4 mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayCategories.map((cat, i) => (
            <motion.div
              key={cat.$id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl bg-slate-900 border border-blue-900/40 hover:border-blue-400/60 transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden bg-slate-950">
                <img
                  src={cat.img || img5}
                  alt={cat.cat}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                    AFA Promotion
                  </span>
                  <h3 className="text-white font-black uppercase text-base sm:text-lg font-display group-hover:text-amber-300 transition-colors">
                    {cat.cat}
                  </h3>
                  {cat.desc && (
                    <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                      {cat.desc}
                    </p>
                  )}
                  <Link to="/stat" className="pt-2 text-xs font-bold uppercase tracking-wider text-blue-300 group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>Voir Effectif</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 11. PARTENAIRES OFFICIELS ────────────────────────────────────────── */}
      <section className="py-16 bg-slate-900/60 border-t border-blue-900/30">
        <SectionLabel
          badge="Réseau & Soutien"
          title="Partenaires & Institutions"
          subtitle="Ils nous accompagnent dans l'équipement, l'encadrement et la promotion de la jeunesse sportive."
        />

        <div className="max-w-5xl mx-auto px-6 mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center">
            {displayPartners.map((item, i) => (
              <motion.div
                key={item.$id || i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900/80 border border-white/5 hover:border-blue-500/40 rounded-2xl p-6 h-28 flex items-center justify-center shadow-lg transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name || 'Partenaire AFA'}
                  className="max-h-14 max-w-full object-contain filter grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
