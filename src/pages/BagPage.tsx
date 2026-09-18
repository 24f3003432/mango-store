import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  Truck, 
  RotateCcw, 
  Lock, 
  Check,
  X,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BagPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalTradeIn,
    promoDiscount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    tax,
    finalTotal,
    setIsCheckoutOpen
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput);
    if (result.success) {
      setPromoMessage({ type: 'success', text: result.message });
      setPromoInput('');
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#901435', '#C4284D', '#F9CBD6']
        });
      } catch {
        // ignore
      }
    } else {
      setPromoMessage({ type: 'error', text: result.message });
    }
  };

  const monthlyPayment = Math.round(finalTotal / 24);

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#0C0D0E] text-neutral-900 dark:text-neutral-100 transition-colors py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-neutral-200/80 dark:border-neutral-800 pb-6">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Review your Bag.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Complimentary next-day express delivery and 14-day free returns on every order.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="text-center py-20 bg-white dark:bg-[#16171A] rounded-mango-lg border border-neutral-200 dark:border-neutral-800 shadow-card max-w-2xl mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-mango-100 dark:bg-mango-950 text-mango-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
              Your Bag is Empty
            </h2>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-2 leading-relaxed">
              Items you configure will be saved here ready for checkout. Explore our latest laptops, phones, and accessories.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/store/laptop"
                className="px-5 py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs shadow-mango-sm transition-all"
              >
                Shop Laptops
              </Link>
              <Link
                to="/store/phone"
                className="px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 font-bold text-xs transition-colors"
              >
                Shop Phones
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Line Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500 pb-2">
                <span>Item Details</span>
                <span>Subtotal</span>
              </div>

              {cart.map((item) => {
                const itemTotal = (item.unitPrice + (item.hasCarePlus ? item.carePlusPrice : 0) - item.tradeInCredit) * item.quantity;

                return (
                  <div
                    key={item.cartItemId}
                    className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800 shadow-card flex flex-col sm:flex-row gap-6 transition-all"
                  >
                    {/* Item Image */}
                    <img
                      src={item.selectedColor.image}
                      alt={item.name}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-contain bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700 p-2 shrink-0 self-center sm:self-start"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-extrabold text-lg text-neutral-900 dark:text-white leading-tight">
                              {item.name}
                            </h3>
                            <div className="mt-1 space-y-0.5 text-xs text-neutral-500">
                              <p>Finish: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.selectedColor.name}</span></p>
                              {item.selectedStorage && (
                                <p>Storage: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.selectedStorage.size}</span></p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-neutral-400 hover:text-red-500 p-1.5 transition-colors"
                            title="Remove item from bag"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Badges: Mango Care+ & Trade-In */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.hasCarePlus && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-mango-50 dark:bg-mango-950/60 text-mango-700 dark:text-mango-300 text-[11px] font-bold border border-mango-200 dark:border-mango-900/50">
                              <ShieldCheck className="w-3.5 h-3.5 text-mango-500" />
                              Mango Care+ Included (+${item.carePlusPrice})
                            </span>
                          )}
                          {item.tradeInCredit > 0 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-900/50">
                              Instant Trade-in Deduction: -${item.tradeInCredit}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector & Item Total */}
                      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-1.5">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-neutral-400 block">${item.unitPrice} each</span>
                          <span className="font-black text-lg text-neutral-900 dark:text-white">
                            ${itemTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Delivery Assurance Strip */}
              <div className="p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Free next-day express shipping applied to entire order</span>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800 shadow-card space-y-6 sticky top-24">
                <h3 className="font-black text-lg text-neutral-900 dark:text-white">
                  Order Summary
                </h3>

                {/* Promo Code Field */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Promo / Student Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Try MANGO10 or STUDENT15"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-mango-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black font-bold text-xs transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>

                  {promoMessage && (
                    <p className={`text-[11px] font-semibold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {promoMessage.text}
                    </p>
                  )}

                  {appliedPromo && (
                    <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                        <Check className="w-3.5 h-3.5" />
                        <span>{appliedPromo.code}: {appliedPromo.description}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-neutral-400 hover:text-red-500 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </form>

                {/* Subtotals Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">${subtotal.toLocaleString()}</span>
                  </div>

                  {totalTradeIn > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Trade-in Credit</span>
                      <span>-${totalTradeIn.toLocaleString()}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Promo Savings</span>
                      <span>-${promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Express Shipping</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-baseline">
                    <span className="font-bold text-base text-neutral-900 dark:text-white">Total</span>
                    <span className="font-black text-2xl text-mango-600 dark:text-mango-400">
                      ${finalTotal.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-400 text-center pt-1">
                    or ${monthlyPayment}/mo. for 24 months with 0% APR on Mango Card
                  </p>
                </div>

                {/* Primary Checkout CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-4 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-mango-glow hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2 text-[11px] text-neutral-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-mango-500" />
                    <span>256-bit encrypted secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-neutral-400" />
                    <span>14 days hassle-free return guarantee</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
