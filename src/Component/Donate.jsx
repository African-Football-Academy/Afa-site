import { FcDonate } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Donate() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to='/donate'>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="fixed bottom-8 right-6 z-50 flex items-center gap-0 group"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-green-500/10 scale-125" />

        {/* Expandable pill */}
        <div className="relative flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-emerald-400 text-white rounded-full shadow-xl shadow-green-900/40 border border-green-400/30 px-3 py-3 transition-all duration-300 overflow-hidden"
             style={{ paddingRight: hovered ? '1rem' : '0.75rem' }}>
          <FcDonate size={26} className="flex-shrink-0 drop-shadow" />

          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white font-black text-xs uppercase tracking-widest whitespace-nowrap overflow-hidden"
              >
                Faire un Don
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </Link>
  )
}
