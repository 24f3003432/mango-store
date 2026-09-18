import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MangoLogo } from './MangoLogo';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Search, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Music,
  HelpCircle,
  Sparkles,
  Package
} from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/products';
import { CategoryKey } from '../../types';

interface NavItemDef {
  key: string;
  name: string;
  route: string;
  isCategory?: boolean;
  categoryKey?: CategoryKey;
}

const NAV_ITEMS: NavItemDef[] = [
  { key: 'store', name: 'Store', route: '/store' },
  { key: 'laptop', name: 'Laptop', route: '/store/laptop', isCategory: true, categoryKey: 'laptop' },
  { key: 'tablet', name: 'Tablet', route: '/store/tablet', isCategory: true, categoryKey: 'tablet' },
  { key: 'phone', name: 'Phone', route: '/store/phone', isCategory: true, categoryKey: 'phone' },
  { key: 'wearable', name: 'Wearable', route: '/store/wearable', isCategory: true, categoryKey: 'wearable' },
  { key: 'headset', name: 'Headset', route: '/store/headset', isCategory: true, categoryKey: 'headset' },
  { key: 'earbuds', name: 'Earbuds', route: '/store/earbuds', isCategory: true, categoryKey: 'earbuds' },
  { key: 'screens-home', name: 'Screens & Home', route: '/store/screens-home', isCategory: true, categoryKey: 'screens-home' },
  { key: 'entertainment', name: 'Entertainment', route: '/store/entertainment', isCategory: true, categoryKey: 'entertainment' },
  { key: 'accessories', name: 'Accessories', route: '/store/accessories', isCategory: true, categoryKey: 'accessories' }
];

