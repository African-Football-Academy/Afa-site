import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { databases } from "../AppwriteConfig";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

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
        setStat(response.documents);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    getStat();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-gray-950 py-10 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <span className="block w-1 h-7 rounded-full bg-red-500" />
          <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-200">
            Joueurs en Vue
          </h2>
        </div>
        <Link to="/stat">
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-blue-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Plus de Stats
            <IoIosArrowForward size={16} />
          </motion.div>
        </Link>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.$id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-blue-700/40 hover:border-blue-400/60 shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            {/* Card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/60 to-blue-950/90" />

            {/* Diagonal accent shape */}
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity"
              style={{
                background: "radial-gradient(circle, #ef4444 0%, transparent 70%)",
              }}
            />

            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-red-500 to-transparent" />

            {/* Content */}
            <div className="relative flex items-end gap-4 p-4">
              {/* Player image */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-xl bg-blue-400/10 blur-sm group-hover:bg-blue-400/20 transition-colors" />
                <img
                  src={stat.player}
                  alt={stat.name}
                  className="relative w-28 h-32 object-cover rounded-xl shadow-lg ring-2 ring-white/10 group-hover:ring-blue-400/40 transition-all duration-300"
                />
                {/* Rating badge on image */}
                <div className="absolute -top-2 -right-2 w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex flex-col items-center justify-center shadow-lg shadow-yellow-500/30">
                  <span className="text-white text-[10px] font-black leading-none">{stat.rating}</span>
                  <HiStar size={8} className="text-white opacity-80" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 pb-1">
                {/* Name */}
                <h3 className="text-white font-black text-lg uppercase leading-tight truncate group-hover:text-blue-200 transition-colors">
                  {stat.name}
                </h3>

                {/* Nationality */}
                <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  {stat.nationality}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-blue-700/50 mb-3" />

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                  <div>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
                      Position
                    </p>
                    <p className="text-white text-xs font-bold truncate">{stat.position}</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
                      Rating
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 font-black text-xs">{stat.rating}</span>
                      <div className="flex-1 h-1 bg-blue-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min((stat.rating / 100) * 100, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
                      Catégorie
                    </p>
                    <span className="inline-block bg-blue-600/40 border border-blue-500/40 text-blue-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {stat.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
