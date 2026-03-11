import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { HiPlay } from 'react-icons/hi2';
import { MdSportsSoccer } from 'react-icons/md';
import { motion } from 'framer-motion';

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
        setVideo(response.documents);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    getVideo();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      <div className="grid md:grid-cols-2 gap-5">
        {video.map((vid, i) => (
          <motion.div
            key={vid.$id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <Link to={`/play/${vid.$id}`}>
              <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer border border-gray-200 hover:border-blue-400 transition-all duration-300">

                {/* Thumbnail */}
                <div className="relative overflow-hidden h-64 md:h-72 bg-gray-900">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />

                  {/* Dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Side accent on hover */}
                  <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-blue-500 to-red-500 group-hover:h-full transition-all duration-500 rounded-tr-full rounded-br-full" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      {/* Ripple ring */}
                      <div className="absolute inset-0 rounded-full bg-white/20 scale-100 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-500" />
                      <div className="w-14 h-14 bg-blue-600 group-hover:bg-red-600 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300">
                        <HiPlay size={26} className="text-white translate-x-0.5" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Duration / number badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full border border-white/10">
                    <MdSportsSoccer size={12} className="text-blue-400" />
                    Academy
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Category pill */}
                    <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow">
                      <span className="w-1 h-1 bg-white rounded-full" />
                      .Academy
                    </div>

                    {/* Title */}
                    <h2 className="text-white font-black text-base uppercase leading-tight line-clamp-2 drop-shadow-lg">
                      {vid.title}
                    </h2>

                    {/* Watch CTA */}
                    <div className="flex items-center gap-1 mt-2 text-blue-300 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Regarder</span>
                      <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
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
