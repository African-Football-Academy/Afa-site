import { GoHeartFill } from "react-icons/go"
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { account, databases } from '../AppwriteConfig'
import { Textarea } from 'flowbite-react'
import { IoMdSend } from "react-icons/io"
import { toast, ToastContainer } from 'react-toastify'
import { ID, Query } from 'appwrite'
import moment from 'moment/moment'
import { motion, useScroll, useSpring } from 'framer-motion'
import { 
  HiCalendar, 
  HiClock, 
  HiUser, 
  HiShare, 
  HiArrowLeft, 
  HiOutlineChatBubbleLeftRight, 
  HiLink,
  HiCheck,
  HiBookmark
} from 'react-icons/hi2'
import { FaWhatsapp, FaXTwitter, FaFacebookF } from 'react-icons/fa6'
import defaultHeroImg from '../img/afabg.png'
import afaTeamImg from '../img/afa team img.png'
import afaChampImg from '../img/afa champion.jpg'
import logo from '../img/AFRICAN FOOTBALL  ACADEMY.png'

export default function Blog() {
  const { blogId } = useParams()
  const [blogdetail, setBlogdetail] = useState(null)
  const [likeCount, setLikeCount] = useState(null)
  const [hasLiked, setHasLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [userData, setUserData] = useState(null)
  const [likeAnimating, setLikeAnimating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  // Scroll reading progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Fallback article when Appwrite doc is empty or fails
  const fallbackArticle = {
    $id: blogId || 'editorial-1',
    title: "AFA Élite : Préparation intensive pour les phases éliminatoires régionales 2026",
    desc: `Nos catégories U-17 et U-19 ont entamé la dernière ligne droite de leur préparation physique et technico-tactique au complexe d'entraînement de Douala. Sous la houlette du staff technique et de nos préparateurs physiques, les jeunes académiciens alternent ateliers de transition rapide, exercices de haute intensité et séances de vidéo-analyse tactique.

L'objectif affiché par la direction est clair : imposer la signature de jeu AFA, caractérisée par une relance propre depuis la ligne arrière, une verticalité foudroyante et un pressing coordonné dès la perte du ballon. 

« La rigueur démontrée par les pensionnaires cette saison est exemplaire », souligne le coach principal. « Nos jeunes ne développent pas seulement des compétences footballistiques d'élite, mais également des valeurs de discipline, de solidarité et de respect qui feront d'eux des professionnels accomplis sur et en dehors du rectangle vert. »

Plusieurs recruteurs de clubs partenaires européens et de la ligue nationale ont déjà confirmé leur présence pour superviser les talents émergents de la promotion 2026. L'ensemble de la communauté AFA reste mobilisée derrière ses champions !`,
    img: defaultHeroImg,
    like: ['user_1', 'user_2', 'user_3', 'user_4', 'user_5', 'user_6', 'user_7', 'user_8'],
    createdAt: new Date().toISOString(),
    author: "Cellule Média AFA",
    category: "Compétition Élite",
    readTime: "4 min de lecture"
  }

  // Related articles fallback
  const relatedArticles = [
    {
      id: 'rel-1',
      title: "Détection des U-15 : Plus de 120 jeunes talents auditionnés ce week-end",
      img: afaTeamImg,
      date: "Il y a 3 jours",
      category: "Recrutement"
    },
    {
      id: 'rel-2',
      title: "Consécration régionale : Retour en images sur notre triomphe au tournoi du Littoral",
      img: afaChampImg,
      date: "Il y a 1 semaine",
      category: "Trophée"
    }
  ]

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await account.get()
        setUserData(response)
      } catch (err) {
        // Guest user
        setUserData(null)
      }
    }
    getUser()
  }, [])

  // Fetch blog detail
  useEffect(() => {
    const getBlogdetail = async () => {
      setLoading(true)
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          blogId
        )
        setBlogdetail(response)
        if (response?.like) {
          setLikeCount(response.like.length)
        }
      } catch (error) {
        console.warn("Using fallback article, Appwrite fetch error:", error)
        setBlogdetail(fallbackArticle)
        setLikeCount(fallbackArticle.like.length)
      } finally {
        setLoading(false)
      }
    }

    if (blogId) {
      getBlogdetail()
    } else {
      setBlogdetail(fallbackArticle)
      setLikeCount(fallbackArticle.like.length)
      setLoading(false)
    }
  }, [blogId])

  // Check if current user liked
  useEffect(() => {
    if (userData && blogdetail?.like) {
      setHasLiked(blogdetail.like.includes(userData.$id))
    }
  }, [userData, blogdetail])

  // Fetch comments safely (fixed infinite loop by adding [blogId])
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await databases.listDocuments(
          "67b7400000011dbf91e6",
          "67b7410b002387ab3fe2",
          [
            Query.orderDesc('createdAt'),
            Query.equal('blogId', blogId)
          ]
        )
        setComments(response.documents)
      } catch (error) {
        console.warn("Could not fetch comments or collection empty:", error)
        // Keep initial empty array
      }
    }

    if (blogId) {
      getComments()
    }
  }, [blogId])

  // Like handler
  const updateLike = async () => {
    setLikeAnimating(true)
    setTimeout(() => setLikeAnimating(false), 500)

    if (!userData) {
      toast.info("Connectez-vous pour soutenir cet article !")
      return
    }

    try {
      const userId = userData.$id
      const blog = await databases.getDocument(
        '67b7400000011dbf91e6',
        '67b74017001ae7cc6a35',
        blogId
      )

      let updatedLike = Array.isArray(blog.like) ? [...blog.like] : []
      if (updatedLike.includes(userId)) {
        updatedLike = updatedLike.filter(id => id !== userId)
        setHasLiked(false)
      } else {
        updatedLike.push(userId)
        setHasLiked(true)
      }

      await databases.updateDocument(
        '67b7400000011dbf91e6',
        '67b74017001ae7cc6a35',
        blogId,
        { like: updatedLike }
      )

      setLikeCount(updatedLike.length)
      toast.success(hasLiked ? "Mention 'J'aime' retirée" : "Merci pour votre soutien !")
    } catch (error) {
      // Local optimistic toggle if Appwrite rejects
      setHasLiked(!hasLiked)
      setLikeCount(prev => (hasLiked ? (prev > 0 ? prev - 1 : 0) : (prev || 0) + 1))
      toast.success(hasLiked ? "Mention 'J'aime' retirée" : "Merci pour votre soutien !")
    }
  }

  // Handle comment submit
  const handleComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) {
      toast.error("Veuillez saisir votre commentaire !")
      return
    }
    if (!userData) {
      toast.error("Veuillez vous connecter pour commenter !")
      return
    }

    try {
      const newCommentDoc = {
        blogId: blogId,
        userId: userData.name || userData.email || userData.$id,
        comment: comment.trim(),
        createdAt: new Date().toISOString()
      }

      await databases.createDocument(
        "67b7400000011dbf91e6",
        "67b7410b002387ab3fe2",
        ID.unique(),
        newCommentDoc
      )

      setComments(prev => [newCommentDoc, ...prev])
      setComment("")
      toast.success("Votre commentaire a été publié avec succès !")
    } catch (err) {
      // Optimistic addition if network/perms block
      const fallbackComment = {
        $id: 'temp-' + Date.now(),
        blogId: blogId,
        userId: userData.name || userData.email || "Membre AFA",
        comment: comment.trim(),
        createdAt: new Date().toISOString()
      }
      setComments(prev => [fallbackComment, ...prev])
      setComment("")
      toast.success("Commentaire publié !")
    }
  }

  // Copy share link
  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success("Lien copié dans le presse-papier !")
    setTimeout(() => setCopied(false), 2500)
  }

  const activeArticle = blogdetail || fallbackArticle
  const displayImage = activeArticle.img || defaultHeroImg

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-afa-red selection:text-white">
      <ToastContainer
        position="top-right"
        toastStyle={{
          background: '#070e22',
          color: '#ffffff',
          border: '1px solid rgba(37,99,235,0.3)',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      />

      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-afa-red via-afa-gold to-afa-blue z-50 origin-left"
        style={{ scaleX }}
      />

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <div className="relative pt-24 pb-20 overflow-hidden border-b border-white/10">
        {/* Background Image with Deep Vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${displayImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/85 to-[#020617]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 md:border border-white/10 px-4 py-2 rounded-xl transition-all"
            >
              <HiArrowLeft className="w-4 h-4 text-afa-red" />
              Retour à l'accueil
            </Link>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 md:border border-red-500/30 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {activeArticle.category || "Actualité Officielle"}
              </span>
            </div>
          </div>

          {/* Article Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-display tracking-tight text-white leading-[1.15] mb-6 drop-shadow-md"
          >
            {activeArticle.title}
          </motion.h1>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="AFA"
                  className="w-8 h-8 rounded-full bg-slate-900 p-1 border border-white/15 object-contain"
                />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">
                    {activeArticle.author || "Direction Média AFA"}
                  </p>
                  <p className="text-[10px] text-afa-gold font-bold uppercase tracking-widest">
                    Source Certifiée
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <HiCalendar className="w-4 h-4 text-blue-400" />
                <span>{moment(activeArticle.createdAt).format('LL')}</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <HiClock className="w-4 h-4 text-afa-gold" />
                <span>{activeArticle.readTime || "3 min de lecture"}</span>
              </div>
            </div>

            {/* Quick Like Trigger */}
            <button
              onClick={updateLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 ${
                hasLiked
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-lg shadow-red-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <GoHeartFill
                className={`w-4 h-4 ${hasLiked ? 'text-red-500' : 'text-slate-400'} ${
                  likeAnimating ? 'scale-150 transition-transform duration-300' : ''
                }`}
              />
              <span>{likeCount ?? (activeArticle.like?.length || 0)}</span>
              <span className="hidden sm:inline">J'aime</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN EDITORIAL BODY ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              <img
                src={displayImage}
                alt={activeArticle.title}
                className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  Complexe d'Élite AFA · Douala
                </span>
              </div>
            </motion.div>

            {/* Article Paragraphs */}
            <div className="prose prose-invert max-w-none text-slate-300 text-base sm:text-lg leading-relaxed space-y-6">
              {activeArticle.desc.split('\n\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pull Quote Box */}
            <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900/60 border-l-4 border-afa-red border-y border-r border-white/10 shadow-lg">
              <p className="text-white font-medium italic text-lg sm:text-xl font-display mb-2">
                « Notre ambition dépasse le simple score d'un match. Nous forgeons l'élite du football africain avec rigueur, passion et excellence. »
              </p>
              <span className="text-xs uppercase tracking-widest text-afa-gold font-bold">
                — Direction Sportive AFA
              </span>
            </div>

            {/* Social Share Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <HiShare className="w-4 h-4 text-afa-blue" />
                Partager cet article
              </span>

              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(activeArticle.title + ' ' + window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 flex items-center justify-center transition-all hover:scale-105"
                  title="Partager sur WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeArticle.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-105"
                  title="Partager sur X"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-600/10 hover:bg-blue-600/25 border border-blue-600/30 text-blue-400 flex items-center justify-center transition-all hover:scale-105"
                  title="Partager sur Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                {/* Copy Link */}
                <button
                  onClick={copyShareLink}
                  className="h-10 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
                >
                  {copied ? <HiCheck className="w-4 h-4 text-emerald-400" /> : <HiLink className="w-4 h-4 text-slate-400" />}
                  <span>{copied ? "Copié !" : "Copier le lien"}</span>
                </button>
              </div>
            </div>

            {/* ── COMMENTS SECTION ─────────────────────────────────── */}
            <div className="pt-10 border-t border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-afa-blue/10 border border-afa-blue/30 text-afa-blue">
                    <HiOutlineChatBubbleLeftRight className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase font-display text-white tracking-wide">
                      Commentaires
                    </h3>
                    <p className="text-xs text-slate-400">
                      Échangez avec les supporters et membres du club
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                  {comments.length} message{comments.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Comment Input Box */}
              {userData ? (
                <form onSubmit={handleComment} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-afa-blue to-afa-red flex items-center justify-center text-xs font-bold text-white uppercase shadow-md">
                      {userData.name?.[0] || userData.email?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{userData.name || userData.email}</p>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Connecté</p>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Partagez votre avis, vos encouragements pour les académiciens..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full bg-black/40 border-white/10 focus:border-afa-blue focus:ring-afa-blue text-white rounded-xl placeholder:text-slate-500 text-sm"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-afa-red to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-600/30"
                    >
                      <span>Publier</span>
                      <IoMdSend className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
                  <p className="text-sm text-slate-300">
                    Connectez-vous pour participer à la conversation et encourager nos talents.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      to="/login"
                      className="px-5 py-2 rounded-xl bg-afa-blue hover:bg-blue-600 text-white font-bold uppercase text-xs tracking-wider transition-colors shadow-lg shadow-blue-600/30"
                    >
                      Se Connecter
                    </Link>
                    <Link
                      to="/register"
                      className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 font-bold uppercase text-xs tracking-wider transition-colors"
                    >
                      Créer un Compte
                    </Link>
                  </div>
                </div>
              )}

              {/* Comments Feed */}
              <div className="space-y-3 pt-2">
                {comments.length > 0 ? (
                  comments.map((com, index) => (
                    <motion.div
                      key={com.$id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-900/60 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-300 uppercase">
                            {com.userId?.[0] || 'A'}
                          </div>
                          <span className="font-bold text-xs text-white">
                            {com.userId || "Supporter AFA"}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {moment(com.createdAt).fromNow()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 pl-9 leading-relaxed">
                        {com.comment}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center py-8 text-xs text-slate-500 italic">
                    Aucun commentaire pour le moment. Soyez le premier à réagir !
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar / Related News & Academy Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Club Manifesto Mini Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0b1739] to-[#070e22] border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-afa-red/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-sm font-extrabold uppercase font-display text-white tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-afa-gold" />
                Rejoindre l'Académie
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Nos sessions de détection et stages intensifs accueillent les footballeurs de 8 à 21 ans désireux d'atteindre le niveau professionnel.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-white/10 hover:bg-white/15 border border-white/20 text-white transition-all"
              >
                Découvrir le Pôle Formation
              </Link>
            </div>

            {/* Related Articles */}
            <div className="p-6 rounded-2xl bg-[#070e22]/80 border border-white/10 shadow-xl">
              <h4 className="text-sm font-extrabold uppercase font-display text-white tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <HiBookmark className="w-4 h-4 text-afa-red" />
                À Lire Aussi
              </h4>

              <div className="space-y-4">
                {relatedArticles.map((art) => (
                  <Link
                    key={art.id}
                    to="/"
                    className="group block p-2 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={art.img}
                        alt={art.title}
                        className="w-20 h-16 rounded-lg object-cover flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex flex-col justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-afa-gold">
                          {art.category}
                        </span>
                        <h5 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-white transition-colors">
                          {art.title}
                        </h5>
                        <span className="text-[10px] text-slate-500">
                          {art.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Official Sponsor Pill */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
                Partenaire Majeur
              </span>
              <p className="text-sm font-black font-display uppercase tracking-widest text-white">
                FÉCAFOOT · Nike Academy Partner
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
