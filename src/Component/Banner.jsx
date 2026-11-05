import { useEffect, useState } from 'react'
import { MdFacebook } from 'react-icons/md'
import { FaXTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiSparkles, HiClock, HiArrowRight } from 'react-icons/hi'
import defaultBannerImg from '../img/afa champion.jpg'

const fallbackBlog = {
  $id: 'featured-champ',
  title: "L'African Football Academy Sacrée Championne Régionale du Littoral",
  desc: "Au terme d'une saison historique sans la moindre défaite, les jeunes prodiges de l'AFA remportent le titre suprême du Littoral et confirment leur statut de référence footballistique en Afrique.",
  img: defaultBannerImg,
  date: 'Saison 2025/2026',
  category: 'Événement Officiel',
}

export default function Banner() {
  const [tblogs, setTBlog] = useState([])

  useEffect(() => {
    const getTBlog = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          [Query.limit(1), Query.orderDesc('createdAt')]
        )
        if (response.documents && response.documents.length > 0) {
          setTBlog(response.documents)
        } else {
          setTBlog([fallbackBlog])
        }
      } catch (error) {
        console.warn('Banner news fallback:', error)
        setTBlog([fallbackBlog])
      }
    }
    getTBlog()
  }, [])

  const displayBlog = tblogs.length > 0 ? tblogs[0] : fallbackBlog

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative overflow-hidden rounded-3xl shadow-2xl border border-blue-900/40 bg-slate-950"
      >
        <div className="relative min-h-[380px] sm:min-h-[440px] flex items-end">
          {/* Background Image with smooth zoom on hover */}
          <img
            src={displayBlog.img || defaultBannerImg}
            alt={displayBlog.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Deep Cinematic Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-blue-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

          {/* Top Championship Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-blue-500 to-amber-400" />

          {/* Content Layout */}
          <div className="relative z-10 p-6 sm:p-10 max-w-3xl flex flex-col items-start gap-4">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                {displayBlog.category || 'Actualité · Academy'}
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                <HiSparkles size={12} />
                À la Une
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <HiClock size={13} />
                Lecture 3 min
              </span>
            </div>

            {/* Title */}
            <h2 className="text-white font-black text-2xl sm:text-4xl uppercase leading-tight font-display drop-shadow-xl group-hover:text-blue-300 transition-colors">
              {displayBlog.title}
            </h2>

            {/* Accent Divider */}
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-2xl">
              {displayBlog.desc}
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between w-full pt-2 gap-4 border-t border-white/10 mt-2">
              <Link to={displayBlog.$id ? `/blog/${displayBlog.$id}` : '/gallery'}>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg shadow-blue-900/40 border border-blue-400/30 flex items-center gap-2 transition-all">
                  <span>Lire l'Article Complet</span>
                  <HiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Social Share Icons */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mr-1">
                  Partager :
                </span>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-slate-900/80 border border-white/10 hover:bg-blue-600 hover:text-white text-blue-400 flex items-center justify-center transition-all"
                  title="Partager sur Facebook"
                >
                  <MdFacebook size={16} />
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(displayBlog.title)}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-slate-900/80 border border-white/10 hover:bg-slate-700 hover:text-white text-slate-300 flex items-center justify-center transition-all"
                  title="Partager sur X"
                >
                  <FaXTwitter size={14} />
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(displayBlog.title + ' ' + window.location.href)}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-slate-900/80 border border-white/10 hover:bg-emerald-600 hover:text-white text-emerald-400 flex items-center justify-center transition-all"
                  title="Partager sur WhatsApp"
                >
                  <FaWhatsapp size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}
