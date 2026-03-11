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

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ children, accent = false }) => (
  <div className={`flex items-center gap-3 max-w-6xl mx-auto px-4 py-6`}>
    <span className={`block w-1 h-8 rounded-full ${accent ? 'bg-red-500' : 'bg-blue-600'}`} />
    <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-700 letter-spacing-wide">
      {children}
    </h2>
    <span className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
  </div>
)

export default function Home() {
  const [partenaire, setPartenaire] = useState([])
  const [category, setCategory] = useState([])
  const [hero, setHero] = useState([])

  useEffect(() => {
    const getHero = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b742a30002b491452e')
        setHero(response.documents)
      } catch (error) { console.error(error) }
    }
    getHero()
  }, [])

  useEffect(() => {
    const getPartenaire = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b7470e000c26abd126', [Query.limit(4), Query.orderDesc('createdAt')])
        setPartenaire(response.documents)
      } catch (error) { console.error(error) }
    }
    getPartenaire()
  }, [])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b740ac0030d5738225')
        setCategory(response.documents)
      } catch (error) { console.error(error) }
    }
    getCategory()
  }, [])

  const images = [img3, img5, img6, img7]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="bg-white font-sans">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      {hero.map((head) => (
        <div key={head.$id} className="relative min-h-screen overflow-hidden">
          {/* Background with animated overlay */}
          <AnimatePresence>
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

          {/* Diagonal overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Decorative diagonal stripe */}
          <div className="absolute bottom-0 right-0 w-1/2 h-full"
               style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(239,68,68,0.15) 50%)' }} />

          {/* Dot grid texture */}
          <div className="absolute inset-0 opacity-10"
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-screen max-w-7xl mx-auto px-6 py-16 gap-10">
            
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex-1 max-w-xl"
            >
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Académie Officielle
              </motion.div>

              <img src={imgHERO} alt="AFA" className="w-72 md:w-96 mb-6 drop-shadow-2xl" />

              <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-md">
                {head.hero_desc}
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link to='/gallery'>
                  <motion.button
                    whileHover={{ scale: 1.04, backgroundColor: '#1d4ed8' }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-blue-600 text-white font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-full border-2 border-blue-400 transition-all shadow-lg shadow-blue-900/40"
                  >
                    Gallery
                  </motion.button>
                </Link>
                <Link to='/trophy'>
                  <motion.button
                    whileHover={{ scale: 1.04, backgroundColor: '#dc2626' }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-red-600 text-white font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-full border-2 border-red-400 transition-all shadow-lg shadow-red-900/40"
                  >
                    Trophy Room
                  </motion.button>
                </Link>
              </div>

              {/* Image indicator dots */}
              <div className="flex gap-2 mt-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${i === currentImageIndex ? 'w-8 bg-red-500' : 'w-3 bg-white/40'}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right: Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 80 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl scale-110" />
                <img
                  src={head.logo}
                  alt="AFA Logo"
                  className="relative w-64 h-64 md:w-96 md:h-96 object-cover rounded-full ring-4 ring-white/20 ring-offset-4 ring-offset-transparent shadow-2xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </div>
      ))}

      {/* ── FEATURE CARDS ─────────────────────────────────────────────────────── */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { img: imgj, label: 'Talents', desc: 'Révélateurs de talents, toutes catégories confondues', color: 'from-blue-600 to-blue-800' },
            { img: img2, label: 'Joueurs', desc: 'Nos joueurs sont polyvalents et sont tous disciplinés', color: 'from-red-600 to-red-800' },
            { icon: <HiTrophy size={48} className="text-white" />, label: 'Championnat', desc: 'Nous sommes engagés dans différents championnats', color: 'from-blue-700 to-blue-900' },
            { img: imgl, label: 'Formation', desc: "Nous avons une équipe d'experts pour les guider", color: 'from-red-700 to-red-900' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`} />
              <div className="p-5 flex flex-col items-center text-center gap-3">
                {card.img ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-100 shadow">
                    <img src={card.img} alt={card.label} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center shadow`}>
                    {card.icon}
                  </div>
                )}
                <h3 className="text-xs font-black uppercase tracking-widest text-red-600 mt-1">{card.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── ACTUALITÉS ────────────────────────────────────────────────────────── */}
      <div className="bg-gray-50 py-4">
        <SectionLabel>Actualité en bref</SectionLabel>
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <Banner />
        </div>
      </div>

      {/* ── PROCHAINS MATCHS ──────────────────────────────────────────────────── */}
      <div className="py-4 bg-white">
        <SectionLabel accent>Prochain Matchs</SectionLabel>
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <Matches />
        </div>
      </div>

      {/* ── EVENTS ────────────────────────────────────────────────────────────── */}
      <div className="bg-blue-700 py-2">
        <div className="flex items-center gap-3 max-w-6xl mx-auto px-4 py-6">
          <span className="block w-1 h-8 rounded-full bg-white/60" />
          <h2 className="uppercase tracking-[0.25em] text-xs font-black text-white">
            Événement de la Semaine
          </h2>
          <span className="flex-1 h-px bg-white/20" />
        </div>
        <div className="pb-8">
          <SimpleSlider />
        </div>
      </div>

      {/* ── CHAMPION VIDEO BLOCK ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-blue-900 py-16">
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10"
          >
            <video autoPlay loop muted className="w-full h-64 md:h-80 object-cover">
              <source src={vid1} />
            </video>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <div className="inline-block bg-red-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              🏆 Titre Régional
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-3">
              Champion Régional<br />
              <span className="text-blue-300">du Littoral</span>
            </h2>
            <p className="text-blue-200 text-sm tracking-widest uppercase font-semibold">
              African Football Academy
            </p>
            <div className="mt-6 w-16 h-1 bg-red-500 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* ── HIGHLIGHT MEDIA ───────────────────────────────────────────────────── */}
      <div className="py-4 bg-white">
        <SectionLabel>Highlight</SectionLabel>
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <Media />
        </div>
      </div>

      {/* ── RÉALISATION ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <SectionLabel>Réalisation</SectionLabel>
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
          <motion.img
            src={img3}
            alt="Achievement"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-20 max-w-2xl"
          >
            <span className="block w-12 h-1 bg-red-500 rounded-full mb-5" />
            <h2 className="text-white text-3xl md:text-5xl font-black uppercase leading-tight mb-2">
              Nos Réalisations
            </h2>
            <h3 className="text-blue-300 text-lg md:text-2xl font-bold mb-6">
              Galerie de la Salle des Trophées
            </h3>
            <Link to='/trophy'>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs px-10 py-3.5 rounded-full shadow-lg shadow-red-900/40 transition-all"
              >
                Voir la Galerie
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── STATS BANNER ──────────────────────────────────────────────────────── */}
      <StatBanner />

      {/* ── CATÉGORIES ────────────────────────────────────────────────────────── */}
      <div className="py-4 bg-gray-50">
        <SectionLabel>Catégorie et Équipe</SectionLabel>
        <div className="max-w-6xl mx-auto px-4 pb-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {category.map((cat, i) => (
            <motion.div
              key={cat.$id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={cat.img}
                alt={cat.cat}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent" />
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="block w-6 h-0.5 bg-red-500 mb-2 transition-all duration-300 group-hover:w-12" />
                <h3 className="text-white font-black uppercase tracking-wider text-lg">
                  {cat.cat}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PARTENAIRES ───────────────────────────────────────────────────────── */}
      <div className="py-10 bg-white border-t border-gray-100">
        <SectionLabel>Programme Partenaire</SectionLabel>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {partenaire.map((image, i) => (
              <motion.div
                key={image.$id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <img src={image.image} alt="partner" className="max-w-full max-h-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
