import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Lock, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MangoLogo } from './MangoLogo';

import { useNavigate } from 'react-router-dom';
import { OrderRecord } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, finalTotal, subtotal, totalTradeIn, promoDiscount, tax, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [orderNumber, setOrderNumber] = useState('');

  // Shipping form state
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    deliveryMethod: 'express'
  });

  if (!isCheckoutOpen) return null;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = 'MNG-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);

    // Save to localStorage for OrdersPage tracking
    try {
      const newOrder: OrderRecord = {
        id: randomOrder,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: 'Preparing',
        statusStep: 2,
        trackingNumber: 'MNG-EXP-' + Math.floor(10000000 + Math.random() * 90000000),
        carrier: 'Mango Express Courier',
        estimatedDelivery: 'Tomorrow by 10:30 AM',
        items: cart.map(item => ({
          name: item.name,
          color: item.selectedColor.name,
          storage: item.selectedStorage?.size,
          price: item.unitPrice,
          quantity: item.quantity,
          image: item.selectedColor.image
        })),
        subtotal,
        discount: totalTradeIn + promoDiscount,
        tax,
        total: finalTotal,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`.trim() || 'Alex Morgan',
          street: formData.address || '742 Evergreen Terrace',
          city: formData.city || 'San Francisco',
          state: formData.state || 'CA',
          zip: formData.zip || '94107'
        }
      };

      const existingStr = localStorage.getItem('mango_orders');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('mango_orders', JSON.stringify([newOrder, ...existing]));
    } catch {
      // ignore
    }

    setStep('confirmed');

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#901435', '#C4284D', '#F9CBD6', '#680A23', '#FFFFFF']
      });
    } catch {
      // ignore
    }
  };

  const handleFinish = (targetRoute?: string) => {
    clearCart();
    setIsCheckoutOpen(false);
    setStep('shipping');
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white dark:bg-[#16171A] w-full max-w-xl rounded-mango-lg shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MangoLogo size={22} />
            <span className="font-bold text-base text-neutral-900 dark:text-white">
              Mango Express Checkout
            </span>
          </div>
          {step !== 'confirmed' && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step 1: Shipping */}
        {step === 'shipping' && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-mango-600 dark:text-mango-400 flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Step 1: Delivery Address
              </span>
              <span className="text-xs text-neutral-500">{cart.length} item(s)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mango-500"
                />
              </div>
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mango-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mango-500"
                />
              </div>
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mango-500"
                />
              </div>
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mango-500"
                />
              </div>
            </div>

            <div className="bg-mango-50/70 dark:bg-mango-950/30 p-3 rounded-xl border border-mango-200/60 dark:border-mango-900/40 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-mango-800 dark:text-mango-300 font-medium">
                <Truck className="w-4 h-4 text-mango-500" />
                <span>Complimentary Express Courier</span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
            </div>

            <button
              onClick={() => setStep('payment')}
              className="w-full py-3 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-mango-sm"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteOrder} className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-mango-600 dark:text-mango-400 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" /> Step 2: Payment Simulator
              </span>
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs text-mango-600 hover:underline"
              >
                Back to shipping
              </button>
            </div>

            {/* Payment Method selector */}
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3.5 rounded-xl border-2 border-mango-500 bg-mango-50/30 dark:bg-mango-950/20 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-mango-500 bg-white" />
                  <div>
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white block">
                      Mango Pay 0% APR Financing
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      ${Math.round(finalTotal / 24)}/mo. for 24 months with 0% interest
                    </span>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-mango-500" />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-600" />
                  <div>
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white block">
                      Credit / Debit Card
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Instant charge of ${finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-neutral-400" />
              </label>
            </div>

            {/* Order Summary box */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {totalTradeIn > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Trade-in Credit:</span>
                  <span>-${totalTradeIn.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Estimated Tax:</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between font-bold text-sm text-neutral-900 dark:text-white">
                <span>Total Due:</span>
                <span className="text-mango-600 dark:text-mango-400">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-sm flex items-center justify-center gap-2 shadow-mango-glow transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Authorize & Place Order</span>
            </button>
          </form>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 'confirmed' && (
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Thank You for Choosing Mango!
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Your order is confirmed and being prepared at our fulfillment center.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order Number:</span>
                <span className="font-mono font-bold text-mango-600 dark:text-mango-400">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">Tomorrow by 10:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Sent confirmation to:</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">{formData.email}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <button
                onClick={() => handleFinish('/orders')}
                className="flex-1 py-3 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs shadow-mango-sm transition-all"
              >
                Track in My Orders
              </button>
              <button
                onClick={() => handleFinish('/store')}
                className="flex-1 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
