import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { GlobalHeader } from './components/common/GlobalHeader';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { CartDrawer } from './components/common/CartDrawer';
import { CheckoutModal } from './components/common/CheckoutModal';
import { PipAssistant } from './components/common/PipAssistant';
import { ScrollToTop } from './components/common/ScrollToTop';

import { StoreHome } from './pages/StoreHome';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SoundPage } from './pages/SoundPage';
import { CarePage } from './pages/CarePage';
import { SupportPage } from './pages/SupportPage';
import { BagPage } from './pages/BagPage';
import { OrdersPage } from './pages/OrdersPage';

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            {/* Global Header & Navigation */}
            <AnnouncementBar />
            <GlobalHeader onOpenSearch={() => setIsSearchOpen(true)} />

            {/* Main Content View */}
            <main className="flex-1">
              <Routes>
                {/* Store Front */}
                <Route path="/" element={<Navigate to="/store" replace />} />
                <Route path="/store" element={<StoreHome />} />

                {/* Specific Category Routes from Naming Map (each uses ONE shared template) */}
                <Route path="/store/laptop" element={<CategoryPage explicitCategory="laptop" />} />
                <Route path="/store/tablet" element={<CategoryPage explicitCategory="tablet" />} />
                <Route path="/store/phone" element={<CategoryPage explicitCategory="phone" />} />
                <Route path="/store/wearable" element={<CategoryPage explicitCategory="wearable" />} />
                <Route path="/store/headset" element={<CategoryPage explicitCategory="headset" />} />
                <Route path="/store/earbuds" element={<CategoryPage explicitCategory="earbuds" />} />
                <Route path="/store/screens-home" element={<CategoryPage explicitCategory="screens-home" />} />
                <Route path="/store/entertainment" element={<CategoryPage explicitCategory="entertainment" />} />
                <Route path="/store/accessories" element={<CategoryPage explicitCategory="accessories" />} />
                <Route path="/store/tracker" element={<CategoryPage explicitCategory="tracker" />} />
                <Route path="/store/giftcard" element={<CategoryPage explicitCategory="giftcard" />} />

                {/* Generic Category fallback */}
                <Route path="/store/:categoryKey" element={<CategoryPage />} />

                {/* Product Detail / Configurator Route */}
                <Route path="/store/:category/:productId" element={<ProductDetailPage />} />

                {/* Dedicated Service & Support Routes */}
                <Route path="/sound" element={<SoundPage />} />
                <Route path="/care" element={<CarePage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/bag" element={<BagPage />} />
                <Route path="/orders" element={<OrdersPage />} />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/store" replace />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Overlays and Modals */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <CartDrawer />
            <CheckoutModal />
            <PipAssistant />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
