import { useEffect, useState } from 'react'
import { MdFacebook } from 'react-icons/md'
import { FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'
import { motion } from 'framer-motion'

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
        setTBlog(response.documents)
      } catch (error) {
        console.error('Error fetching banner:', error)
      }
    }
    getTBlog()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4">
      {tblogs.map((blog) => (
        <motion.div
          key={blog.$id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-2xl shadow-2xl border border-blue-900/30"
        >
          {/* ── Background image layer ── */}
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Full overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/70 to-blue-800/20" />

            {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />

            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-400 to-transparent" />

            {/* ── Content overlaid on image ── */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 sm:px-10 max-w-lg">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 shadow"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Actualité · Academy
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-white font-black text-xl sm:text-3xl uppercase leading-tight line-clamp-2 mb-3 drop-shadow-lg"
                >
                  {blog.title}
                </motion.h2>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="origin-left w-12 h-0.5 bg-red-500 rounded-full mb-3"
                />

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  className="text-blue-200 text-sm leading-relaxed line-clamp-2 mb-5"
                >
                  {blog.desc}
                </motion.p>

                {/* Social icons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 }}
                  className="flex items-center gap-3"
                >
                  {[
                    {
                      icon: <MdFacebook size={18} />,
                      color: 'text-blue-400 hover:text-blue-300',
                      bg: 'hover:bg-blue-500/20',
                      label: 'Facebook',
                    },
                    {
                      icon: <FaYoutube size={16} />,
                      color: 'text-red-400 hover:text-red-300',
                      bg: 'hover:bg-red-500/20',
                      label: 'YouTube',
                    },
                    {
                      icon: <FaXTwitter size={14} />,
                      color: 'text-gray-300 hover:text-white',
                      bg: 'hover:bg-white/10',
                      label: 'X / Twitter',
                    },
                  ].map(({ icon, color, bg, label }) => (
                    <motion.button
                      key={label}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      title={label}
                      className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center ${color} ${bg} transition-all duration-200`}
                    >
                      {icon}
                    </motion.button>
                  ))}

                  {/* Subtle share label */}
                  <span className="text-blue-400/60 text-[10px] uppercase tracking-widest font-bold ml-1">
                    Partager
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
