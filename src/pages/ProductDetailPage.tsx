import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory, ALL_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Package, 
  Cpu, 
  Battery, 
  Zap, 
  Play, 
  Pause, 
  Sliders, 
  Layers, 
  Eye, 
  ShoppingBag,
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProductDetailPage: React.FC = () => {
  const { category, productId } = useParams<{ category: string; productId: string }>();
  const product = productId ? getProductById(productId) : undefined;
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  // Redirect if invalid product
  if (!product) {
    return <Navigate to="/store" replace />;
  }

  // Get sibling models in the same category for the "Compare models" side-by-side section
  const siblingProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 2);
  const comparisonList = [product, ...siblingProducts];

  // Related accessories
  const relatedAccessories = ALL_PRODUCTS.filter(p => p.category === 'accessories').slice(0, 4);

  // Configurator state
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);
  const [includeCarePlus, setIncludeCarePlus] = useState(false);
  const [tradeInTier, setTradeInTier] = useState<number>(0);
  const [engravingText, setEngravingText] = useState('');
  const [showEngraving, setShowEngraving] = useState(false);

  // Hero carousel media gallery state
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Sticky Buy Box visibility state
  const [showStickyBuyBox, setShowStickyBuyBox] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const activeStorage = product.storageOptions ? product.storageOptions[selectedStorageIdx] : undefined;

  // Build media gallery items: active color image, additional product angles, and video reel preview
  const mediaGallery = [
    { type: 'image', url: activeColor.image, title: `${product.name} — ${activeColor.name}` },
    ...(product.galleryImages?.map(url => ({ type: 'image', url, title: `${product.name} Perspective` })) || []),
    { type: 'image', url: product.colors[(selectedColorIdx + 1) % product.colors.length]?.image || activeColor.image, title: 'Studio Angle' },
    { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', title: 'Product Engineering Film' }
  ];

  const currentMedia = mediaGallery[activeMediaIdx] || mediaGallery[0];

  const carePlusCost = product.basePrice > 1000 ? 249 : 149;
  const storageDelta = activeStorage ? activeStorage.priceDelta : 0;
  const calculatedPrice = product.basePrice + storageDelta;
  const finalCalculatedPrice = Math.max(0, calculatedPrice - tradeInTier + (includeCarePlus ? carePlusCost : 0));
  const monthlyPayment = Math.round(finalCalculatedPrice / 24);

  // Scroll listener for sticky buy box
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const bottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyBuyBox(bottom < 120);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Default rich story sections if not defined on product
  const storySections = product.storySections || [
    {
      title: `${product.chip || 'Mango Core G4'} Silicon Architecture`,
      subtitle: 'Compute Velocity Unleashed',
      description: `Engineered on an ultra-dense 3-nanometer process. Delivers up to 40% faster multi-threaded CPU throughput and unconstrained hardware-accelerated ray tracing while conserving power.`,
      image: activeColor.image,
      stats: [
        { label: 'Transistors', value: '92 Billion' },
        { label: 'Neural Engine', value: '38 TOPS' }
      ],
      alignment: 'left' as const
    },
    {
      title: 'Liquid UltraVision Precision Display',
      subtitle: 'Dynamic 120Hz ProFlow',
      description: `Every pixel is individually factory calibrated. Featuring 1,600 nits peak luminance, True Tone color adaptation, and extreme dynamic range that makes photos and movies glow with real-world vitality.`,
      image: '/assets/laptop_pro.jpg',
      stats: [
        { label: 'Peak Brightness', value: '1,600 nits' },
        { label: 'Contrast Ratio', value: '1,000,000:1' }
      ],
      alignment: 'right' as const
    },
    {
      title: 'Pip AI Neural Acceleration',
      subtitle: 'Intelligence That Respects Your Privacy',
      description: `Run modern generative AI models and intelligent assistants completely on-device without streaming your private data to third-party server farms. Instant, contextual, and secure.`,
      image: '/assets/phone_ultra.jpg',
      stats: [
        { label: 'Privacy', value: '100% On-Device' },
        { label: 'Latency', value: 'Zero Cloud Delay' }
      ],
      alignment: 'left' as const
    },
    {
      title: 'Acoustic Silence & Extended Battery',
      subtitle: 'Endurance That Outlasts Your Day',
      description: `Advanced thermal architecture moves air silently through custom micro-vanes. Combined with Mango low-power cores, enjoy up to ${product.batteryLife || '22 hours'} of uninterrupted focus.`,
      image: activeColor.image,
      stats: [
        { label: 'Endurance', value: product.batteryLife || 'Up to 22h' },
        { label: 'Fast Charge', value: '50% in 30 min' }
      ],
      alignment: 'right' as const
    }
  ];

  const handleAddProductToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      selectedColor: activeColor,
      selectedStorage: activeStorage,
      hasCarePlus: includeCarePlus,
      carePlusPrice: carePlusCost,
      tradeInCredit: tradeInTier,
      unitPrice: calculatedPrice,
      quantity: 1
    });

    setIsCartOpen(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#901435', '#C4284D', '#F9CBD6']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#0C0D0E] text-neutral-900 dark:text-neutral-100 transition-colors pb-24">
      
      {/* Top Breadcrumbs */}
      <div className="border-b border-neutral-200/60 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md sticky top-12 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <Link to="/store" className="hover:text-mango-500">Store</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/store/${product.category}`} className="hover:text-mango-500 capitalize">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{product.name}</span>
          </div>
          <span className="hidden sm:inline text-[11px] text-mango-600 dark:text-mango-400 font-medium">
            Free Delivery &bull; Free Returns
          </span>
        </div>
      </div>

      {/* 1. HERO AREA: Image/Video Carousel, Color Picker, Storage/Config Selector, Live-Updating Price */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Media Carousel & Gallery */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="sticky top-28 w-full flex flex-col items-center">
              {/* Main Active Media Frame */}
              <div className="w-full h-[380px] sm:h-[480px] rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800 p-8 flex items-center justify-center shadow-card relative overflow-hidden group">
                {product.badge && (
                  <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-mango-500 text-white dark:text-black text-xs font-bold shadow-sm z-10">
                    {product.badge}
                  </span>
                )}

                {currentMedia.type === 'video' ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/80 rounded-2xl overflow-hidden">
                    <img
                      src={activeColor.image}
                      alt="Reel preview"
                      className="w-full h-full object-cover opacity-50"
                    />
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white group-hover:scale-105 transition-transform"
                    >
                      <div className="w-16 h-16 rounded-full bg-mango-500 text-black flex items-center justify-center shadow-mango-glow">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                      <span className="font-bold text-xs uppercase tracking-wider mt-2">
                        Watch Product Film
                      </span>
                    </button>
                  </div>
                ) : (
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.title}
                    className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-105"
                  />
                )}

                {/* Laser Engraving Preview if entered */}
                {engravingText && currentMedia.type === 'image' && (
                  <div className="absolute bottom-6 px-4 py-1 rounded-full bg-neutral-900/80 text-white text-xs font-mono backdrop-blur-md border border-white/20 shadow-md">
                    Engraved: "{engravingText}"
                  </div>
                )}

                {/* Carousel Navigation Arrows */}
                <button
                  onClick={() => setActiveMediaIdx(prev => (prev === 0 ? mediaGallery.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-700 shadow-md transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveMediaIdx(prev => (prev === mediaGallery.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-700 shadow-md transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="mt-4 flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                {mediaGallery.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIdx(idx)}
                    className={`w-14 h-14 rounded-xl border p-1 bg-white dark:bg-neutral-800 overflow-hidden shrink-0 transition-all ${
                      activeMediaIdx === idx
                        ? 'border-mango-500 scale-105 ring-2 ring-mango-400/30'
                        : 'border-neutral-200 dark:border-neutral-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {m.type === 'video' ? (
                      <div className="w-full h-full bg-black flex items-center justify-center rounded-lg text-mango-500">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    ) : (
                      <img src={m.url} alt={m.title} className="w-full h-full object-cover rounded-lg" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Configurator Area */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                Mango Custom Studio
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1">
                {product.name}
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Price Banner */}
              <div className="mt-4 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-neutral-500 block">Total Due</span>
                  <span className="text-2xl font-black text-neutral-900 dark:text-white">
                    ${finalCalculatedPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-neutral-500 block">0% APR Financing</span>
                  <span className="text-sm font-bold text-mango-600 dark:text-mango-400">
                    ${monthlyPayment}/mo. for 24 mo.
                  </span>
                </div>
              </div>
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Finish: <span className="text-mango-600 dark:text-mango-400">{activeColor.name}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColorIdx(idx);
                      setActiveMediaIdx(0);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      selectedColorIdx === idx
                        ? 'border-mango-500 ring-2 ring-mango-400/20 bg-mango-50/30 dark:bg-mango-950/30 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs text-neutral-800 dark:text-neutral-200 truncate">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage / Spec Config Selector */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Storage Capacity & Configuration
                </label>
                <div className="space-y-2">
                  {product.storageOptions.map((opt, idx) => (
                    <button
                      key={opt.size}
                      onClick={() => setSelectedStorageIdx(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedStorageIdx === idx
                          ? 'border-mango-500 ring-2 ring-mango-400/20 bg-mango-50/30 dark:bg-mango-950/30 font-semibold'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                        {opt.size}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trade-In Valuation Dropdown */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Mango Trade-In Credit
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'No Trade-In', credit: 0 },
                  { label: 'Good Condition', credit: 250 },
                  { label: 'Flawless', credit: 450 },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => setTradeInTier(tier.credit)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      tradeInTier === tier.credit
                        ? 'border-mango-500 ring-2 ring-mango-400/20 bg-mango-50/30 dark:bg-mango-950/30 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                  >
                    <span className="block text-xs text-neutral-800 dark:text-neutral-200">
                      {tier.label}
                    </span>
                    <span className="block text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                      {tier.credit === 0 ? '$0' : `-$${tier.credit}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mango Care+ Protection Add-On */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Mango Care+ Protection Plan
              </label>
              <div
                onClick={() => setIncludeCarePlus(!includeCarePlus)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  includeCarePlus
                    ? 'border-mango-500 ring-2 ring-mango-400/20 bg-mango-50/30 dark:bg-mango-950/30'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  includeCarePlus ? 'bg-mango-500 border-mango-500 text-white dark:text-black' : 'border-neutral-300 dark:border-neutral-600'
                }`}>
                  {includeCarePlus && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-white">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-mango-500" />
                      Add Mango Care+
                    </span>
                    <span className="text-mango-600 dark:text-mango-400">+${carePlusCost}</span>
                  </div>
                  <p className="text-neutral-500 mt-1 leading-relaxed text-[11px]">
                    Unlimited accidental damage incidents, same-day battery servicing, and 24/7 priority Pip AI & specialist tech support.
                  </p>
                </div>
              </div>
            </div>

            {/* Laser Engraving Option */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowEngraving(!showEngraving)}
                className="text-xs font-semibold text-mango-600 dark:text-mango-400 flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showEngraving ? 'Remove Custom Engraving' : 'Add Free Laser Engraving'}</span>
              </button>

              {showEngraving && (
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 animate-fadeIn">
                  <label className="block text-[11px] text-neutral-500 mb-1">
                    Enter text or initials (max 20 characters)
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="e.g. ALEX MORGAN ⚡"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-mango-500"
                  />
                </div>
              )}
            </div>

            {/* Main Add to Bag Button */}
            <div className="pt-3 space-y-2.5">
              <button
                onClick={handleAddProductToCart}
                className="w-full py-4 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-mango-glow hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Add to Bag &bull; ${finalCalculatedPrice.toLocaleString()}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-center text-[11px] text-neutral-500 pt-1">
                <div className="flex items-center justify-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Arrives tomorrow by express</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                  <span>14-day free return window</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STICKY BUY BOX (Appears as user scrolls down past hero) */}
      {showStickyBuyBox && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#16171A]/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 shadow-2xl py-3 px-4 sm:px-6 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={activeColor.image}
                alt={product.name}
                className="w-11 h-11 rounded-lg object-contain bg-neutral-100 dark:bg-neutral-800 p-1 shrink-0 border border-neutral-200/50 dark:border-neutral-700"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>{activeColor.name}</span>
                  {activeStorage && <span>&bull; {activeStorage.size}</span>}
                  {includeCarePlus && <span className="text-mango-600 font-semibold">&bull; Care+</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <span className="font-black text-lg text-neutral-900 dark:text-white block leading-none">
                  ${finalCalculatedPrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-400">
                  or ${monthlyPayment}/mo. with 0% APR
                </span>
              </div>
              <button
                onClick={handleAddProductToCart}
                className="px-6 py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-extrabold text-xs shadow-mango-sm flex items-center gap-1.5 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SCROLL-DRIVEN FEATURE STORY SECTIONS (Alternating image/text editorial blocks) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-24 border-t border-neutral-200 dark:border-neutral-800">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
            Engineered Without Compromise
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white mt-1">
            Every Detail Refined.
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Explore the advanced materials, custom silicon, and industrial design that define {product.name}.
          </p>
        </div>

        {storySections.map((story, idx) => {
          const isReversed = story.alignment === 'right';

          return (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Media Card */}
              <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800 p-8 sm:p-12 shadow-card flex items-center justify-center relative overflow-hidden group">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="max-h-[380px] max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Narrative Content */}
              <div className={`lg:col-span-5 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                  {story.subtitle}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
                  {story.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {story.description}
                </p>

                {/* Stats row */}
                {story.stats && story.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    {story.stats.map((stat, sIdx) => (
                      <div key={sIdx}>
                        <span className="text-2xl font-black text-neutral-900 dark:text-white block">
                          {stat.value}
                        </span>
                        <span className="text-xs text-neutral-500 font-medium mt-0.5 block">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. TECH SPECS COMPARISON TABLE */}
      <section className="bg-neutral-100/60 dark:bg-[#121316] py-16 px-4 sm:px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Detailed Technical Specifications
            </h3>
            <p className="text-xs text-neutral-500 mt-1">Complete breakdown of hardware, sensors, and connectivity.</p>
          </div>

          <div className="bg-white dark:bg-[#16171A] rounded-mango-lg border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 overflow-hidden shadow-card">
            {product.specsSummary.map((spec) => (
              <div key={spec.label} className="p-4 sm:px-6 grid grid-cols-3 text-xs sm:text-sm">
                <span className="font-bold text-neutral-500 dark:text-neutral-400">
                  {spec.label}
                </span>
                <span className="col-span-2 text-neutral-900 dark:text-neutral-100 font-medium">
                  {spec.value}
                </span>
              </div>
            ))}
            <div className="p-4 sm:px-6 grid grid-cols-3 text-xs sm:text-sm">
              <span className="font-bold text-neutral-500 dark:text-neutral-400">Custom Silicon</span>
              <span className="col-span-2 text-neutral-900 dark:text-neutral-100 font-medium">
                {product.chip || 'Mango Core G4 Pro'} with on-device Pip AI Neural Engine
              </span>
            </div>
            <div className="p-4 sm:px-6 grid grid-cols-3 text-xs sm:text-sm">
              <span className="font-bold text-neutral-500 dark:text-neutral-400">Battery & Charging</span>
              <span className="col-span-2 text-neutral-900 dark:text-neutral-100 font-medium">
                {product.batteryLife || 'Up to 18 hours'} with Fast MagLock Charging
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "COMPARE MODELS" — SIDE-BY-SIDE AGAINST OTHER MODELS IN SAME CATEGORY */}
      {comparisonList.length > 1 && (
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
              Lineup Matrix
            </span>
            <h3 className="text-3xl font-black text-neutral-900 dark:text-white mt-1">
              Compare {product.category.toUpperCase()} Models
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              See how {product.name} stacks up against other models in the lineup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonList.map((comp) => {
              const isCurrent = comp.id === product.id;

              return (
                <div
                  key={comp.id}
                  className={`p-6 rounded-mango-lg border flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-b from-mango-50/40 to-white dark:from-mango-950/20 dark:to-[#16171A] border-2 border-mango-500 shadow-xl'
                      : 'bg-white dark:bg-[#16171A] border-neutral-200 dark:border-neutral-800 shadow-card'
                  }`}
                >
                  <div>
                    {isCurrent && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-mango-500 text-white dark:text-black text-[10px] font-extrabold uppercase tracking-wider mb-2">
                        Currently Viewing
                      </span>
                    )}
                    <div className="h-44 flex items-center justify-center p-4">
                      <img
                        src={comp.colors[0]?.image}
                        alt={comp.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <h4 className="text-xl font-bold text-neutral-900 dark:text-white text-center mt-2">
                      {comp.name}
                    </h4>
                    <p className="text-xs text-neutral-500 text-center mt-1">
                      From ${comp.basePrice.toLocaleString()}
                    </p>

                    {/* Spec comparison rows */}
                    <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4 text-xs">
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase font-bold block">Display</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {comp.screenSize || 'Liquid UltraVision'}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase font-bold block">Silicon</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {comp.chip || 'Mango Core G4'}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase font-bold block">Battery Life</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {comp.batteryLife || 'All-Day Reserve'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    {isCurrent ? (
                      <button
                        onClick={handleAddProductToCart}
                        className="w-full py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-extrabold text-xs shadow-sm"
                      >
                        Buy {comp.name}
                      </button>
                    ) : (
                      <Link
                        to={`/store/${comp.category}/${comp.id}`}
                        className="w-full py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1"
                      >
                        <span>Configure</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. RELATED ACCESSORIES ROW */}
      <section className="bg-neutral-100/60 dark:bg-[#121316] py-16 px-4 sm:px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                Compatible Accessories for {product.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Complete your setup with fast charging, protection folios, and input tools.</p>
            </div>
            <Link
              to="/store/accessories"
              className="text-xs font-semibold text-mango-600 dark:text-mango-400 hover:underline flex items-center gap-1"
            >
              <span>Explore all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedAccessories.map((acc) => (
              <div
                key={acc.id}
                className="p-5 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-card hover:shadow-xl transition-all"
              >
                <div>
                  <div className="h-40 flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={acc.colors[0]?.image}
                      alt={acc.name}
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{acc.name}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{acc.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900 dark:text-white">
                    ${acc.basePrice}
                  </span>
                  <button
                    onClick={() => {
                      addToCart({
                        productId: acc.id,
                        name: acc.name,
                        category: acc.category,
                        selectedColor: acc.colors[0],
                        hasCarePlus: false,
                        carePlusPrice: 0,
                        tradeInCredit: 0,
                        unitPrice: acc.basePrice,
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
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-neutral-900 rounded-mango-lg overflow-hidden max-w-3xl w-full border border-neutral-800 relative shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-neutral-800">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-mango-500 fill-current" />
                <span>{product.name} — Engineering & Design Reel</span>
              </span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
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
