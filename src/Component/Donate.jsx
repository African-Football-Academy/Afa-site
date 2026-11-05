import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { HiHeart, HiSparkles } from 'react-icons/hi'

export default function Donate() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to="/donate" className="fixed bottom-6 right-5 z-40 group">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex items-center"
      >
        {/* Soft pulse glow halo */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 opacity-60 blur-md group-hover:opacity-100 animate-pulse transition-opacity" />

        {/* Floating Capsule */}
        <div className="relative flex items-center gap-2.5 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white rounded-full shadow-2xl shadow-emerald-950/60 border border-emerald-400/40 px-3.5 py-3 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
            <HiHeart size={18} className="text-white drop-shadow group-hover:scale-115 transition-transform" />
          </div>

          <div className="flex flex-col pr-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-white leading-tight font-athletic">
              Soutenir AFA
            </span>
            <span className="text-[9px] font-bold text-emerald-400 tracking-widest uppercase">
              Faire un don
            </span>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap pl-1 text-[10px] font-extrabold text-amber-300 uppercase tracking-widest flex items-center gap-1"
              >
                <HiSparkles size={12} />
                <span>Impact Direct</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  )
}
