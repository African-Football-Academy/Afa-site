import { GoHeartFill } from "react-icons/go"
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { account, databases } from '../AppwriteConfig'
import { Textarea } from 'flowbite-react'
import { IoMdSend } from "react-icons/io"
import { toast, ToastContainer } from 'react-toastify'
import { ID, Query } from 'appwrite'
import moment from 'moment/moment'
import { motion } from 'framer-motion'

export default function Blog() {

  const { blogId } = useParams();
  const [blogdetail, setBlogdetail] = useState(null)
  const [like, setLike] = useState()
  const [isLiked, setIsLiked] = useState(true)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [userData, setUserData] = useState()
  const [likeAnimating, setLikeAnimating] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

  useEffect(() => {
    const getBlogdetail = async () => {
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          blogId
        );
        setBlogdetail(response);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    if (blogId) {
      getBlogdetail();
    }
  }, [blogId]);

  const updateLike = async () => {
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 600);
    try {
      const user = await account.get();
      const userId = user.$id;
      const blog = await databases.getDocument(
        '67b7400000011dbf91e6',
        '67b74017001ae7cc6a35',
        blogId
      );
      let updatedLike = blog.like || [];
      if (updatedLike.includes(userId)) {
        updatedLike = updatedLike.filter(id => id !== userId);
      } else {
        updatedLike.push(userId);
      }
      const updatedBlog = await databases.updateDocument(
        '67b7400000011dbf91e6',
        '67b74017001ae7cc6a35',
        blogId,
        { like: updatedLike }
      );
      console.log("Updated like:", updatedBlog.like);
      const fetchLikes = async () => {
        const blog = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          blogId
        );
        setLike(blog.like.length);
        setIsLiked(false)
      };
      if (blogId) {
        fetchLikes();
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await databases.listDocuments(
          "67b7400000011dbf91e6",
          "67b7410b002387ab3fe2",
          [
            Query.orderDesc('createdAt'),
            Query.equal('blogId', blogId)
          ]
        );
        setComments(response.documents);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getComment();
  });

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const user = await account.get();
      const userId = user.$id;
      if (!comment.trim()) {
        toast.error("Comment cannot be empty!");
        return;
      }
      const response = await databases.createDocument(
        "67b7400000011dbf91e6",
        "67b7410b002387ab3fe2",
        ID.unique(),
        {
          blogId: blogId,
          userId: userId,
          comment: comment,
          createdAt: new Date().toISOString()
        }
      );
      console.log(response);
      toast.success("Comment added........!!!");
      setComment("");
      const getComment = async () => {
        try {
          const response = await databases.listDocuments(
            "67b7400000011dbf91e6",
            "67b7410b002387ab3fe2",
            [
              Query.orderDesc('createdAt'),
              Query.equal('blogId', blogId)
            ]
          );
          setComments(response.documents);
        } catch (error) {
          console.error("Error fetching collection:", error);
        }
      }
      getComment();
    } catch (err) {
      toast.error("Failed: " + err.message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        toastStyle={{
          background: '#0f1e3d',
          color: 'white',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '12px',
          fontSize: '13px',
          fontFamily: 'sans-serif',
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&family=Inter:wght@300;400;500;600&display=swap');

        .blog-hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(5, 10, 25, 0.3) 0%,
            rgba(5, 10, 25, 0.55) 40%,
            rgba(5, 10, 25, 0.92) 75%,
            rgba(5, 10, 25, 1) 100%
          );
        }
        .like-pop {
          animation: likePop 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
        @keyframes likePop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.5); }
          60%  { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .comment-input textarea {
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(59,130,246,0.25) !important;
          border-radius: 12px !important;
          color: rgba(255,255,255,0.85) !important;
          font-size: 13px !important;
          font-family: 'Inter', sans-serif !important;
          resize: none !important;
          padding: 12px !important;
          transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        .comment-input textarea:focus {
          border-color: rgba(59,130,246,0.6) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
          outline: none !important;
          background: rgba(255,255,255,0.06) !important;
        }
        .comment-input textarea::placeholder {
          color: rgba(255,255,255,0.25) !important;
        }
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 4px; }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <div
        className="relative min-h-screen"
        style={{
          backgroundImage: `url(${blogdetail?.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* layered overlay */}
        <div className="blog-hero-overlay absolute inset-0" />

        {/* Subtle dot texture on top */}
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-10 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.08), transparent 70%)', filter: 'blur(40px)' }} />

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-72 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden"
            style={{
              borderRadius: '24px 24px 0 0',
              background: 'linear-gradient(160deg, #0d1b35 0%, #0a1628 100%)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderBottom: 'none',
              boxShadow: '0 -20px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Top accent line */}
            <div className="h-px w-full" style={{
              background: 'linear-gradient(90deg, transparent, #3b82f6, #60a5fa, transparent)',
            }} />

            <div className="p-6 sm:p-8">

              {/* Mobile image */}
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={blogdetail?.img}
                className="inline sm:hidden w-full rounded-2xl mb-5 object-cover"
                style={{ maxHeight: 200, border: '1px solid rgba(59,130,246,0.2)' }}
              />

              {/* Category pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-5"
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.4)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                  <span className="text-red-400 text-[10px] font-black uppercase tracking-widest"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Football
                  </span>
                </div>
              </motion.div>

              {/* Title + Like row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="flex items-start justify-between gap-4 mb-5"
              >
                <h1
                  className="text-white font-black uppercase leading-tight flex-1"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(22px, 4vw, 32px)',
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  {blogdetail?.title}
                </h1>

                {/* Like button */}
                <button
                  onClick={updateLike}
                  className="flex-shrink-0 flex flex-col items-center gap-1 group"
                  style={{ outline: 'none' }}
                >
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                    }}
                  >
                    <GoHeartFill
                      size={20}
                      className={likeAnimating ? 'like-pop' : ''}
                      style={{ color: '#ef4444', filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.5))' }}
                    />
                  </div>
                  <span
                    className="text-white/50 font-bold"
                    style={{ fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {like ?? (isLiked ? blogdetail?.like?.length : '')}
                  </span>
                </button>
              </motion.div>

              {/* Accent rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="origin-left h-px mb-6"
                style={{ background: 'linear-gradient(90deg, #3b82f6, rgba(59,130,246,0.1), transparent)' }}
              />

              {/* Article body */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="leading-relaxed mb-8"
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: '15px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.85,
                }}
              >
                {blogdetail?.desc}
              </motion.p>

              {/* ══════════════ COMMENT SECTION ══════════════ */}
              {userData ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 rounded-full bg-blue-500" />
                    <h2
                      className="text-white font-black uppercase tracking-widest"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16 }}
                    >
                      Commentaires
                    </h2>
                    {comments.length > 0 && (
                      <div
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(59,130,246,0.15)',
                          border: '1px solid rgba(59,130,246,0.3)',
                        }}
                      >
                        <span className="text-blue-400 font-black text-[10px]">{comments.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Comment input */}
                  <div
                    className="rounded-2xl p-4 mb-5"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(59,130,246,0.15)',
                    }}
                  >
                    <div className="flex gap-3 items-end comment-input">
                      <div className="flex-1">
                        <Textarea
                          placeholder="Écrire un commentaire..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <button
                        onClick={handleComment}
                        className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl mb-0.5 transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: comment.trim()
                            ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                            : 'rgba(59,130,246,0.15)',
                          border: '1px solid rgba(59,130,246,0.4)',
                          boxShadow: comment.trim() ? '0 4px 16px rgba(59,130,246,0.35)' : 'none',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <IoMdSend
                          size={18}
                          style={{ color: comment.trim() ? 'white' : 'rgba(59,130,246,0.5)' }}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Comments list */}
                  {comments.length > 0 && (
                    <div
                      className="rounded-2xl overflow-hidden scrollbar-thin"
                      style={{
                        border: '1px solid rgba(59,130,246,0.12)',
                        maxHeight: 320,
                        overflowY: 'auto',
                      }}
                    >
                      {comments.map((com, i) => (
                        <div
                          key={com.$id}
                          className="flex items-start justify-between gap-3 px-4 py-3 transition-colors"
                          style={{
                            borderBottom: i < comments.length - 1
                              ? '1px solid rgba(255,255,255,0.05)'
                              : 'none',
                            background: i % 2 === 0
                              ? 'rgba(255,255,255,0.02)'
                              : 'transparent',
                          }}
                        >
                          {/* Avatar + comment */}
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div
                              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                              style={{
                                background: 'rgba(59,130,246,0.2)',
                                border: '1px solid rgba(59,130,246,0.35)',
                              }}
                            >
                              <span
                                className="text-blue-300 font-black"
                                style={{ fontSize: 10, fontFamily: "'Barlow Condensed', sans-serif" }}
                              >
                                {com.userId?.[0]?.toUpperCase() ?? 'U'}
                              </span>
                            </div>
                            <p
                              className="text-[13px] leading-relaxed flex-1"
                              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif" }}
                            >
                              {com.comment}
                            </p>
                          </div>

                          {/* Timestamp */}
                          <span
                            className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide mt-0.5"
                            style={{ color: 'rgba(59,130,246,0.5)', fontFamily: "'Barlow Condensed', sans-serif" }}
                          >
                            {moment(com.createdAt).fromNow()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {blogdetail?.comment}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center justify-center gap-3 py-6 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(59,130,246,0.12)',
                  }}
                >
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p
                    className="text-sm"
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}
                  >
                    Connectez-vous pour aimer et commenter —{' '}
                    <Link to="/login">
                      <span
                        className="font-bold transition-colors hover:text-blue-300"
                        style={{ color: '#60a5fa', textDecoration: 'underline', textUnderlineOffset: 3 }}
                      >
                        Se connecter
                      </span>
                    </Link>
                  </p>
                </motion.div>
              )}

            </div>{/* /p-6 */}
          </motion.div>{/* /card */}
        </div>{/* /max-w-4xl */}
      </div>{/* /hero */}
    </>
  )
}
