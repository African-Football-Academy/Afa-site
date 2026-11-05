import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiArrowRight } from 'react-icons/hi';
import imgU12 from '../img/afa u12.jpg';
import imgAfa2 from '../img/afa2.jpg';
import imgAfa3 from '../img/afa3.jpg';
import imgCup from '../img/afa cup.jpg';

const fallbackBlogs = [
  {
    $id: 'event-1',
    title: "Stage de Détection Élite : Plus de 80 Jeunes Évalués à Douala",
    desc: "Nos recruteurs et coachs certifiés ont supervisé les tests physiques, techniques et tactiques pour intégrer les promotions U15 et U17.",
    img: imgU12,
    date: '10 Nov 2026',
    category: 'Détection',
  },
  {
    $id: 'event-2',
    title: "Préparation Tactique : Les U17 Face aux Défis du Championnat",
    desc: "Séances intensives axées sur le pressing haut, la transition rapide et la rigueur défensive avant le derby de dimanche.",
    img: imgAfa2,
    date: '08 Nov 2026',
    category: 'Entraînement',
  },
  {
    $id: 'event-3',
    title: "Remise Officielle des Équipements de la Nouvelle Saison",
    desc: "Chaque joueur de l'académie a reçu son pack professionnel : maillots domicile/extérieur, survêtements et matériel d'échauffement.",
    img: imgAfa3,
    date: '04 Nov 2026',
    category: 'Équipement',
  },
  {
    $id: 'event-4',
    title: "Victoire Éclatante en Finale de la Coupe Espoirs du Littoral",
    desc: "Revivez les moments clés et les buts spectaculaires de notre équipe qui s'adjuge un nouveau trophée majeur.",
    img: imgCup,
    date: '01 Nov 2026',
    category: 'Compétition',
  },
];

const SimpleSlider = () => {
  const [blogs, setBlog] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          [Query.limit(4), Query.orderDesc('createdAt')]
        );
        if (response.documents && response.documents.length > 0) {
          setBlog(response.documents);
        } else {
          setBlog(fallbackBlogs);
        }
      } catch (error) {
        console.warn('Slider fallback triggered:', error);
        setBlog(fallbackBlogs);
      }
    };
    getBlog();
  }, []);

  const toggleLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const displayBlogs = blogs.length > 0 ? blogs : fallbackBlogs;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto px-4">
        {displayBlogs.map((blog, i) => (
          <motion.div
            key={blog.$id || i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl shadow-xl bg-slate-900 border border-blue-900/30 hover:border-blue-400/50 transition-all duration-300 flex flex-col"
          >
            <Link to={`/blog/${blog.$id}`} className="flex flex-col h-full">
              {/* Image & Badges */}
              <div className="relative overflow-hidden h-52 bg-slate-950">
                <img
                  src={blog.img || imgAfa3}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top Glowing Edge on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Top Category Badge & Like Button */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                    <span className="w-1 h-1 bg-white rounded-full animate-ping" />
                    {blog.category || 'Événement'}
                  </span>

                  <button
                    onClick={(e) => toggleLike(e, blog.$id)}
                    className="w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:scale-110 transition-transform"
                    title="J'aime"
                    aria-label="Like article"
                  >
                    {liked[blog.$id] ? (
                      <GoHeartFill size={15} className="text-red-500" />
                    ) : (
                      <GoHeart size={15} className="text-white hover:text-red-400" />
                    )}
                  </button>
                </div>

                {/* Date Chip */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-slate-300 font-semibold bg-slate-950/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10">
                  <HiCalendar size={12} className="text-blue-400" />
                  <span>{blog.date || 'Saison 2026'}</span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h3 className="font-black text-white text-sm sm:text-base uppercase leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors font-display">
                    {blog.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mt-2">
                    {blog.desc}
                  </p>
                </div>

                {/* Footer read CTA */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-400 group-hover:text-white transition-colors">
                  <span>Lire l'article</span>
                  <HiArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
