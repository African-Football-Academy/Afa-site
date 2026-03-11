import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { motion } from 'framer-motion';

const SimpleSlider = () => {
  const [blogs, setBlog] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          [Query.limit(4), Query.orderDesc('createdAt')]
        );
        setBlog(response.documents);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    getBlog();
  }, []);

  const toggleLike = (e, id) => {
    e.preventDefault();
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-gray-50 w-full py-4">
      <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto px-4 mb-6">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.$id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-blue-200"
          >
            <Link to={`/blog/${blog.$id}`}>

              {/* Image */}
              <div className="relative overflow-hidden h-60 sm:h-80 bg-gray-900">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Top-left animated accent bar */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-red-500 group-hover:w-full transition-all duration-500" />

                {/* Category + Like row */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    <span className="w-1 h-1 bg-white rounded-full" />
                    .Academy
                  </div>

                  {/* Like button */}
                  <motion.button
                    whileTap={{ scale: 0.75 }}
                    onClick={(e) => toggleLike(e, blog.$id)}
                    className="w-8 h-8 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full flex items-center justify-center transition-colors border border-white/10"
                  >
                    {liked[blog.$id]
                      ? <GoHeartFill size={14} className="text-red-500" />
                      : <GoHeart size={14} className="text-white" />
                    }
                  </motion.button>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="uppercase font-black text-white text-sm leading-tight line-clamp-2 mb-1.5 drop-shadow">
                    {blog.title}
                  </h2>
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-3">
                    {blog.desc}
                  </p>

                  {/* Read more CTA */}
                  <div className="flex items-center gap-1.5 text-blue-300 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Lire la suite</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>

            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
