import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalTradeIn,
    tax,
    finalTotal,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#151619] shadow-2xl border-l border-neutral-200 dark:border-neutral-800 flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-mango-500" />
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                Review your Bag
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-mango-50 dark:bg-mango-950/40 text-mango-500 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Your Mango Bag is empty.
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Items you configure will be saved here ready for complimentary express delivery.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-semibold text-xs shadow-mango-sm transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = (item.unitPrice + (item.hasCarePlus ? item.carePlusPrice : 0) - item.tradeInCredit) * item.quantity;
                return (
                  <div
                    key={item.cartItemId}
                    className="p-4 rounded-mango bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 flex gap-4 transition-all"
                  >
                    <img
                      src={item.selectedColor.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover bg-white dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-sm text-neutral-900 dark:text-white leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Color: <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.selectedColor.name}</span>
                          </p>
                          {item.selectedStorage && (
                            <p className="text-xs text-neutral-500">
                              Capacity: {item.selectedStorage.size}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.hasCarePlus && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-mango-600 dark:text-mango-400 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Mango Care+ Protection Included (+${item.carePlusPrice})</span>
                        </div>
                      )}

                      {item.tradeInCredit > 0 && (
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                          Estimated Trade-in: -${item.tradeInCredit}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-neutral-900 dark:text-white">
                          ${itemTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {totalTradeIn > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Trade-in Credit</span>
                    <span>-${totalTradeIn.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Express Courier Shipping</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-base font-bold text-neutral-900 dark:text-white">
                  <span>Total</span>
                  <span>${finalTotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-neutral-400 text-center pt-1">
                  or as low as ${Math.round(finalTotal / 24)}/mo. for 24 mo. with 0% APR Mango Card
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-sm flex items-center justify-center gap-2 shadow-mango-glow transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/bag"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Review Bag & Promo Codes</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
