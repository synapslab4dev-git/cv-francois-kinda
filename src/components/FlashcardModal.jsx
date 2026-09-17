import React, { useEffect, useRef } from 'react';
import CardIcon from './CardIcon';
import { X, ChevronLeft, ChevronRight, CheckCircle, Info } from 'lucide-react';
import { trackCardOpen, trackCardClose } from '../utils/analytics';

export default function FlashcardModal({ 
  card, 
  allCards, 
  onClose, 
  onNavigate,
  theme = 'dark'
}) {
  if (!card) return null;

  const isDark = theme === 'dark';
  const currentIndex = allCards.findIndex((c) => c.id === card.id);
  const prevCard = currentIndex > 0 ? allCards[currentIndex - 1] : null;
  const nextCard = currentIndex < allCards.length - 1 ? allCards[currentIndex + 1] : null;

  const [touchStartY, setTouchStartY] = React.useState(null);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchEndY - touchStartY > 60) {
        onClose();
      }
      setTouchStartY(null);
    }
  };

  // Track card open & reading duration
  const currentCardRef = useRef(card);
  const openTimeRef = useRef(Date.now());

  useEffect(() => {
    currentCardRef.current = card;
    openTimeRef.current = Date.now();
    trackCardOpen(card);

    return () => {
      if (currentCardRef.current) {
        const duration = Math.round((Date.now() - openTimeRef.current) / 1000);
        trackCardClose(currentCardRef.current, duration);
      }
    };
  }, [card?.id]);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevCard) onNavigate(prevCard);
      if (e.key === 'ArrowRight' && nextCard) onNavigate(nextCard);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [card, prevCard, nextCard]);

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-150 ${
      isDark ? 'bg-slate-950/80' : 'bg-slate-900/60'
    }`}>
      
      {/* Click outside to close on desktop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div 
        className={`relative z-10 w-full sm:max-w-xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200 border transition-colors ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Mobile Pull Bar Indicator with Touch Drag-Down to Close */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="sm:hidden pt-2.5 pb-1 cursor-grab active:cursor-grabbing select-none"
        >
          <div className={`w-12 h-1.5 rounded-full mx-auto ${
            isDark ? 'bg-slate-700' : 'bg-slate-300'
          }`} />
        </div>

        {/* Modal Top Header with Swipe Support */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`px-5 py-3 border-b flex items-center justify-between gap-3 select-none ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50/80 border-slate-100'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {card.category}
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>›</span>
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold shrink-0 ${
              isDark 
                ? 'bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25' 
                : 'bg-[#FF7900]/10 text-[#d96700] border border-[#FF7900]/30'
            }`}>
              {card.badge}
            </span>
            <span className={`text-[11px] font-mono font-medium ml-1 shrink-0 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {currentIndex + 1}/{allCards.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDark 
                ? 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-slate-700' 
                : 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200'
            }`}
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Header Banner with Real Logo or Icon */}
          <div className="flex items-start gap-3.5">
            {card.logo ? (
              <div className={`w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border shadow-sm overflow-hidden ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
              }`}>
                <img 
                  src={card.logo} 
                  alt={card.title} 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className={`p-2.5 rounded-xl shrink-0 border text-[#FF7900] ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-orange-50 border-orange-200/60'
              }`}>
                <CardIcon name={card.icon} className="w-5 h-5" />
              </div>
            )}

            <div>
              <h3 className={`text-base sm:text-lg font-bold leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {card.title}
              </h3>
              <p className={`text-xs font-medium mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {card.subtitle}
              </p>
            </div>
          </div>

          {/* Overview text if present */}
          {card.overview && (
            <div className={`p-3.5 rounded-xl border ${
              isDark ? 'bg-slate-800/40 border-slate-700/50 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <p className="text-xs sm:text-sm leading-relaxed font-normal">
                {card.overview}
              </p>
            </div>
          )}

          {/* Evolution Note (GraphiCraft -> Synaps LAB) */}
          {card.evolutionNote && (
            <div className={`rounded-xl p-3 flex items-start gap-2.5 text-xs border ${
              isDark 
                ? 'bg-slate-800/70 border-slate-700 text-slate-300' 
                : 'bg-orange-50/60 border-orange-200 text-slate-700'
            }`}>
              <Info className="w-4 h-4 text-[#FF7900] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-normal">
                {card.evolutionNote}
              </p>
            </div>
          )}

          {/* Render Type 1: Standard Sections (Expertise) */}
          {card.sections && (
            <div className="space-y-3">
              {card.sections.map((sec, idx) => (
                <div key={idx} className={`rounded-xl p-3.5 border ${
                  isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                    isDark ? 'text-[#FF7900]' : 'text-[#d96700]'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
                    {sec.heading}
                  </h4>
                  <div className="space-y-2.5">
                    {sec.items.map((item, iIdx) => (
                      <div key={iIdx} className={`border-l-2 pl-3 ${
                        isDark ? 'border-slate-700' : 'border-slate-200'
                      }`}>
                        <div className={`text-xs font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {item.title}
                        </div>
                        <p className={`text-xs mt-0.5 leading-relaxed font-normal ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Render Type 2: Highlights / Innovations (Synaps LAB WhatsApp CRM) */}
          {card.highlights && (
            <div className="space-y-3">
              {card.highlights.map((hl, idx) => (
                <div key={idx} className={`border rounded-xl p-3.5 ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className={`text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {hl.title}
                    </h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isDark 
                        ? 'bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25' 
                        : 'bg-[#FF7900]/10 text-[#d96700] border border-[#FF7900]/30'
                    }`}>
                      {hl.badge}
                    </span>
                  </div>
                  <ul className={`space-y-2 text-xs ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {hl.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FF7900] mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Render Type 3: Case Details (L'Univers des Lauriers) */}
          {card.caseDetails && (
            <div className="space-y-2.5">
              {card.caseDetails.map((step, idx) => (
                <div key={idx} className={`rounded-xl p-3 border ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isDark 
                        ? 'bg-[#FF7900]/15 text-[#FF7900]' 
                        : 'bg-[#FF7900]/15 text-[#d96700]'
                    }`}>
                      {idx + 1}
                    </span>
                    <h4 className={`text-xs font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {step.phase}
                    </h4>
                  </div>
                  <p className={`text-xs pl-6 leading-relaxed font-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Render Type 4: Brands (GraphiCraft) */}
          {card.brands && (
            <div className="space-y-2.5">
              {card.brands.map((brand, idx) => (
                <div key={idx} className={`border rounded-xl p-3 ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {brand.logo && (
                        <div className={`w-7 h-7 rounded-lg bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0 border ${
                          isDark ? 'border-slate-700' : 'border-slate-200'
                        }`}>
                          <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <h4 className={`text-xs font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {brand.name}
                      </h4>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md border ${
                      isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-600 border-slate-200'
                    }`}>
                      {brand.tag}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed font-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {brand.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Render Type 5: SITAHO (Actions & KPIs) */}
          {card.actions && (
            <div className="space-y-3">
              <div className={`rounded-xl p-3.5 border ${
                isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-[#FF7900]' : 'text-[#d96700]'
                }`}>
                  Dispositif Marketing Réactif
                </h4>
                <ul className={`space-y-2 text-xs ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {card.actions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] mt-1.5 shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {card.results && (
                <div className="grid grid-cols-3 gap-2">
                  {card.results.map((res, idx) => (
                    <div key={idx} className={`p-2 rounded-lg border text-center ${
                      isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className={`text-sm font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>{res.metric}</div>
                      <div className={`text-[10px] mt-0.5 leading-tight ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>{res.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Render Type 6: Future of Work & Focus Case */}
          {card.focusCase && (
            <div className={`border rounded-xl p-3.5 space-y-2 ${
              isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className={`text-xs font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {card.focusCase.title}
              </h4>
              <div className={`text-xs space-y-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <p><strong className={isDark ? "text-slate-200" : "text-slate-800"}>Défi :</strong> {card.focusCase.challenge}</p>
                <p><strong className={isDark ? "text-[#FF7900]" : "text-[#d96700]"}>Solution :</strong> {card.focusCase.solution}</p>
                <p><strong className="text-emerald-500 font-semibold">Impact :</strong> {card.focusCase.result}</p>
              </div>
            </div>
          )}

          {/* Render Type 7: Formation 2iE */}
          {card.programs ? (
            <div className="space-y-3">
              {card.programs.map((prog, pIdx) => (
                <div key={pIdx} className={`border rounded-xl p-3.5 space-y-2.5 ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className={`text-xs font-semibold ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>{prog.institution}</div>
                    <div className={`text-xs sm:text-sm font-bold mt-0.5 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>{prog.degree}</div>
                    {prog.specialization && (
                      <div className={`mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        isDark 
                          ? 'bg-[#FF7900]/10 border border-[#FF7900]/25 text-[#FF7900]' 
                          : 'bg-[#FF7900]/10 border border-[#FF7900]/30 text-[#d96700]'
                      }`}>
                        <span>{prog.specialization}</span>
                      </div>
                    )}
                  </div>
                  <ul className={`space-y-1.5 text-xs pt-1 border-t ${
                    isDark ? 'border-slate-700 text-slate-300' : 'border-slate-200/80 text-slate-600'
                  }`}>
                    {prog.focus.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] mt-1.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : card.details ? (
            <div className="space-y-3">
              <div className={`border rounded-xl p-3.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-semibold ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>{card.details.institution}</div>
                <div className={`text-xs font-medium mt-0.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{card.details.option}</div>
                <div className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                  isDark 
                    ? 'bg-[#FF7900]/10 border border-[#FF7900]/25 text-[#FF7900]' 
                    : 'bg-[#FF7900]/10 border border-[#FF7900]/30 text-[#d96700]'
                }`}>
                  <span>{card.details.distinction}</span>
                </div>
              </div>

              <div className={`rounded-xl p-3.5 border ${
                isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Axes d'Approfondissement
                </h4>
                <ul className={`space-y-1.5 text-xs ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {card.details.programFocus.map((focus, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] mt-1.5 shrink-0" />
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {/* Render Type 8: Tools list */}
          {card.toolsList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {card.toolsList.map((tool, idx) => (
                <div key={idx} className={`border rounded-xl p-3 ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>{tool.name}</div>
                  <div className={`text-[10px] font-medium ${
                    isDark ? 'text-[#FF7900]' : 'text-[#d96700]'
                  }`}>{tool.use}</div>
                  <p className={`text-xs mt-1 leading-snug font-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {tool.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer with Prev / Next Navigation */}
        <div className={`px-5 py-3 border-t flex items-center justify-between gap-3 ${
          isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50/80'
        }`}>
          <button
            onClick={() => prevCard && onNavigate(prevCard)}
            disabled={!prevCard}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              prevCard 
                ? isDark 
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 border border-slate-700 cursor-pointer' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 active:scale-95 border border-slate-200 cursor-pointer shadow-2xs'
                : 'text-slate-400 bg-transparent border border-transparent cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <button
            onClick={onClose}
            className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Fermer
          </button>

          <button
            onClick={() => nextCard && onNavigate(nextCard)}
            disabled={!nextCard}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              nextCard 
                ? 'bg-[#FF7900] text-slate-950 hover:bg-[#e66d00] active:scale-95 shadow-xs cursor-pointer' 
                : 'text-slate-400 bg-transparent border border-transparent cursor-not-allowed opacity-40'
            }`}
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
