import React from 'react';
import { MessageCircle, Mail, Phone, Share2, ArrowUp, Sun, Moon } from 'lucide-react';

export default function QuickActionBar({ personal, onShare, theme = 'dark', onToggleTheme }) {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-0 inset-x-0 z-40 p-2.5 sm:p-3 backdrop-blur-md border-t sm:hidden transition-colors ${
      isDark ? 'bg-slate-950/92 border-slate-800/80' : 'bg-white/95 border-slate-200 shadow-lg'
    }`}>
      <div className="max-w-md mx-auto flex items-center gap-1.5">
        
        {/* Primary CTA 1: WhatsApp Direct */}
        <a
          href={personal.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
          title="Échanger sur WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-white shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Primary CTA 2: Formal Email Contact */}
        <a
          href={`mailto:${personal.email}`}
          className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs border shadow-sm active:scale-95 transition-all ${
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-[#FF7900]/50' 
              : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-2xs hover:border-[#FF7900]/50'
          }`}
          title="Contacter par email"
        >
          <Mail className="w-4 h-4 text-[#FF7900] shrink-0" />
          <span className="truncate">Email</span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${personal.phone.replace(/\s+/g, '')}`}
          className={`p-2.5 rounded-xl border active:scale-95 transition-all shrink-0 ${
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-2xs'
          }`}
          title="Appeler directement"
        >
          <Phone className="w-4 h-4 text-[#FF7900]" />
        </a>

        {/* Theme Switcher */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl border active:scale-95 transition-all cursor-pointer shrink-0 ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-2xs'
            }`}
            title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#FF7900]" />
            ) : (
              <Moon className="w-4 h-4 text-[#FF7900]" />
            )}
          </button>
        )}

        {/* Share Profile */}
        <button
          onClick={onShare}
          className={`p-2.5 rounded-xl border active:scale-95 transition-all cursor-pointer shrink-0 ${
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-2xs'
          }`}
          title="Partager le profil"
        >
          <Share2 className="w-4 h-4 text-[#FF7900]" />
        </button>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className={`p-2.5 rounded-xl border active:scale-95 transition-all cursor-pointer shrink-0 ${
            isDark 
              ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800' 
              : 'bg-slate-100 text-slate-500 hover:text-slate-800 border-slate-200'
          }`}
          title="Haut de page"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
