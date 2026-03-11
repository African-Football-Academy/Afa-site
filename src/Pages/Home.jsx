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

const fadeUp   = { initial: { opacity: 0, y: 40 },  animate: { opacity: 1, y: 0 },  transition: { duration: 0.7 } };
const fadeLeft = { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 },  transition: { duration: 0.8 } };
const fadeRight= { initial: { opacity: 0, x: 60 },  animate: { opacity: 1, x: 0 },  transition: { duration: 0.8 } };
const fadeIn   = { initial: { opacity: 0 },          animate: { opacity: 1 },         transition: { duration: 1.2 } };

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
      } catch (error) { console.error("Error fetching collection:", error); }
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
      } catch (error) { console.error("Error fetching collection:", error); }
    };
    getPartenaire();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await databases.listDocuments('67b7400000011dbf91e6', '67b740ac0030d5738225');
        setCategory(response.documents);
      } catch (error) { console.error("Error fetching collection:", error); }
    };
    getCategory();
  }, []);

  const featureCards = [
    { img: imgj,  title: 'Talents',      desc: 'Révélateurs de talents, toutes catégories confondues', icon: null },
    { img: img2,  title: 'Joueurs',      desc: 'Nos joueurs sont polyvalents et sont tous disciplines', icon: null },
    { img: null,  title: 'Championnat',  desc: 'Nous sommes engagés dans différents championnats',     icon: <HiTrophy className="text-blue-500" size={56} /> },
    { img: imgl,  title: 'Formation',    desc: "Nous avons un equipe d'expert pour les guide",         icon: null },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      {hero.map((head) => (
        <div
          key={head.$id}
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1s ease-in-out',
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-black/70" />

          {/* Diagonal decorative stripe */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-red-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-3 items-center gap-8 py-16">

            {/* Left logo (mobile only) */}
            <motion.div {...fadeUp} className="md:hidden flex justify-center">
              <div className="w-36 h-36 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
                <img src={head.logo} alt="logo" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Center content */}
            <motion.div {...fadeUp} className="flex flex-col items-center text-center md:col-span-1 order-1">
              <img src={imgHERO} alt="hero" className="w-80 mx-auto mb-4 drop-shadow-2xl" />
              <p className="text-white/80 text-sm leading-relaxed max-w-xs mb-6">{head.hero_desc}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/gallery">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-black text-sm px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/40 transition-all hover:scale-105 tracking-wide uppercase">
                    Gallery
                  </button>
                </Link>
                <Link to="/trophy">
                  <button className="bg-white/15 hover:bg-white/25 border border-white/40 text-white font-black text-sm px-6 py-2.5 rounded-full backdrop-blur-sm transition-all hover:scale-105 tracking-wide uppercase">
                    Trophy Room
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right logo (desktop) */}
            <motion.div {...fadeRight} className="hidden md:flex justify-center md:order-2">
              <div className="w-52 h-52 rounded-full border-4 border-white/25 overflow-hidden shadow-2xl ring-4 ring-blue-500/30">
                <img src={head.logo} alt="logo" className="w-full h-full object-cover" />
              </div>
            </motion.div>

          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
            <div className="w-px h-8 bg-white/40 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-white/60" />
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

      {/* ── PROCHAINS MATCHS ── */}
      <div className="bg-blue-50">
        <SectionLabel>Prochain Matchs</SectionLabel>
        <div className="max-w-5xl mx-auto px-4 pb-8">
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
              <div key={image.$id} className="w-24 h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            {...fadeRight}
            className="absolute top-0 right-0 w-full md:w-1/2 h-full flex items-center"
          >
            <div className="text-white mx-auto text-center p-8">
              <div className="w-12 h-1 bg-blue-400 rounded-full mx-auto mb-5" />
              <h2 className="text-cyan-400 font-black text-2xl sm:text-3xl mb-3 tracking-wide uppercase">
                Nos Réalisations
              </h2>
              <h3 className="font-black text-xl sm:text-3xl mb-6 leading-tight">
                Galerie de la salle des trophées
              </h3>
              <Link to="/trophy">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-black px-8 py-3 rounded-full shadow-lg shadow-blue-500/40 hover:scale-105 transition-all uppercase tracking-wide text-sm">
                  Gallery
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── STAT BANNER ── */}
      <StatBanner />

      {/* ── CATÉGORIES ── */}
      <motion.div {...fadeUp}>
        <SectionLabel>Catégorie et Équipe</SectionLabel>
        <div className="flex sm:flex-row flex-col gap-0 overflow-hidden max-w-full">
          {category.map((cat) => (
            <div key={cat.$id} className="relative flex-1 group overflow-hidden">
              <motion.img
                {...fadeIn}
                src={cat.img}
                alt={cat.cat}
                className="w-full sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-blue-900/80 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <div className="w-8 h-1 bg-blue-400 rounded-full mx-auto mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-white font-black text-xl sm:text-2xl uppercase tracking-wide">{cat.cat}</h3>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
