import { SupportArticle, OrderRecord } from '../types';

export const SUPPORT_ARTICLES: SupportArticle[] = [
  // --- LAPTOP ---
  {
    id: 'laptop-migration',
    category: 'laptop',
    title: 'How to wirelessly transfer files to your new Mango Laptop',
    summary: 'Step-by-step instructions for using the Mango Migration Assistant to transfer apps, documents, and passwords.',
    readTime: '3 min read',
    content: 'Connect both laptops to the same Wi-Fi network. Launch Mango Migration Assistant from Utilities, select your source device, verify the 6-digit security code, and choose which folders to migrate.'
  },
  {
    id: 'laptop-battery-optimization',
    category: 'laptop',
    title: 'Optimizing battery longevity on Mango Core silicon',
    summary: 'Understand intelligent thermal balancing, optimized charging cycles, and Low Energy reserve mode.',
    readTime: '4 min read',
    content: 'MangoOS features adaptive power regulation that studies your daily charging routine to preserve chemical health. You can also manually toggle Low Energy mode in Settings > Battery.'
  },
  {
    id: 'laptop-external-displays',
    category: 'laptop',
    title: 'Connecting multiple 5K and 6K displays via Thunderbolt',
    summary: 'Hardware requirements, refresh rate configurations, and Daisy-Chain hub wiring.',
    readTime: '5 min read',
    content: 'Laptop Pro models equipped with Mango Core G4 Ultra support up to four simultaneous 6K displays at 60Hz over dedicated Thunderbolt 4 buses without frame dropping.'
  },

  // --- TABLET ---
  {
    id: 'tablet-stylus-pairing',
    category: 'tablet',
    title: 'Pairing and calibrating your Stylus Pen Pro',
    summary: 'How to snap magnetically, calibrate pressure sensitivity curves, and customize double-tap gestures.',
    readTime: '2 min read',
    content: 'Attach your Stylus Pen Pro to the magnetic connector on the right edge of Tablet Pro. A connection banner will appear. Navigate to Settings > Stylus to configure haptic intensity.'
  },
  {
    id: 'tablet-pip-multitasking',
    category: 'tablet',
    title: 'Multitasking with Pip Split Canvas on Tablet',
    summary: 'Run up to four overlapping workspace windows with instant window snapping and resizable workspaces.',
    readTime: '4 min read',
    content: 'Swipe upward from the bottom corner to open the Pip Workspace Manager. Drag app icons into the stage area to group tasks and preview running background rendering pipelines.'
  },

  // --- PHONE ---
  {
    id: 'phone-esim-transfer',
    category: 'phone',
    title: 'Transferring an eSIM from your previous smartphone',
    summary: 'Fast carrier transfer without physical SIM trays using Bluetooth device proximity.',
    readTime: '3 min read',
    content: 'Hold your previous phone beside your new Phone during initial setup. A prompt will appear asking to authorize the wireless eSIM carrier profile transfer.'
  },
  {
    id: 'phone-action-control',
    category: 'phone',
    title: 'Customizing the capacitive Pip Action Camera Button',
    summary: 'Reassign shutter sensitivity, light exposure sliders, and favorite focus presets.',
    readTime: '3 min read',
    content: 'Go to Settings > Camera > Action Button. You can assign light taps to exposure locks, sliding gestures to optical zoom lenses, or single presses to instant video recording.'
  },

  // --- WEARABLE ---
  {
    id: 'wearable-vital-monitoring',
    category: 'wearable',
    title: 'Setting up cardio vitals and sleep disturbance tracking',
    summary: 'Calibrate optical heart sensors and activate FDA-cleared respiratory alerts.',
    readTime: '4 min read',
    content: 'Wear your Mango Wearable snugly above the wrist bone while sleeping. Ensure Sleep Mode is toggled on. The Mango Health app will analyze 30-day baseline vitals.'
  },
  {
    id: 'wearable-gps-routes',
    category: 'wearable',
    title: 'Using offline topographic trail maps on Wearable Ultra',
    summary: 'Download high-resolution contour trails and enable GPS backtrack navigation without cellular reception.',
    readTime: '3 min read',
    content: 'Open the Compass app on your Wearable Ultra and tap the Waypoint icon. If you lose signal, tap Backtrack to retrace your exact footstep coordinates.'
  },

  // --- HEADSET ---
  {
    id: 'headset-gesture-calibration',
    category: 'headset',
    title: 'Calibrating eye tracking and pinch gesture precision',
    summary: 'Fine-tune the 12 spatial cameras to match your pupillary distance and room ambient lighting.',
    readTime: '3 min read',
    content: 'Put on Headset Spatial and press the Top Crown button three times. Follow the glowing amber dot around your visual field to recalibrate micro-gaze tracking.'
  },

  // --- EARBUDS ---
  {
    id: 'earbuds-fit-test',
    category: 'earbuds',
    title: 'Ear Tip Fit Test and Adaptive Noise Cancellation setup',
    summary: 'Acoustic audio seal evaluation using the internal ear canal microphone.',
    readTime: '2 min read',
    content: 'Place Earbuds Pro in your ears, navigate to Settings > Earbuds Pro > Ear Tip Fit Test, and tap Play. The diagnostic chime will evaluate whether you have an optimal acoustic seal.'
  },

  // --- SCREENS & HOME ---
  {
    id: 'screen-true-color-calibration',
    category: 'screens-home',
    title: 'Calibrating Screen Studio 5K for Rec.709 and DCI-P3 grading',
    summary: 'Selecting factory reference presets and setting ambient lighting compensation.',
    readTime: '4 min read',
    content: 'Open System Settings > Displays > Presets. Choose Mango Studio Master (P3-D65) for cinematic video grading with locked 500 nits reference brightness.'
  }
];

