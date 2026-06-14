import React, { useState } from 'react';
import { VERBS_DATA, VerbEntry } from './verbs';
import { conjugateVerb, PronounType, TenseType, PRONOUN_LABELS, TENSE_LABELS } from './conjugation';
import { HelpCircle, RefreshCw, CheckCircle, XCircle, Award, Volume2, HelpCircle as HelpIcon, Sparkles } from 'lucide-react';

const PRONOUNS: PronounType[] = ['Yo', 'Tú', 'Él / Ella', 'Nosotros', 'Vosotros', 'Ellos / Ellas'];
const TENSES: TenseType[] = ['present', 'past', 'future'];

export default function ConjugationGame() {
  const [currentVerb, setCurrentVerb] = useState<VerbEntry>(getRandomVerb());
  const [currentPronoun, setCurrentPronoun] = useState<PronounType>(getRandomPronoun());
  const [currentTense, setCurrentTense] = useState<TenseType>(getRandomTense());
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  
  // Game Stats
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  function getRandomVerb(): VerbEntry {
    // Prefer verbs that represent standard single words or are in our conjugation list
    const candidates = VERBS_DATA.filter(v => v.type !== 'phrase' || v.baseVerb.length > 0);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function getRandomPronoun(): PronounType {
    return PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
  }

  function getRandomTense(): TenseType {
    return TENSES[Math.floor(Math.random() * TENSES.length)];
  }

  const solution = conjugateVerb(currentVerb.baseVerb, currentPronoun, currentTense);

  const handleNextWord = () => {
    setCurrentVerb(getRandomVerb());
    setCurrentPronoun(getRandomPronoun());
    setCurrentTense(getRandomTense());
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback(null);
  };

  const handleCheckAnswer = (answer: string) => {
    const cleanAnswer = answer.trim().toLowerCase();
    const cleanCorrect = solution.conjugated.trim().toLowerCase();
    
    // Check if correct
    const isCorrect = cleanAnswer === cleanCorrect;
    
    setFeedback({ isCorrect, show: true });
    setShowAnswer(true);
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
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

  const handleManualMark = (isCorrect: boolean) => {
    setFeedback({ isCorrect, show: true });
    setShowAnswer(true);
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
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

  const playPronunciation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${currentPronoun} ${solution.conjugated}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* SCORE & STREAK BAR - Yummy Thick borders and cute rounded corners */}
      <div className="grid grid-cols-3 gap-3.5">
        <div className="bg-white px-4 py-4 rounded-[28px] border-4 border-vibrant-gray text-center shadow-xs">
          <div className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-1">ՃԻՇՏ</div>
          <div className="text-2xl font-black text-vibrant-orange">
            {score} <span className="text-xs text-gray-400 font-bold">/ {totalAttempts}</span>
          </div>
        </div>

        <div className="bg-white px-4 py-4 rounded-[28px] border-4 border-vibrant-gray text-center shadow-xs">
          <div className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-1">ՍԵՐԻԱ</div>
          <div className="text-2xl font-black text-vibrant-orange flex items-center justify-center gap-1">
            {streak}
            {streak >= 3 && <Sparkles size={18} className="text-vibrant-orange animate-bounce" />}
          </div>
        </div>

        <div className="bg-white px-4 py-4 rounded-[28px] border-4 border-vibrant-gray text-center shadow-xs">
          <div className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-1">ԼԱՎԱԳՈՒՅՆ</div>
          <div className="text-2xl font-black text-vibrant-blue">{bestStreak}</div>
        </div>
      </div>

      {/* MAIN GAME CHALLENGE CARD */}
      <div className="bg-white rounded-[40px] border-4 border-vibrant-gray p-8 shadow-sm text-center space-y-6">
        
        {/* Tense & Info Badge */}
        <div className="flex justify-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-vibrant-orange/10 text-vibrant-orange border border-vibrant-orange/20">
            {TENSE_LABELS[currentTense].es} ({TENSE_LABELS[currentTense].hy})
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-vibrant-gray text-gray-500 border border-vibrant-gray/70">
            {currentVerb.type.toUpperCase()} ԲԱՅ
          </span>
        </div>

        {/* Verb & Translation info */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block">Բայ (Infinitive)՝</span>
          <h2 className="text-4xl sm:text-5xl font-black text-vibrant-charcoal tracking-tight">
            {currentVerb.spanish}
          </h2>
          <div className="h-1 w-16 bg-vibrant-orange rounded-full mx-auto my-1.5" />
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            ԹԱՐԳՄԱՆՈՒԹՅՈՒՆ՝ <span className="text-vibrant-charcoal font-black normal-case text-base ml-1">{currentVerb.armenian}</span>
          </p>
        </div>

        {/* Pronoun target box */}
        <div className="py-5 px-6 bg-vibrant-cream rounded-[24px] border-4 border-vibrant-gray max-w-sm mx-auto space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block">Դերանուն (Pronoun)</span>
          <div className="text-2xl font-black text-[#1A1A1A]">
            {PRONOUN_LABELS[currentPronoun]}
          </div>
        </div>

        {/* INPUT / ANSWER AREA */}
        {!showAnswer ? (
          <div className="space-y-4 max-w-md mx-auto pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Գրեք ճիշտ խոնարհումը..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userAnswer.trim()) {
                    handleCheckAnswer(userAnswer);
                  }
                }}
                className="flex-1 px-4 py-3.5 border-4 border-vibrant-gray focus:border-vibrant-orange rounded-2xl text-center font-black text-xl bg-[#F9FAFB] text-vibrant-charcoal tracking-wide focus:outline-hidden focus:ring-4 focus:ring-vibrant-orange/15 transition-all placeholder:text-gray-400/80"
                autoFocus
              />
              <button
                onClick={() => userAnswer.trim() && handleCheckAnswer(userAnswer)}
                disabled={!userAnswer.trim()}
                className="px-6 py-3.5 bg-vibrant-orange hover:bg-vibrant-orange border-2 border-vibrant-orange text-white rounded-2xl font-black uppercase text-xs tracking-wider hover:scale-[1.02] shadow-md transition-all disabled:opacity-50"
              >
                Ստուգել
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-vibrant-gray"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">Կամ</span>
              <div className="flex-grow border-t border-vibrant-gray"></div>
            </div>

            <button
              onClick={() => {
                setShowAnswer(true);
              }}
              className="w-full py-3 px-4 bg-vibrant-gray hover:bg-vibrant-gray/80 border-2 border-vibrant-gray text-vibrant-charcoal text-xs font-black uppercase tracking-wider rounded-2xl transition-all"
            >
              Ինքնուրույն ստուգել (Բացել պատասխանը)
            </button>
          </div>
        ) : (
          /* RESULT DISPLAY */
          <div className="space-y-5 max-w-md mx-auto pt-2 animate-fade-in">
            {feedback ? (
              <div className={`p-4 rounded-3xl flex items-center gap-3 border-4 ${
                feedback.isCorrect 
                  ? 'bg-emerald-50/50 border-[#4ADE80] text-emerald-900' 
                  : 'bg-red-50/50 border-red-300 text-red-900'
              }`}>
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle className="text-[#4ADE80] shrink-0" size={24} />
                    <div className="text-left">
                      <div className="font-black text-sm uppercase tracking-wide">Կեցցե՛ս, ճիշտ է։</div>
                      {userAnswer && <div className="text-xs font-semibold opacity-90 mt-0.5">Դուք գրել էիք՝ &quot;{userAnswer}&quot;</div>}
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500 shrink-0" size={24} />
                    <div className="text-left">
                      <div className="font-black text-sm uppercase tracking-wide">Սխալ է թույլ տրվել։</div>
                      {userAnswer && <div className="text-xs font-semibold opacity-90 mt-0.5">Դուք գրել էիք՝ &quot;{userAnswer}&quot;</div>}
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* User clicked reveal directly without typing */
              <div className="p-5 bg-[#FFFBF5] border-4 border-vibrant-gray text-[#1A1A1A] rounded-3xl text-left text-xs font-bold space-y-2.5">
                <p className="uppercase tracking-wider text-gray-400 font-black text-[10px]">Մտքում պատասխանեցի՞ք:</p>
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => handleManualMark(true)}
                    className="flex-1 py-2 bg-vibrant-orange hover:bg-vibrant-orange/95 text-white rounded-xl font-black uppercase tracking-wider text-center text-[10px]"
                  >
                    Այո, ճիշտ էի
                  </button>
                  <button 
                    onClick={() => handleManualMark(false)}
                    className="flex-1 py-2 bg-vibrant-gray hover:bg-vibrant-gray/80 text-vibrant-charcoal rounded-xl font-black uppercase tracking-wider text-center text-[10px]"
                  >
                    Ոչ, սխալվեցի
                  </button>
                </div>
              </div>
            )}

            {/* Answer detail card - Designed like the beautiful dark reader block */}
            <div className="bg-vibrant-charcoal text-white rounded-[32px] p-6 text-center space-y-4 relative overflow-hidden shadow-lg border-2 border-vibrant-gray/10">
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <Award size={100} />
              </div>
              
              <div className="text-[10px] text-gray-400 tracking-widest font-black uppercase font-mono">Ճիշտ խոնարհումը՝</div>
              <div className="text-2xl sm:text-3xl font-black text-vibrant-orange leading-tight">
                <span className="text-gray-400 text-lg font-bold mr-1">{currentPronoun}</span> {solution.conjugated}
              </div>

              <div className="flex justify-center pt-1">
                <button
                  onClick={playPronunciation}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 font-bold text-white px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Volume2 size={14} />
                  Լսել արտասանությունը
                </button>
              </div>

              {solution.isIrregular && (
                <div className="text-[10px] font-black uppercase tracking-wider bg-vibrant-orange/20 text-vibrant-orange px-3 py-1 rounded-md border border-vibrant-orange/20 font-mono mt-1 inline-block">
                  ⚠️ Անկանոն խոնարհում (Irregular)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action controllers */}
        <div className="pt-5 border-t-4 border-vibrant-gray flex justify-between items-center gap-3">
          <button 
            onClick={handleNextWord}
            className="flex-1 py-4 px-6 bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white font-black uppercase text-xs tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs border-2 border-transparent"
          >
            Հաջորդ բայը
            <RefreshCw size={15} className="stroke-[2.5px]" />
          </button>
        </div>

      </div>

      {/* QUICK LEARNING REFERENCE INFO */}
      <div className="bg-white p-6 rounded-[32px] border-4 border-vibrant-gray space-y-4 shadow-xs">
        <h4 className="font-black text-vibrant-charcoal text-sm uppercase tracking-wider flex items-center gap-1.5">
          <HelpIcon size={16} className="text-vibrant-orange" />
          Կանոնավոր խոնարհման տեղեկատու
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-vibrant-charcoal pt-1">
          <div className="bg-[#FFFBF5] p-4 rounded-2xl border-2 border-vibrant-orange/20 hover:border-vibrant-orange transition-all">
            <span className="font-black text-vibrant-orange block mb-2 uppercase tracking-wide text-xs">-AR բայեր (Comprar)</span>
            <ul className="space-y-1 font-mono text-[11px] text-gray-500 font-bold">
              <li>• Ներկա՝ -o, -as, -a, -amos, -áis, -an</li>
              <li>• Անցյալ՝ -é, -aste, -ó, -amos...</li>
              <li>• Ապառնի՝ Infinitive + é, ás, á...</li>
            </ul>
          </div>
          <div className="bg-[#FFFBF5] p-4 rounded-2xl border-2 border-vibrant-blue/20 hover:border-vibrant-blue transition-all">
            <span className="font-black text-vibrant-blue block mb-2 uppercase tracking-wide text-xs">-ER բայեր (Comer)</span>
            <ul className="space-y-1 font-mono text-[11px] text-gray-500 font-bold">
              <li>• Ներկա՝ -o, -es, -e, -emos, -éis, -en</li>
              <li>• Անցյալ՝ -í, -iste, -ió, -imos...</li>
              <li>• Ապառնի՝ Infinitive + é, ás, á...</li>
            </ul>
          </div>
          <div className="bg-[#FFFBF5] p-4 rounded-2xl border-2 border-indigo-200 hover:border-indigo-400 transition-all">
            <span className="font-black text-indigo-600 block mb-2 uppercase tracking-wide text-xs">-IR բայեր (Vivir)</span>
            <ul className="space-y-1 font-mono text-[11px] text-gray-500 font-bold">
              <li>• Ներկա՝ -o, -es, -e, -imos, -ís, -en</li>
              <li>• Անցյալ՝ -í, -iste, -ió, -imos...</li>
              <li>• Ապառնի՝ Infinitive + é, ás, á...</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
