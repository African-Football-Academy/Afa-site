import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiClock, HiChevronRight } from 'react-icons/hi';

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b745ae00108a8e6895',
          [Query.limit(4), Query.orderDesc('createdAt')]
        );
        setMatches(response.documents);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    getMatches();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-6">
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
           style={{ scrollbarWidth: 'none' }}>
        {matches.map((match, i) => (
          <motion.div
            key={match.$id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="flex-shrink-0 w-64"
          >
            <Link to={`/matchdet/${match.$id}`}>
              <div className="relative group bg-gradient-to-b from-gray-900 to-blue-950 border border-blue-900/50 hover:border-blue-500/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-900/30 transition-all duration-300">

                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-red-500 to-blue-600" />

                {/* Live / Upcoming badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-600/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  À venir
                </div>

                {/* Teams row */}
                <div className="flex items-center justify-between px-5 pt-6 pb-4 gap-3">
                  {/* Home */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center p-1.5 group-hover:bg-white/15 transition-colors">
                      <img
                        src={match.home_team}
                        alt="Home"
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>
                    <span className="text-white text-xs font-bold text-center leading-tight opacity-80">
                      Domicile
                    </span>
                  </div>

                  {/* VS */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/40">
                      <span className="text-white text-xs font-black">VS</span>
                    </div>
                  </div>

                  {/* Away */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center p-1.5 group-hover:bg-white/15 transition-colors">
                      <img
                        src={match.away_team}
                        alt="Away"
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>
                    <span className="text-white text-xs font-bold text-center leading-tight opacity-80">
                      Extérieur
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-gradient-to-r from-transparent via-blue-700/50 to-transparent" />

                {/* Match info */}
                <div className="px-4 py-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-blue-200">
                    <HiLocationMarker size={13} className="text-red-400 flex-shrink-0" />
                    <span className="text-xs font-semibold truncate">{match.stade}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-300">
                    <HiClock size={13} className="text-blue-400 flex-shrink-0" />
                    <span className="text-xs text-gray-400">
                      {match.date} · {match.time}
                    </span>
                  </div>
                </div>

                {/* CTA footer */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-blue-900/30 border-t border-blue-900/40">
                  <span className="text-blue-400 text-xs font-black uppercase tracking-widest">
                    Détails
                  </span>
                  <HiChevronRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
