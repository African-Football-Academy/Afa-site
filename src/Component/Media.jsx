import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { HiPlay } from 'react-icons/hi2';
import { MdSportsSoccer } from 'react-icons/md';
import { motion } from 'framer-motion';
import { HiClock, HiEye } from 'react-icons/hi';
import thumb1 from '../img/afa champion.jpg';
import thumb2 from '../img/afa team img.png';

const fallbackVideos = [
  {
    $id: 'vid-champ-final',
    title: "Finale Régionale du Littoral : Résumé Complet & Célébration du Titre",
    thumbnail: thumb1,
    duration: '06:45',
    views: '3.2K',
    category: 'Match Complet',
  },
  {
    $id: 'vid-training-drill',
    title: "Immersion au Cœur de l'Académie : Séance d'Entraînement des U17",
    thumbnail: thumb2,
    duration: '04:20',
    views: '1.8K',
    category: 'Dans les Coulisses',
  },
];

export default function Media() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b745140039f51d91f4',
          [Query.limit(2), Query.orderDesc('createdAt')]
        );
        if (response.documents && response.documents.length > 0) {
          setVideo(response.documents);
        } else {
          setVideo(fallbackVideos);
        }
      } catch (error) {
        console.warn('Video fetch fallback:', error);
        setVideo(fallbackVideos);
      }
    };
    getVideo();
  }, []);

  const displayVideos = video.length > 0 ? video : fallbackVideos;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-6">
      <div className="grid md:grid-cols-2 gap-6">
        {displayVideos.map((vid, i) => (
          <motion.div
            key={vid.$id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -5 }}
          >
            <Link to={`/play/${vid.$id}`}>
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer border border-blue-900/40 hover:border-blue-400/60 transition-all duration-300 bg-slate-900">
                {/* Thumbnail Container */}
                <div className="relative overflow-hidden h-72 md:h-80 bg-slate-950">
                  <img
                    src={vid.thumbnail || thumb1}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Scrims */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors" />

                  {/* Pulsing Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-20 h-20 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
                      <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-red-600 group-hover:from-red-600 group-hover:to-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-black/80 transition-all duration-300 group-hover:scale-110 border border-white/30">
                        <HiPlay size={28} className="text-white translate-x-0.5 drop-shadow" />
                      </div>
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                      <MdSportsSoccer size={13} className="text-amber-300" />
                      <span>{vid.category || 'Highlight AFA'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/10">
                        <HiClock size={12} className="text-blue-400" />
                        {vid.duration || '05:12'}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Text Information */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                    <h3 className="text-white font-black text-lg md:text-xl uppercase leading-tight line-clamp-2 drop-shadow-lg font-display group-hover:text-blue-300 transition-colors">
                      {vid.title}
                    </h3>

                    {/* Action Link */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-blue-300 group-hover:text-white text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                        <span>Regarder la Vidéo</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <HiEye size={13} />
                        {vid.views || '2.4K'} vues
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
