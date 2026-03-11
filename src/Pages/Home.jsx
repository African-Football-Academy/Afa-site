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
import { motion } from 'framer-motion';
import SimpleSlider from '../Component/Slider'
import Banner from '../Component/Banner'
import { Link } from 'react-router-dom'
import Media from '../Component/Media'
import Matches from '../Component/Matches'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import StatBanner from '../Component/StatBanner'

const fadeUp    = { initial: { opacity: 0, y: 40 },  animate: { opacity: 1, y: 0 },  transition: { duration: 0.7 } };
const fadeLeft  = { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 },  transition: { duration: 0.8 } };
const fadeRight = { initial: { opacity: 0, x: 60 },  animate: { opacity: 1, x: 0 },  transition: { duration: 0.8 } };
const fadeIn    = { initial: { opacity: 0 },          animate: { opacity: 1 },         transition: { duration: 1.2 } };

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 max-w-5xl mx-auto px-4 py-5">
    <div className="h-1 w-8 bg-blue-500 rounded-full" />
    <h2 className="uppercase font-black text-xl text-blue-600 tracking-widest">{children}</h2>
    <div className="h-1 flex-1 bg-blue-100 rounded-full" />
  </div>
);

export default function Home() {

  const [partenaire, setPartenaire] = useState([]);
  const [category, setCategory]     = useState([]);
  const [hero, setHero]             = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const images = [img3, img5, img6, img7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const getHero = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b742a30002b491452e');
        setHero(response.documents);
      } catch (error) { console.error("Error fetching:", error); }
    };
    getHero();
  }, []);

  useEffect(() => {
    const getPartenaire = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6', '67b7470e000c26abd126',
          [Query.limit(4), Query.orderDesc('createdAt')]
        );
        setPartenaire(response.documents);
      } catch (error) { console.error("Error fetching:", error); }
    };
    getPartenaire();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b740ac0030d5738225');
        setCategory(response.documents);
      } catch (error) { console.error("Error fetching:", error); }
    };
    getCategory();
  }, []);

  const featureCards = [
    { img: imgj,  title: 'Talents',     desc: 'Révélateurs de talents, toutes catégories confondues', icon: null },
    { img: img2,  title: 'Joueurs',     desc: 'Nos joueurs sont polyvalents et tous disciplines',     icon: null },
    { img: null,  title: 'Championnat', desc: 'Nous sommes engagés dans différents championnats',     icon: <HiTrophy className="text-blue-500" size={52} /> },
    { img: imgl,  title: 'Formation',   desc: "Nous avons une équipe d'experts pour les guider",     icon: null },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════
          HERO — cinematic full-screen with crossfade
      ══════════════════════════════════════════ */}
      {hero.map((head) => (
        <div key={head.$id} className="relative min-h-screen overflow-hidden">

          {/* Crossfading background images */}
          {images.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1500"
              style={{ backgroundImage: `url(${img})`, opacity: i === currentImageIndex ? 1 : 0 }}
            />
          ))}

          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Subtle grid texture */}
          <div className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Glow blobs */}
          <div className="absolute top-1/4 left-20 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-10 w-64 h-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

          {/* ── Content ── */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 min-h-screen flex flex-col justify-center py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left: Text */}
              <div>
                {/* Pill badge */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
                  <span className="text-blue-300 text-xs font-black tracking-widest uppercase">African Football Academy</span>
                </motion.div>

                {/* Logo wordmark */}
                <motion.img
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                  src={imgHERO} alt="AFA" className="w-72 mb-5 drop-shadow-2xl"
                />

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white/70 text-sm leading-relaxed max-w-sm mb-8"
                >
                  {head.hero_desc}
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex gap-3 flex-wrap"
                >
                  <Link to="/gallery">
                    <button className="group bg-blue-500 hover:bg-blue-400 text-white font-black text-sm px-7 py-3 rounded-xl shadow-lg shadow-blue-500/40 transition-all hover:scale-105 tracking-wide uppercase flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      Gallery
                    </button>
                  </Link>
                  <Link to="/trophy">
                    <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black text-sm px-7 py-3 rounded-xl backdrop-blur-sm transition-all hover:scale-105 tracking-wide uppercase flex items-center gap-2">
                      <HiTrophy size={16} />
                      Trophy Room
                    </button>
                  </Link>
                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
                  className="flex gap-8 mt-10 pt-8 border-t border-white/10"
                >
                  {[
                    { value: '10+', label: 'Années' },
                    { value: '200+', label: 'Joueurs' },
                    { value: '5+', label: 'Titres' },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-white font-black text-3xl leading-none">{s.value}</p>
                      <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-1">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: Animated logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                className="hidden md:flex justify-center items-center relative"
              >
                {/* Spinning dashed ring */}
                <div
                  className="absolute w-80 h-80 rounded-full border-2 border-dashed border-blue-400/25"
                  style={{ animation: 'spin 25s linear infinite' }}
                />
                <div className="absolute w-64 h-64 rounded-full border border-blue-300/15" />

                {/* Logo circle */}
                <div className="w-52 h-52 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl ring-8 ring-blue-500/20">
                  <img src={head.logo} alt="logo" className="w-full h-full object-cover" />
                </div>

                {/* Floating champion badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-xl uppercase tracking-widest flex items-center gap-1.5 border-2 border-blue-300/30">
                  <HiTrophy size={12} /> Champion
                </div>
              </motion.div>

            </div>
          </div>

          {/* Image dot navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`rounded-full transition-all duration-400 ${
                  i === currentImageIndex
                    ? 'w-8 h-2.5 bg-blue-400 shadow-lg shadow-blue-400/50'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Vertical scroll label */}
          <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 opacity-40">
            <span className="text-white text-[9px] font-black tracking-widest uppercase"
              style={{ writingMode: 'vertical-rl' }}>Scroll Down</span>
            <div className="w-px h-10 bg-white/50 rounded-full" />
          </div>

        </div>
      ))}

      {/* ── FEATURE CARDS ── */}
      <motion.div {...fadeUp} className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featureCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex gap-4 items-center p-4 rounded-2xl border-2 border-blue-100 bg-white shadow-md hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex-shrink-0">
              {card.icon
                ? card.icon
                : <div className="w-14 h-14 rounded-xl overflow-hidden bg-blue-50">
                    <img src={card.img} className="w-full h-full object-cover" alt="" />
                  </div>
              }
            </div>
            <div>
              <h3 className="text-red-600 font-black text-sm uppercase tracking-wide mb-1">{card.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── ACTUALITÉS ── */}
      <motion.div {...fadeLeft}>
        <SectionLabel>Actualité en bref</SectionLabel>
        <div className="max-w-5xl mx-auto px-4 pb-6">
          <Banner />
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          PROCHAINS MATCHS — styled panel with header
      ══════════════════════════════════════════ */}
      <div className="bg-blue-950 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500" />

        <div className="relative max-w-5xl mx-auto px-4 py-8">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-blue-400 rounded-full" />
              <div>
                <p className="text-blue-400 text-xs font-black tracking-widest uppercase">AFA</p>
                <h2 className="text-white font-black text-xl tracking-widest uppercase">Prochains Matchs</h2>
              </div>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-green-400 text-xs font-bold uppercase tracking-wide">Live Updates</span>
            </div>
          </div>

          <Matches />
        </div>
      </div>

      {/* ── ÉVÉNEMENT DE LA SEMAINE ── */}
      <motion.div {...fadeRight}>
        <SectionLabel>Événement de la Semaine</SectionLabel>
        <div className="pb-6">
          <SimpleSlider />
        </div>
      </motion.div>

      {/* ── CHAMPION BANNER ── */}
      <div className="bg-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.07),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto grid sm:grid-cols-2 items-center gap-4 p-4">
          <video autoPlay loop muted className="mx-auto w-full max-w-lg rounded-2xl shadow-2xl">
            <source src={vid1} />
          </video>
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-300 mb-4 shadow-lg">
              <HiTrophy className="text-blue-900" size={32} />
            </div>
            <p className="uppercase font-black text-lg text-white tracking-widest mb-1">Champion Régional du Littoral</p>
            <p className="uppercase font-bold text-sm text-blue-300 tracking-widest">African Football Academy</p>
            <div className="mt-4 w-16 h-1 bg-yellow-300 rounded-full mx-auto" />
          </div>
        </div>
      </div>

      {/* ── HIGHLIGHTS ── */}
      <motion.div {...fadeUp}>
        <SectionLabel>Highlight</SectionLabel>
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <Media />
        </div>
      </motion.div>

      {/* ── PARTENAIRES ── */}
      <div className="bg-gray-50 py-8">
        <SectionLabel>Programme Partenaire</SectionLabel>
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-6 justify-center items-center flex-wrap">
            {partenaire.map((image) => (
              <div key={image.$id} className="w-24 h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img src={image.image} className="w-full h-full object-contain" alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RÉALISATIONS ── */}
      <div className="relative overflow-hidden">
        <SectionLabel>Réalisation</SectionLabel>
        <motion.div {...fadeIn} className="relative">
          <img src={img3} alt="Achievement" className="w-full md:h-[680px] object-cover md:blur-sm hover:blur-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/40" />
          <motion.div {...fadeRight} className="absolute top-0 right-0 w-full md:w-1/2 h-full flex items-center">
            <div className="text-white mx-auto text-center p-8">
              <div className="w-12 h-1 bg-blue-400 rounded-full mx-auto mb-5" />
              <h2 className="text-cyan-400 font-black text-2xl sm:text-3xl mb-3 tracking-wide uppercase">Nos Réalisations</h2>
              <h3 className="font-black text-xl sm:text-3xl mb-6 leading-tight">Galerie de la salle des trophées</h3>
              <Link to="/trophy">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-blue-500/40 hover:scale-105 transition-all uppercase tracking-wide text-sm">
                  Gallery
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── STAT BANNER ── */}
      <StatBanner />

      {/* ══════════════════════════════════════════
          CATÉGORIES — interactive tabbed gallery
      ══════════════════════════════════════════ */}
      <motion.div {...fadeUp} className="bg-blue-950 relative overflow-hidden">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500" />

        {/* Background dots */}
        <div className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-blue-400 rounded-full" />
              <div>
                <p className="text-blue-400 text-xs font-black tracking-widest uppercase">Nos Équipes</p>
                <h2 className="text-white font-black text-xl tracking-widest uppercase">Catégorie et Équipe</h2>
              </div>
            </div>
            {/* Tab pills */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase transition-all ${
                  activeCategory === null
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 border border-white/10'
                }`}
              >
                Tous
              </button>
              {category.map((cat) => (
                <button
                  key={cat.$id}
                  onClick={() => setActiveCategory(activeCategory === cat.$id ? null : cat.$id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase transition-all ${
                    activeCategory === cat.$id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {cat.cat}
                </button>
              ))}
            </div>
          </div>

          {/* Category grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category
              .filter(cat => activeCategory === null || cat.$id === activeCategory)
              .map((cat, i) => (
              <motion.div
                key={cat.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer border border-white/5 hover:border-blue-400/40 transition-all duration-300 shadow-xl"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Image */}
                <img
                  src={cat.img}
                  alt={cat.cat}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/40 to-transparent group-hover:via-blue-800/50 transition-all duration-500" />

                {/* Corner badge */}
                <div className="absolute top-3 left-3 bg-blue-500/80 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">
                  AFA
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Slide-up accent bar */}
                  <div className="w-8 h-1 bg-blue-400 rounded-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <h3 className="text-white font-black text-xl uppercase tracking-wide leading-tight">{cat.cat}</h3>
                  {/* Description appears on hover */}
                  <p className="text-blue-200 text-xs mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 line-clamp-2">
                    Équipe {cat.cat} — African Football Academy
                  </p>
                  {/* View button */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <span className="inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wide">
                      Voir l'équipe
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>

    </div>
  );
}
