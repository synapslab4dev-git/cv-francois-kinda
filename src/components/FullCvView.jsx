import React from 'react';
import CardIcon from './CardIcon';
import { CheckCircle, Info } from 'lucide-react';

export default function FullCvView({ flashcards, theme = 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-4 pt-2 pb-24 max-w-2xl mx-auto px-4">
      {flashcards.map((card, idx) => (
        <article 
          key={card.id}
          className={`rounded-2xl p-4 sm:p-5 border shadow-xs space-y-3.5 transition-colors ${
            isDark 
              ? 'bg-slate-800/40 border-slate-700/60 text-slate-100' 
              : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
          }`}
        >
          {/* Card Header with Logo or Icon */}
          <div className={`flex items-start gap-3 pb-3 border-b ${
            isDark ? 'border-slate-700/50' : 'border-slate-100'
          }`}>
            {card.logo ? (
              <div className={`w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border shadow-xs overflow-hidden ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
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
                <CardIcon name={card.icon} className="w-4 h-4" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                  isDark 
                    ? 'bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25' 
                    : 'bg-[#FF7900]/10 text-[#d96700] border border-[#FF7900]/30'
                }`}>
                  {card.badge}
                </span>
                <span className={`text-[10px] font-mono ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>0{idx + 1}</span>
              </div>
              <h3 className={`text-sm sm:text-base font-semibold mt-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {card.title}
              </h3>
              <p className={`text-xs font-normal ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {card.subtitle}
              </p>
            </div>
          </div>

          {/* Overview */}
          {card.overview && (
            <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {card.overview}
            </p>
          )}

          {/* Evolution Note (GraphiCraft -> Synaps LAB) */}
          {card.evolutionNote && (
            <div className={`rounded-xl p-3 flex items-start gap-2.5 text-xs border ${
              isDark ? 'bg-slate-800/70 border-slate-700 text-slate-300' : 'bg-orange-50/60 border-orange-200 text-slate-700'
            }`}>
              <Info className="w-4 h-4 text-[#FF7900] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-normal">
                {card.evolutionNote}
              </p>
            </div>
          )}

          {/* Sections (Expertise) */}
          {card.sections && (
            <div className="space-y-3 pt-1">
              {card.sections.map((sec, sIdx) => (
                <div key={sIdx} className={`rounded-xl p-3.5 border ${
                  isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-[#FF7900]' : 'text-[#d96700]'
                  }`}>
                    {sec.heading}
                  </h4>
                  <div className="space-y-2">
                    {sec.items.map((item, iIdx) => (
                      <div key={iIdx} className="text-xs">
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title} : </span>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights (WhatsApp CRM) */}
          {card.highlights && (
            <div className="space-y-2.5">
              {card.highlights.map((hl, hIdx) => (
                <div key={hIdx} className={`border rounded-xl p-3.5 ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{hl.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isDark 
                        ? 'bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25' 
                        : 'bg-[#FF7900]/10 text-[#d96700] border border-[#FF7900]/30'
                    }`}>{hl.badge}</span>
                  </div>
                  <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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

          {/* Case Details (Lauriers) */}
          {card.caseDetails && (
            <div className="space-y-2">
              {card.caseDetails.map((cd, cIdx) => (
                <div key={cIdx} className={`p-2.5 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`font-semibold ${isDark ? 'text-[#FF7900]' : 'text-[#d96700]'}`}>{cd.phase} : </span>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{cd.details}</span>
                </div>
              ))}
            </div>
          )}

          {/* Brands (GraphiCraft) */}
          {card.brands && (
            <div className="space-y-2">
              {card.brands.map((b, bIdx) => (
                <div key={bIdx} className={`border p-2.5 rounded-xl text-xs ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {b.logo && (
                      <div className={`w-6 h-6 rounded-md bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0 border ${
                        isDark ? 'border-slate-700' : 'border-slate-200'
                      }`}>
                        <img src={b.logo} alt={b.name} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{b.name} <span className={`text-[10px] font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>({b.tag})</span></div>
                  </div>
                  <p className={`mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{b.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* SITAHO */}
          {card.actions && (
            <div className="space-y-2.5">
              <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {card.actions.map((act, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] mt-1.5 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
              {card.results && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {card.results.map((res, rIdx) => (
                    <div key={rIdx} className={`p-2 rounded-lg border text-center ${
                      isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{res.metric}</div>
                      <div className={`text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{res.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Future of Work */}
          {card.focusCase && (
            <div className={`border p-3 rounded-xl text-xs space-y-1 ${
              isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.focusCase.title}</div>
              <p><strong className={isDark ? "text-slate-200" : "text-slate-800"}>Défi :</strong> {card.focusCase.challenge}</p>
              <p><strong className={isDark ? "text-[#FF7900]" : "text-[#d96700]"}>Solution :</strong> {card.focusCase.solution}</p>
              <p><strong className="text-emerald-500 font-semibold">Impact :</strong> {card.focusCase.result}</p>
            </div>
          )}

          {/* Formation */}
          {card.programs ? (
            <div className="space-y-2.5">
              {card.programs.map((prog, pIdx) => (
                <div key={pIdx} className={`border p-3 rounded-xl text-xs space-y-1.5 ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{prog.institution}</div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{prog.degree}</div>
                  {prog.specialization && (
                    <div className={`font-semibold ${isDark ? 'text-[#FF7900]' : 'text-[#d96700]'}`}>{prog.specialization}</div>
                  )}
                  <ul className={`space-y-1 pl-1 pt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {prog.focus.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#FF7900] mt-1.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : card.details ? (
            <div className="space-y-2">
              <div className={`border p-3 rounded-xl text-xs ${
                isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{card.details.institution}</div>
                <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.details.option}</div>
                <div className={`mt-1 font-semibold ${isDark ? 'text-[#FF7900]' : 'text-[#d96700]'}`}>
                  {card.details.distinction}
                </div>
              </div>
              <ul className={`space-y-1 text-xs pl-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {card.details.programFocus.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#FF7900] mt-2 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Tools */}
          {card.toolsList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {card.toolsList.map((t, tIdx) => (
                <div key={tIdx} className={`border p-2.5 rounded-xl text-xs ${
                  isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</div>
                  <div className={`text-[10px] font-medium ${isDark ? 'text-[#FF7900]' : 'text-[#d96700]'}`}>{t.use}</div>
                  <p className={`mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t.desc}</p>
                </div>
              ))}
            </div>
          )}

        </article>
      ))}
    </div>
  );
}