export const MOCK_ORDERS: OrderRecord[] = [
  {
    id: 'MNG-849201',
    date: 'September 16, 2026',
    status: 'Out for Delivery',
    statusStep: 3,
    trackingNumber: '1Z9999999999999999',
    carrier: 'Mango Express Courier',
    estimatedDelivery: 'Today by 2:30 PM',
    items: [
      {
        name: 'Laptop Pro 16"',
        color: 'Amber Sun Gold',
        storage: '1TB Pro SSD',
        price: 2199,
        quantity: 1,
        image: '/assets/laptop_pro.jpg'
      },
      {
        name: 'MagLock Rapid Charger',
        color: 'Ceramic White',
        price: 129,
        quantity: 1,
        image: '/assets/maglock_charger.jpg'
      }
    ],
    subtotal: 2328,
    discount: 150,
    tax: 174,
    total: 2352,
    shippingAddress: {
      name: 'Alex Morgan',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107'
    }
  },
  {
    id: 'MNG-721094',
    date: 'September 12, 2026',
    status: 'Delivered',
    statusStep: 4,
    trackingNumber: '1Z8888888888888888',
    carrier: 'Mango Express Priority',
    estimatedDelivery: 'Delivered on Sep 14, 2026',
    items: [
      {
        name: 'Phone Ultra',
        color: 'Desert Titanium',
        storage: '512GB Flash Storage',
        price: 1399,
        quantity: 1,
        image: '/assets/phone_ultra.jpg'
      },
      {
        name: 'Earbuds Pro',
        color: 'Classic White',
        price: 249,
        quantity: 1,
        image: '/assets/earbuds_pro.jpg'
      }
    ],
    subtotal: 1648,
    discount: 0,
    tax: 131,
    total: 1779,
    shippingAddress: {
      name: 'Alex Morgan',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107'
    }
  },
  {
    id: 'MNG-994120',
    date: 'September 18, 2026',
    status: 'Preparing',
    statusStep: 2,
    trackingNumber: 'MNG-PENDING-EXP',
    carrier: 'Mango Fulfillment Center',
    estimatedDelivery: 'Tomorrow, Sep 19 by 10:30 AM',
    items: [
      {
        name: 'Tablet Pro 13"',
        color: 'Space Black',
        storage: '256GB Storage',
        price: 1299,
        quantity: 1,
        image: '/assets/tablet_pro.jpg'
      },
      {
        name: 'Stylus Pen Pro',
        color: 'Matte White',
        price: 129,
        quantity: 1,
        image: '/assets/stylus_pen.jpg'
      }
    ],
    subtotal: 1428,
    discount: 100,
    tax: 106,
    total: 1434,
    shippingAddress: {
      name: 'Alex Morgan',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107'
    }
  }
];

export const PROMO_CODES: Record<string, { discountPercent?: number; fixedDiscount?: number; description: string }> = {
  'MANGO10': { discountPercent: 10, description: '10% off your entire order' },
  'STUDENT15': { fixedDiscount: 150, description: '$150 off student hardware bundle' },
  'HACKATHON': { discountPercent: 15, description: '15% Hackathon Celebration Discount' },
  'FREESHIP': { fixedDiscount: 0, description: 'Free priority courier shipping applied' }
};
