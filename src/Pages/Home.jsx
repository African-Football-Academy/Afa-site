import { useEffect, useState } from 'react'
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

export default function Home() {

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
            <h1 className='text-3xl font-bold text-center text-blue-500 uppercase'>{head.hero_title}</h1>
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
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-wrap justify-center gap-2 max-w-7xl w-full relative mx-auto'
        >
           <div className="flex sm:justify-between gap-3 items-center sm:w-72 w-full mx-auto p-3 m-3 ml-2 mr-2 border-2 border-blue-500 shadow-xl hover:scale-110">
           <img src={imgj} width={90} className='rounded-full'/>
             <div>
             <h1 className='text-sm text-red-600 font-bold uppercase'>
              Talents
             </h1>
             <p className='text-xs'>Révélateurs de talents, toutes catégories confondues</p>
             </div>
           </div>
           <div className="flex sm:justify-between gap-3 items-center sm:w-72 w-full mx-auto p-3 m-3 ml-2 mr-2 border-2 border-blue-500 shadow-xl hover:scale-110">
             <img src={img2} width={90} className='rounded-full'/>
              <div>
             <h1 className='text-sm text-red-600 font-bold uppercase'>
             Joueurs
             </h1>
             <p className='text-xs'>Nos joueurs sont polyvalents et sont tous disciplines</p>
             </div>
           </div>
           <div className="flex sm:justify-between gap-3 items-center sm:w-72 w-full mx-auto p-4 m-3 ml-2 mr-2 border-2 border-blue-500 shadow-xl hover:scale-110">
             <HiTrophy color='blue' size={60} />
              <div>
             <h1 className='text-sm text-red-600 font-bold uppercase'>
             Championnat
             </h1>
             <p className='text-xs'>Nous sommes engagés dans différents championnats</p>
             </div>
           </div>
           <div className="flex sm:justify-between gap-3 items-center sm:w-72 w-full mx-auto  p-4 m-3 ml-2 mr-2 border-2 border-blue-500 shadow-xl hover:scale-110">
           <img src={imgl} width={70} className='rounded-full'/>
              <div>
             <h1 className='text-sm text-red-600 font-bold uppercase'>
             Formation
             </h1>
             <p className='text-xs'>Nous avons un equipe d'expert pour les guide</p>
             </div>
           </div>
        </motion.div>
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
            <div className='mx-auto'>
              <p className='uppercase font-bold text-xl text-white text-center'>Champion Regional du littoral</p>
              <p className='uppercase font-bold text-sm text-blue-300 text-center'>African Football Academy</p>
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
