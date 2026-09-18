import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  PhoneCall, 
  Calendar, 
  Laptop, 
  Tablet, 
  Smartphone, 
  Watch, 
  Glasses, 
  Headphones, 
  Tv, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Clock,
  X
} from 'lucide-react';
import { SUPPORT_ARTICLES } from '../data/supportAndOrders';
import { CategoryKey, SupportArticle } from '../types';
import confetti from 'canvas-confetti';

const CATEGORY_TABS: { key: CategoryKey; label: string; icon: React.ElementType }[] = [
  { key: 'laptop', label: 'Laptop', icon: Laptop },
  { key: 'tablet', label: 'Tablet', icon: Tablet },
  { key: 'phone', label: 'Phone', icon: Smartphone },
  { key: 'wearable', label: 'Wearable', icon: Watch },
  { key: 'headset', label: 'Headset', icon: Glasses },
  { key: 'earbuds', label: 'Earbuds', icon: Headphones },
  { key: 'screens-home', label: 'Screens & Home', icon: Tv }
];

export const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('laptop');
  const [activeArticle, setActiveArticle] = useState<SupportArticle | null>(null);

  // Store Session booking modal
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionConfirmed, setSessionConfirmed] = useState(false);

  // Filtered articles based on search query or selected category
  const filteredArticles = searchQuery.trim()
    ? SUPPORT_ARTICLES.filter(
        a =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SUPPORT_ARTICLES.filter(a => a.category === selectedCategory);

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setSessionConfirmed(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#901435', '#C4284D', '#F9CBD6']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#0C0D0E] text-neutral-900 dark:text-neutral-100 transition-colors pb-20">
      
      {/* 1. HERO & CATEGORY-FIRST SEARCH BAR */}
      <section className="pt-14 pb-10 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>Mango Customer Care & Documentation</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          Mango Support. <br />
          <span className="text-neutral-400 dark:text-neutral-500 font-normal">How can we assist you today?</span>
        </h1>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics: battery, file transfer, eSIM, gestures, audio..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#16171A] border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white shadow-card focus:outline-none focus:ring-2 focus:ring-mango-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category First Filter Pills */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.key && !searchQuery.trim();

            return (
              <button
                key={tab.key}
                onClick={() => {
                  setSelectedCategory(tab.key);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm scale-105'
                    : 'bg-white dark:bg-[#16171A] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. "CONTACT US" OPTIONS (Chat / Call / Book a Store Session) */}
      <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Connect With Mango Support
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Choose how you'd like to get in touch with our team of specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Chat */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-mango-100 dark:bg-mango-950 text-mango-600 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Available 24/7</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                Chat with Pip & Specialists
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                Connect in seconds for hardware diagnostics, warranty questions, or order assistance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => {
                  const el = document.querySelector('button[aria-label="Chat with Pip AI Assistant"]') as HTMLButtonElement;
                  if (el) el.click();
                }}
                className="w-full py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs shadow-sm transition-all"
              >
                Start Live Chat
              </button>
            </div>
          </div>

          {/* 2. Call */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Toll-Free Hotline</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                Call 1-800-MY-MANGO
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                Speak directly with senior Mango technical specialists for guided phone troubleshooting.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href="tel:18006962646"
                className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Call Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3. Book a Store Session */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">In-Store Bar</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                Book a Store Genius Session
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                Schedule an in-person hardware diagnosis, battery swap, or screen repair at your local Mango Store.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => setShowSessionModal(true)}
                className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Reserve Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR ARTICLES GROUPED BY CATEGORY */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
              {searchQuery ? `Search Results (${filteredArticles.length})` : `Popular ${selectedCategory.toUpperCase()} Articles`}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Curated official guides, setup instructions, and hardware maintenance.
            </p>
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-mango-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300 group-hover:text-mango-500">
                  <span>Read full guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#16171A] rounded-mango border border-neutral-200 dark:border-neutral-800">
            <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h4 className="font-bold text-base text-neutral-800 dark:text-neutral-200">
              No matching support articles found
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Try searching with different keywords or ask Pip AI in the bottom right corner.
            </p>
          </div>
        )}
      </section>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#16171A] rounded-mango-lg max-w-2xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                Official Mango Guide &bull; {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                {activeArticle.title}
              </h3>
              <span className="text-xs text-neutral-400 mt-1 block">
                Estimated reading time: {activeArticle.readTime}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p className="font-semibold text-neutral-900 dark:text-white mb-2">Summary</p>
              <p>{activeArticle.summary}</p>
            </div>

            <div className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed space-y-3">
              <p className="font-semibold text-xs text-neutral-400 uppercase tracking-wider">
                Full Instructions
              </p>
              <p>{activeArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Was this article helpful?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-950 text-neutral-700 dark:text-neutral-300"
                >
                  Yes, resolved
                </button>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    const el = document.querySelector('button[aria-label="Chat with Pip AI Assistant"]') as HTMLButtonElement;
                    if (el) el.click();
                  }}
                  className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 font-semibold hover:bg-mango-100 dark:hover:bg-mango-950 text-neutral-700 dark:text-neutral-300"
                >
                  Ask Pip for more help
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-Store Genius Session Booking Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#16171A] rounded-mango-lg max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Book Store Genius Appointment</span>
              </h4>
              <button
                onClick={() => { setShowSessionModal(false); setSessionConfirmed(false); }}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sessionConfirmed ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h5 className="font-bold text-base text-neutral-900 dark:text-white">Genius Bar Reserved!</h5>
                <p className="text-xs text-neutral-500">
                  Confirmation code <span className="font-mono font-bold text-mango-600">GN-84910</span> sent to your email. Check in at the entrance when you arrive.
                </p>
                <button
                  onClick={() => { setShowSessionModal(false); setSessionConfirmed(false); }}
                  className="mt-4 px-6 py-2 rounded-full bg-mango-500 text-white dark:text-black font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="py-4 space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-500 mb-1">Select Store</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <option>Mango Store Union Square (San Francisco)</option>
                    <option>Mango Store Fifth Avenue (New York)</option>
                    <option>Mango Store The Grove (Los Angeles)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Device Issue</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <option>Hardware Diagnostic / Physical Check</option>
                    <option>Screen Replacement / Accidental Damage</option>
                    <option>Battery Health Diagnostics</option>
                    <option>Software & OS Setup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Preferred Time</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <option>Today at 3:15 PM</option>
                    <option>Today at 5:00 PM</option>
                    <option>Tomorrow at 11:30 AM</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm mt-4"
                >
                  Confirm Free Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
