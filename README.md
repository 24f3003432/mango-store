# 🥭 Mango — Original Consumer Electronics Storefront

> An original, modern consumer electronics e-commerce web platform inspired by the structural elegance of flagship tech retailers, designed with strict intellectual property and brand independence.

---

## 🌟 Overview & Philosophy

**Mango** is a consumer hardware showcase and e-commerce experience. It demonstrates a complete end-to-end shopping loop with:
- Global mega-menu navigation and smooth category flyouts.
- Parametric category pages with interactive carousels, feature stories, and recommendation widgets.
- Highly configurable Product Detail Pages (PDP) with real-time spec and color pricing.
- Synchronized shopping cart drawer and dedicated `/bag` surface with promotional discount calculations.
- Seamless 3-step express checkout modal with celebratory confetti feedback.
- Live order status and package tracking with simulated courier milestones at `/orders`.
- Category-first self-service customer care, appointment scheduler, and documentation at `/support`.
- Real-time multi-index search overlay across models and support guides (`Cmd+K`).
- In-product AI companion: **Pip**.

---

## 🧭 Naming Map & Brand Compliance

Mango was engineered with strict IP boundaries and brand originality:
- **Company Name**: Mango Inc.
- **Brand Mark**: Original mango-fruit silhouette with emerald leaf.
- **Original Silicon**: Mango Core G4, G4 Pro, G4 Ultra, Mobile G18 Pro, Neural Engine 32-Core.
- **AI Assistant**: Pip.
- **Display Tech**: Liquid UltraVision, Liquid XDR Pro, 120Hz ProFlow.
- **Power Architecture**: MagLock Magnetic Rapid Charging.

### Route Mapping

| Category | Route | Display Name |
| :--- | :--- | :--- |
| Laptop | `/store/laptop` | Laptop |
| Tablet | `/store/tablet` | Tablet |
| Phone | `/store/phone` | Phone |
| Wearable | `/store/wearable` | Wearable |
| Headset | `/store/headset` | Headset |
| Earbuds | `/store/earbuds` | Earbuds |
| Screens & Home | `/store/screens-home` | Screens & Home |
| Entertainment | `/store/entertainment` | Entertainment |
| Accessories | `/store/accessories` | Accessories |
| Tracker | `/store/tracker` | Tracker |
| Gift Card | `/store/giftcard` | Gift Card |
| Mango Sound | `/sound` | Mango Sound |
| Mango Care+ | `/care` | Mango Care+ |
| Customer Support | `/support` | Mango Support |
| Shopping Bag | `/bag` | Review Bag |
| Order Tracking | `/orders` | Order Status & History |

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS (with custom Mango design tokens: amber accents, dark glassmorphism)
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, CSS transitions
- **State Management**: React Context (`CartContext`, `ThemeContext`) + `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/24f3003432/mango-store.git
cd mango-store

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will launch on `http://localhost:3000/`.

### Production Build

```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

MIT License. Built for hackathon showcase evaluation.
