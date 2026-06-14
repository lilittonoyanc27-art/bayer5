import React, { useState } from 'react';
import { STORIES_DATA, Story, StoryParagraph, TextSegment } from './stories';
import { BookOpen, HelpCircle, Volume2, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { VERBS_DATA } from './verbs';

export default function InteractiveReader() {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(STORIES_DATA[0].id);
  const [activeSegment, setActiveSegment] = useState<TextSegment | null>(null);
  const [showArmenianTranslations, setShowArmenianTranslations] = useState<Record<number, boolean>>({});

  const activeStory = STORIES_DATA.find(s => s.id === selectedStoryId) || STORIES_DATA[0];

  const toggleArmenian = (index: number) => {
    setShowArmenianTranslations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentLinkedVerb = activeSegment?.verbId 
    ? VERBS_DATA.find(v => v.id === activeSegment.verbId) 
    : null;

  return (
    <div className="space-y-6">
      
      {/* STORY SELECTOR HEADER */}
      <div className="bg-white p-5 rounded-[28px] border-4 border-vibrant-gray flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 block mb-1">Ընտրեք պատմությունը՝</label>
          <div className="font-black text-vibrant-charcoal flex items-center gap-2">
            <BookOpen className="text-vibrant-orange" size={20} />
            {activeStory.titleEs} / {activeStory.titleHy}
          </div>
        </div>

        {/* Story select dropdown */}
        <select
          value={selectedStoryId}
          onChange={(e) => {
            setSelectedStoryId(e.target.value);
            setActiveSegment(null);
            setShowArmenianTranslations({});
          }}
          className="w-full lg:w-72 py-3 px-4 border-4 border-vibrant-gray rounded-xl bg-vibrant-cream font-black text-vibrant-charcoal text-sm focus:outline-hidden focus:border-vibrant-orange focus:ring-4 focus:ring-vibrant-orange/15 transition-all text-ellipsis overflow-hidden"
        >
          {STORIES_DATA.map(story => (
            <option key={story.id} value={story.id}>
              {story.titleEs} ({story.titleHy})
            </option>
          ))}
        </select>
      </div>

      {/* STORY BRIEF CARD - Styled like dynamic charcoal block */}
      <div className="bg-vibrant-charcoal text-white rounded-[40px] p-8 shadow-sm space-y-3 relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <BookOpen size={160} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6321]">Բացատրություն և նպատակ</p>
        <h3 className="text-xl sm:text-2xl font-black text-white">{activeStory.titleEs} ({activeStory.titleHy})</h3>
        <p className="text-xs text-slate-300 font-semibold leading-relaxed max-w-3xl">
          {activeStory.descriptionEs} <br />
          <span className="text-[#FF6321] font-bold block mt-1">{activeStory.descriptionHy}</span>
        </p>
      </div>

      {/* MAIN TEXT READER ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* PARAGRAPH BLOCKS COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {activeStory.paragraphs.map((para, paragraphIdx) => {
            const isArmenianShown = showArmenianTranslations[paragraphIdx];
            return (
              <div 
                key={paragraphIdx} 
                className="bg-white rounded-[32px] border-4 border-vibrant-gray p-6 shadow-sm space-y-4 hover:border-vibrant-orange transition-all duration-200"
              >
                {/* Paragraph controller strip */}
                <div className="flex justify-between items-center text-xs text-gray-400 font-black tracking-wider border-b-2 border-[#F3F4F6] pb-3">
                  <span>ՊԱՐԱԳՐԱՖ #{paragraphIdx + 1}</span>
                  <button
                    onClick={() => toggleArmenian(paragraphIdx)}
                    className="text-vibrant-orange font-black uppercase tracking-wider text-[10px] flex items-center gap-1.5 p-1 px-3 border border-transparent hover:border-vibrant-orange/10 hover:bg-vibrant-orange/5 rounded-xl transition-all"
                  >
                    {isArmenianShown ? (
                      <>
                        <EyeOff size={14} className="stroke-[2.5px]" />
                        Թաքցնել
                      </>
                    ) : (
                      <>
                        <Eye size={14} className="stroke-[2.5px]" />
                        Ցուցադրել հայերենը
                      </>
                    )}
                  </button>
                </div>

                {/* Spanish clickable text paragraph */}
                <div className="text-vibrant-charcoal text-lg leading-relaxed font-normal tracking-wide py-1 text-justify">
                  {para.segments.map((seg, segIdx) => {
                    const isActive = activeSegment?.text === seg.text;
                    if (seg.isVerb) {
                      return (
                        <span
                          key={segIdx}
                          onClick={() => setActiveSegment(seg)}
                          className={`cursor-pointer inline-block px-1.5 py-0.5 mx-0.5 rounded-lg border-2 transition-all ${
                            isActive 
                              ? 'bg-vibrant-cream border-vibrant-orange text-[#1A1A1A] scale-[1.02] font-black shadow-xs' 
                              : 'border-transparent border-b-4 border-b-vibrant-orange bg-vibrant-orange/10 text-vibrant-charcoal font-bold hover:bg-vibrant-orange hover:text-white'
                          }`}
                        >
                          {seg.text}
                        </span>
                      );
                    }
                    return <span key={segIdx}>{seg.text}</span>;
                  })}
                </div>

                {/* Armenian translation toggle drawer */}
                {isArmenianShown && (
                  <div className="bg-[#FFFBF5] p-5 rounded-2xl border-4 border-vibrant-gray text-vibrant-charcoal font-medium text-sm leading-relaxed text-justify animate-fade-in">
                    {para.translationArmenian}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SIDE BAR INTERACTIVE TRANSLATOR WINDOW */}
        <div className="bg-white rounded-[32px] border-4 border-vibrant-gray p-6 shadow-sm lg:sticky lg:top-4 space-y-6">
          <div className="border-b-4 border-vibrant-gray pb-4">
            <h4 className="font-black text-vibrant-charcoal text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="text-vibrant-orange animate-pulse" size={16} />
              Ինտերակտիվ բացատրիչ
            </h4>
          </div>

          {activeSegment ? (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Ընտրված բայաձև՝</span>
                <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                  {activeSegment.text.replace(/[^a-zA-Záéíóúüñ\s]/gi, '')}
                </div>
              </div>

              {/* Related infinitive info parsed */}
              {currentLinkedVerb && (
                <div className="bg-vibrant-cream border-4 border-vibrant-gray rounded-2xl p-4.5 space-y-3">
                  <span className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider block">Սկզբնաձև (Infinitive)՝</span>
                  <div className="text-lg font-black text-vibrant-charcoal flex items-center justify-between">
                    <span>{currentLinkedVerb.spanish}</span>
                    <button 
                      onClick={() => handleSpeak(currentLinkedVerb.spanish)}
                      className="p-1 px-3 bg-white border border-vibrant-gray font-black text-vibrant-charcoal rounded-xl text-[10px] flex items-center gap-1 hover:bg-vibrant-gray transition-colors uppercase tracking-wider"
                    >
                      <Volume2 size={13} />
                      Լսել
                    </button>
                  </div>
                  <div className="text-xs font-bold text-gray-500 border-t-2 border-vibrant-gray/50 pt-2.5">
                    Թարգմանություն՝ <span className="text-vibrant-blue font-black underline decoration-2">{currentLinkedVerb.armenian}</span>
                  </div>
                </div>
              )}

              {/* Grammar Details Explanation */}
              {activeSegment.explanation && (
                <div className="space-y-2 bg-[#FFFBF5] border-4 border-vibrant-gray text-vibrant-charcoal p-4 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-vibrant-orange tracking-widest flex items-center gap-1">
                    <HelpCircle size={12} className="stroke-[2.5px]" />
                    Քերականական նշում՝
                  </span>
                  <p className="text-xs font-semibold leading-relaxed text-[#1A1A1A] text-justify">
                    {activeSegment.explanation}
                  </p>
                </div>
              )}

              <button 
                onClick={() => handleSpeak(activeSegment.text)}
                className="w-full py-4 bg-vibrant-orange hover:bg-vibrant-orange border-2 border-vibrant-orange text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.01]"
              >
                <Volume2 size={15} />
                Կարդալ արտասանությունը
              </button>

              <div className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider text-center max-w-xs mx-auto mt-2 leading-normal">
                Կտտացրեք տեքստում ցանկացած ընդգծված բայի՝ թարգմանությունը և բացատրությունները տեսնելու համար:
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 space-y-3.5">
              <BookOpen size={44} className="mx-auto text-vibrant-orange stroke-[1.5px]" />
              <p className="text-[11px] font-bold uppercase tracking-wider max-w-xs mx-auto leading-relaxed">
                Կտտացրեք տեքստում ընդգծված բայերին՝ նրանց թարգմանությունը, սկզբնաձևերը և քերականական բացատրությունները տեսնելու համար։
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
