import React from 'react';
import CardIcon from './CardIcon';
import { ChevronRight } from 'lucide-react';

export default function FlashcardCard({ card, index, onSelect, theme = 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(card)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(card);
        }
      }}
      className={`group relative text-left w-full p-4 sm:p-5 rounded-2xl border transition-all duration-150 cursor-pointer active:scale-[0.99] flex flex-col justify-between ${
        isDark 
          ? 'bg-slate-800/60 hover:bg-slate-800/90 border-slate-700/60 hover:border-slate-600 shadow-xs' 
          : 'bg-white hover:bg-slate-50/90 border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm'
      }`}
    >
      {/* Top Header inside Card */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Unified Single-Accent Badge */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
            isDark 
              ? 'bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25' 
              : 'bg-[#FF7900]/10 text-[#d96700] border border-[#FF7900]/30'
          }`}>
            {card.badge}
          </span>

          {/* Card index indicator */}
          <span className={`text-[11px] font-mono font-medium ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            0{index + 1}
          </span>
        </div>

        {/* Title & Logo / Icon */}
        <div className="flex items-start gap-3 mt-1">
          {/* Render real brand logo if available, or icon */}
          {card.logo ? (
            <div className={`w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border shadow-xs overflow-hidden ${
              isDark ? 'border-slate-700/40' : 'border-slate-200'
            }`}>
              <img 
                src={card.logo} 
                alt={card.title} 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className={`p-2 rounded-xl shrink-0 border text-[#FF7900] ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-orange-50 border-orange-200/60'
            }`}>
              <CardIcon name={card.icon} className="w-5 h-5" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className={`text-sm sm:text-base font-semibold transition-colors leading-snug ${
              isDark 
                ? 'text-white group-hover:text-[#FF7900]' 
                : 'text-slate-900 group-hover:text-[#d96700]'
            }`}>
              {card.title}
            </h4>
            <p className={`text-xs mt-0.5 line-clamp-1 font-normal ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {card.subtitle}
            </p>
          </div>
        </div>

        {/* Short Teaser */}
        <p className={`text-xs mt-2.5 line-clamp-2 leading-relaxed font-normal ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {card.summaryTeaser}
        </p>
      </div>

      {/* Card Action Footer */}
      <div className={`mt-3.5 pt-2.5 border-t flex items-center justify-between text-xs font-medium transition-colors ${
        isDark 
          ? 'border-slate-700/50 text-slate-400 group-hover:text-[#FF7900]' 
          : 'border-slate-100 text-slate-500 group-hover:text-[#d96700]'
      }`}>
        <span>Consulter la fiche</span>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          isDark 
            ? 'bg-slate-800 text-slate-400 group-hover:text-[#FF7900] group-hover:bg-slate-750' 
            : 'bg-slate-100 text-slate-500 group-hover:text-[#d96700] group-hover:bg-orange-50'
        }`}>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