interface GlobalHeaderProps {
  onOpenSearch: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onOpenSearch }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [activeFlyout, setActiveFlyout] = useState<CategoryKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close flyouts on route change
  useEffect(() => {
    setActiveFlyout(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (categoryKey?: CategoryKey) => {
    if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
    if (categoryKey) {
      setActiveFlyout(categoryKey);
    } else {
      setActiveFlyout(null);
    }
  };

  const handleMouseLeave = () => {
    flyoutTimeoutRef.current = setTimeout(() => {
      setActiveFlyout(null);
    }, 150);
  };

  const activeCategoryInfo = activeFlyout ? CATEGORIES_DATA[activeFlyout] : null;

  return (
    <header 
      className="sticky top-0 z-50 transition-colors duration-200"
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Navbar */}
      <div className="glass-nav border-b border-neutral-200/50 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between text-xs font-normal">
          {/* Logo */}
          <Link 
            to="/store" 
            className="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-mango-500 rounded p-1 -ml-1 transition-opacity hover:opacity-80"
            aria-label="Mango Home"
          >
            <MangoLogo size={20} />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-7 text-neutral-700 dark:text-neutral-300">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.route;
              return (
                <div 
                  key={item.key} 
                  className="relative py-3"
                  onMouseEnter={() => handleMouseEnter(item.categoryKey)}
                >
                  <Link
                    to={item.route}
                    className={`transition-colors py-1 hover:text-mango-600 dark:hover:text-mango-400 font-medium ${
                      isActive ? 'text-mango-600 dark:text-mango-400 font-semibold' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Utility actions (Search, Bag, Theme, Mobile toggle) */}
          <div className="flex items-center space-x-4 text-neutral-700 dark:text-neutral-300">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:text-mango-600 dark:hover:text-mango-400 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-mango-500"
              aria-label="Search Mango products"
              title="Search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:text-mango-600 dark:hover:text-mango-400 transition-colors rounded-full relative focus:outline-none focus:ring-2 focus:ring-mango-500"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-mango-500 text-white dark:text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 hover:text-mango-600 dark:hover:text-mango-400 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-mango-500"
              aria-label="Toggle dark mode"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-mango-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-600" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:text-mango-600 dark:hover:text-mango-400 transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Mega-Menu Flyout (Desktop) */}
      {activeFlyout && activeCategoryInfo && (
        <div
          onMouseEnter={() => {
            if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
          }}
          className="hidden lg:block absolute top-full left-0 w-full glass-nav border-b border-neutral-200/60 dark:border-neutral-800 shadow-2xl transition-all duration-200 animate-fadeIn"
        >
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-sm">
            {/* Column 1: Explore Lineup */}
            <div className="col-span-5 border-r border-neutral-200 dark:border-neutral-800 pr-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                Explore {activeCategoryInfo.displayName}
              </p>
              <div className="space-y-3">
                {activeCategoryInfo.models.map((model) => (
                  <Link
                    key={model.name}
                    to={model.route}
                    className="flex items-center justify-between group p-2 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-neutral-200/50 dark:border-neutral-700/50">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900 dark:text-white group-hover:text-mango-600 dark:group-hover:text-mango-400 transition-colors">
                          {model.name}
                        </span>
                        {model.badge && (
                          <span className="ml-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-mango-100 text-mango-700 dark:bg-mango-950/80 dark:text-mango-400">
                            {model.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-mango-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Shop / Quick Links */}
            <div className="col-span-4 border-r border-neutral-200 dark:border-neutral-800 pr-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                Shop {activeCategoryInfo.displayName}
              </p>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <Link
                    to={activeCategoryInfo.route}
                    className="text-neutral-800 dark:text-neutral-200 hover:text-mango-600 dark:hover:text-mango-400 transition-colors block py-1"
                  >
                    Shop All {activeCategoryInfo.displayName}s
                  </Link>
                </li>
                <li>
                  <Link
                    to="/store/accessories"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-mango-600 dark:hover:text-mango-400 transition-colors block py-1"
                  >
                    {activeCategoryInfo.displayName} Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/store/tracker"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-mango-600 dark:hover:text-mango-400 transition-colors block py-1"
                  >
                    Pair with MangoTag Trackers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/store/giftcard"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-mango-600 dark:hover:text-mango-400 transition-colors block py-1"
                  >
                    Mango Gift Cards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: More from Mango */}
            <div className="col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                More from Mango
              </p>
              <div className="space-y-3">
                <Link
                  to="/care"
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors group"
                >
                  <ShieldCheck className="w-5 h-5 text-mango-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white group-hover:text-mango-600 dark:group-hover:text-mango-400 block text-xs">
                      Mango Care+
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Unlimited repairs & accidental coverage
                    </span>
                  </div>
                </Link>

                <Link
                  to="/sound"
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors group"
                >
                  <Music className="w-5 h-5 text-mango-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white group-hover:text-mango-600 dark:group-hover:text-mango-400 block text-xs">
                      Mango Sound
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Spatial lossless audio with 3 months free
                    </span>
                  </div>
                </Link>

                <div className="pt-2">
                  <div className="bg-mango-50 dark:bg-mango-950/40 border border-mango-200 dark:border-mango-900/50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-mango-700 dark:text-mango-300 font-semibold text-xs mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-mango-500" />
                      Ask Pip AI
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                      Need help choosing? Click the Pip button on bottom right for instant specs guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 animate-fadeIn">
          <div className="flex flex-col space-y-4 text-base font-medium">
            <Link
              to="/store"
              className="py-2 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white hover:text-mango-500"
            >
              Store Home
            </Link>
            {NAV_ITEMS.filter(i => i.key !== 'store').map(item => (
              <Link
                key={item.key}
                to={item.route}
                className="py-2 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:text-mango-500 flex items-center justify-between"
              >
                <span>{item.name}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
            ))}
            <Link
              to="/sound"
              className="py-2 border-b border-neutral-200/60 dark:border-neutral-800/60 text-mango-600 dark:text-mango-400 font-semibold flex items-center gap-2"
            >
              <Music className="w-4 h-4" />
              Mango Sound
            </Link>
            <Link
              to="/care"
              className="py-2 border-b border-neutral-200/60 dark:border-neutral-800/60 text-mango-600 dark:text-mango-400 font-semibold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Mango Care+
            </Link>
            <Link
              to="/support"
              className="py-2 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-800 dark:text-neutral-200 font-semibold flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Mango Support
            </Link>
            <Link
              to="/orders"
              className="py-2 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-800 dark:text-neutral-200 font-semibold flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Order Status & Tracking
            </Link>
            <Link
              to="/bag"
              className="py-2 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-800 dark:text-neutral-200 font-semibold flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Review Bag</span>
              </div>
              {totalItems > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-mango-500 text-white dark:text-black font-bold text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-sm text-neutral-500">Theme mode</span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-mango-400" /> : <Moon className="w-3.5 h-3.5" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
