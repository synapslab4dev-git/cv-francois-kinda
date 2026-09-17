import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Share2, 
  ExternalLink, 
  FolderArchive,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { trackContactClick, trackPortfolioClick } from '../utils/analytics';

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Hero({ personal, positioning, viewMode, setViewMode, onShare, theme = 'dark', onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="relative pt-5 pb-3 px-4 max-w-2xl mx-auto">
      {/* Top Bar: Location, Theme Toggle & Share */}
      <div className={`flex items-center justify-between text-xs mb-3.5 pb-2 border-b transition-colors ${
        isDark ? 'text-slate-400 border-slate-800/80' : 'text-slate-500 border-slate-200'
      }`}>
        <span className={`inline-flex items-center gap-1.5 font-medium ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <MapPin className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
          {personal.location}
        </span>
        
        {/* Action Buttons: Mode Switcher & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border active:scale-95 transition-all text-[11px] font-medium cursor-pointer ${
              isDark 
                ? 'bg-slate-800 text-slate-200 hover:text-white border-slate-700 hover:border-slate-600' 
                : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
            title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            aria-label="Changer de mode"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FF7900]" />
                <span>Mode clair</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#FF7900]" />
                <span>Mode sombre</span>
              </>
            )}
          </button>

          <button
            onClick={onShare}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border active:scale-95 transition-all text-[11px] font-medium cursor-pointer ${
              isDark 
                ? 'bg-slate-800 text-slate-200 hover:text-white border-slate-700 hover:border-slate-600' 
                : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
            title="Partager ce profil"
          >
            <Share2 className="w-3 h-3 text-[#FF7900]" />
            <span>Partager</span>
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className={`rounded-2xl p-4 sm:p-5 border transition-colors ${
        isDark 
          ? 'bg-slate-800/60 border-slate-700/60 shadow-sm' 
          : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        
        {/* Targeted Candidacy Badge for CIDS / Dynamic Agro */}
        {personal.targetCandidacy && (
          <div className="mb-3.5 flex justify-center sm:justify-start">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[11px] sm:text-xs font-semibold border ${
              isDark 
                ? 'bg-[#FF7900]/10 text-[#FF7900] border-[#FF7900]/30' 
                : 'bg-orange-50 text-[#d96700] border-orange-200 shadow-2xs'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#FF7900] animate-pulse shrink-0" />
              <span>{personal.targetCandidacy}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          
          {/* Avatar with subtle border and presence dot */}
          <div className="relative shrink-0">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border shadow-sm ${
              isDark ? 'border-slate-600/80 bg-slate-800' : 'border-slate-200 bg-slate-100'
            }`}>
              <img 
                src={personal.photo} 
                alt={personal.fullName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div 
              className={`absolute -bottom-1 -right-1 bg-[#FF7900] text-slate-950 p-1 rounded-full border-2 ${
                isDark ? 'border-slate-900' : 'border-white'
              }`} 
              title="Disponible"
            >
              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>

          {/* Name & Titles */}
          <div className="flex-1 min-w-0">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {personal.fullName}
            </h1>
            
            <p className={`text-sm sm:text-base font-semibold mt-0.5 ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              {personal.title}
            </p>
            <p className={`text-xs sm:text-sm font-normal mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {personal.subtitle}
            </p>

            {/* Quick credentials badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2.5">
              <span className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {personal.experienceYears}
              </span>
              <span className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {personal.degreeShort}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: WhatsApp, Call, Email, LinkedIn */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3.5 border-t ${
          isDark ? 'border-slate-700/60' : 'border-slate-100'
        }`}>
          <a
            href={personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick('whatsapp', 'hero')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs transition-all active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:${personal.email}`}
            onClick={() => trackContactClick('email', 'hero')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs border transition-all active:scale-95 ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-[#FF7900]/50' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-[#FF7900]/50 shadow-2xs'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
            <span>Email</span>
          </a>

          <a
            href={`tel:${personal.phone.replace(/\s+/g, '')}`}
            onClick={() => trackContactClick('phone', 'hero')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs border transition-all active:scale-95 ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-[#FF7900]/50' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-[#FF7900]/50 shadow-2xs'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
            <span>Appeler</span>
          </a>

          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick('linkedin', 'hero')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs border transition-all active:scale-95 ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-[#FF7900]/50' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-[#FF7900]/50 shadow-2xs'
            }`}
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Positionnement Professionnel — Puces Percutantes */}
      <div className={`mt-3 rounded-2xl p-4 border transition-colors ${
        isDark 
          ? 'bg-slate-800/40 border-slate-700/50' 
          : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
          isDark ? 'text-[#FF7900]' : 'text-[#d96700]'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]"></span>
          {positioning.title}
        </h2>

        {positioning.headline && (
          <p className={`text-xs sm:text-sm leading-relaxed mb-2.5 font-medium ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            {positioning.headline}
          </p>
        )}

        {positioning.points ? (
          <ul className="space-y-2 mb-1">
            {positioning.points.map((pt, idx) => {
              const parts = pt.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] mt-2 shrink-0" />
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={pIdx} className={isDark ? "text-white font-semibold" : "text-slate-900 font-semibold"}>
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {positioning.summary}
          </p>
        )}

        {/* 4 Key Metrics Strip */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t text-center ${
          isDark ? 'border-slate-700/50' : 'border-slate-100'
        }`}>
          {positioning.keyMetrics.map((item, idx) => (
            <div key={idx} className={`rounded-xl p-2 border ${
              isDark 
                ? 'bg-slate-800/60 border-slate-700/60' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`text-sm sm:text-base font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>{item.value}</div>
              <div className={`text-[10px] leading-tight mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Portfolio Preview Banner */}
      {personal.portfolioUrl && (
        <a
          href={personal.portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackPortfolioClick()}
          className={`mt-3 flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all group active:scale-[0.99] ${
            isDark 
              ? 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60 hover:border-[#FF7900]/50' 
              : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-[#FF7900]/50 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className={`p-2.5 rounded-xl border text-[#FF7900] shrink-0 transition-colors ${
              isDark 
                ? 'bg-slate-800 border-slate-700 group-hover:bg-[#FF7900]/10' 
                : 'bg-orange-50 border-orange-200/60 group-hover:bg-orange-100/60'
            }`}>
              <FolderArchive className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-xs sm:text-sm font-bold transition-colors ${
                  isDark ? 'text-slate-200 group-hover:text-[#FF7900]' : 'text-slate-800 group-hover:text-[#d96700]'
                }`}>
                  {personal.portfolioTitle}
                </span>
              </div>
              <p className={`text-[11px] truncate mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {personal.portfolioSubtitle}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold shrink-0 pr-1 transition-colors ${
            isDark ? 'text-slate-400 group-hover:text-[#FF7900]' : 'text-slate-400 group-hover:text-[#d96700]'
          }`}>
            <span className="hidden sm:inline text-[11px]">Consulter</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>
      )}

      {/* Mode View Switcher */}
      <div className="flex items-center justify-between mt-4 mb-1.5 px-1">
        <div>
          <h3 className={`text-xs sm:text-sm font-semibold ${
            isDark ? 'text-slate-300' : 'text-slate-800'
          }`}>
            Parcours & réalisations
          </h3>
          <p className={`text-[11px] ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>Touchez une fiche pour consulter le détail</p>
        </div>

        <div className={`flex items-center p-0.5 rounded-xl border text-xs ${
          isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setViewMode('flashcards')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'flashcards' 
                ? 'bg-[#FF7900] text-slate-950 font-bold shadow-xs' 
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[11px]">Fiches</span>
          </button>
          <button
            onClick={() => setViewMode('full')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'full' 
                ? 'bg-[#FF7900] text-slate-950 font-bold shadow-xs' 
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="text-[11px]">Tout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
