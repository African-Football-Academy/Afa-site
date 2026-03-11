import img2 from '../img/afabg.png'
import Media from '../Component/Media'
import { MdFacebook } from 'react-icons/md'
import { FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'
import ReactPlayer from 'react-player'
import { motion } from 'framer-motion'
import { HiPlay, HiShare } from 'react-icons/hi'
import { MdSportsSoccer } from 'react-icons/md'

export default function Play() {
  const { videoId } = useParams()
  const [highlight, setHighlight] = useState(null)

  useEffect(() => {
    const getvideo = async () => {
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b745140039f51d91f4',
          videoId
        )
        setHighlight(response)
      } catch (error) {
        console.error('Error fetching video:', error)
      }
    }
    if (videoId) getvideo()
  }, [videoId])

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── PLAYER SECTION ──────────────────────────────────────────────────── */}
      <div className="relative bg-black">
        {/* Ambient glow from video */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 to-black pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-8 pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/60"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent z-10" />

            {/* Loading skeleton */}
            {!highlight ? (
              <div className="w-full aspect-video bg-blue-950/40 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <MdSportsSoccer size={40} className="text-blue-700" />
                </motion.div>
              </div>
            ) : (
              <ReactPlayer
                url={highlight.video}
                controls
                width="100%"
                height="100%"
                style={{ aspectRatio: '16/9', display: 'block' }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* ── VIDEO INFO ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Category badge */}
          <div className="inline-flex items-center gap-2 bg-blue-700/30 border border-blue-600/30 text-blue-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <HiPlay size={10} />
            Highlight · Academy
          </div>

          {/* Title */}
          <h1 className="text-white font-black text-2xl md:text-3xl uppercase leading-tight mb-3">
            {highlight?.title}
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-blue-700/50 to-transparent mb-4" />

          {/* Author + Socials row */}
          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-sm" />
                <img
                  src={img2}
                  alt="AFA"
                  className="relative w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                />
              </div>
              <div>
                <p className="text-white font-black text-xs uppercase tracking-widest">
                  African Football Academy
                </p>
                <p className="text-blue-400 text-[10px] uppercase tracking-widest">Officiel</p>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <HiShare size={12} /> Partager
              </span>
              {[
                { icon: <MdFacebook size={16} />, color: 'text-blue-400 hover:bg-blue-600/30 hover:border-blue-500' },
                { icon: <FaYoutube size={14} />, color: 'text-red-400 hover:bg-red-600/30 hover:border-red-500' },
                { icon: <FaXTwitter size={13} />, color: 'text-gray-300 hover:bg-white/10 hover:border-white/20' },
              ].map(({ icon, color }, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-200 ${color}`}
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description */}
          {highlight?.desc && (
            <div className="mt-5 bg-blue-950/40 border border-blue-800/30 rounded-2xl p-4">
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">Description</p>
              <p className="text-gray-300 text-sm leading-relaxed">{highlight.desc}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── MORE VIDEOS ─────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-1 h-7 rounded-full bg-red-500" />
          <h2 className="uppercase tracking-[0.25em] text-xs font-black text-blue-300">
            Plus de Vidéos
          </h2>
          <span className="flex-1 h-px bg-gradient-to-r from-blue-800 to-transparent" />
        </div>
        <Media />
      </div>
    </div>
  )
}
