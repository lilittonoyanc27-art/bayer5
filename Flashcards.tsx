import React, { useState, useMemo } from 'react';
import { VERBS_DATA, VerbEntry } from './verbs';
import { Sparkles, Search, Check, RefreshCw, Layers, ArrowRight, BookOpen, Volume2 } from 'lucide-react';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [knownVerbIds, setKnownVerbIds] = useState<Set<string>>(new Set());

  // Filter verbs based on search & category
  const filteredVerbs = useMemo(() => {
    return VERBS_DATA.filter(verb => {
      const matchesSearch = verb.spanish.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            verb.armenian.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterType === 'all') return matchesSearch;
      return verb.type === filterType && matchesSearch;
    });
  }, [filterType, searchQuery]);

  // Current active word
  const currentVerb = filteredVerbs[currentIndex] || null;

  // Handles moving to a random next card
  const handleNext = () => {
    if (filteredVerbs.length <= 1) return;
    setIsFlipped(false);
    
    // Give a small timeout for flip transition before changing index
    setTimeout(() => {
      let nextIndex = currentIndex;
      // Get a random index different from current one if possible
      while (nextIndex === currentIndex && filteredVerbs.length > 1) {
        nextIndex = Math.floor(Math.random() * filteredVerbs.length);
      }
      setCurrentIndex(nextIndex);
    }, 150);
  };

  const handlePrev = () => {
    if (filteredVerbs.length <= 1) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredVerbs.length) % filteredVerbs.length);
    }, 150);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleKnown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid flipping the card
    setKnownVerbIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Speaks spanish word using browsers speech synthesis
  const speakSpanish = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const resetProgress = () => {
    setKnownVerbIds(new Set());
  };

  return (
    <div id="flashcards-section" className="space-y-6">
      {/* Search & Filter Header Container */}
      <div className="bg-white p-5 rounded-[28px] shadow-sm border-4 border-vibrant-gray flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Փնտրել բայ կամ թարգմանություն..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-vibrant-gray rounded-xl text-sm font-bold focus:outline-hidden focus:border-vibrant-orange focus:ring-4 focus:ring-vibrant-orange/15 bg-[#F9FAFB] text-vibrant-charcoal transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Filter categories tabs styling - Vibrant Palette Tags */}
        <div className="flex flex-wrap gap-2 justify-center w-full lg:w-auto">
          {[
            { value: 'all', label: 'Բոլորը' },
            { value: 'ar', label: '-AR բայեր' },
            { value: 'er', label: '-ER բայեր' },
            { value: 'ir', label: '-IR բայեր' },
            { value: 'reflexive', label: 'Անդրադարձ (se)' },
            { value: 'phrase', label: 'Արտահայտություն' }
          ].map(tab => {
            const isSelected = filterType === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => {
                  setFilterType(tab.value);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 ${
                  isSelected
                    ? 'bg-vibrant-orange text-white shadow-xs scale-102 border-2 border-vibrant-orange'
                    : 'bg-[#F3F4F6] text-gray-500 hover:text-vibrant-charcoal hover:bg-[#E5E7EB] border-2 border-[#E5E7EB]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flashcard view */}
      {currentVerb ? (
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto space-y-6">
          
          {/* Card perspective container */}
          <div 
            onClick={toggleFlip}
            className="w-full h-[360px] relative cursor-pointer select-none group"
            style={{ perspective: '1000px' }}
          >
            {/* Card inner */}
            <div 
              className={`w-full h-full relative transition-all duration-500 rounded-[40px] border-4 shadow-sm flex items-center justify-center p-8 text-center text-vibrant-charcoal ${
                isFlipped 
                  ? 'bg-[#FFFBF5] border-vibrant-orange' 
                  : 'bg-white border-vibrant-gray hover:border-vibrant-orange'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'none'
              }}
            >
              {/* CARD FRONT (Spanish) */}
              <div 
                className="absolute inset-0 flex flex-col justify-between p-8 backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Header indicators */}
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span className="bg-[#F3F4F6] text-vibrant-orange border border-vibrant-gray px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    {currentVerb.type === 'phrase' ? 'ԱՐՏԱՀԱՅՏՈՒԹՅՈՒՆ' : `${currentVerb.type.toUpperCase()} ԲԱՅ`}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => toggleKnown(currentVerb.id, e)}
                      className={`p-1.5 rounded-full border-2 transition-all ${
                        knownVerbIds.has(currentVerb.id)
                          ? 'bg-vibrant-orange/10 border-vibrant-orange text-vibrant-orange'
                          : 'bg-slate-50 border-vibrant-gray text-slate-400 hover:text-vibrant-orange hover:border-vibrant-orange'
                      }`}
                      title={knownVerbIds.has(currentVerb.id) ? "Սովորած է" : "Նշել որպես սովորած"}
                    >
                      <Check size={16} className="stroke-[3px]" />
                    </button>
                    <span className="font-mono">{currentIndex + 1} / {filteredVerbs.length}</span>
                  </div>
                </div>

                {/* Spanish Word Section inspired heavily by the style spec */}
                <div className="my-auto space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">Tarjeta de Estudio</span>
                  <h2 className="text-4xl sm:text-6xl font-black text-vibrant-charcoal tracking-tight select-all">
                    {currentVerb.spanish}
                  </h2>
                  <div className="h-1.5 w-20 bg-vibrant-orange rounded-full mx-auto mb-6"></div>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={(e) => speakSpanish(currentVerb.spanish, e)}
                      className="px-4 py-2 bg-vibrant-gray hover:bg-vibrant-gray/80 text-vibrant-charcoal border-2 border-vibrant-gray rounded-xl transition-all inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider"
                      title="Լսել արտասանությունը"
                    >
                      <Volume2 size={15} />
                      Արտասանել
                    </button>
                  </div>
                </div>

                {/* Click instruction bar */}
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                  Սեղմեք քարտին՝ թարգմանությունը տեսնելու համար
                </span>
              </div>

              {/* CARD BACK (Armenian translation) */}
              <div 
                className="absolute inset-0 flex flex-col justify-between p-8 backface-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {/* Header indicators */}
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span className="bg-vibrant-orange/10 text-vibrant-orange px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    ԱՐԴՅՈՒՆՔ
                  </span>
                  <span className="font-mono">{currentIndex + 1} / {filteredVerbs.length}</span>
                </div>

                {/* Armenian Translation Section */}
                <div className="my-auto space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">ԹԱՐԳՄԱՆՈՒԹՅՈՒՆ</span>
                  <p className="text-3xl sm:text-5xl font-black text-vibrant-orange leading-snug tracking-tight">
                    {currentVerb.armenian}
                  </p>
                  <p className="text-xs text-gray-400/90 font-semibold uppercase tracking-wider">
                    Իսպաներեն՝ <strong className="text-vibrant-blue underline decoration-2">{currentVerb.spanish}</strong>
                  </p>
                  <div className="h-[2px] w-12 bg-vibrant-gray mx-auto my-3" />
                </div>

                {/* Bottom interactive action helper */}
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Սեղմեք նորից՝ իսպաներենը տեսնելու համար
                </span>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 w-full">
            <button
              onClick={handlePrev}
              disabled={filteredVerbs.length <= 1}
              className="flex-1 py-3.5 px-6 bg-white border-4 border-vibrant-gray text-vibrant-charcoal font-black uppercase text-xs tracking-wider rounded-2xl transition-all hover:bg-vibrant-gray disabled:opacity-50"
            >
              Նախորդը
            </button>
            <button
              onClick={handleNext}
              disabled={filteredVerbs.length <= 1}
              className="flex-1 py-3.5 px-6 bg-vibrant-orange text-white font-black uppercase text-xs tracking-wider rounded-2xl transition-all hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 border-2 border-vibrant-orange disabled:opacity-50"
            >
              Պատահական հաջորդը
              <ArrowRight size={18} className="stroke-[3px]" />
            </button>
          </div>

          {/* Progress Tracker Widget - Styled like the Streaks widget */}
          <div className="w-full bg-white p-6 rounded-[32px] border-4 border-vibrant-gray space-y-4 shadow-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold flex items-center gap-1.5 text-vibrant-orange uppercase tracking-wider">
                <Sparkles size={15} className="text-vibrant-orange" />
                ՍՈՎՈՐԵԼՈՒ ԱՌԱՋԸՆԹԱՑ՝
              </span>
              <span className="font-mono font-bold text-gray-500">
                {knownVerbIds.size} / {VERBS_DATA.length} բայ ({Math.round((knownVerbIds.size / VERBS_DATA.length) * 100)}%)
              </span>
            </div>
            
            <div className="w-full bg-[#E5E7EB] h-3.5 rounded-full overflow-hidden p-0.5 border border-vibrant-gray">
              <div 
                className="bg-vibrant-orange h-full rounded-full transition-all duration-300"
                style={{ width: `${(knownVerbIds.size / VERBS_DATA.length) * 100}%` }}
              />
            </div>

            {knownVerbIds.size > 0 && (
              <div className="flex justify-end">
                <button 
                  onClick={resetProgress}
                  className="text-[10px] font-black uppercase tracking-wider text-red-400 hover:text-red-600 transition-colors"
                >
                  Ջնջել առաջընթացը
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-[32px] border-4 border-dashed border-vibrant-gray p-8">
          <p className="text-gray-400 font-extrabold uppercase tracking-wider">Բայեր չեն գտնվել այս տվյալներով:</p>
          <button 
            onClick={() => { setSearchQuery(''); setFilterType('all'); }} 
            className="mt-4 text-sm text-vibrant-orange font-black uppercase tracking-wider hover:underline"
          >
            Մաքրել ֆիլտրերը
          </button>
        </div>
      )}

      {/* Vocabulary List Browser - Vibrant Palette Styles */}
      <div className="bg-white rounded-[32px] border-4 border-vibrant-gray shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b-4 border-vibrant-gray bg-[#F9FAFB] flex justify-between items-center">
          <h3 className="font-black text-vibrant-charcoal text-sm uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={16} className="text-vibrant-orange" />
            Ամբողջական ցուցակ ({filteredVerbs.length} բայ)
          </h3>
          <span className="text-xs text-slate-400 font-black uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-vibrant-gray">
            Տիպ՝ {filterType === 'all' ? 'ԲՈԼՈՐԸ' : filterType.toUpperCase()}
          </span>
        </div>

        <div className="p-3 bg-[#FFFBF5] space-y-2.5 max-h-96 overflow-y-auto">
          {filteredVerbs.map((verb, idx) => {
            const isKnown = knownVerbIds.has(verb.id);
            const isSelected = currentVerb?.id === verb.id;
            return (
              <div 
                key={verb.id} 
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white ${
                  isSelected 
                    ? 'border-vibrant-orange shadow-xs scale-[1.01]' 
                    : 'border-vibrant-gray/50 hover:border-vibrant-orange'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 font-black font-mono">#{idx + 1}</span>
                  <div>
                    <h4 className="font-extrabold text-vibrant-charcoal text-base flex items-center gap-1.5 leading-none">
                      {verb.spanish}
                      <button 
                        onClick={(e) => speakSpanish(verb.spanish, e)} 
                        className="text-gray-400 hover:text-vibrant-orange transition-colors p-0.5"
                        title="Կարդալ"
                      >
                        <Volume2 size={14} />
                      </button>
                    </h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">{verb.armenian}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-vibrant-gray text-gray-500 border border-vibrant-gray/70">
                    {verb.type}
                  </span>
                  
                  <button
                    onClick={() => {
                      const vocabIndex = filteredVerbs.findIndex(v => v.id === verb.id);
                      if (vocabIndex !== -1) {
                        setCurrentIndex(vocabIndex);
                        setIsFlipped(false);
                      }
                      const elem = document.getElementById("flashcards-section");
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-vibrant-orange hover:text-white font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border-2 border-vibrant-orange hover:bg-vibrant-orange transition-all"
                  >
                    Մարզվել
                  </button>

                  <button
                    onClick={(e) => {
                      setKnownVerbIds(prev => {
                        const next = new Set(prev);
                        if (next.has(verb.id)) next.delete(verb.id);
                        else next.add(verb.id);
                        return next;
                      });
                    }}
                    className={`p-1.5 rounded-full border-2 transition-colors ${
                      isKnown 
                        ? 'bg-vibrant-orange/10 border-vibrant-orange text-vibrant-orange' 
                        : 'bg-white border-vibrant-gray text-gray-300 hover:text-vibrant-orange hover:border-vibrant-orange'
                    }`}
                  >
                    <Check size={14} className="stroke-[3px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
