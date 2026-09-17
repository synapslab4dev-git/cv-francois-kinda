import React, { useState, useEffect } from 'react';
import { cvData } from './data/cvData';
import Hero from './components/Hero';
import FlashcardCard from './components/FlashcardCard';
import FlashcardModal from './components/FlashcardModal';
import FullCvView from './components/FullCvView';
import QuickActionBar from './components/QuickActionBar';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { 
  trackCategoryChange, 
  trackShareClick, 
  trackViewModeChange, 
  trackThemeChange 
} from './utils/analytics';

export default function App() {
  const [viewMode, setViewMode] = useState('flashcards'); // 'flashcards' | 'full'
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Compétences');
  const [toastMessage, setToastMessage] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cv_theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('cv_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      trackThemeChange(next);
      return next;
    });
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    trackCategoryChange(catId);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    trackViewModeChange(mode);
  };

  const categories = [
    { id: 'Compétences', label: 'Compétences' },
    { id: 'Expérience', label: 'Expériences' },
    { id: 'Cas d\'étude', label: 'Cas d\'étude' },
    { id: 'Formation', label: 'Formation' },
    { id: 'Boîte à Outils', label: 'Outils' },
    { id: 'all', label: 'Toutes les fiches' },
  ];

  const navigationMap = {
    'Compétences': {
      prev: null,
      next: { id: 'Expérience', label: 'Voir les expériences' },
    },
    'Expérience': {
      prev: { id: 'Compétences', label: 'Compétences' },
      next: { id: 'Cas d\'étude', label: 'Voir le cas d\'étude' },
    },
    'Cas d\'étude': {
      prev: { id: 'Expérience', label: 'Expériences' },
      next: { id: 'Formation', label: 'Voir la formation' },
    },
    'Formation': {
      prev: { id: 'Cas d\'étude', label: 'Cas d\'étude' },
      next: { id: 'Boîte à Outils', label: 'Voir les outils conçus' },
    },
    'Boîte à Outils': {
      prev: { id: 'Formation', label: 'Formation' },
      next: { id: 'all', label: 'Voir toutes les fiches' },
    },
    'all': {
      prev: { id: 'Boîte à Outils', label: 'Outils' },
      next: null,
    },
  };

  const filteredCards = selectedCategory === 'all'
    ? cvData.flashcards
    : cvData.flashcards.filter((c) => c.category === selectedCategory);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleShare = async () => {
    trackShareClick();
    
    const customText = `François KINDA - CV pour le poste de Responsable Marketing, Croissance & Relation Client`;
    const fullShareText = `${customText}\n\n${window.location.href}`;

    const shareData = {
      title: `CV François KINDA`,
      text: `${customText}\n\n`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard(fullShareText);
      }
    } else {
      copyToClipboard(fullShareText);
    }
  };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy || window.location.href);
    showToast("Lien copié dans le presse-papiers !");
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Toast Notification with Orange Telecom accent */}
      {toastMessage && (
        <div className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 z-50 flex items-center justify-center">
          <div className="bg-[#FF7900] text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <Check className="w-3.5 h-3.5" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto pb-20 sm:pb-10">
        
        {/* Top Hero Section */}
        <Hero
          personal={cvData.personal}
          positioning={cvData.positioning}
          viewMode={viewMode}
          setViewMode={handleViewModeChange}
          onShare={handleShare}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* View Mode 1: Flashcards */}
        {viewMode === 'flashcards' && (
          <div className="px-4 mt-1.5 space-y-3">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#FF7900] text-slate-950 font-bold shadow-xs'
                      : isDark
                        ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Flashcard Cards Grid */}
            <div id="flashcards-section" className="grid grid-cols-1 gap-2.5 pt-0.5">
              {filteredCards.map((card, idx) => (
                <FlashcardCard
                  key={card.id}
                  card={card}
                  index={idx}
                  theme={theme}
                  onSelect={(c) => setSelectedCard(c)}
                />
              ))}
            </div>

            {/* Category Stepper Navigation (Précédent / Suivant) */}
            {navigationMap[selectedCategory] && (
              <div className="flex items-center justify-between gap-2 pt-2 pb-1">
                {navigationMap[selectedCategory].prev ? (
                  <button
                    onClick={() => {
                      handleSelectCategory(navigationMap[selectedCategory].prev.id);
                      const el = document.getElementById('flashcards-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 cursor-pointer shadow-2xs ${
                      isDark 
                        ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700 hover:border-slate-600' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                    <span>{navigationMap[selectedCategory].prev.label}</span>
                  </button>
                ) : <div />}

                {navigationMap[selectedCategory].next ? (
                  <button
                    onClick={() => {
                      handleSelectCategory(navigationMap[selectedCategory].next.id);
                      const el = document.getElementById('flashcards-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 cursor-pointer shadow-2xs ${
                      isDark 
                        ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-[#FF7900]/50' 
                        : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-[#FF7900]/50'
                    }`}
                  >
                    <span>{navigationMap[selectedCategory].next.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF7900]" />
                  </button>
                ) : <div />}
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Continuous Reading */}
        {viewMode === 'full' && (
          <FullCvView flashcards={cvData.flashcards} theme={theme} />
        )}

        {/* Interactive Flashcard Modal / Bottom Sheet */}
        {selectedCard && (
          <FlashcardModal
            card={selectedCard}
            allCards={filteredCards}
            theme={theme}
            onClose={() => setSelectedCard(null)}
            onNavigate={(newCard) => setSelectedCard(newCard)}
          />
        )}

      </main>

      {/* Footer Branding */}
      <footer className={`w-full max-w-2xl mx-auto px-4 pb-24 sm:pb-8 text-center text-xs space-y-1 ${
        isDark ? 'text-slate-500' : 'text-slate-500'
      }`}>
        <p className="font-semibold">© 2026 {cvData.personal.fullName} • {cvData.personal.location}</p>
        <p className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {cvData.personal.phone} • {cvData.personal.email}
        </p>
      </footer>

      {/* Floating Bottom Action Bar for Mobile */}
      <QuickActionBar
        personal={cvData.personal}
        onShare={handleShare}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

    </div>
  );
}
