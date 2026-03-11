import { useEffect, useState } from 'react'
import imgHERO from '../img/AFRICAN FOOTBALL  ACADEMY.png'
import img2 from '../img/icon1.png'
import img3 from '../img/afa champion.jpg'
import img5 from '../img/afa u12.jpg'
import img6 from '../img/afa3.jpg'
import img7 from '../img/afa2.jpg'
import imgj from '../img/jessey.png'
import imgl from '../img/lineup.png'
import vid1 from '../img/afa trophy.mp4'
import { HiTrophy } from "react-icons/hi2"
import { motion, AnimatePresence } from 'framer-motion';
import SimpleSlider from '../Component/Slider'
import Banner from '../Component/Banner'
import { Link } from 'react-router-dom'
import Media from '../Component/Media'
import Matches from '../Component/Matches'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import StatBanner from '../Component/StatBanner'

/* ─── tiny helpers ─────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

const SlideIn = ({ children, from = 'left', delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: from === 'left' ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── pill / chip label ─────────────────────────────────── */
const Label = ({ children }) => (
  <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-bold
                   bg-[#00ff87] text-black px-3 py-1 rounded-full mb-3">
    {children}
  </span>
)

/* ─── section heading ───────────────────────────────────── */
const SectionHead = ({ label, title }) => (
  <div className="max-w-6xl mx-auto px-4 mb-8">
    <Label>{label}</Label>
    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
      {title}
    </h2>
    <div className="mt-3 w-16 h-[3px] bg-[#00ff87] rounded-full" />
  </div>
)

/* ─── feature card ──────────────────────────────────────── */
const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="group relative flex flex-col gap-4 p-6
               bg-white/5 border border-white/10 rounded-2xl
               backdrop-blur-sm overflow-hidden cursor-default
               hover:border-[#00ff87]/40 transition-colors duration-300"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-br from-[#00ff87]/10 to-transparent pointer-events-none" />
    <div className="w-14 h-14 rounded-xl bg-[#00ff87]/10 flex items-center justify-center
                    group-hover:bg-[#00ff87]/20 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-[#00ff87] font-black uppercase tracking-widest text-xs mb-1">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
)

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [partenaire, setPartenaire] = useState([])
  const [category, setCategory] = useState([])
  const [hero, setHero] = useState([])

  useEffect(() => {
    const getHero = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b742a30002b491452e')
        setHero(response.documents)
      } catch (e) { console.error(e) }
    }
    getHero()
  }, [])

  useEffect(() => {
    const getPartenaire = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6', '67b7470e000c26abd126',
          [Query.limit(4), Query.orderDesc('createdAt')]
        )
        setPartenaire(response.documents)
      } catch (e) { console.error(e) }
    }
    getPartenaire()
  }, [])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b740ac0030d5738225')
        setCategory(response.documents)
      } catch (e) { console.error(e) }
    }
    getCategory()
  }, [])

  const images = [img3, img5, img6, img7]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="bg-[#080c12] text-white font-sans overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      {hero.map((head) => (
        <section
          key={head.$id}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background image with animated crossfade */}
          <AnimatePresence mode="sync">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c12] via-[#080c12]/70 to-[#080c12]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c12] via-transparent to-transparent" />

          {/* Decorative diagonal stripe */}
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-10
                          bg-gradient-to-bl from-[#00ff87] to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Label>African Football Academy</Label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
              >
                <img src={imgHERO} alt="AFA" className="w-72 md:w-96 mb-6" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white/70 text-base leading-relaxed max-w-md mb-8"
              >
                {head.hero_desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="flex flex-wrap gap-4"
              >
                <Link to='/gallery'>
                  <button className="px-8 py-3 rounded-full border-2 border-[#00ff87] text-[#00ff87]
                                     font-bold uppercase tracking-widest text-sm
                                     hover:bg-[#00ff87] hover:text-black transition-all duration-300">
                    Gallery
                  </button>
                </Link>
                <Link to='/trophy'>
                  <button className="px-8 py-3 rounded-full bg-[#00ff87] text-black
                                     font-bold uppercase tracking-widest text-sm
                                     hover:bg-white transition-all duration-300">
                    Trophy Room
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden md:flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#00ff87]/20 blur-3xl scale-110" />
                <img src={head.logo} alt="logo" className="w-80 rounded-full relative z-10
                                                             ring-4 ring-[#00ff87]/30" />
              </div>
            </motion.div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentImageIndex ? 'w-8 bg-[#00ff87]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </section>
      ))}

      {/* ── FEATURE CARDS ─────────────────────────────────────── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard delay={0}
            icon={<img src={imgj} className="w-9 h-9 rounded-full object-cover" alt="" />}
            title="Talents"
            desc="Révélateurs de talents, toutes catégories confondues"
          />
          <FeatureCard delay={0.1}
            icon={<img src={img2} className="w-9 h-9 rounded-full object-cover" alt="" />}
            title="Joueurs"
            desc="Nos joueurs sont polyvalents et sont tous disciplines"
          />
          <FeatureCard delay={0.2}
            icon={<HiTrophy size={32} color="#00ff87" />}
            title="Championnat"
            desc="Nous sommes engagés dans différents championnats"
          />
          <FeatureCard delay={0.3}
            icon={<img src={imgl} className="w-9 h-9 rounded-full object-cover" alt="" />}
            title="Formation"
            desc="Nous avons une équipe d'experts pour les guider"
          />
        </div>
      </section>

      {/* ── ACTUALITÉS ────────────────────────────────────────── */}
      <section className="py-12 bg-[#0d1117]">
        <FadeUp>
          <SectionHead label="News" title="Actualité en bref" />
        </FadeUp>
        <div className="max-w-6xl mx-auto px-4">
          <Banner />
        </div>
      </section>

      {/* ── MATCHES ───────────────────────────────────────────── */}
      <section className="py-12">
        <FadeUp>
          <SectionHead label="Schedule" title="Prochain Matchs" />
        </FadeUp>
        <div className="max-w-6xl mx-auto px-4">
          <Matches />
        </div>
      </section>

      {/* ── EVENTS SLIDER ─────────────────────────────────────── */}
      <section className="py-12 bg-[#0d1117]">
        <FadeUp>
          <SectionHead label="Events" title="Événement de la Semaine" />
        </FadeUp>
        <SimpleSlider />
      </section>

      {/* ── CHAMPION BANNER ───────────────────────────────────── */}
      <section className="py-0 max-w-6xl mx-auto px-4 my-12">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 bg-gradient-to-br from-[#003d20] to-[#001a0e]
                          border border-[#00ff87]/20">
            {/* Video */}
            <div className="relative">
              <video autoPlay loop muted className="w-full h-full object-cover md:max-h-72">
                <source src={vid1} />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#001a0e]/60" />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center p-10">
              <Label>Victoire</Label>
              <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight text-white mb-2">
                Champion Régional
              </h2>
              <p className="text-[#00ff87] font-bold uppercase tracking-widest text-sm mb-4">
                Du Littoral — African Football Academy
              </p>
              <p className="text-white/50 text-sm">
                Une saison exceptionnelle couronnée de succès pour nos équipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ────────────────────────────────────────── */}
      <section className="py-12 bg-[#0d1117]">
        <FadeUp>
          <SectionHead label="Media" title="Highlight" />
        </FadeUp>
        <div className="max-w-6xl mx-auto px-4">
          <Media />
        </div>
      </section>

      {/* ── TROPHY / RÉALISATIONS ─────────────────────────────── */}
      <section className="py-12">
        <FadeUp>
          <SectionHead label="Palmarès" title="Réalisation" />
        </FadeUp>
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden group">
            <img
              src={img3}
              alt="Achievement"
              className="w-full md:h-[560px] object-cover group-hover:scale-105
                         transition-transform duration-700"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <SlideIn from="left" className="p-10 max-w-lg">
                <Label>Trophées</Label>
                <h2 className="text-4xl md:text-5xl font-black uppercase leading-none text-white mb-4">
                  Galerie de la salle des trophées
                </h2>
                <Link to='/trophy'>
                  <button className="mt-2 px-8 py-3 rounded-full bg-[#00ff87] text-black
                                     font-black uppercase tracking-widest text-sm
                                     hover:bg-white transition-all duration-300">
                    Voir la galerie
                  </button>
                </Link>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <div className="bg-[#0d1117] py-4">
        <StatBanner />
      </div>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section className="py-12">
        <FadeUp>
          <SectionHead label="Équipes" title="Catégorie et équipe" />
        </FadeUp>
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.map((cat, i) => (
            <motion.div
              key={cat.$id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.cat}
                className="w-full h-64 object-cover group-hover:scale-110
                           transition-transform duration-700"
              />
              {/* gradient + label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="w-8 h-[2px] bg-[#00ff87] mb-2 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-white font-black uppercase text-lg tracking-wide">
                  {cat.cat}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PARTNERS ──────────────────────────────────────────── */}
      <section className="py-14 bg-[#0d1117]">
        <FadeUp>
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <Label>Sponsors</Label>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">
              Programme Partenaire
            </h2>
            <div className="mt-3 w-16 h-[3px] bg-[#00ff87] rounded-full" />
          </div>
        </FadeUp>
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-2">
            {partenaire.map((p, i) => (
              <motion.div
                key={p.$id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-24 grayscale hover:grayscale-0
                           opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img src={p.image} alt="partner" className="w-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
