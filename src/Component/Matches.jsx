import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiClock, HiChevronRight, HiCalendar, HiSparkles } from 'react-icons/hi';
import afaLogo from '../img/afa.png';
import canonLogo from '../img/canon.png';
import simbaLogo from '../img/simba.png';
import icon1 from '../img/icon1.png';

const fallbackMatches = [
  {
    $id: 'match-choc-1',
    home_name: 'AFA Academy',
    away_name: 'Canon Yaoundé',
    home_team: afaLogo,
    away_team: canonLogo,
    stade: 'Stade de la Réunification, Douala',
    date: '15 Nov 2026',
    time: '15:30 GMT',
    competition: 'Championnat Régional Littoral',
    status: 'Choc au Sommet',
  },
  {
    $id: 'match-choc-2',
    home_name: 'Coton Sport U19',
    away_name: 'AFA Academy',
    home_team: simbaLogo,
    away_team: afaLogo,
    stade: 'Complexe Omnisports Bépanda',
    date: '22 Nov 2026',
    time: '16:00 GMT',
    competition: 'Coupe Espoir Elite',
    status: 'À venir',
  },
  {
    $id: 'match-choc-3',
    home_name: 'AFA Academy U17',
    away_name: 'AS Fortuna',
    home_team: afaLogo,
    away_team: icon1,
    stade: 'Centre Technique AFA',
    date: '29 Nov 2026',
    time: '14:00 GMT',
    competition: 'Ligue Jeunes U17',
    status: 'Derby Régional',
  },
];

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b745ae00108a8e6895',
          [Query.limit(6), Query.orderDesc('createdAt')]
        );
        if (response.documents && response.documents.length > 0) {
          setMatches(response.documents);
        } else {
          setMatches(fallbackMatches);
        }
      } catch (error) {
        console.warn('Appwrite matches fetch fallback:', error);
        setMatches(fallbackMatches);
      } finally {
        setLoading(false);
      }
    };
    getMatches();
  }, []);

  const displayMatches = matches.length > 0 ? matches : fallbackMatches;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayMatches.map((match, i) => (
          <motion.div
            key={match.$id || i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group"
          >
            <Link to={`/matchdet/${match.$id}`}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900 to-blue-950/80 border border-blue-900/40 hover:border-blue-400/60 shadow-xl hover:shadow-blue-600/20 transition-all duration-300">
                {/* Top accent line */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-red-500 to-amber-400 group-hover:h-1.5 transition-all" />

                {/* Match Header Badge */}
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-full">
                    {match.competition || 'Championnat Régional'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.8 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {match.status || 'À venir'}
                  </div>
                </div>

                {/* Teams Showcase */}
                <div className="flex items-center justify-between px-6 py-5 gap-3">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="relative w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 group-hover:border-blue-500/50 p-2 flex items-center justify-center shadow-lg transition-colors">
                      <img
                        src={match.home_team || afaLogo}
                        alt={match.home_name || 'Home'}
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>
                    <span className="text-white text-xs font-black uppercase text-center line-clamp-1 max-w-[100px]">
                      {match.home_name || 'AFA Academy'}
                    </span>
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">
                      Domicile
                    </span>
                  </div>

                  {/* VS Badge */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-rose-700 border border-red-400/40 flex items-center justify-center shadow-lg shadow-red-900/50 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xs font-black font-athletic tracking-wider">VS</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 mt-1">
                      {match.time || '15:30'}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="relative w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 group-hover:border-blue-500/50 p-2 flex items-center justify-center shadow-lg transition-colors">
                      <img
                        src={match.away_team || canonLogo}
                        alt={match.away_name || 'Away'}
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>
                    <span className="text-white text-xs font-black uppercase text-center line-clamp-1 max-w-[100px]">
                      {match.away_name || 'Adversaire'}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Extérieur
                    </span>
                  </div>
                </div>

                {/* Match Information */}
                <div className="mx-4 my-1 h-px bg-gradient-to-r from-transparent via-blue-800/50 to-transparent" />

                <div className="px-5 py-3 flex flex-col gap-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <HiLocationMarker size={14} className="text-red-400 flex-shrink-0" />
                    <span className="truncate font-semibold text-slate-200">
                      {match.stade || 'Stade de la Réunification'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <HiCalendar size={14} className="text-blue-400 flex-shrink-0" />
                    <span>{match.date || 'Dimanche'} · {match.time || '15:30'}</span>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="flex items-center justify-between px-5 py-3 bg-blue-950/60 border-t border-blue-900/40 group-hover:bg-blue-900/40 transition-colors">
                  <span className="text-blue-300 text-xs font-black uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">
                    Fiche du Match & Accès
                  </span>
                  <HiChevronRight size={18} className="text-blue-400 group-hover:translate-x-1.5 transition-transform" />
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
