import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, ArrowRight, Laptop, Tablet, Smartphone, Watch, Headphones, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { ALL_PRODUCTS } from '../../data/products';
import { SUPPORT_ARTICLES } from '../../data/supportAndOrders';
import { Product, SupportArticle } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [supportResults, setSupportResults] = useState<SupportArticle[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'support'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setProductResults([]);
      setSupportResults([]);
      setActiveTab('all');
    }
  }, [isOpen]);

  // Handle Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live filter across models AND support articles
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setProductResults([]);
      setSupportResults([]);
      return;
    }

    const filteredProducts = ALL_PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.chip && p.chip.toLowerCase().includes(q))
    );

    const filteredSupport = SUPPORT_ARTICLES.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
    );

    setProductResults(filteredProducts);
    setSupportResults(filteredSupport);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (product: Product) => {
    onClose();
    navigate(`/store/${product.category}/${product.id}`);
  };

  const handleSelectArticle = () => {
    onClose();
    navigate('/support');
  };

  const totalResults = productResults.length + supportResults.length;

  const quickLinks = [
    { label: 'Laptop Pro', route: '/store/laptop/laptop-pro', icon: Laptop },
    { label: 'Phone Ultra', route: '/store/phone/phone-ultra', icon: Smartphone },
    { label: 'Tablet Pro', route: '/store/tablet/tablet-pro', icon: Tablet },
    { label: 'Wearable Ultra', route: '/store/wearable/wearable-ultra', icon: Watch },
    { label: 'Earbuds Pro', route: '/store/earbuds/earbuds-pro', icon: Headphones },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-start justify-center pt-14 sm:pt-20 px-4 animate-fadeIn">
      <div 
        className="bg-white dark:bg-[#16171A] w-full max-w-2xl rounded-mango shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-mango-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Mango models, silicon, accessories, and support articles..."
            className="w-full bg-transparent text-base text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs when query is active */}
        {query.trim() !== '' && totalResults > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Results ({totalResults})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Models ({productResults.length})
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeTab === 'support'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Support Articles ({supportResults.length})
            </button>
          </div>
        )}

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
                Quick Model Shortcuts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.label}
                      onClick={() => {
                        onClose();
                        navigate(link.route);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/70 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-mango-500" />
                        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-mango-600 dark:group-hover:text-mango-400">
                          {link.label}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-mango-500 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-mango-500" />
                  Live search queries all hardware models and support articles
                </span>
                <span className="hidden sm:inline text-neutral-400">ESC to close</span>
              </div>
            </div>
          ) : totalResults > 0 ? (
            <div className="space-y-6">
              {/* Product Results */}
              {(activeTab === 'all' || activeTab === 'products') && productResults.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Mango Hardware ({productResults.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {productResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/70 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.colors[0]?.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-contain bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 p-1"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-mango-500 transition-colors">
                                {product.name}
                              </h4>
                              {product.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-mango-100 dark:bg-mango-950 text-mango-600 dark:text-mango-400">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 line-clamp-1">
                              {product.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="font-bold text-sm text-neutral-900 dark:text-white">
                            ${product.basePrice.toLocaleString()}
                          </span>
                          <span className="block text-[10px] text-mango-600 dark:text-mango-400 font-bold">
                            Configure &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Article Results */}
              {(activeTab === 'all' || activeTab === 'support') && supportResults.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Support Articles ({supportResults.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {supportResults.map((article) => (
                      <div
                        key={article.id}
                        onClick={handleSelectArticle}
                        className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/70 cursor-pointer transition-colors group flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-mango-500 transition-colors">
                                {article.title}
                              </h4>
                              <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                                {article.category}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                              {article.summary}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] text-neutral-400 shrink-0">
                          {article.readTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                No matching Mango products or support articles found for "{query}"
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Try searching for "Laptop", "Battery", "Migration", "Stylus", or "OLED"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
