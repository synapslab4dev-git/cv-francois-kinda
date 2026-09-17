import React, { useState, useEffect } from 'react';
import { cvData } from './data/cvData';
import Hero from './components/Hero';
import FlashcardCard from './components/FlashcardCard';
import FlashcardModal from './components/FlashcardModal';
import FullCvView from './components/FullCvView';
import QuickActionBar from './components/QuickActionBar';
import { Check } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('flashcards'); // 'flashcards' | 'full'
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const categories = [
    { id: 'all', label: 'Toutes les fiches' },
    { id: 'Expertise', label: 'Expertises' },
    { id: 'Expérience', label: 'Expériences' },
    { id: 'Cas d\'étude', label: 'Cas d\'étude' },
    { id: 'Formation', label: 'Formation' },
    { id: 'Boîte à Outils', label: 'Outils' },
  ];

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
    const shareData = {
      title: `${cvData.personal.fullName} — CV Mobile Interactif`,
      text: `${cvData.personal.fullName} • ${cvData.personal.title} — ${cvData.personal.subtitle}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
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
          setViewMode={setViewMode}
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
                  onClick={() => setSelectedCategory(cat.id)}
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
            <div className="grid grid-cols-1 gap-2.5 pt-0.5">
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
            allCards={cvData.flashcards}
            theme={theme}
            onClose={() => setSelectedCard(null)}
            onNavigate={(newCard) => setSelectedCard(newCard)}
          />
        )}

      </main>

      {/* Footer Branding */}
      <footer className={`w-full max-w-2xl mx-auto px-4 pb-20 sm:pb-8 text-center text-xs space-y-1 ${
        isDark ? 'text-slate-500' : 'text-slate-500'
      }`}>
        <p>© 2026 {cvData.personal.fullName}</p>
        <p className={`text-[11px] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          CV interactif mobile-first
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
