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
import { Button} from 'flowbite-react'
import { motion } from 'framer-motion';
import SimpleSlider from '../Component/Slider'
import Banner from '../Component/Banner'
import { Link } from 'react-router-dom'
import Media from '../Component/Media'
import Matches from '../Component/Matches'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import StatBanner from '../Component/StatBanner'

const cards = [
  {
    id: 1,
    icon: "🌟",
    label: "Talents",
    desc: "Révélateurs de talents, toutes catégories confondues",
    accent: "#FF3B3B",
    glow: "rgba(255,59,59,0.3)",
  },
  {
    id: 2,
    icon: "⚽",
    label: "Joueurs",
    desc: "Nos joueurs sont polyvalents et sont tous disciplinés",
    accent: "#3B8FFF",
    glow: "rgba(59,143,255,0.3)",
  },
  {
    id: 3,
    icon: "🏆",
    label: "Championnat",
    desc: "Nous sommes engagés dans différents championnats",
    accent: "#FFB800",
    glow: "rgba(255,184,0,0.3)",
  },
  {
    id: 4,
    icon: "🎓",
    label: "Formation",
    desc: "Nous avons une équipe d'experts pour vous guider",
    accent: "#00D68F",
    glow: "rgba(0,214,143,0.3)",
  },
];

export default function Home() {

  const [hovered, setHovered] = useState(null);

  const [ partenaire, setPartenaire] = useState([])
  const [category, setCategory] = useState([])
  const [hero, setHero] = useState([])

  useEffect(() => {
    const getHero = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b742a30002b491452e',
        );
        setHero(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getHero();
  }, []);

  useEffect(() => {
    const getPartenaire = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b7470e000c26abd126',
          [
            Query.limit(4),
            Query.orderDesc('createdAt')
          ]
        );
        setPartenaire(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getPartenaire();
  }, []);

  
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b740ac0030d5738225',
        );
        setCategory(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getCategory();
  }, []);


  const images = [img3, img5, img6, img7]; // Array of background images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div>
        {
           hero.map((head) => (
            <div 
             key={head.$id}
             style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
           className='flex md:flex-row flex-col items-center justify-center p-2'>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
           className='flex-1 md:hidden inline'>
            <img src={head.logo} alt="hero" width={450} className='rounded-full' />
        </motion.div>
          <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='flex-1'
          >
            {/*<h1 className='text-3xl font-bold text-center text-blue-500 uppercase'>{head.hero_title}</h1>*/}
            <img src={imgHERO} alt="hero" width={400} className='mx-auto'/>
            <p className='text-justify text-white mx-auto md:w-[490px] mb-2'>
              {head.hero_desc}
            </p>
            <div className='flex gap-3 justify-center sm:p-3 p-1'>
            <Link to='/gallery'>
             <span className='sm:inline hidden'>
              <Button color='blue' className='rounded-full sm:w-32 w-52'>Gallery</Button>
             </span>
            </Link>
            <Link to='/trophy'>
               <Button color='blue' className='rounded-full sm:w-32 w-52'>Trophy Room</Button>
            </Link>
            </div>
          </motion.div>
          <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='flex-1 md:inline hidden'
          >
            <img src={head.logo} alt="hero" width={500} className='rounded-full' />
        </motion.div>
        </div>
          ))
        }
         <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0e1a 0%, #111827 60%, #0d1525 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); opacity: 0.6; }
          70%  { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }

        .sport-card {
          position: relative;
          width: 280px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px 24px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s ease, border-color 0.3s ease;
          animation: fadeSlideUp 0.5s ease both;
          backdrop-filter: blur(10px);
        }

        .sport-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .sport-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.06), transparent);
        }
        .sport-card:hover::before { opacity: 1; }

        .card-stripe {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
          transition: height 0.3s ease;
        }
        .sport-card:hover .card-stripe { height: 4px; }

        .icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 18px;
          position: relative;
          transition: transform 0.3s ease;
        }
        .sport-card:hover .icon-wrap { transform: scale(1.1) rotate(-4deg); }

        .pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          border: 2px solid;
          animation: pulse-ring 2s ease-out infinite;
        }

        .card-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          background: linear-gradient(90deg, #ffffff, rgba(255,255,255,0.7), #ffffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sport-card:hover .card-label {
          animation: shimmer 1.5s linear infinite;
        }

        .card-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
          transition: color 0.3s;
        }
        .sport-card:hover .card-desc { color: rgba(255,255,255,0.75); }

        .card-arrow {
          position: absolute;
          bottom: 22px; right: 22px;
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .sport-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .grid-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          max-width: 1200px;
        }
      `}</style>

      <div className="grid-wrap">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="sport-card"
            style={{
              animationDelay: `${i * 0.1}s`,
              boxShadow: hovered === card.id
                ? `0 20px 60px ${card.glow}, 0 0 0 1px ${card.accent}40`
                : "0 4px 24px rgba(0,0,0,0.4)",
              borderColor: hovered === card.id ? `${card.accent}60` : "rgba(255,255,255,0.08)",
            }}
            onMouseEnter={() => setHovered(card.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Top stripe */}
            <div
              className="card-stripe"
              style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
            />

            {/* Icon */}
            <div
              className="icon-wrap"
              style={{ background: `${card.accent}18`, border: `1px solid ${card.accent}30` }}
            >
              {hovered === card.id && (
                <div className="pulse-ring" style={{ borderColor: card.accent }} />
              )}
              <span>{card.icon}</span>
            </div>

            {/* Text */}
            <div
              className="card-label"
              style={{ color: card.accent }}
            >
              {card.label}
            </div>
            <p className="card-desc">{card.desc}</p>

            {/* Arrow */}
            <div
              className="card-arrow"
              style={{ background: `${card.accent}22`, color: card.accent }}
            >
              →
            </div>

            {/* Corner number */}
            <div style={{
              position: "absolute",
              top: 16, right: 16,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2.5rem",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              userSelect: "none",
            }}>
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
        <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
         className='uppercase text-xl max-w-5xl mx-auto p-3 text-blue-700 font-bold '>
           Actualite en bref
        </motion.h1>
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}>
          <Banner />
        </motion.div>
        <div className='mx-auto uppercase text-blue-500 text-xl p-2 font-bold max-w-5xl'>
           Prochain Matchs
        </div>
        <div className='p-2'>
             <Matches />
        </div>
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
         className=' text-xl max-w-5xl mx-auto uppercase font-bold text-blue-500 m-2 p-2'>
           Evenement de la Semaine
        </motion.div>
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className=''>
         <SimpleSlider />
        </motion.div>
        <div className='bg-blue-700 p-3 mx-auto max-w-6xl items-center grid sm:grid-cols-2'>
           <video
            autoPlay
            loop
            muted 
            width={600} 
            className='mx-auto flex-1'>
              <source src={vid1} />
           </video>
           <div className='mx-auto flex-1'>
            <div className='mx-auto mt-2'>
              <p className='uppercase font-bold text-sm text-white text-center'>Champion Regional du littoral</p>
              <p className='uppercase font-bold text-xs text-blue-300 text-center'>African Football Academy</p>
            </div>
           </div>
        </div>
          <div className='uppercase font-bold mx-auto text-xxl max-w-4xl text-blue-500 p-1'>
           Highlight
        </div>
          <Media />
          <motion.h1 className='uppercase p-2 text-xl text-blue-500 font-bold max-w-2xl mx-auto'>
             Programme partenaire
          </motion.h1>
          <div className='bg-gray-100'>
              <div className='flex max-w-2xl mx-auto gap-6 justify-between overflow-x-scroll scrollbar p-3'>
                { partenaire.map((image) => (
                    <span key={image.$id} className='w-24'>
                       <img src={image.image} width={100} />
                    </span>
                ))}
              </div>
          </div>
        <div>
          <h1 className='uppercase text-xl font-bold text-blue-500 text-center mt-2 mb-4 p-2'>Réalisation</h1>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3 }}
              className="w-full"
            >
              <img src={img3} alt="Achievement" className="w-full md:h-[700px] md:blur-sm sm:hover:blur-0 bg-black" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="absolute bg-black md:bg-opacity-30 bg-opacity-20 top-0 right-0 w-full md:w-2/4 h-full flex items-center"
            >
              <div className="text-white mx-auto text-center p-6 m-4">
                <motion.h1 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 3 }}
                className="sm:text-3xl font-bold text-cyan-400">
                Nos réalisations
                </motion.h1>
                <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 3 }}
                 className='sm:text-4xl font-bold mb-4'>Galerie de la salle des trophées</motion.h1>
                  <Link to='/trophy'>
                <Button className='mx-auto sm:w-52 w-32 rounded-full' color='blue'>
                     Gallery
                </Button>
                  </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div>
        <motion.div>
           <StatBanner />
        </motion.div>
          <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 }}
          className='text-xl font-bold text-blue-500 text-center mt-2 mb-4 uppercase'
          >
           Catégorie et équipe
          </motion.h1>
          <motion.div className='flex sm:flex-row flex-col justify-between gap-2 p-4'>
            {
              category.map((cat) => (
                <div key={cat.$id} className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                  className="flex-1"
                >
                  <img src={cat.img} alt="Achievement" width={650} height={600} className="sm:h-[370px]" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 bg-black bg-opacity-50 w-full text-center">
                  <div className="text-white mx-auto text-center p-1">
                    <motion.h1
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 3 }}
                    className='sm:text-2xl text-center font-bold mb-4'>{cat.cat}
                    </motion.h1>
                  </div>
                </motion.div>
                </div>
              )
            )}
          </motion.div>
        </div>
    </div>
  )
}
