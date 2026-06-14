import React, { useState } from 'react';
import { 
  Sparkles, BookOpen, Layers, Trophy, 
  HelpCircle, MessageSquare, ArrowRight, Languages 
} from 'lucide-react';
import Flashcards from './Flashcards';
import ConjugationGame from './ConjugationGame';
import TranslationGame from './TranslationGame';
import InteractiveReader from './InteractiveReader';
import { VERBS_DATA } from './verbs';

type ActiveTab = 'flashcards' | 'conjugation' | 'translation' | 'reader';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('flashcards');

  return (
    <div className="min-h-screen bg-vibrant-cream text-vibrant-charcoal font-sans antialiased pb-12">
      {/* GLOBAL HERO HEADER - VIBRANT PALETTE */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-vibrant-gray flex items-center justify-between px-4 sm:px-8 h-20 shadow-xs">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-vibrant-orange rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
              ES
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] flex items-center gap-1.5 leading-none font-sans">
                ԻՍՊԱՆԵՐԵՆԻ <span className="text-vibrant-orange">ԲԱՅԵՐ</span>
                <span className="text-[10px] text-vibrant-orange bg-vibrant-orange/10 px-1.5 py-0.5 rounded-md font-extrabold uppercase font-mono">
                  v1.2
                </span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1 font-sans">Spanish-Armenian Action Verbs Learning hub</p>
            </div>
          </div>

          {/* Quick stats badge styled like Streak/Points in the Vibrant theme */}
          <div className="hidden sm:flex items-center gap-2 bg-[#F3F4F6] px-4 py-2 rounded-full border-2 border-[#E5E7EB] text-sm font-bold text-gray-500 font-mono">
            <span>🔥 ԲԱՌԱՊԱՇԱՐ՝</span>
            <span className="text-lg font-black text-vibrant-orange">{VERBS_DATA.length} բայ</span>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* NAV BAR MENU CONTROLLERS - Styled with border-4 and rounded-[32px] matching the theme's sidebar aesthetic */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto p-2 bg-white border-4 border-vibrant-gray rounded-[32px] shadow-xs">
          {[
            { id: 'flashcards', label: 'Բառաքարտեր', icon: <Layers size={18} />, desc: '215+ բայերի ուսումնասիրում' },
            { id: 'conjugation', label: 'Խոնարհման խաղ', icon: <Sparkles size={18} />, desc: 'Դերանուն + Ժամանակ' },
            { id: 'translation', label: 'Թարգմանություն', icon: <Trophy size={18} />, desc: 'Թեստ Իսպ / Հայ' },
            { id: 'reader', label: 'Ինտերակտիվ տեքստեր', icon: <BookOpen size={18} />, desc: 'Ընթերցանության մարզում' }
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`p-3 rounded-2xl transition-all flex flex-col items-center text-center gap-1.5 ${
                  isSelected
                    ? 'bg-vibrant-orange text-white shadow-md scale-102 font-black border border-vibrant-orange'
                    : 'bg-transparent text-gray-400 hover:text-vibrant-charcoal hover:bg-vibrant-gray/50 border border-transparent'
                }`}
              >
                <div className={`${isSelected ? 'text-white' : 'text-gray-400'} shrink-0`}>
                  {tab.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-tight">{tab.label}</span>
                  <span className="text-[9px] opacity-80 font-bold tracking-wide hidden sm:inline">{tab.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SECTION CONDITIONAL VIEW WRAPPER */}
        <section className="p-0 min-h-[400px]">
          {activeTab === 'flashcards' && (
            <div className="animate-fade-in">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
                <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Բառաքարտերի Մոդուլ</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Սեղմեք քարտին՝ իսպաներեն բայի հայերեն թարգմանությունը տեսնելու համար։
                </p>
              </div>
              <Flashcards />
            </div>
          )}

          {activeTab === 'conjugation' && (
            <div className="animate-fade-in">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
                <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Բայի և Դերանվան Խաղ</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Մարզեք իսպաներենի խոնարհումը անցյալ, ներկա և ապառնի ժամանակներով։
                </p>
              </div>
              <ConjugationGame />
            </div>
          )}

          {activeTab === 'translation' && (
            <div className="animate-fade-in">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
                <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Բառապաշարի Թարգմանություն</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Փորձեք գուշակել ճիշտ թարգմանության տարբերակը իսպաներենից հայերեն կամ հակառակը։
                </p>
              </div>
              <TranslationGame />
            </div>
          )}

          {activeTab === 'reader' && (
            <div className="animate-fade-in">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
                <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Ինտերակտիվ Ընթերցանություն</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Կարդացեք իսպաներեն պատմություններ և կտտացրեք ցանկացած ընդգծված բայի՝ բացատրությունը տեսնելու համար։
                </p>
              </div>
              <InteractiveReader />
            </div>
          )}
        </section>

      </main>

      {/* FOOTER ACCOLADE - STYLED WITH WHITE BACKGROUND & THICK GREY BORDER */}
      <footer className="bg-white text-slate-600 text-xs py-8 border-t-4 border-vibrant-gray rounded-t-[40px] mt-12 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="font-extrabold text-[#1A1A1A] text-sm uppercase tracking-wide">
            Իսպաներենի Գործողության Բայեր (իսպաներեն-հայերեն) ուսումնական հարթակ
          </p>
          <div className="flex justify-center flex-wrap gap-4 text-[11px] font-bold font-mono">
            <span className="text-vibrant-orange bg-vibrant-orange/10 px-3 py-1 rounded-full font-bold">✓ 215+ Active Verbs</span>
            <span className="text-vibrant-blue bg-vibrant-blue/10 px-3 py-1 rounded-full font-bold">✓ 3 Conjugation Tenses</span>
            <span className="text-vibrant-orange bg-vibrant-orange/10 px-3 py-1 rounded-full font-bold">✓ Clickable Context Reader</span>
            <span className="text-vibrant-blue bg-vibrant-blue/10 px-3 py-1 rounded-full font-bold">✓ Speech Synthesis Enabled</span>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-2">
            &copy; 2026 Armenian Spanish Verb Trainer. Designed with Vibrant Palette Theme.
          </p>
        </div>
      </footer>
    </div>
  );
}
