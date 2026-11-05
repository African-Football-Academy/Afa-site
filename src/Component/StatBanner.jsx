import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { databases } from "../AppwriteConfig";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiStar, HiSparkles } from "react-icons/hi";
import { MdSportsSoccer } from "react-icons/md";
import playerImg1 from "../img/afa4.jpg";
import playerImg2 from "../img/afa5.jpg";

const fallbackStats = [
  {
    $id: 'star-1',
    name: 'Samuel M. Eyong',
    nationality: 'Cameroun',
    position: 'Attaquant de Pointe (BU)',
    rating: 94,
    category: 'Pôle Élite U17',
    player: playerImg1,
    pace: 96,
    shooting: 92,
    passing: 84,
  },
  {
    $id: 'star-2',
    name: 'Franck O. Kamga',
    nationality: 'Cameroun',
    position: 'Milieu Relayeur (MC)',
    rating: 91,
    category: 'Promotion 2026',
    player: playerImg2,
    pace: 88,
    shooting: 85,
    passing: 93,
  },
];

export default function StatBanner() {
  const [stats, setStat] = useState([]);

  useEffect(() => {
    const getStat = async () => {
      try {
        const response = await databases.listDocuments(
          "67b7400000011dbf91e6",
          "67b747a4000895f519b2",
          [Query.orderDesc("createdAt"), Query.limit(2)]
        );
        if (response.documents && response.documents.length > 0) {
          setStat(response.documents);
        } else {
          setStat(fallbackStats);
        }
      } catch (error) {
        console.warn("Stat fetch fallback:", error);
        setStat(fallbackStats);
      }
    };
    getStat();
  }, []);

  const displayStats = stats.length > 0 ? stats : fallbackStats;

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950 py-16 px-4 border-y border-blue-900/40 overflow-hidden">
      {/* Background Stadium Glow Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <span className="block w-1.5 h-8 rounded-full bg-gradient-to-b from-amber-400 to-red-500" />
          <div>
            <h2 className="uppercase tracking-[0.25em] text-xs font-black text-amber-400 font-athletic">
              Pépites de l'Académie
            </h2>
            <p className="text-white font-black text-2xl sm:text-3xl uppercase tracking-tight font-display">
              Joueurs en Vue · Roster Élite
            </p>
          </div>
        </div>

        <Link to="/stat">
          <motion.div
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400 hover:text-white bg-slate-900/80 border border-blue-800/60 hover:border-blue-400 px-5 py-2.5 rounded-full transition-all shadow-lg"
          >
            <span>Voir Tout l'Effectif</span>
            <IoIosArrowForward size={16} />
          </motion.div>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
        {displayStats.map((stat, i) => (
          <motion.div
            key={stat.$id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-blue-800/40 hover:border-amber-400/60 shadow-2xl transition-all duration-300 bg-slate-900/90"
          >
            {/* Holographic Card Frame / Edge */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500" />

            {/* Ambient Radial Accent */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all pointer-events-none" />

            {/* Inner Content */}
            <div className="relative p-6 flex flex-col sm:flex-row items-center sm:items-end gap-6">
              {/* Player Image with FUT Diamond Shield */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-400 to-blue-600 opacity-40 blur-sm group-hover:opacity-80 transition-opacity" />
                <div className="relative w-32 h-40 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-amber-400/80 shadow-2xl bg-slate-950">
                  <img
                    src={stat.player || playerImg1}
                    alt={stat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                {/* Rating Badge */}
                <div className="absolute -top-2 -right-2 w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl border-2 border-slate-900 flex flex-col items-center justify-center shadow-xl shadow-amber-500/40">
                  <span className="text-slate-950 text-xs font-black leading-none font-display">
                    {stat.rating || 90}
                  </span>
                  <HiStar size={10} className="text-slate-950" />
                </div>
              </div>

              {/* Player Details & Skill Ratings */}
              <div className="flex-1 min-w-0 w-full">
                {/* Header info */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {stat.nationality || 'Cameroun'}
                  </span>
                  <span className="bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {stat.category || 'Pôle Élite'}
                  </span>
                </div>

                <h3 className="text-white font-black text-xl uppercase tracking-wide truncate group-hover:text-amber-300 transition-colors font-display">
                  {stat.name}
                </h3>

                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                  {stat.position || 'Attaquant'}
                </p>

                {/* Skill Bars */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {/* Rating / Vitesse */}
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-wider mb-1">
                      <span className="text-slate-400">Note Globale (OVR)</span>
                      <span className="text-amber-400 font-extrabold">{stat.rating || 90}/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(stat.rating || 90, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Impact & Performance */}
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-wider mb-1">
                      <span className="text-slate-400">Discipline & Potentiel</span>
                      <span className="text-blue-400 font-extrabold">95%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '95%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Link */}
                <div className="mt-4 pt-2 flex items-center justify-between">
                  <Link to="/stat" className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                    <span>Fiche Joueur</span>
                    <span>→</span>
                  </Link>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">
                    AFA Talent ID
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
