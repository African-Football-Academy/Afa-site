import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'
import ReactPlayer from 'react-player'
import { motion } from 'framer-motion'
import { 
  HiPlay, 
  HiShare, 
  HiEye, 
  HiArrowLeft, 
  HiSparkles,
  HiCheck,
  HiLink,
  HiInformationCircle
} from 'react-icons/hi2'
import { MdSportsSoccer, MdLiveTv } from 'react-icons/md'
import { FaWhatsapp, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6'
import { toast, ToastContainer } from 'react-toastify'
import Media from '../Component/Media'
import afaLogo from '../img/AFRICAN FOOTBALL  ACADEMY.png'
import afaBg from '../img/afabg.png'

export default function Play() {
  const { videoId } = useParams()
  const [highlight, setHighlight] = useState(null)
  const [copied, setCopied] = useState(false)
  const [isTheater, setIsTheater] = useState(false)
  const [loading, setLoading] = useState(true)

  // Default fallback highlight if videoId is missing or Appwrite collection is empty
  const fallbackHighlight = {
    $id: videoId || 'vid-fallback-1',
    title: "AFA TV : Résumé de la Victoire Historique en Finale Régionale (3-1)",
    desc: "Revivez les moments forts, les arrêts décisifs et les buts spectaculaires de notre équipe U-19 lors du sacre régional. Une démonstration collective marquée par un pressing tout terrain et un réalisme chirurgical face au Canon Sportif Junior.",
    video: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", // high quality football highlights demo
    views: "4,820",
    duration: "04:35",
    category: "Match Highlights",
    date: "Saison 2025/2026",
    tags: ["U-19", "Finale", "Buts", "AFA TV", "Trophée"]
  }

  useEffect(() => {
    const getVideo = async () => {
      setLoading(true)
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b745140039f51d91f4',
          videoId
        )
        setHighlight(response)
      } catch (error) {
        console.warn('Video not found or Appwrite fetch error, using fallback:', error)
        setHighlight(fallbackHighlight)
      } finally {
        setLoading(false)
      }
    }

    if (videoId) {
      getVideo()
    } else {
      setHighlight(fallbackHighlight)
      setLoading(false)
    }
  }, [videoId])

  const activeVideo = highlight || fallbackHighlight
  const videoSource = activeVideo.video || fallbackHighlight.video

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success("Lien de la vidéo copié !")
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-afa-red selection:text-white">
      <ToastContainer
        position="top-right"
        toastStyle={{
          background: '#070e22',
          color: '#ffffff',
          border: '1px solid rgba(37,99,235,0.3)',
          borderRadius: '12px'
        }}
      />

      {/* ── CINEMA THEATER STAGE ─────────────────────────────────── */}
      <div className="relative bg-black pt-20 pb-8 overflow-hidden border-b border-white/10">
        {/* Dynamic Stadium Ambient Light Backing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-40 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className={`relative z-10 mx-auto px-4 sm:px-6 transition-all duration-500 ${isTheater ? 'max-w-7xl' : 'max-w-5xl'}`}>
          
          {/* Top Sub-nav Bar */}
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-xl transition-all"
            >
              <HiArrowLeft className="w-4 h-4 text-afa-red" />
              Retour aux médias
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-red-600/20 border border-red-500/40 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                AFA TV · Haute Définition
              </span>

              {/* Theater Mode Toggle */}
              <button
                onClick={() => setIsTheater(!isTheater)}
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors hidden md:block"
              >
                {isTheater ? 'Mode Normal' : 'Mode Cinéma'}
              </button>
            </div>
          </div>

          {/* Video Player Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-slate-950 shadow-[0_20px_70px_rgba(0,0,0,0.85)] group"
          >
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-afa-red via-afa-gold to-afa-blue z-20" />

            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <ReactPlayer
                url={videoSource}
                controls
                playing={false}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1, modestbranding: 1 }
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── VIDEO INFORMATION & INTERACTIONS ─────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Tags & Views */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-afa-blue/20 border border-afa-blue/40 text-blue-300">
                <HiPlay className="w-3.5 h-3.5 text-afa-gold" />
                {activeVideo.category || "Highlight Élite"}
              </span>
              <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                {activeVideo.duration || "03:45"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <HiEye className="w-4 h-4 text-afa-blue" />
              <span>{activeVideo.views || "3,250"} vues</span>
              <span>•</span>
              <span>{activeVideo.date || "Diffusé récemment"}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-display tracking-tight text-white leading-tight">
            {activeVideo.title}
          </h1>

          {/* Channel Info & Sharing Strip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-blue-950/40 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Club Brand */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={afaLogo}
                  alt="AFA"
                  className="w-12 h-12 rounded-full p-1 bg-slate-950 border-2 border-afa-blue/50 object-contain shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm uppercase tracking-wider font-display text-white">
                    African Football Academy
                  </h4>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Officiel
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Chaîne Officielle · Centre de Formation d'Élite
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                Partager :
              </span>

              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(activeVideo.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center transition-all hover:scale-105"
                title="Partager sur WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeVideo.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105"
                title="Partager sur X"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-400 flex items-center justify-center transition-all hover:scale-105"
                title="Partager sur Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>

              {/* Copy link */}
              <button
                onClick={copyShareLink}
                className="px-3 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-105 text-slate-200"
              >
                {copied ? <HiCheck className="w-4 h-4 text-emerald-400" /> : <HiLink className="w-4 h-4 text-slate-400" />}
                <span>{copied ? "Copié" : "Lien"}</span>
              </button>
            </div>
          </div>

          {/* Description Box */}
          {activeVideo.desc && (
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-afa-gold flex items-center gap-1.5">
                <HiInformationCircle className="w-4 h-4 text-afa-gold" />
                À Propos de ce Résumé
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {activeVideo.desc}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── MORE HIGHLIGHTS PLAYLIST ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 pt-4">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 rounded-full bg-afa-red" />
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-display tracking-tight text-white">
              Vidéos & Résumés Similaires
            </h2>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            AFA Multimédia
          </span>
        </div>

        <Media />
      </div>
    </div>
  )
}
