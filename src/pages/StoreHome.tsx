import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES_DATA, ALL_PRODUCTS } from '../data/products';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  Watch, 
  Glasses, 
  Headphones, 
  Tv, 
  Film, 
  Sparkles, 
  LocateFixed, 
  Gift,
  ArrowRight,
  ShieldCheck,
  Music,
  CreditCard,
  Truck,
  MessageSquare,
  ChevronRight,
  PhoneCall,
  MapPin,
  Calendar,
  Layers,
  Sparkle,
  Search,
  CheckCircle2,
  X,
  Sliders,
  DollarSign,
  Package,
  BookOpen,
  Zap,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  laptop: Laptop,
  tablet: Tablet,
  phone: Smartphone,
  wearable: Watch,
  headset: Glasses,
  earbuds: Headphones,
  'screens-home': Tv,
  entertainment: Film,
  accessories: Sparkles,
  tracker: LocateFixed,
  giftcard: Gift
};

export const StoreHome: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  // State for store locator modal
  const [showLocatorModal, setShowLocatorModal] = useState(false);
  const [storeSearchQuery, setStoreSearchQuery] = useState('');

  // State for guided session modal
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionBooked, setSessionBooked] = useState(false);

  // State for accessories color selection
  const [accessoryColorMap, setAccessoryColorMap] = useState<Record<string, number>>({});

  // Products data
  const latestLaunches = ALL_PRODUCTS.filter(p => p.featured || p.badge).slice(0, 6);
  const accessoriesList = ALL_PRODUCTS.filter(p => p.category === 'accessories');

  const STORES = [
    { name: 'Mango Store Union Square', city: 'San Francisco, CA', address: '300 Post St', distance: '0.8 mi', hours: 'Open until 9:00 PM' },
    { name: 'Mango Store Fifth Avenue', city: 'New York, NY', address: '767 5th Ave', distance: '1.2 mi', hours: 'Open 24 Hours' },
    { name: 'Mango Store The Grove', city: 'Los Angeles, CA', address: '189 The Grove Dr', distance: '2.4 mi', hours: 'Open until 9:00 PM' },
    { name: 'Mango Store North Michigan Ave', city: 'Chicago, IL', address: '401 N Michigan Ave', distance: '3.1 mi', hours: 'Open until 8:00 PM' }
  ];

  const filteredStores = STORES.filter(s => 
    s.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
    s.city.toLowerCase().includes(storeSearchQuery.toLowerCase())
  );

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setSessionBooked(true);
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
      
      {/* Header & Category Icons Ribbon */}
      <section className="pt-8 pb-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-mango-600 dark:text-mango-400 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Mango Flagship Store</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
              Store. <span className="text-neutral-400 dark:text-neutral-500 font-normal">The best way to buy the products you love.</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const el = document.querySelector('button[aria-label="Chat with Pip AI Assistant"]') as HTMLButtonElement;
                if (el) el.click();
              }}
              className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-mango-500" />
              <span>Ask Pip or a Specialist</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar py-4">
          {Object.values(CATEGORIES_DATA).map((cat) => {
            const Icon = CATEGORY_ICONS[cat.key] || Sparkles;
            return (
              <Link
                key={cat.key}
                to={cat.route}
                className="group shrink-0 flex flex-col items-center text-center p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-transform duration-300 min-w-[80px] hover:-translate-y-1 btn-press"
              >
                <div className="w-13 h-13 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/60 flex items-center justify-center mb-1.5 p-3 shadow-sm group-hover:scale-110 group-hover:border-mango-500 transition-all duration-300">
                  <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-mango-500 transition-colors" />
                </div>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">
                  {cat.displayName}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 1: CONTACT RETAIL BLOCK */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto my-4 animate-fadeIn">
        <div className="p-4 sm:p-5 rounded-mango bg-gradient-to-r from-mango-500/10 via-rose-500/5 to-emerald-500/10 border border-mango-300/40 dark:border-mango-500/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-mango-sm transition-shadow">
          <div className="flex items-center gap-3.5 text-left w-full md:w-auto">
            <div className="w-10 h-10 rounded-full bg-mango-500 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse-subtle">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                Need shopping assistance? Contact our Retail Specialists.
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Live Now
                </span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Call 1-800-MY-MANGO or connect 1-on-1 with product specialists for real-time recommendations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <a
              href="tel:18006962646"
              className="px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold hover:border-mango-500 transition-colors shrink-0 btn-press"
            >
              Call 1-800-MY-MANGO
            </a>
            <button
              onClick={() => {
                const el = document.querySelector('button[aria-label="Chat with Pip AI Assistant"]') as HTMLButtonElement;
                if (el) el.click();
              }}
              className="px-4 py-2 rounded-full bg-mango-500 hover:bg-mango-600 text-white text-xs font-bold shadow-mango-sm hover:shadow-mango-glow transition-all shrink-0 btn-press"
            >
              Chat Online
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: FIND A SPECIALIST / FIND A MANGO STORE (STORE LOCATOR LINK) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Find a Mango Store */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex items-start justify-between group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-mango-500 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">
                Find a Mango Store
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
                Discover your nearest retail location, check in-store stock availability, and experience devices in person.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setShowLocatorModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-mango-600 dark:text-mango-400 hover:underline btn-press"
                >
                  <span>Launch Store Locator</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="hidden sm:block text-right text-xs text-neutral-400 font-mono">
              <span className="block font-bold text-neutral-800 dark:text-neutral-200">500+</span>
              <span>Global Stores</span>
            </div>
          </div>

          {/* Card 2: Find a Specialist */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex items-start justify-between group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Book a 1-on-1 Specialist Session
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
                Schedule a complimentary 30-minute virtual consultation with a Mango Specialist to configure your workstation.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setShowSessionModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline btn-press"
                >
                  <span>Reserve Free Session</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="hidden sm:block text-right text-xs text-neutral-400 font-mono">
              <span className="block font-bold text-emerald-600">FREE</span>
              <span>Guided Setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LATEST LAUNCHES (Horizontal cards, image + short copy, linking to category or PDP) */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
              Fresh From The Keynote
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-0.5">
              The Latest Launches. <span className="text-neutral-400 font-normal">Explore the newest Mango devices.</span>
            </h2>
          </div>
          <Link
            to="/store/laptop"
            className="text-xs font-bold text-mango-600 dark:text-mango-400 hover:underline flex items-center gap-1 group"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestLaunches.map((product) => (
            <div
              key={product.id}
              className="group rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-mango-100 dark:bg-mango-950 text-mango-700 dark:text-mango-400 shadow-xs">
                    {product.badge || 'New'}
                  </span>
                  <span className="text-xs font-black text-neutral-600 dark:text-neutral-300">
                    From ${product.basePrice.toLocaleString()}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-neutral-900 dark:text-white mt-3 group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                  {product.tagline}
                </p>

                <Link to={`/store/${product.category}/${product.id}`}>
                  <div className="my-6 h-48 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.colors[0]?.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain interactive-img transition-transform duration-500"
                    />
                  </div>
                </Link>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <Link
                  to={`/store/${product.category}`}
                  className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-mango-600 dark:hover:text-mango-400 transition-colors"
                >
                  Explore {product.category} &rarr;
                </Link>
                <Link
                  to={`/store/${product.category}/${product.id}`}
                  className="px-4 py-2 rounded-full bg-mango-500 hover:bg-mango-600 text-white text-xs font-extrabold shadow-mango-sm hover:shadow-mango-glow transition-all btn-press"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: ACCESSORIES (Horizontal cards with image, color options, price) */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto border-t border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
              Engineered Companions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-0.5">
              Accessories. <span className="text-neutral-400 font-normal">Made to fit your Mango ecosystem.</span>
            </h2>
          </div>
          <Link
            to="/store/accessories"
            className="text-xs font-bold text-mango-600 dark:text-mango-400 hover:underline flex items-center gap-1"
          >
            <span>Shop accessories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessoriesList.slice(0, 4).map((item) => {
            const currentIdx = accessoryColorMap[item.id] || 0;
            const activeColor = item.colors[currentIdx] || item.colors[0];

            return (
              <div
                key={item.id}
                className="p-5 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card group"
              >
                <div>
                  <div className="h-40 flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={activeColor.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain interactive-img transition-transform duration-500"
                    />
                  </div>

                  {/* Interactive Color Options */}
                  <div className="flex items-center gap-1.5 mb-2">
                    {item.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => setAccessoryColorMap(prev => ({ ...prev, [item.id]: i }))}
                        className={`w-3.5 h-3.5 rounded-full border transition-all swatch-ring ${currentIdx === i ? 'border-mango-500 scale-125 ring-2 ring-mango-400/40 shadow-xs' : 'border-transparent hover:scale-110'}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-[10px] text-neutral-400 ml-1 font-medium truncate">{activeColor.name}</span>
                  </div>

                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">{item.name}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{item.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
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
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black text-xs font-bold transition-all btn-press"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: HELP (Specialist chat CTA, Free guided sessions CTA, "New devices" explainer) */}
      <section className="py-12 bg-neutral-100/70 dark:bg-[#121316] border-y border-neutral-200 dark:border-neutral-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
              Guidance Every Step
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-0.5">
              Help is Here. Whenever and Wherever You Need It.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Specialist Chat CTA */}
            <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-mango-100 dark:bg-mango-950 text-mango-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">
                  Shop 1-on-1 with a Specialist
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  Chat live with our experts online or call us directly. We help you choose the right model, configure storage, and verify trade-in.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => {
                    const el = document.querySelector('button[aria-label="Chat with Pip AI Assistant"]') as HTMLButtonElement;
                    if (el) el.click();
                  }}
                  className="text-xs font-bold text-mango-600 dark:text-mango-400 hover:underline flex items-center gap-1 btn-press"
                >
                  <span>Chat with an expert now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. Free Guided Sessions CTA */}
            <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Free Guided Sessions
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  Join interactive Today at Mango sessions to master video editing, digital illustration, coding with Pip AI, or mobile photography.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => setShowSessionModal(true)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 btn-press"
                >
                  <span>Explore calendar & book</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 3. New Devices Explainer */}
            <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Setting Up Your New Device
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  Learn how Mango Migration Assistant seamlessly transfers your photos, accounts, and passwords wirelessly in minutes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <Link
                  to="/care"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
                >
                  <span>Quick start setup guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: MANGO STORE (RETAIL GRID: Financing, Payment, Customization, Delivery, Personalization) */}
      <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
            The Mango Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-0.5">
            Why Buy Directly from the Mango Store.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Financing, payments, customized builds, express shipping, and bespoke engraving.
          </p>
        </div>

        {/* 5-item Retail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* 1. Financing */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-mango-100 dark:bg-mango-950 text-mango-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">1. Financing</span>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-1 group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">0% APR Over 24 Mo.</h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Pay in low monthly installments with zero interest on the Mango Card.
              </p>
            </div>
            <span className="text-[11px] font-bold text-mango-600 dark:text-mango-400 mt-4 block group-hover:translate-x-1 transition-transform">Calculate monthly &rarr;</span>
          </div>

          {/* 2. Payment */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">2. Payment</span>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Trade-In & Split Pay</h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Apply instant trade-in credit up to $650 or split between two cards.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-4 block group-hover:translate-x-1 transition-transform">Estimate credit &rarr;</span>
          </div>

          {/* 3. Customization */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">3. Customization</span>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Built to Your Spec</h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Configure unified memory to 128GB, studio SSDs, and nano-texture glass.
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-4 block group-hover:translate-x-1 transition-transform">Custom studio &rarr;</span>
          </div>

          {/* 4. Delivery */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-mango-100 dark:bg-mango-950 text-mango-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">4. Delivery</span>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-1 group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">Free Express Courier</h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Next-day doorstep delivery or 2-hour in-store pickup ready in a flash.
              </p>
            </div>
            <span className="text-[11px] font-bold text-mango-600 dark:text-mango-400 mt-4 block group-hover:translate-x-1 transition-transform">Delivery options &rarr;</span>
          </div>

          {/* 5. Personalization */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">5. Personalization</span>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Free Laser Engraving</h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Engrave emoji, names, or special dates onto Earbuds and Tablets.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 mt-4 block group-hover:translate-x-1 transition-transform">Preview engraving &rarr;</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: MANGO SOUND (Horizontal subscription plan cards + device bundle offers) */}
      <section className="py-14 bg-neutral-100/70 dark:bg-[#121316] border-y border-neutral-200 dark:border-neutral-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
                Spatial Lossless Streaming
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-0.5">
                Mango Sound. <span className="text-neutral-400 font-normal">Over 100 million songs in master resolution.</span>
              </h2>
            </div>
            <Link
              to="/sound"
              className="text-xs font-bold text-mango-600 dark:text-mango-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Mango Sound</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Device Bundle Offer Highlight Banner */}
          <div className="p-6 rounded-mango-lg bg-gradient-to-r from-mango-700 via-mango-600 to-rose-800 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
                  Hardware Bundle Offer
                </span>
                <h3 className="text-lg font-black mt-1">Get 3 Months of Mango Sound Free</h3>
                <p className="text-xs text-mango-100">
                  Included automatically with the purchase of any Mango Laptop, Phone, Tablet, or Earbuds.
                </p>
              </div>
            </div>
            <Link
              to="/sound"
              className="px-5 py-2.5 rounded-full bg-white text-mango-800 font-bold text-xs hover:bg-neutral-100 transition-colors shrink-0 shadow-sm btn-press"
            >
              Claim 3 Months
            </Link>
          </div>

          {/* Subscription Plan Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card group">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Student Tier</span>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-3xl font-black text-neutral-900 dark:text-white">$4.99</span>
                  <span className="text-xs text-neutral-500 font-medium">/mo</span>
                </div>
                <p className="text-xs text-neutral-500">Ad-free high-res audio for verified campus students.</p>
              </div>
              <Link to="/sound" className="mt-4 text-xs font-bold text-mango-600 hover:underline flex items-center gap-1">
                <span>Start trial</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            <div className="p-6 rounded-mango bg-white dark:bg-[#16171A] border-2 border-mango-500 flex flex-col justify-between shadow-mango-glow interactive-card group">
              <div>
                <span className="text-xs font-bold text-mango-600 uppercase">Individual Tier</span>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-3xl font-black text-neutral-900 dark:text-white">$10.99</span>
                  <span className="text-xs text-neutral-500 font-medium">/mo</span>
                </div>
                <p className="text-xs text-neutral-500">Spatial Audio with dynamic head tracking and offline downloads.</p>
              </div>
              <Link to="/sound" className="mt-4 text-xs font-bold text-mango-600 hover:underline flex items-center gap-1">
                <span>Start trial</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            <div className="p-6 rounded-mango bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card group">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Family Tier</span>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-3xl font-black text-neutral-900 dark:text-white">$16.99</span>
                  <span className="text-xs text-neutral-500 font-medium">/mo</span>
                </div>
                <p className="text-xs text-neutral-500">Up to 6 family accounts with individual sound profiles.</p>
              </div>
              <Link to="/sound" className="mt-4 text-xs font-bold text-mango-600 hover:underline flex items-center gap-1">
                <span>Start trial</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: MANGO EXPERIENCE (Horizontal cards: "Pip", Mango Ecosystem, Mango Care+, Mango native apps) */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400">
            Continuous Computing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-0.5">
            The Mango Experience. <span className="text-neutral-400 font-normal">Better together.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Pip AI Assistant */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-mango-100 dark:bg-mango-950/80 text-mango-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-mango-600">On-Device Intelligence</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">Pip AI Assistant</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                Private contextual assistance built into the silicon core. Drafts emails, transcribes notes, and refines creative ideas without data leaving your device.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.querySelector('button[aria-label="Chat with Pip AI Assistant"]') as HTMLButtonElement;
                if (el) el.click();
              }}
              className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-bold text-mango-600 text-left hover:underline flex items-center justify-between btn-press"
            >
              <span>Talk with Pip now</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Card 2: Mango Ecosystem */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">Seamless Continuity</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Mango Ecosystem</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                Copy on your Phone and paste immediately on your Laptop. Extend your workspace wirelessly to your Tablet with instantaneous zero-lag display sharing.
              </p>
            </div>
            <Link to="/store/laptop" className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-bold text-emerald-600 hover:underline flex items-center justify-between">
              <span>Explore continuity</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Card 3: Mango Care+ */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">Protection & Peace of Mind</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Mango Care+</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                Unlimited incidents of accidental drop coverage, same-day screen and battery replacements, and 24/7 priority access to senior Mango engineers.
              </p>
            </div>
            <Link to="/care" className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-bold text-blue-600 hover:underline flex items-center justify-between">
              <span>Learn about Care+</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Card 4: Mango Native Apps */}
          <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">Built-in Software</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Mango Native Apps</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                Engineered specifically for Mango Silicon. Experience Mango Notes, Mango Health vital monitoring, and Mango Studio creative apps without subscription fees.
              </p>
            </div>
            <Link to="/store" className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-bold text-purple-600 hover:underline flex items-center justify-between">
              <span>Discover native apps</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: SAVINGS & OFFERS (Promo banner row) */}
      <section className="py-12 bg-neutral-100/70 dark:bg-[#121316] border-t border-neutral-200 dark:border-neutral-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-mango-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Special Savings & Programs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Promo 1: Student & Campus */}
            <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-mango-100 dark:bg-mango-950 text-mango-700 dark:text-mango-400">
                  Education Discount
                </span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-2 group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">
                  College Students Save Up to $200
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Save on Laptop Pro, Tablet Air, and get 3 months of Mango Sound free with education verification.
                </p>
              </div>
              <Link to="/store/laptop" className="mt-6 text-xs font-bold text-mango-600 hover:underline flex items-center gap-1">
                <span>Verify student status</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Promo 2: Certified Refurbished */}
            <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  Certified Refurbished
                </span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Save Up to 25% on Inspected Gear
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Every certified refurbished device is cleaned, fitted with a brand new battery, and backed by a full 1-year warranty.
                </p>
              </div>
              <Link to="/store" className="mt-6 text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                <span>Browse refurbished stock</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Promo 3: Business & Bulk Upgrades */}
            <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-elevation dark:hover:shadow-elevation-dark interactive-card flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                  Mango For Business
                </span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Volume Pricing for Teams
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Upgrade your workforce with zero-touch MDM deployment, corporate trade-in bonuses, and 30-day invoice billing.
                </p>
              </div>
              <Link to="/store" className="mt-6 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>Contact enterprise sales</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locator Modal */}
      {showLocatorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#16171A] rounded-mango-lg max-w-lg w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-mango-500" />
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Mango Store Locator</h4>
              </div>
              <button onClick={() => setShowLocatorModal(false)} className="p-1 text-neutral-400 hover:text-white btn-press">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={storeSearchQuery}
                  onChange={(e) => setStoreSearchQuery(e.target.value)}
                  placeholder="Enter city, state, or ZIP..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs focus:outline-none focus:ring-2 focus:ring-mango-500"
                />
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2.5">
                {filteredStores.map((st, i) => (
                  <div key={i} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1 transition-transform hover:scale-[1.01]">
                    <div className="flex justify-between font-bold text-neutral-900 dark:text-white">
                      <span>{st.name}</span>
                      <span className="text-mango-600 font-mono">{st.distance}</span>
                    </div>
                    <p className="text-neutral-500">{st.address}, {st.city}</p>
                    <p className="text-[11px] text-emerald-600 font-medium">{st.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guided Session Booking Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#16171A] rounded-mango-lg max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Book 1-on-1 Specialist Session</span>
              </h4>
              <button onClick={() => { setShowSessionModal(false); setSessionBooked(false); }} className="p-1 text-neutral-400 hover:text-white btn-press">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sessionBooked ? (
              <div className="py-8 text-center space-y-3 animate-scale-up">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h5 className="font-bold text-base text-neutral-900 dark:text-white">Session Confirmed!</h5>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  A calendar invite and video link have been sent to your email. We look forward to meeting with you!
                </p>
                <button
                  onClick={() => { setShowSessionModal(false); setSessionBooked(false); }}
                  className="mt-4 px-6 py-2 rounded-full bg-mango-500 text-white font-bold text-xs btn-press"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="py-4 space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-500 mb-1">Your Full Name</label>
                  <input required defaultValue="Alex Morgan" className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Email Address</label>
                  <input required type="email" defaultValue="alex.morgan@example.com" className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Device Focus</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <option>Laptop Pro & Studio Workflow</option>
                    <option>Phone Ultra & Optics</option>
                    <option>Tablet Pro & Stylus Pen</option>
                    <option>Headset Spatial Computing</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm mt-4 btn-press"
                >
                  Confirm Free Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
