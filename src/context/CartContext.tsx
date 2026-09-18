import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data/supportAndOrders';

interface AppliedPromo {
  code: string;
  description: string;
  discountAmount: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  subtotal: number;
  totalItems: number;
  totalTradeIn: number;
  promoDiscount: number;
  appliedPromo: AppliedPromo | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  tax: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mango-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);

  useEffect(() => {
    localStorage.setItem('mango-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = `${item.productId}-${item.selectedColor.name}-${item.selectedStorage?.size || 'base'}-${item.hasCarePlus ? 'care' : 'nocare'}`;
    
    setCart(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => 
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, cartItemId }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(i => (i.cartItemId === cartItemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    const itemBase = item.unitPrice * item.quantity;
    const careAddon = item.hasCarePlus ? item.carePlusPrice * item.quantity : 0;
    return sum + itemBase + careAddon;
  }, 0);

  const totalTradeIn = cart.reduce((sum, item) => sum + (item.tradeInCredit * item.quantity), 0);

  // Calculate promo discount
  let promoDiscount = 0;
  if (appliedPromo) {
    const match = PROMO_CODES[appliedPromo.code.toUpperCase()];
    if (match) {
      if (match.discountPercent) {
        promoDiscount = Math.round((subtotal * match.discountPercent) / 100);
      } else if (match.fixedDiscount) {
        promoDiscount = Math.min(subtotal, match.fixedDiscount);
      }
    }
  }

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    const found = PROMO_CODES[clean];
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try MANGO10 or STUDENT15' };
    }

    let discountAmount = 0;
    if (found.discountPercent) {
      discountAmount = Math.round((subtotal * found.discountPercent) / 100);
    } else if (found.fixedDiscount) {
      discountAmount = Math.min(subtotal, found.fixedDiscount);
    }

    setAppliedPromo({
      code: clean,
      description: found.description,
      discountAmount
    });

    return { success: true, message: `Promo code ${clean} applied! ${found.description}` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const taxableAmount = Math.max(0, subtotal - totalTradeIn - promoDiscount);
  const tax = Math.round(taxableAmount * 0.08); // 8% tax
  const finalTotal = Math.max(0, taxableAmount + tax);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        subtotal,
        totalItems,
        totalTradeIn,
        promoDiscount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        tax,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
