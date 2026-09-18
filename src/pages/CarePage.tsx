import React, { useState } from 'react';
import { ShieldCheck, Check, X, Search, Wrench, BatteryCharging, Headphones, Zap, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CarePage: React.FC = () => {
  const [serialInput, setSerialInput] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    device: string;
    status: string;
    warrantyExp: string;
    batteryHealth: string;
    eligible: boolean;
  } | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialInput.trim()) return;

    setLookupResult({
      device: 'Laptop Pro 16" (Mango Core G4 Ultra)',
      status: 'Active Coverage Available',
      warrantyExp: 'October 24, 2027',
      batteryHealth: '98% (Normal Health)',
      eligible: true
    });

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
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#0C0D0E] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>Mango Care+ Protection Plan</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
          Accidents happen. <br />
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            We have you completely covered.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Unlimited incidents of accidental damage protection, express replacement service, same-day battery servicing, and 24/7 direct access to Mango specialists.
        </p>

        {/* Interactive Serial Lookup Tool */}
        <div className="mt-12 p-6 sm:p-8 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card max-w-2xl mx-auto text-left">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-1">
            Check Your Mango Device Eligibility
          </h3>
          <p className="text-xs text-neutral-500 mb-4">
            Enter your device serial number (e.g. MNG882194X) or test with any sample characters.
          </p>

          <form onSubmit={handleLookup} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                placeholder="Enter Serial Number..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
            >
              Verify Status
            </button>
          </form>

          {lookupResult && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                <span>{lookupResult.device}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-900/60 text-[10px]">
                  {lookupResult.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-400 pt-1">
                <div>
                  <span className="text-neutral-400 block text-[10px]">Standard Warranty</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{lookupResult.warrantyExp}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Battery Diagnostics</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{lookupResult.batteryHealth}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4 Pillars of Protection */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Unlimited Incident Repairs
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Drops, liquid spills, cracked glass, or dented titanium — all handled with low deductible fees and genuine Mango parts.
            </p>
          </div>

          <div className="p-6 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-mango-100 dark:bg-mango-950 text-mango-600 flex items-center justify-center mb-4">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Battery Guarantee
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              If your battery drops below 80% of its original design capacity, we replace it completely free of charge.
            </p>
          </div>

          <div className="p-6 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Express Replacement
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              We ship out a replacement device right away so you don't have to wait while your device is in service.
            </p>
          </div>

          <div className="p-6 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              24/7 Priority Support
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Direct access to our senior tech engineers and Pip AI diagnostics by chat, phone, or in Mango retail stores.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white text-center mb-8">
          Standard Warranty vs. Mango Care+
        </h2>

        <div className="rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-card text-xs">
          <div className="grid grid-cols-3 p-4 bg-neutral-100/70 dark:bg-neutral-800/60 font-bold text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800">
            <span>Coverage Feature</span>
            <span className="text-center">Standard 1-Year</span>
            <span className="text-center text-emerald-600 dark:text-emerald-400 font-extrabold">Mango Care+</span>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {[
              { feat: 'Hardware Defects', std: true, care: true },
              { feat: 'Unlimited Accidental Damage', std: false, care: true },
              { feat: 'Same-Day Battery Replacement', std: false, care: true },
              { feat: 'Express Advance Replacement', std: false, care: true },
              { feat: '24/7 Priority Specialist Access', std: false, care: true },
              { feat: 'Theft & Loss Protection (Optional)', std: false, care: true }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 items-center">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">{row.feat}</span>
                <span className="flex justify-center">
                  {row.std ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-neutral-400" />}
                </span>
                <span className="flex justify-center">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
