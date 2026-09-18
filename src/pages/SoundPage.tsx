import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, Music, Check, Headphones, Shield, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SoundPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);

  const handleSubscribe = (plan: string) => {
    setSubscribedPlan(plan);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#901435', '#C4284D', '#F9CBD6']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#0C0D0E] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mango-500/10 text-mango-600 dark:text-mango-400 font-bold text-xs mb-4">
          <Music className="w-4 h-4" />
          <span>Mango Sound Subscription</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
          Over 100 million songs. <br />
          <span className="bg-gradient-to-r from-mango-600 to-rose-700 bg-clip-text text-transparent">
            All in Spatial Lossless Audio.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Hear sound all around you with dynamic head tracking. Zero ads, unlimited offline downloads, and master-quality 24-bit/192kHz resolution.
        </p>

        {/* Interactive Audio Player Preview */}
        <div className="mt-12 p-6 sm:p-8 rounded-mango-lg bg-neutral-900 text-white max-w-2xl mx-auto shadow-2xl border border-neutral-800 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-mango-700 to-rose-600 flex items-center justify-center shrink-0 shadow-lg relative">
              <Music className="w-10 h-10 text-white animate-pulse" />
            </div>

            <div className="flex-1 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-mango-400">
                Now Playing &bull; Mango Spatial Lossless
              </span>
              <h4 className="text-lg font-bold text-white leading-tight">
                Solar Echoes (Acoustic Mix)
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Mango Session Artists &bull; 24-bit / 192 kHz ALAC
              </p>
            </div>
          </div>

          {/* Equalizer Visualizer Bars */}
          <div className="mt-6 flex items-center justify-center gap-1.5 h-10">
            {[40, 75, 55, 90, 30, 85, 60, 95, 45, 80, 50, 70, 88, 35, 65].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-mango-500 transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(15, (h + (i * 7)) % 100)}%` : '20%',
                  opacity: isPlaying ? 1 : 0.4
                }}
              />
            ))}
          </div>

          {/* Playback Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button className="text-neutral-400 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-mango-500 hover:bg-mango-600 text-black flex items-center justify-center shadow-mango-glow transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Tiers */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Choose Your Mango Sound Plan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Get 3 months free with the purchase of any Mango hardware. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student Tier */}
          <div className="p-8 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-card hover:border-mango-500 transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                Student
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-neutral-900 dark:text-white">$4.99</span>
                <span className="text-xs text-neutral-500">/ month</span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Special verification discount for university and college students.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>100M+ songs ad-free</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Lossless & Spatial Audio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Pip Voice search controls</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe('Student')}
              className="mt-8 w-full py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 font-semibold text-xs transition-colors"
            >
              {subscribedPlan === 'Student' ? 'Trial Activated ✓' : 'Start 3 Months Free'}
            </button>
          </div>

          {/* Individual Tier (Featured) */}
          <div className="p-8 rounded-mango-lg bg-gradient-to-b from-mango-50/50 to-white dark:from-mango-950/20 dark:to-[#16171A] border-2 border-mango-500 flex flex-col justify-between shadow-xl relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-mango-500 text-white dark:text-black text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Most Popular
            </span>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                Individual
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-neutral-900 dark:text-white">$10.99</span>
                <span className="text-xs text-neutral-500">/ month</span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Pure audio bliss across all your personal Mango devices.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>All 100M+ songs in High-Res Lossless</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Dynamic Head Tracking Spatial Audio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Unlimited downloads for offline play</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Mango Sing real-time lyrics</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe('Individual')}
              className="mt-8 w-full py-3 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs shadow-mango-sm transition-all"
            >
              {subscribedPlan === 'Individual' ? 'Trial Activated ✓' : 'Start 3 Months Free'}
            </button>
          </div>

          {/* Family Tier */}
          <div className="p-8 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-card hover:border-mango-500 transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                Family
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-neutral-900 dark:text-white">$16.99</span>
                <span className="text-xs text-neutral-500">/ month</span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Up to 6 family members with individual personal libraries.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Separate accounts for up to 6 people</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Personalized recommendations for each</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-mango-500 shrink-0" />
                  <span>Parental content filters</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe('Family')}
              className="mt-8 w-full py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 font-semibold text-xs transition-colors"
            >
              {subscribedPlan === 'Family' ? 'Trial Activated ✓' : 'Start 3 Months Free'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
