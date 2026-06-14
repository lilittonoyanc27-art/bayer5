import React, { useState, useEffect } from 'react';
import { VERBS_DATA, VerbEntry } from './verbs';
import { Check, X, Award, HelpCircle, Trophy, Flame, ChevronRight, Zap } from 'lucide-react';

type PlayMode = 'es-to-hy' | 'hy-to-es';

export default function TranslationGame() {
  const [playMode, setPlayMode] = useState<PlayMode>('es-to-hy');
  const [targetVerb, setTargetVerb] = useState<VerbEntry | null>(null);
  const [options, setOptions] = useState<VerbEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  
  // Game stats
  const [score, setScore] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  useEffect(() => {
    generateNewQuestion();
  }, [playMode]);

  const generateNewQuestion = () => {
    if (VERBS_DATA.length < 4) return;
    
    // Pick target verb
    const target = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
    
    // Pick 3 random wrong answers
    const wrongOptions: VerbEntry[] = [];
    while (wrongOptions.length < 3) {
      const randomVerb = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
      if (randomVerb.id !== target.id && !wrongOptions.some(o => o.id === randomVerb.id)) {
        wrongOptions.push(randomVerb);
      }
    }
    
    // Combine & Shuffle
    const allOptions = [target, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setTargetVerb(target);
    setOptions(allOptions);
    setSelectedId(null);
    setIsAnswered(false);
  };

  const handleSelectOption = (id: string) => {
    if (isAnswered) return;
    
    setSelectedId(id);
    setIsAnswered(true);
    setTotal(prev => prev + 1);

    if (targetVerb && id === targetVerb.id) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    generateNewQuestion();
  };

  if (!targetVerb) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* GAME SCOREBAR - Styled to align with Vibrant Palette */}
      <div className="bg-white p-5 rounded-[28px] border-4 border-vibrant-gray shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center px-6">
        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-vibrant-gray">
          <Trophy className="text-vibrant-orange" size={18} />
          <span className="text-xs font-black uppercase tracking-wider text-vibrant-charcoal">
            ՄԻԱՎՈՐ՝ <strong className="text-vibrant-orange font-black text-sm font-mono">{score}</strong> / {total}
          </span>
        </div>

        {/* Play mode switcher inline tabs */}
        <div className="flex border-2 border-vibrant-gray p-0.5 rounded-xl bg-vibrant-cream">
          <button
            onClick={() => setPlayMode('es-to-hy')}
            className={`px-3.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
              playMode === 'es-to-hy'
                ? 'bg-vibrant-orange text-white shadow-xs'
                : 'text-gray-500 hover:text-vibrant-charcoal'
            }`}
          >
            Իսպ - Հայ
          </button>
          <button
            onClick={() => setPlayMode('hy-to-es')}
            className={`px-3.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
              playMode === 'hy-to-es'
                ? 'bg-vibrant-orange text-white shadow-xs'
                : 'text-gray-500 hover:text-vibrant-charcoal'
            }`}
          >
            Հայ - Իսպ
          </button>
        </div>

        <div className="flex items-center gap-1.5 bg-vibrant-orange/10 text-vibrant-orange border border-vibrant-orange/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
          <Flame size={14} className="text-vibrant-orange fill-vibrant-orange" />
          <span>{streak} սերիա</span>
        </div>
      </div>

      {/* QUESTION FLASHCARD BOX */}
      <div className="bg-white rounded-[40px] border-4 border-vibrant-gray p-8 shadow-sm text-center space-y-8">
        
        {/* Label block */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">
            {playMode === 'es-to-hy' ? 'ԹԱՐԳՄԱՆԵՔ ԻՍՊԱՆԵՐԵՆԸ՝' : 'ԳՏԵՔ ԻՍՊԱՆԵՐԵՆ ՏԱՐԲԵՐԱԿԸ՝'}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-vibrant-charcoal tracking-tight leading-normal select-all">
            {playMode === 'es-to-hy' ? targetVerb.spanish : targetVerb.armenian}
          </div>
          <div className="h-1.5 w-16 bg-vibrant-orange rounded-full mx-auto my-1.5" />
          <span className="inline-block px-3 py-1 rounded-full bg-vibrant-gray font-black uppercase tracking-wider text-[9px] text-gray-500 border border-vibrant-gray/70">
            {targetVerb.type}
          </span>
        </div>

        {/* COMBINED OPTIONS GRID */}
        <div className="grid grid-cols-1 gap-3.5 max-w-md mx-auto">
          {options.map((option) => {
            const isCorrectOption = option.id === targetVerb.id;
            const isSelectedOption = option.id === selectedId;
            
            let btnBgClass = 'bg-white border-2 border-vibrant-gray hover:border-vibrant-orange hover:bg-vibrant-cream/50 text-vibrant-charcoal font-black hover:scale-[1.01]';
            let iconElement = null;

            if (isAnswered) {
              if (isCorrectOption) {
                // Correct item
                btnBgClass = 'bg-emerald-50 border-4 border-[#4ADE80] text-emerald-950 font-black';
                iconElement = <Check size={18} className="text-[#4ADE80] shrink-0 stroke-[3px]" />;
              } else if (isSelectedOption) {
                // Wrong item user selected
                btnBgClass = 'bg-red-50 border-4 border-red-300 text-red-950 font-black';
                iconElement = <X size={18} className="text-red-500 shrink-0 stroke-[3px]" />;
              } else {
                // Other items once answered
                btnBgClass = 'bg-white border-2 border-vibrant-gray/30 text-gray-400 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl text-left flex items-center justify-between text-sm transition-all focus:outline-hidden ${btnBgClass}`}
              >
                <div className="flex-1 pr-2">
                  {playMode === 'es-to-hy' ? option.armenian : option.spanish}
                </div>
                {iconElement}
              </button>
            );
          })}
        </div>

        {/* FEEDBACK EXPLANATION & ACTION BUTTON */}
        {isAnswered && (
          <div className="bg-[#FFFBF5] p-5 rounded-[24px] border-4 border-vibrant-gray max-w-sm mx-auto animate-fade-in space-y-4">
            <div className="text-xs text-vibrant-charcoal font-semibold text-left">
              💡 <span className="font-black text-vibrant-orange">{targetVerb.spanish}</span> — {targetVerb.armenian}
            </div>
            
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-vibrant-orange border-2 border-vibrant-orange hover:bg-vibrant-orange text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02]"
            >
              Շարունակել
              <ChevronRight size={18} className="stroke-[3px]" />
            </button>
          </div>
        )}

      </div>

      {/* BEST STREAK TROPHY ACCOMPLISHMENT */}
      {bestStreak > 0 && (
        <div className="bg-vibrant-orange/10 border-2 border-vibrant-orange/30 text-vibrant-orange py-3.5 px-5 rounded-2xl flex items-center gap-2.5 text-xs justify-center font-black uppercase tracking-wider">
          <Zap size={15} className="text-vibrant-orange fill-vibrant-orange" />
          <span>Ձեր լավագույն շարունակական սերիան՝ {bestStreak} ճիշտ պատասխան</span>
        </div>
      )}

    </div>
  );
}
