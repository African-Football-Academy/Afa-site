import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsYoutube, BsTwitterX } from 'react-icons/bs'
import { HiHeart, HiLocationMarker, HiMail, HiPhone, HiArrowUp } from 'react-icons/hi'
import { HiTrophy } from 'react-icons/hi2'
import logo from '../img/afa.png'
import fecaLogo from '../img/trophy/feca.png'
import nikeLogo from '../img/trophy/nike.png'

export default function FooterComp() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-blue-900/40 overflow-hidden">
      {/* Decorative top gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-red-500 to-amber-400" />

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* ── Partner & Association Bar ────────────────────────────────────────── */}
      <div className="border-b border-white/5 bg-slate-900/40 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Affilié à la FECAFOOT & Championnat Régional du Littoral
            </span>
          </div>
          <div className="flex items-center gap-6 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Partenaires & Équipementiers
            </span>
            <img src={fecaLogo} alt="FECAFOOT" className="h-6 object-contain" />
            <img src={nikeLogo} alt="Nike" className="h-4 object-contain" />
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 & 2: Brand & Manifesto */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-blue-600/30 blur-sm group-hover:bg-blue-600/50 transition-all" />
                <img
                  src={logo}
                  alt="AFA Logo"
                  className="relative w-12 h-12 rounded-full ring-2 ring-white/10 group-hover:ring-blue-400 transition-all object-cover"
                />
              </div>
              <div>
                <p className="text-white font-black text-sm uppercase tracking-[0.2em] font-athletic">
                  African Football
                </p>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400 font-bold text-[10px] uppercase tracking-[0.28em]">
                  Academy · Littoral
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Centre de formation d'excellence dédié à l'éclosion, au perfectionnement technique et à l'encadrement éducatif des jeunes talents du football camerounais et africain.
            </p>

            {/* Quick Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/50 rounded-full px-4 py-2 w-fit">
              <HiTrophy className="text-amber-400" size={16} />
              <span className="text-xs font-bold text-slate-200">
                Champion Régional du Littoral · 12 Titres
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: <BsFacebook size={16} />, href: 'https://facebook.com', label: 'Facebook', hover: 'hover:bg-blue-600' },
                { icon: <BsInstagram size={16} />, href: 'https://instagram.com', label: 'Instagram', hover: 'hover:bg-pink-600' },
                { icon: <BsYoutube size={16} />, href: 'https://youtube.com', label: 'YouTube', hover: 'hover:bg-red-600' },
                { icon: <BsTwitterX size={15} />, href: 'https://twitter.com', label: 'X', hover: 'hover:bg-slate-700' },
              ].map(({ icon, href, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 ${hover} hover:text-white transition-all duration-200 shadow-md`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.22em] font-athletic flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
              Navigation
            </h3>
            <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">Le Club & Direction</Link>
              </li>
              <li>
                <Link to="/trophy" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Salle des Trophées</span>
                  <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-full font-bold">12</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-blue-400 transition-colors">Galerie Photos</Link>
              </li>
              <li>
                <Link to="/stat" className="hover:text-blue-400 transition-colors">Effectif & Stats Joueurs</Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-emerald-400 transition-colors font-bold flex items-center gap-1">
                  <HiHeart className="text-red-400" size={13} />
                  Faire un Don / Sponsoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Catégories & Formations */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.22em] font-athletic flex items-center gap-2">
              <span className="w-1.5 h-4 bg-red-500 rounded-full" />
              Pôles & Équipes
            </h3>
            <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-400">
              <li className="hover:text-slate-200 transition-colors">Pôle Élite U12 (Minimes)</li>
              <li className="hover:text-slate-200 transition-colors">Pôle Formation U15 (Cadets)</li>
              <li className="hover:text-slate-200 transition-colors">Pôle Compétition U17 (Juniors)</li>
              <li className="hover:text-slate-200 transition-colors">Équipe Première Régionale</li>
              <li className="hover:text-slate-200 transition-colors">Stages & Détections Vacances</li>
              <li className="hover:text-slate-200 transition-colors">Suivi Médical & Nutritionnel</li>
            </ul>
          </div>

          {/* Col 5: Contact & Inscription */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.22em] font-athletic flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Contact Direct
            </h3>
            <div className="flex flex-col gap-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <HiLocationMarker className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
                <span>Région du Littoral, Douala, Cameroun</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HiPhone className="text-blue-400 flex-shrink-0" size={15} />
                <a href="tel:+237696169216" className="hover:text-white font-bold transition-colors">
                  (+237) 696 169 216
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <HiMail className="text-amber-400 flex-shrink-0" size={15} />
                <a href="mailto:africanfootballacademy0@gmail.com" className="hover:text-white truncate transition-colors">
                  africanfootballacademy0@gmail.com
                </a>
              </div>

              {/* Action Button */}
              <Link to="/donate" className="mt-2">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl shadow-lg border border-emerald-400/30 flex items-center justify-center gap-2 transition-all">
                  <HiHeart size={14} className="text-red-200" />
                  Soutenir l'Académie
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Copyright Bar ─────────────────────────────────────────────── */}
      <div className="border-t border-white/5 bg-slate-950/80 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} African Football Academy. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-[11px]">Développer les talents · Inspirer l'Afrique</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 border border-white/10 flex items-center justify-center text-white transition-all shadow-md ml-2"
              title="Retour en haut"
            >
              <HiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
