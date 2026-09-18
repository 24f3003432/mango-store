import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryInfo, Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { RetailExperienceGrid } from '../common/RetailExperienceGrid';
import { ALL_PRODUCTS } from '../../data/products';
import { 
  Check, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  RefreshCw, 
  Cpu, 
  Battery, 
  Play, 
  Pause, 
  Sliders, 
  Smartphone,
  Laptop,
  CheckCircle2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CategoryTemplateProps {
  categoryInfo: CategoryInfo;
  products: Product[];
}

export const CategoryTemplate: React.FC<CategoryTemplateProps> = ({ categoryInfo, products }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // 1. Filter bar state
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // 2. Color swatch selection state per product: productId -> colorIndex
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, number>>({});

  // 3. "Get to know" video playback modal state
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // 4. "Help Me Choose" multi-step interactive state
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizWorkload, setQuizWorkload] = useState<'daily' | 'creative' | 'travel'>('creative');
  const [quizPriority, setQuizPriority] = useState<'screen' | 'battery' | 'power'>('power');
  const [quizBudget, setQuizBudget] = useState<'entry' | 'pro' | 'unlimited'>('pro');
  const [quizRecommendation, setQuizRecommendation] = useState<Product | null>(null);

  // 5. "Switch to Mango" trade-in state
  const [tradeDeviceType, setTradeDeviceType] = useState<string>('phone');
  const [tradeCondition, setTradeCondition] = useState<'good' | 'flawless'>('flawless');

  // Accessories upsell for section 8: "{Category} Essentials"
  const categoryEssentials = ALL_PRODUCTS.filter(p => p.category === 'accessories').slice(0, 4);
  const [essentialColorMap, setEssentialColorMap] = useState<Record<string, number>>({});

  // Filter products based on selected pill
  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    return product.filterTag === activeFilter;
  });

  const handleColorChange = (productId: string, idx: number) => {
    setSelectedColorMap(prev => ({ ...prev, [productId]: idx }));
  };

  // Buy action -> configure & add directly to bag and open bag drawer
  const handleBuy = (product: Product) => {
    const colorIdx = selectedColorMap[product.id] || 0;
    const selectedColor = product.colors[colorIdx] || product.colors[0];
    const selectedStorage = product.storageOptions?.[0];

    addToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      selectedColor,
      selectedStorage,
      hasCarePlus: false,
      carePlusPrice: 199,
      tradeInCredit: 0,
      unitPrice: product.basePrice,
      quantity: 1
    });

    setIsCartOpen(true);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#901435', '#C4284D', '#F9CBD6']
      });
    } catch {
      // ignore
    }
  };

  // Help Me Choose calculation
  const calculateRecommendation = () => {
    let best = products[0];
    if (quizPriority === 'power' || quizWorkload === 'creative') {
      best = products.find(p => p.name.includes('Pro') || p.name.includes('Studio') || p.name.includes('Ultra')) || products[0];
    } else if (quizWorkload === 'travel' || quizPriority === 'battery') {
      best = products.find(p => p.name.includes('Air') || p.name.includes('Mini') || p.name.includes('Lite')) || products[0];
    } else {
      best = products.find(p => p.name.includes('Standard') || p.name.includes('Lite') || p.name.includes('Air')) || products[0];
    }
    setQuizRecommendation(best);
    setQuizStep(4);
  };

  // Trade-in valuation
  const getEstimatedTradeCredit = () => {
    let base = 250;
    if (tradeDeviceType === 'laptop') base = 500;
    else if (tradeDeviceType === 'phone') base = 420;
    else if (tradeDeviceType === 'tablet') base = 320;
    else base = 180;
    return tradeCondition === 'flawless' ? base + 130 : base;
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#0C0D0E] text-neutral-900 dark:text-neutral-100 transition-colors">
      
      {/* SECTION 1: HERO MODEL GALLERY (Horizontal scroll of model images) */}
      <section className="bg-white/80 dark:bg-[#121316]/80 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800 sticky top-12 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center space-x-8 sm:space-x-12 overflow-x-auto no-scrollbar py-3.5">
            {categoryInfo.models.map((model) => (
              <Link
                key={model.name}
                to={model.route}
                className="group shrink-0 flex flex-col items-center text-center transition-all min-w-[76px]"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-1 mb-1.5 border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden group-hover:scale-110 group-hover:border-mango-500 shadow-sm transition-all duration-300">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-mango-600 dark:group-hover:text-mango-400 truncate max-w-[90px]">
                  {model.name}
                </span>
                {model.badge ? (
                  <span className="text-[9px] font-bold text-mango-600 dark:text-mango-400">
                    {model.badge}
                  </span>
                ) : (
                  <span className="text-[9px] text-neutral-400">
                    Explore &rarr;
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Category Banner */}
      <section className="pt-12 pb-6 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mango-100 dark:bg-mango-950/60 text-mango-700 dark:text-mango-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-mango-500" />
          <span>Mango {categoryInfo.displayName}</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto">
          {categoryInfo.headline}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {categoryInfo.subheadline}
        </p>
      </section>

      {/* SECTION 2: EXPLORE LINEUP FILTER BAR (Horizontal pill buttons) */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mr-2 hidden sm:inline">
              Explore Lineup:
            </span>
            {categoryInfo.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  activeFilter === filter.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm scale-105'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-neutral-400 shrink-0 ml-4">
            Showing {filteredProducts.length} model{filteredProducts.length === 1 ? '' : 's'}
          </span>
        </div>
      </section>

      {/* SECTION 3: MODEL GRID (image, color swatch selector, starting price, "Learn more" -> PDP, "Buy" -> Bag) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentColorIdx = selectedColorMap[product.id] || 0;
            const activeColor = product.colors[currentColorIdx] || product.colors[0];

            return (
              <div
                key={product.id}
                className="group rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Area with Live Color preview */}
                <div className="relative p-6 pt-10 flex flex-col items-center bg-gradient-to-b from-neutral-50/60 to-white dark:from-neutral-900/40 dark:to-[#16171A]">
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-mango-500 text-white dark:text-black text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  <Link to={`/store/${product.category}/${product.id}`} className="w-full">
                    <div className="w-full h-56 sm:h-64 flex items-center justify-center overflow-hidden">
                      <img
                        src={activeColor.image}
                        alt={`${product.name} in ${activeColor.name}`}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Interactive Color Swatch Selector */}
                  <div className="mt-4 flex items-center gap-2">
                    {product.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(product.id, idx)}
                        className={`w-5 h-5 rounded-full border-2 transition-all ${
                          currentColorIdx === idx
                            ? 'border-mango-500 scale-125 ring-2 ring-mango-400/30'
                            : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={`Select ${c.name} color`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1">
                    {activeColor.name}
                  </span>
                </div>

                {/* Card Information */}
                <div className="p-6 flex-1 flex flex-col justify-between border-t border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Key Specs */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-300">
                      {product.chip && (
                        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                          <Cpu className="w-3.5 h-3.5 text-mango-500 shrink-0" />
                          <span className="truncate">{product.chip}</span>
                        </div>
                      )}
                      {product.batteryLife && (
                        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                          <Battery className="w-3.5 h-3.5 text-leaf-500 shrink-0" />
                          <span className="truncate">{product.batteryLife}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action Buttons: "Learn more" (PDP) and "Buy" (Bag) */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400 block">From</span>
                      <span className="text-lg font-bold text-neutral-900 dark:text-white">
                        ${product.basePrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Learn More -> PDP */}
                      <Link
                        to={`/store/${product.category}/${product.id}`}
                        className="px-3.5 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
                      >
                        Learn more
                      </Link>

                      {/* Buy -> Bag */}
                      <button
                        onClick={() => handleBuy(product)}
                        className="px-4 py-2 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black text-xs font-extrabold shadow-mango-sm transition-all"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: RETAIL BLOCK (financing / customization / delivery / personalization grid) */}
      <section className="bg-neutral-100/70 dark:bg-[#121316] border-y border-neutral-200 dark:border-neutral-800 my-8">
        <RetailExperienceGrid
          title={`Why the Mango Store is best for ${categoryInfo.displayName}.`}
          subtitle="Flexible 0% financing, custom configs, express courier, and free engraving."
        />
      </section>

      {/* SECTION 5: "GET TO KNOW {CATEGORY}" (3-4 feature highlight blocks with imagery and video elements) */}
      {categoryInfo.featureHighlights.length > 0 && (
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
              Deep Dive
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1">
              Get to know {categoryInfo.displayName}
            </h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Groundbreaking hardware engineering, neural silicon, and relentless endurance built into every layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryInfo.featureHighlights.map((feat, idx) => (
              <div
                key={idx}
                className="rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden shadow-card flex flex-col justify-between group"
              >
                {/* Media Container with Play Video indicator if video exists */}
                <div className="relative h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {feat.badge}
                  </span>

                  {feat.videoUrl && (
                    <button
                      onClick={() => setActiveVideoUrl(feat.videoUrl!)}
                      className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mango-500 text-black text-xs font-bold hover:bg-mango-400 transition-colors shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Reel</span>
                    </button>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-mango-600 dark:text-mango-400 uppercase tracking-wide">
                      {feat.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                    <span>Engineered by Mango</span>
                    <span className="text-mango-600 dark:text-mango-400">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 6: "HELP ME CHOOSE" (short multi-step Q&A widget ending in model recommendation) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="p-8 sm:p-10 rounded-mango-lg bg-gradient-to-br from-mango-500/10 via-rose-500/5 to-transparent border border-mango-300/40 dark:border-mango-500/30 shadow-card">
          <div className="flex items-center gap-2 text-mango-600 dark:text-mango-400 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Device Matcher &bull; Step {quizStep} of 3</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
            Help Me Choose My {categoryInfo.displayName}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Answer three quick questions to calculate the perfect model for your everyday tasks.
          </p>

          {/* Step 1: Workload */}
          {quizStep === 1 && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                1. What will be your primary usage?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'daily', title: 'Everyday & Study', desc: 'Browsing, documents, email, watching video.' },
                  { id: 'creative', title: 'Studio & Creative', desc: 'Video grading, 3D rendering, coding, audio.' },
                  { id: 'travel', title: 'Travel & Mobility', desc: 'Ultra-lightweight work on flights and outdoors.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setQuizWorkload(item.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      quizWorkload === item.id
                        ? 'border-mango-500 bg-white dark:bg-neutral-800 shadow-md ring-2 ring-mango-400/20'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 hover:border-neutral-300'
                    }`}
                  >
                    <span className="font-bold text-xs text-neutral-900 dark:text-white block">{item.title}</span>
                    <span className="text-[11px] text-neutral-500 mt-1 block">{item.desc}</span>
                  </button>
                ))}
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setQuizStep(2)}
                  className="px-6 py-2 rounded-full bg-mango-500 text-white dark:text-black font-bold text-xs shadow-sm hover:bg-mango-600 transition-all flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Priority */}
          {quizStep === 2 && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                2. What feature matters most to you?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'power', title: 'Peak Processing Speed', desc: 'Unconstrained M-Core silicon clock speeds.' },
                  { id: 'screen', title: 'Maximum Screen Real Estate', desc: 'Spacious high-res canvas for multitasking.' },
                  { id: 'battery', title: 'All-Day Battery Life', desc: 'Never worry about carrying a charger.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setQuizPriority(item.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      quizPriority === item.id
                        ? 'border-mango-500 bg-white dark:bg-neutral-800 shadow-md ring-2 ring-mango-400/20'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 hover:border-neutral-300'
                    }`}
                  >
                    <span className="font-bold text-xs text-neutral-900 dark:text-white block">{item.title}</span>
                    <span className="text-[11px] text-neutral-500 mt-1 block">{item.desc}</span>
                  </button>
                ))}
              </div>
              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setQuizStep(1)}
                  className="text-xs text-neutral-500 hover:underline"
                >
                  &larr; Back
                </button>
                <button
                  onClick={() => setQuizStep(3)}
                  className="px-6 py-2 rounded-full bg-mango-500 text-white dark:text-black font-bold text-xs shadow-sm hover:bg-mango-600 transition-all flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Budget Range */}
          {quizStep === 3 && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                3. Target investment range?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'entry', title: 'Under $1,000', desc: 'Maximum value for daily efficiency.' },
                  { id: 'pro', title: '$1,000 – $2,000', desc: 'Balanced pro performance tier.' },
                  { id: 'unlimited', title: '$2,000+', desc: 'Zero compromise flagship workstation.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setQuizBudget(item.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      quizBudget === item.id
                        ? 'border-mango-500 bg-white dark:bg-neutral-800 shadow-md ring-2 ring-mango-400/20'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 hover:border-neutral-300'
                    }`}
                  >
                    <span className="font-bold text-xs text-neutral-900 dark:text-white block">{item.title}</span>
                    <span className="text-[11px] text-neutral-500 mt-1 block">{item.desc}</span>
                  </button>
                ))}
              </div>
              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setQuizStep(2)}
                  className="text-xs text-neutral-500 hover:underline"
                >
                  &larr; Back
                </button>
                <button
                  onClick={calculateRecommendation}
                  className="px-6 py-2 rounded-full bg-mango-500 text-white dark:text-black font-extrabold text-xs shadow-mango-sm hover:bg-mango-600 transition-all flex items-center gap-1.5"
                >
                  <span>Reveal Recommendation</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Recommendation Output */}
          {quizStep === 4 && quizRecommendation && (
            <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-mango-500 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn">
              <div className="flex items-center gap-5">
                <img
                  src={quizRecommendation.colors[0]?.image}
                  alt={quizRecommendation.name}
                  className="w-24 h-24 rounded-xl object-contain bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-2 shrink-0"
                />
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase mb-1">
                    <CheckCircle2 className="w-3 h-3" /> Ideal Match For You
                  </span>
                  <h4 className="text-2xl font-black text-neutral-900 dark:text-white">
                    {quizRecommendation.name}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-md">
                    {quizRecommendation.tagline}
                  </p>
                  <span className="font-bold text-sm text-mango-600 dark:text-mango-400 block mt-2">
                    Starting at ${quizRecommendation.basePrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                <Link
                  to={`/store/${quizRecommendation.category}/${quizRecommendation.id}`}
                  className="px-5 py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs text-center shadow-mango-sm"
                >
                  Configure This Match
                </Link>
                <button
                  onClick={() => setQuizStep(1)}
                  className="text-xs text-neutral-500 hover:underline text-center"
                >
                  Retake quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7: "SWITCH TO MANGO" (trade-in / migration pitch section) */}
      <section className="bg-neutral-100/60 dark:bg-[#121316] py-16 px-4 sm:px-6 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Switching is effortless
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
              Switch to Mango. <br />
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                Transfer your files in three clicks and trade in your old gear.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Mango Migration Assistant automatically moves your photos, documents, passwords, and contacts wirelessly from any previous platform. Plus, trade in your old hardware for instant store credit.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-xs text-neutral-900 dark:text-white block">Step 1: Trade In</span>
                <span className="text-[11px] text-neutral-500 mt-0.5 block">Get up to $650 instant deduction</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-xs text-neutral-900 dark:text-white block">Step 2: Auto Transfer</span>
                <span className="text-[11px] text-neutral-500 mt-0.5 block">Wireless migration assistant</span>
              </div>
            </div>
          </div>

          {/* Interactive Trade-In Valuation Calculator Card */}
          <div className="lg:col-span-6 p-8 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Instant Trade-In Calculator
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                Guaranteed Value
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Select your existing device category:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'phone', label: 'Phone' },
                  { id: 'laptop', label: 'Laptop' },
                  { id: 'tablet', label: 'Tablet' },
                  { id: 'watch', label: 'Watch' }
                ].map((dev) => (
                  <button
                    key={dev.id}
                    onClick={() => setTradeDeviceType(dev.id)}
                    className={`py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                      tradeDeviceType === dev.id
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {dev.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Device Condition:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setTradeCondition('good')}
                  className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                    tradeCondition === 'good' ? 'border-mango-500 bg-mango-50/20 dark:bg-mango-950/20 font-bold' : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  Good (minor scratches)
                </button>
                <button
                  onClick={() => setTradeCondition('flawless')}
                  className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                    tradeCondition === 'flawless' ? 'border-mango-500 bg-mango-50/20 dark:bg-mango-950/20 font-bold' : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  Flawless (like new)
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-400 block">Estimated Trade-in Credit:</span>
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  ${getEstimatedTradeCredit()}
                </span>
              </div>
              <button
                onClick={() => {
                  const target = products[0];
                  if (target) navigate(`/store/${target.category}/${target.id}`);
                }}
                className="px-4 py-2 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs transition-colors"
              >
                Apply to New Device
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: "{CATEGORY} ESSENTIALS" (horizontal accessory upsell row) */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              {categoryInfo.displayName} Essentials
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Curated precision accessories engineered for your {categoryInfo.displayName}.
            </p>
          </div>
          <Link
            to="/store/accessories"
            className="text-xs font-semibold text-mango-600 dark:text-mango-400 hover:underline flex items-center gap-1"
          >
            <span>View all accessories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryEssentials.map((item) => {
            const currentIdx = essentialColorMap[item.id] || 0;
            const activeColor = item.colors[currentIdx] || item.colors[0];

            return (
              <div
                key={item.id}
                className="p-5 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-card hover:shadow-xl transition-all"
              >
                <div>
                  <div className="h-40 flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={activeColor.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Color dots */}
                  <div className="flex items-center gap-1.5 mb-2">
                    {item.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => setEssentialColorMap(prev => ({ ...prev, [item.id]: i }))}
                        className={`w-3.5 h-3.5 rounded-full border ${currentIdx === i ? 'border-mango-500 scale-125' : 'border-transparent'}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-[10px] text-neutral-400 ml-1">{activeColor.name}</span>
                  </div>

                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{item.name}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{item.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900 dark:text-white">
                    ${item.basePrice}
                  </span>
                  <button
                    onClick={() => {
                      addToCart({
                        productId: item.id,
                        name: item.name,
                        category: item.category,
                        selectedColor: activeColor,
                        hasCarePlus: false,
                        carePlusPrice: 0,
                        tradeInCredit: 0,
                        unitPrice: item.basePrice,
                        quantity: 1
                      });
                      setIsCartOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black text-xs font-bold transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 9: LEGAL FINE PRINT */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed space-y-2">
        <p className="font-bold uppercase text-[10px] tracking-wider text-neutral-400">
          Mango {categoryInfo.displayName} Specifications & Disclaimers
        </p>
        <p>{categoryInfo.legalText}</p>
        <p>
          * Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. You must be at least 18 years old to be eligible to trade in for credit or for a Mango Gift Card. Trade-in value may be applied toward qualifying new device purchase.
        </p>
      </section>

      {/* Video Demonstration Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-neutral-900 rounded-mango-lg overflow-hidden max-w-3xl w-full border border-neutral-800 relative shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-neutral-800">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-mango-500 fill-current" />
                <span>Mango Engineering Reel &bull; {categoryInfo.displayName}</span>
              </span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
