import { CategoryInfo, CategoryKey, Product } from '../types';

export const CATEGORIES_DATA: Record<CategoryKey, CategoryInfo> = {
  laptop: {
    key: 'laptop',
    route: '/store/laptop',
    displayName: 'Laptop',
    headline: 'Powerhouse. Featherlight.',
    subheadline: 'Engineered with Mango Silicon M-Core architecture for all-day creative work and relentless speed.',
    iconName: 'Laptop',
    heroImage: '/assets/laptop_pro.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'laptops', label: 'Laptops' },
      { id: 'desktops', label: 'Desktops' },
      { id: 'displays', label: 'Displays' }
    ],
    featureHighlights: [
      {
        title: 'M-Core 3 Ultra Silicon',
        subtitle: 'Peak Compute Density',
        description: 'Over 100 billion transistors unified in a 3nm architecture delivering 4x faster GPU render speeds while sipping minimal power.',
        image: '/assets/laptop_pro.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        badge: 'Architecture'
      },
      {
        title: 'Liquid XDR Pro Display',
        subtitle: '1,600 Nits Luminance',
        description: 'Mini-LED backlighting with extreme dynamic range, 1,000,000:1 contrast ratio, and 120Hz ProFlow adaptive refresh.',
        image: '/assets/laptop_pro.jpg',
        badge: 'Display'
      },
      {
        title: '22-Hour Battery Endurance',
        subtitle: 'Unplugged All Day Long',
        description: 'Work anywhere from sunrise to late night without looking for a charger. Fast recharge delivers 50% battery in 30 minutes.',
        image: '/assets/laptop_air.jpg',
        badge: 'Endurance'
      },
      {
        title: 'Pip AI Deep Acceleration',
        subtitle: 'Neural Engine 32-Core',
        description: 'Locally run LLMs and creative generative models at instantaneous speeds with complete on-device privacy.',
        image: '/assets/laptop_pro_spaceblack.jpg',
        badge: 'Pip Intelligence'
      }
    ],
    legalText: '1. Battery life reflects continuous web browsing or movie playback on Laptop Pro 16". Testing conducted by Mango Labs in August 2026. 2. Screen size is measured diagonally. Actual viewable area is slightly less due to rounded corners.',
    models: [
      { name: 'Laptop Pro', route: '/store/laptop/laptop-pro', image: '/assets/laptop_pro.jpg', badge: 'Flagship' },
      { name: 'Laptop Studio', route: '/store/laptop/laptop-studio', image: '/assets/laptop_pro_spaceblack.jpg', badge: 'Maximum Power' },
      { name: 'Laptop Air', route: '/store/laptop/laptop-air', image: '/assets/laptop_air.jpg', badge: 'Popular' },
      { name: 'Laptop Lite', route: '/store/laptop/laptop-lite', image: '/assets/laptop_pro_silver.jpg' }
    ]
  },
  tablet: {
    key: 'tablet',
    route: '/store/tablet',
    displayName: 'Tablet',
    headline: 'Your next workstation is not a computer.',
    subheadline: 'Ultra-thin OLED canvas, magnetic stylus precision, and the capability of Pip multitasking.',
    iconName: 'Tablet',
    heroImage: '/assets/tablet_pro.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'pro', label: 'Pro Tablets' },
      { id: 'air', label: 'Everyday Air' },
      { id: 'mini', label: 'Compact' }
    ],
    featureHighlights: [
      {
        title: 'Ultra Tandem OLED Panel',
        subtitle: 'Dual-Stack Luminescence',
        description: 'Two stacked OLED layers achieve sub-millimeter thinness with 1,000 nits full-screen brightness and inky true blacks.',
        image: '/assets/tablet_pro.jpg',
        badge: 'Innovation'
      },
      {
        title: 'Stylus Pen Pro Haptics',
        subtitle: 'Feel Every Stroke',
        description: 'An internal haptic engine pulses gently as you sketch, providing the tactile sensation of pencil on textured paper.',
        image: '/assets/stylus_pen.jpg',
        badge: 'Precision'
      },
      {
        title: 'Impossibly Thin 5.1mm',
        subtitle: 'Thinnest Mango Device Ever',
        description: 'Precision milled aluminum chassis that slides into any sleeve while maintaining structural rigidity and thermal heat dissipation.',
        image: '/assets/tablet_pro.jpg',
        badge: 'Design'
      }
    ],
    legalText: '1. Display has rounded corners; measured diagonally as a standard rectangle, Tablet Pro screen is 13.0 inches. Actual viewable area is less. 2. Stylus Pen Pro sold separately.',
    models: [
      { name: 'Tablet Pro', route: '/store/tablet/tablet-pro', image: '/assets/tablet_pro.jpg', badge: 'Tandem OLED' },
      { name: 'Tablet Air', route: '/store/tablet/tablet-air', image: '/assets/tablet_pro.jpg' },
      { name: 'Tablet Lite', route: '/store/tablet/tablet-lite', image: '/assets/tablet_pro.jpg' },
      { name: 'Tablet Mini', route: '/store/tablet/tablet-mini', image: '/assets/tablet_pro.jpg' }
    ]
  },
  phone: {
    key: 'phone',
    route: '/store/phone',
    displayName: 'Phone',
    headline: 'Titanium precision. Pip intelligence.',
    subheadline: 'Equipped with 5x periscope telephoto, aerospace titanium enclosure, and Mango Neural Core 4.',
    iconName: 'Smartphone',
    heroImage: '/assets/phone_ultra.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'ultra', label: 'Pro & Ultra' },
      { id: 'standard', label: 'Standard' },
      { id: 'lite', label: 'Lite' }
    ],
    featureHighlights: [
      {
        title: 'Grade 5 Titanium Body',
        subtitle: 'High Strength-to-Weight',
        description: 'Aerospace-grade titanium alloy with physical vapor deposition coating creates an ultra-durable yet noticeably lighter frame.',
        image: '/assets/phone_ultra.jpg',
        badge: 'Craftsmanship'
      },
      {
        title: '48MP Quad-Sensor Optics',
        subtitle: '5x Periscope Telephoto',
        description: 'Periscope prism design reflects light four times inside the body to deliver crystal optical reach at 120mm focal equivalent.',
        image: '/assets/phone_ultra.jpg',
        badge: 'Optics'
      },
      {
        title: 'Pip Action Controller',
        subtitle: 'Capacitive Sliding Shutter',
        description: 'Slide your fingertip along the sapphire-crystal button to seamlessly adjust focal length, depth of field, and zoom.',
        image: '/assets/phone_standard.jpg',
        badge: 'Pip Action'
      }
    ],
    legalText: '1. Phone Ultra is splash, water, and dust resistant tested under controlled laboratory conditions with rating of IP68. Resistance decreases as a result of normal wear.',
    models: [
      { name: 'Phone Ultra', route: '/store/phone/phone-ultra', image: '/assets/phone_ultra.jpg', badge: 'Titanium Flagship' },
      { name: 'Phone Pro', route: '/store/phone/phone-pro', image: '/assets/phone_ultra_black.jpg' },
      { name: 'Phone Standard', route: '/store/phone/phone-standard', image: '/assets/phone_standard.jpg' },
      { name: 'Phone Lite', route: '/store/phone/phone-lite', image: '/assets/phone_ultra_white.jpg' }
    ]
  },
  wearable: {
    key: 'wearable',
    route: '/store/wearable',
    displayName: 'Wearable',
    headline: 'Smarter. Fitter. Unstoppable.',
    subheadline: 'Continuous vital monitoring, sapphire crystal, and up to 72 hours of multi-day endurance.',
    iconName: 'Watch',
    heroImage: '/assets/wearable_ultra.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'ultra', label: 'Ultra Adventure' },
      { id: 'pro', label: 'Pro Precision' },
      { id: 'active', label: 'Active Fitness' }
    ],
    featureHighlights: [
      {
        title: '3000 Nits Sapphire Screen',
        subtitle: 'Unshakable Sunlight Clarity',
        description: 'Our brightest wearable panel ever makes metrics and maps effortlessly readable even in intense desert noon glare.',
        image: '/assets/wearable_ultra.jpg',
        badge: 'Display'
      },
      {
        title: 'Dual-Frequency L1+L5 GPS',
        subtitle: 'Sub-Meter Precision Tracking',
        description: 'Combines multiple satellite constellations with intelligent routing algorithms to track workouts in deep urban canyons.',
        image: '/assets/wearable_black.jpg',
        badge: 'Navigation'
      },
      {
        title: 'Comprehensive Vital Sensors',
        subtitle: 'Cardio & Sleep Apnea Alerts',
        description: 'Advanced photoplethysmography sensors continuously record heart rhythm, SpO2, and nighttime breathing patterns.',
        image: '/assets/wearable_ultra.jpg',
        badge: 'Health'
      }
    ],
    legalText: '1. Mango Wearable health metrics are not intended for medical diagnosis. Consult healthcare professionals for health assessments.',
    models: [
      { name: 'Wearable Ultra', route: '/store/wearable/wearable-ultra', image: '/assets/wearable_ultra.jpg', badge: 'Extreme Sport' },
      { name: 'Wearable Pro', route: '/store/wearable/wearable-pro', image: '/assets/wearable_black.jpg' },
      { name: 'Wearable Standard', route: '/store/wearable/wearable-standard', image: '/assets/wearable_ultra.jpg' },
      { name: 'Wearable Active', route: '/store/wearable/wearable-active', image: '/assets/wearable_black.jpg' }
    ]
  },
  headset: {
    key: 'headset',
    route: '/store/headset',
    displayName: 'Headset',
    headline: 'Infinite canvas. Spatial reality.',
    subheadline: 'Seamlessly blend digital computing with physical surroundings through dual micro-OLED 4K eye engines.',
    iconName: 'Glasses',
    heroImage: '/assets/headset_spatial.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'spatial', label: 'Spatial Pro' },
      { id: 'studio', label: 'Studio XR' },
      { id: 'developer', label: 'Developer Edition' }
    ],
    featureHighlights: [
      {
        title: '23 Million Pixel Micro-OLED',
        subtitle: 'More Pixels Than A 4K TV Per Eye',
        description: 'Custom 3-element optics align microscopic pixels with your foveal vision for photorealistic digital fidelity.',
        image: '/assets/headset_spatial.jpg',
        badge: 'Visuals'
      },
      {
        title: 'Zero Controllers Needed',
        subtitle: 'Just Eyes, Hands, and Pip Voice',
        description: '12 high-speed tracking cameras read your gaze with uncanny accuracy. Simply pinch your index and thumb to select.',
        image: '/assets/headset_spatial.jpg',
        badge: 'Spatial OS'
      },
      {
        title: 'Infinite Panoramic Workspace',
        subtitle: 'Scale Displays to the Horizon',
        description: 'Mirror your Laptop or Tablet display in mid-air at 100 feet wide, perfectly pinned to your physical living room.',
        image: '/assets/headset_pro.jpg',
        badge: 'Productivity'
      }
    ],
    legalText: '1. Headset Spatial requires custom optical inserts for users with vision correction, sold separately. 2. Recommended for ages 13 and up.',
    models: [
      { name: 'Headset Spatial', route: '/store/headset/headset-spatial', image: '/assets/headset_spatial.jpg', badge: 'Spatial Era' },
      { name: 'Headset Studio XR', route: '/store/headset/headset-studio-xr', image: '/assets/headset_spatial.jpg' },
      { name: 'Headset Pro', route: '/store/headset/headset-pro', image: '/assets/headset_pro.jpg' }
    ]
  },
  earbuds: {
    key: 'earbuds',
    route: '/store/earbuds',
    displayName: 'Earbuds',
    headline: 'Immersive fidelity. Silence rewritten.',
    subheadline: 'Adaptive noise cancellation powered by the Mango Audio H2 chip with dynamic head-tracking soundscapes.',
    iconName: 'Headphones',
    heroImage: '/assets/earbuds_pro.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'pro', label: 'Pro In-Ear' },
      { id: 'studio', label: 'Over-Ear Studio' },
      { id: 'lite', label: 'Everyday Sound' }
    ],
    featureHighlights: [
      {
        title: 'Adaptive Audio Balancing',
        subtitle: 'Blends ANC and Transparency',
        description: 'Microphones sample environment sounds 48,000 times a second to soften loud sirens while passing conversations clearly.',
        image: '/assets/earbuds_pro.jpg',
        badge: 'Acoustics'
      },
      {
        title: 'Spatial Audio with Head Tracking',
        subtitle: 'Theater In Your Ears',
        description: 'Gyroscopes follow head movement so audio channels stay locked to your screen position as you move around.',
        image: '/assets/earbuds_black.jpg',
        badge: 'Immersion'
      },
      {
        title: 'MagLock Speaker Case',
        subtitle: 'Precision Find with UWB',
        description: 'The wireless case includes a built-in acoustic speaker and Mango Find chip to chime loudly when misplaced.',
        image: '/assets/earbuds_pro.jpg',
        badge: 'Charging'
      }
    ],
    legalText: '1. Spatial Audio works with compatible content in supported applications. 2. MagLock charging requires a compatible wireless charger.',
    models: [
      { name: 'Earbuds Pro', route: '/store/earbuds/earbuds-pro', image: '/assets/earbuds_pro.jpg', badge: 'Best Seller' },
      { name: 'Earbuds Studio', route: '/store/earbuds/earbuds-studio', image: '/assets/earbuds_black.jpg', badge: 'Hi-Fi Over-Ear' },
      { name: 'Earbuds Sound', route: '/store/earbuds/earbuds-sound', image: '/assets/earbuds_pro.jpg' },
      { name: 'Earbuds Lite', route: '/store/earbuds/earbuds-lite', image: '/assets/earbuds_black.jpg' }
    ]
  },
  'screens-home': {
    key: 'screens-home',
    route: '/store/screens-home',
    displayName: 'Screens & Home',
    headline: 'The heart of your connected space.',
    subheadline: 'Studio-grade color calibration displays and room-filling acoustics that communicate with your entire Mango ecosystem.',
    iconName: 'Tv',
    heroImage: '/assets/screen_cinema.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'displays', label: 'Pro Displays' },
      { id: 'audio', label: 'Smart Audio' },
      { id: 'hub', label: 'Home Hubs' }
    ],
    featureHighlights: [
      {
        title: '5K UltraVision Definition',
        subtitle: '14.7 Million Milled Pixels',
        description: 'Pixel density calibrated specifically to match MangoOS typography and graphic rendering for effortless eye comfort.',
        image: '/assets/screen_cinema.jpg',
        badge: 'Display'
      },
      {
        title: 'Room-Sensing Acoustics',
        subtitle: 'Real-Time Reflection Scan',
        description: 'Microphones evaluate room boundaries 200 times per second to automatically optimize frequency response.',
        image: '/assets/home_speaker.jpg',
        badge: 'Acoustics'
      },
      {
        title: 'Integrated Pip Smart Hub',
        subtitle: 'Matter & Thread Protocol',
        description: 'Controls lights, thermostats, and smart locks with encrypted local mesh communication.',
        image: '/assets/home_speaker.jpg',
        badge: 'Smart Home'
      }
    ],
    legalText: '1. Screen Studio 5K requires a compatible computer with Thunderbolt connectivity. 2. Smart home automation requires Matter compatible accessories.',
    models: [
      { name: 'Screen Studio 5K', route: '/store/screens-home/screen-studio-5k', image: '/assets/screen_cinema.jpg', badge: '5K UltraVision' },
      { name: 'Screen Cinema 6K', route: '/store/screens-home/screen-cinema-6k', image: '/assets/screen_cinema.jpg' },
      { name: 'Home Speaker 360', route: '/store/screens-home/home-speaker-360', image: '/assets/home_speaker.jpg' },
      { name: 'Home Hub Display', route: '/store/screens-home/home-hub-display', image: '/assets/home_speaker.jpg' }
    ]
  },
  entertainment: {
    key: 'entertainment',
    route: '/store/entertainment',
    displayName: 'Entertainment',
    headline: 'Cinema, gaming, and pure spectacle.',
    subheadline: 'Dolby Vision HDR streaming, Mango Arcade wireless gaming, and high-octane spatial audio in your living room.',
    iconName: 'Film',
    heroImage: '/assets/streamer_box.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'tv', label: 'Streaming' },
      { id: 'game', label: 'Arcade' }
    ],
    featureHighlights: [
      {
        title: '4K High Frame Rate HDR',
        subtitle: 'Buttery 60fps Cinematics',
        description: 'Vibrant Dolby Vision mastering and Dolby Atmos acoustic immersion for your home theater system.',
        image: '/assets/streamer_box.jpg',
        badge: 'Cinema'
      }
    ],
    legalText: '1. 4K and HDR streaming requires compatible 4K and HDR TV and content.',
    models: [
      { name: 'Streamer 4K', route: '/store/entertainment/streamer-4k', image: '/assets/streamer_box.jpg' },
      { name: 'Game Arc Controller', route: '/store/entertainment/game-arc-controller', image: '/assets/game_controller.jpg' }
    ]
  },
  accessories: {
    key: 'accessories',
    route: '/store/accessories',
    displayName: 'Accessories',
    headline: 'Crafted to complete your device.',
    subheadline: 'Finely milled magnetic leather, ultra-rapid inductive charging pads, and precision input styluses.',
    iconName: 'Sparkles',
    heroImage: '/assets/maglock_charger.jpg',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'cases', label: 'Cases & Folios' },
      { id: 'charging', label: 'Power & Docks' },
      { id: 'stylus', label: 'Input & Styluses' },
      { id: 'bands', label: 'Straps & Bands' }
    ],
    featureHighlights: [
      {
        title: 'MagLock Magnetic Alignment',
        subtitle: 'Snaps Securely Every Time',
        description: 'Array of neodymium magnets aligns perfectly to wireless charging coils for peak power delivery without slipping.',
        image: '/assets/maglock_charger.jpg',
        badge: 'MagLock'
      },
      {
        title: 'Micro-Twill Recycled Fabrics',
        subtitle: 'Eco-Suede Luxury Touch',
        description: 'Crafted from 68% post-consumer recycled materials with a velvety satin texture that resists fingerprints and dust.',
        image: '/assets/tablet_pro.jpg',
        badge: 'Eco Fiber'
      }
    ],
    legalText: '1. MagLock accessories work with compatible Mango devices. 2. Stylus precision requires compatible display digitizer.',
    models: [
      { name: 'Magnetic Smart Folio', route: '/store/accessories/magnetic-smart-folio', image: '/assets/tablet_pro.jpg' },
      { name: 'MagLock Rapid Charger', route: '/store/accessories/maglock-rapid-charger', image: '/assets/maglock_charger.jpg' },
      { name: 'Stylus Pen Pro', route: '/store/accessories/stylus-pen-pro', image: '/assets/stylus_pen.jpg' },
      { name: 'Alpine Woven Band', route: '/store/accessories/alpine-woven-band', image: '/assets/wearable_ultra.jpg' }
    ]
  },
  tracker: {
    key: 'tracker',
    route: '/store/tracker',
    displayName: 'Tracker',
    headline: 'Lose your knack for losing things.',
    subheadline: 'Ultra-wideband precision guidance, encrypted community ping network, and 1-year replaceable battery.',
    iconName: 'LocateFixed',
    heroImage: '/assets/tracker_tag.jpg',
    filters: [{ id: 'all', label: 'All' }],
    featureHighlights: [],
    legalText: '1. Precision finding compatible with UWB enabled devices.',
    models: [
      { name: 'Tracker Tag Single', route: '/store/tracker/tracker-tag-single', image: '/assets/tracker_tag.jpg', badge: 'UWB Precision' },
      { name: 'Tracker Tag 4-Pack', route: '/store/tracker/tracker-tag-4-pack', image: '/assets/tracker_tag.jpg' }
    ]
  },
  giftcard: {
    key: 'giftcard',
    route: '/store/giftcard',
    displayName: 'Gift Card',
    headline: 'One card. Infinite possibilities.',
    subheadline: 'Redeemable across all Mango hardware, Mango Sound, cloud storage, and Mango Care+ services.',
    iconName: 'Gift',
    heroImage: '/assets/giftcard_pass.jpg',
    filters: [{ id: 'all', label: 'All' }],
    featureHighlights: [],
    legalText: '1. Mango Gift Cards have no expiration dates or administrative fees.',
    models: [
      { name: 'Digital Pass', route: '/store/giftcard/digital-pass', image: '/assets/giftcard_pass.jpg', badge: 'Instant Email' },
      { name: 'Collector Metal Pass', route: '/store/giftcard/collector-metal-pass', image: '/assets/giftcard_pass.jpg' }
    ]
  }
};

export const ALL_PRODUCTS: Product[] = [
  // --- LAPTOPS ---
  {
    id: 'laptop-pro',
    category: 'laptop',
    name: 'Laptop Pro',
    tagline: 'Mind-bending performance. Spectacular Liquid XDR.',
    description: 'Forged with the revolutionary M-Core 3 Ultra architecture. Delivers unmatched computing efficiency, up to 22 hours of battery endurance, and pro connectivity with triple Thunderbolt 4 ports.',
    basePrice: 1999,
    featured: true,
    badge: 'M-Core 3 Ultra',
    filterTag: 'laptops',
    screenSize: '16.2-inch Liquid XDR Display',
    chip: 'Mango M-Core 3 Ultra',
    batteryLife: 'Up to 22 hours',
    colors: [
      { name: 'Burgundy Cabernet', hex: '#800020', image: '/assets/laptop_pro.jpg' },
      { name: 'Titanium Graphite', hex: '#374151', image: '/assets/laptop_pro_spaceblack.jpg' },
      { name: 'Starlight Silver', hex: '#E5E7EB', image: '/assets/laptop_pro_silver.jpg' }
    ],
    storageOptions: [
      { size: '512GB High-Speed SSD', priceDelta: 0 },
      { size: '1TB Pro SSD', priceDelta: 200 },
      { size: '2TB Extreme SSD', priceDelta: 600 },
      { size: '4TB Studio SSD', priceDelta: 1200 }
    ],
    specsSummary: [
      { label: 'Display', value: '16.2" Liquid XDR (3456x2234 at 120Hz ProFlow)' },
      { label: 'Processor', value: '16-core CPU, 40-core GPU, 32-core Neural Engine' },
      { label: 'Memory', value: '36GB Unified Memory (Configurable to 128GB)' },
      { label: 'Weight', value: '4.7 lbs (2.14 kg)' }
    ],
    features: [
      { title: 'Liquid XDR Display', description: '1,600 nits peak brightness with extreme 1,000,000:1 contrast ratio.' },
      { title: 'Pip AI Integration', description: 'Deep hardware acceleration for on-device Pip artificial intelligence models.' }
    ],
    whatsInTheBox: ['Laptop Pro', '140W USB-C Mango Power Brick', 'Braided USB-C MagLock Cable (2m)']
  },
  {
    id: 'laptop-studio',
    category: 'laptop',
    name: 'Laptop Studio',
    tagline: 'Stationary muscle. Limitless workstation output.',
    description: 'The definitive pro desktop workstation. Driven by dual M-Core 3 Ultra chips unified over ultra-wide interconnect with massive thermal capacity.',
    basePrice: 2499,
    featured: true,
    badge: 'Workstation',
    filterTag: 'desktops',
    chip: 'Dual M-Core 3 Ultra',
    screenSize: 'Desktop Modular',
    colors: [
      { name: 'Milled Titanium Gray', hex: '#4B5563', image: '/assets/laptop_pro_spaceblack.jpg' }
    ],
    storageOptions: [
      { size: '1TB SSD', priceDelta: 0 },
      { size: '2TB SSD', priceDelta: 400 },
      { size: '4TB SSD', priceDelta: 1000 }
    ],
    specsSummary: [
      { label: 'Form Factor', value: 'Compact Aluminum Cube Desktop' },
      { label: 'Processor', value: '24-core CPU, 76-core GPU, 128GB Unified Memory' },
      { label: 'Ports', value: '6x Thunderbolt 4, 2x USB-A, 10Gb Ethernet, HDMI 2.1' }
    ],
    features: [
      { title: 'Extreme Bandwidth', description: '800GB/s memory bandwidth for immediate loading of 70B parameter AI weights.' }
    ],
    whatsInTheBox: ['Laptop Studio', 'Braided Power Cable']
  },
  {
    id: 'laptop-air',
    category: 'laptop',
    name: 'Laptop Air',
    tagline: 'Strikingly thin. Surprisingly grand.',
    description: 'Giving you room for more of what you love with a spacious 15.3-inch Liquid Display in an impossibly slender 11.5mm unibody aluminum chassis.',
    basePrice: 1299,
    filterTag: 'laptops',
    badge: 'Popular',
    screenSize: '15.3-inch Liquid Display',
    chip: 'Mango M-Core 2',
    batteryLife: 'Up to 18 hours',
    colors: [
      { name: 'Midnight Deep', hex: '#1E293B', image: '/assets/laptop_pro_spaceblack.jpg' },
      { name: 'Starlight Silver', hex: '#E5E7EB', image: '/assets/laptop_air.jpg' },
      { name: 'Burgundy Glow', hex: '#901435', image: '/assets/laptop_pro.jpg' }
    ],
    storageOptions: [
      { size: '256GB SSD', priceDelta: 0 },
      { size: '512GB SSD', priceDelta: 200 },
      { size: '1TB SSD', priceDelta: 400 }
    ],
    specsSummary: [
      { label: 'Display', value: '15.3" Liquid Display (2880x1864)' },
      { label: 'Thickness', value: '11.5 mm silent fanless chassis' },
      { label: 'Memory', value: '16GB Unified Memory' }
    ],
    features: [
      { title: 'Silent Fanless Architecture', description: 'Completely quiet operation under any standard computing condition.' }
    ],
    whatsInTheBox: ['Laptop Air', '35W Dual USB-C Adapter', 'USB-C Cable']
  },
  {
    id: 'laptop-lite',
    category: 'laptop',
    name: 'Laptop Lite',
    tagline: 'Lean. Mean. Accessible to everyone.',
    description: 'Supercharged by M-Core 2, the world’s most beloved ultraportable laptop is faster, lighter, and more capable than ever.',
    basePrice: 999,
    filterTag: 'laptops',
    screenSize: '13.6-inch Liquid Display',
    chip: 'Mango M-Core 2',
    batteryLife: 'Up to 18 hours',
    colors: [
      { name: 'Starlight Silver', hex: '#E5E7EB', image: '/assets/laptop_air.jpg' },
      { name: 'Space Charcoal', hex: '#4B5563', image: '/assets/laptop_pro_spaceblack.jpg' }
    ],
    storageOptions: [
      { size: '256GB SSD', priceDelta: 0 },
      { size: '512GB SSD', priceDelta: 200 }
    ],
    specsSummary: [
      { label: 'Display', value: '13.6" Liquid Display (2560x1664)' },
      { label: 'Weight', value: '2.7 lbs (1.24 kg)' }
    ],
    features: [
      { title: 'Featherweight Design', description: 'Just 2.7 pounds of aircraft-grade recycled aluminum.' }
    ],
    whatsInTheBox: ['Laptop Lite', '30W USB-C Adapter', 'MagLock Cable']
  },

  // --- TABLETS ---
  {
    id: 'tablet-pro',
    category: 'tablet',
    name: 'Tablet Pro',
    tagline: 'Thinpossible. Driven by M-Core 4.',
    description: 'The thinnest product Mango has ever created. Ultra Tandem OLED technology combines the luminance of two panels for peerless contrast and 1000 nits full-screen brightness.',
    basePrice: 1299,
    featured: true,
    badge: 'Tandem OLED',
    filterTag: 'pro',
    screenSize: '13-inch Ultra Tandem OLED',
    chip: 'Mango M-Core 4',
    batteryLife: 'Up to 10 hours active',
    colors: [
      { name: 'Space Black', hex: '#1C1917', image: '/assets/tablet_pro.jpg' },
      { name: 'Mango Starlight', hex: '#FEF3C7', image: '/assets/tablet_pro.jpg' }
    ],
    storageOptions: [
      { size: '256GB Storage', priceDelta: 0 },
      { size: '512GB Storage', priceDelta: 200 },
      { size: '1TB Storage', priceDelta: 600 }
    ],
    specsSummary: [
      { label: 'Display', value: '13" Tandem OLED (2752x2064, 120Hz)' },
      { label: 'Thickness', value: 'Only 5.1 mm' }
    ],
    features: [
      { title: 'Tandem OLED Technology', description: 'Stacked OLED panels generate unmatched brightness and pixel-level black accuracy.' }
    ],
    whatsInTheBox: ['Tablet Pro', 'USB-C Charge Cable (1m)', '20W USB-C Power Adapter']
  },
  {
    id: 'tablet-air',
    category: 'tablet',
    name: 'Tablet Air',
    tagline: 'Fresh air. Fresh power.',
    description: 'Armed with the M-Core 2 chip, it handles intense illustration, video grading, and 3D sculpting with effortless grace.',
    basePrice: 599,
    filterTag: 'air',
    screenSize: '11-inch Liquid Display',
    chip: 'Mango M-Core 2',
    colors: [
      { name: 'Burgundy Wine', hex: '#800020', image: '/assets/tablet_pro.jpg' },
      { name: 'Space Gray', hex: '#4B5563', image: '/assets/tablet_pro.jpg' }
    ],
    storageOptions: [
      { size: '128GB Storage', priceDelta: 0 },
      { size: '256GB Storage', priceDelta: 100 }
    ],
    specsSummary: [
      { label: 'Display', value: '11" Liquid Display with P3 color' }
    ],
    features: [
      { title: 'Landscape Stereo Speakers', description: 'Rich stereo staging optimized for media streaming and calls.' }
    ],
    whatsInTheBox: ['Tablet Air', 'USB-C Cable', '20W Adapter']
  },
  {
    id: 'tablet-lite',
    category: 'tablet',
    name: 'Tablet Lite',
    tagline: 'Delightfully capable. Surprisingly accessible.',
    description: 'All the essentials for learning, playing games, and streaming movies in a friendly, colorful package.',
    basePrice: 429,
    filterTag: 'air',
    screenSize: '10.9-inch Liquid Display',
    colors: [
      { name: 'Teal Green', hex: '#10B981', image: '/assets/tablet_pro.jpg' },
      { name: 'Sun Yellow', hex: '#FBBF24', image: '/assets/tablet_pro.jpg' }
    ],
    specsSummary: [
      { label: 'Display', value: '10.9" Liquid Display' }
    ],
    features: [{ title: 'All-Day Battery', description: 'Up to 10 hours on a single charge.' }],
    whatsInTheBox: ['Tablet Lite', 'USB-C Cable']
  },
  {
    id: 'tablet-mini',
    category: 'tablet',
    name: 'Tablet Mini',
    tagline: 'Mega power. Mini sized.',
    description: 'Fits in the palm of your hand with an 8.3-inch edge-to-edge screen, A17 Pro silicon, and USB-C connectivity.',
    basePrice: 499,
    filterTag: 'mini',
    badge: 'Pocket Power',
    screenSize: '8.3-inch Liquid Display',
    colors: [
      { name: 'Space Gray', hex: '#4B5563', image: '/assets/tablet_pro.jpg' },
      { name: 'Starlight', hex: '#FEF3C7', image: '/assets/tablet_pro.jpg' }
    ],
    specsSummary: [
      { label: 'Display', value: '8.3" Liquid Display (2266x1488)' }
    ],
    features: [{ title: 'Single Hand Comfort', description: 'Weighs just 0.65 lbs.' }],
    whatsInTheBox: ['Tablet Mini', 'USB-C Cable', '20W Adapter']
  },

  // --- PHONES ---
  {
    id: 'phone-ultra',
    category: 'phone',
    name: 'Phone Ultra',
    tagline: 'Titanium. Ceramic Shield. Optical Mastery.',
    description: 'Forged in grade 5 aerospace titanium with the thinnest borders ever on a Mango device. Featuring our 48MP Fusion quad-sensor camera with 5x telephoto optical zoom and the Pip Action Camera Control button.',
    basePrice: 1199,
    featured: true,
    badge: 'Titanium Flagship',
    filterTag: 'ultra',
    screenSize: '6.9-inch Super Fluid OLED',
    chip: 'Mango Neural A18 Pro',
    batteryLife: 'Up to 33 hours video',
    colors: [
      { name: 'Desert Titanium', hex: '#C29B70', image: '/assets/phone_ultra.jpg' },
      { name: 'Black Titanium', hex: '#262626', image: '/assets/phone_ultra_black.jpg' },
      { name: 'White Titanium', hex: '#F3F4F6', image: '/assets/phone_ultra_white.jpg' }
    ],
    storageOptions: [
      { size: '256GB Flash Storage', priceDelta: 0 },
      { size: '512GB Flash Storage', priceDelta: 200 },
      { size: '1TB Studio Storage', priceDelta: 400 }
    ],
    specsSummary: [
      { label: 'Display', value: '6.9" Super Fluid OLED (2868x1320 at 120Hz ProFlow)' },
      { label: 'Processor', value: 'A18 Pro (6-core CPU, 6-core GPU, 16-core NPU)' },
      { label: 'Cameras', value: '48MP Main Fusion, 48MP Ultra Wide, 12MP 5x Telephoto' }
    ],
    features: [
      { title: 'Pip Camera Control', description: 'Capacitive touch key that slides seamlessly between focal lengths and exposure.' }
    ],
    whatsInTheBox: ['Phone Ultra', 'Braided USB-C Cable (1m)']
  },
  {
    id: 'phone-pro',
    category: 'phone',
    name: 'Phone Pro',
    tagline: 'Titanium precision in a compact 6.3-inch form.',
    description: 'All the Pro features including 5x telephoto zoom and A18 Pro silicon in a pocket-friendly size.',
    basePrice: 999,
    filterTag: 'ultra',
    badge: 'Pro Tier',
    screenSize: '6.3-inch Super Fluid OLED',
    chip: 'Mango Neural A18 Pro',
    colors: [
      { name: 'Black Titanium', hex: '#262626', image: '/assets/phone_ultra_black.jpg' },
      { name: 'Natural Titanium', hex: '#9CA3AF', image: '/assets/phone_ultra.jpg' }
    ],
    storageOptions: [
      { size: '128GB Storage', priceDelta: 0 },
      { size: '256GB Storage', priceDelta: 100 }
    ],
    specsSummary: [
      { label: 'Display', value: '6.3" Super Fluid OLED (120Hz)' }
    ],
    features: [{ title: 'A18 Pro Silicon', description: 'Monstrous mobile gaming with hardware ray-tracing.' }],
    whatsInTheBox: ['Phone Pro', 'USB-C Cable']
  },
  {
    id: 'phone-standard',
    category: 'phone',
    name: 'Phone Standard',
    tagline: 'Hello, Pip. Hello, vibrant color.',
    description: 'Vibrant color-infused back glass with aerospace aluminum and the Dynamic Island hub.',
    basePrice: 799,
    filterTag: 'standard',
    screenSize: '6.1-inch Super Fluid OLED',
    chip: 'Mango Neural A18',
    colors: [
      { name: 'Burgundy Wine', hex: '#800020', image: '/assets/phone_standard.jpg' },
      { name: 'Ultramarine', hex: '#2563EB', image: '/assets/phone_standard.jpg' }
    ],
    storageOptions: [
      { size: '128GB Storage', priceDelta: 0 },
      { size: '256GB Storage', priceDelta: 100 }
    ],
    specsSummary: [
      { label: 'Display', value: '6.1" Super Fluid OLED' }
    ],
    features: [{ title: 'Dynamic Island Hub', description: 'Glanceable notifications in real time.' }],
    whatsInTheBox: ['Phone Standard', 'USB-C Cable']
  },
  {
    id: 'phone-lite',
    category: 'phone',
    name: 'Phone Lite',
    tagline: 'Lots to love. Less to spend.',
    description: 'Fast modern Mango Silicon in an iconic durable design that keeps costs accessible.',
    basePrice: 499,
    filterTag: 'lite',
    screenSize: '4.7-inch UltraDisplay',
    chip: 'Mango Neural A16',
    colors: [
      { name: 'Classic Black', hex: '#171717', image: '/assets/phone_ultra_black.jpg' }
    ],
    specsSummary: [
      { label: 'Display', value: '4.7" Compact Display' }
    ],
    features: [{ title: 'Durable Glass', description: 'Tough front and back glass with IP67 water rating.' }],
    whatsInTheBox: ['Phone Lite', 'USB-C Cable']
  },

  // --- WEARABLES ---
  {
    id: 'wearable-ultra',
    category: 'wearable',
    name: 'Wearable Ultra',
    tagline: 'Adventure called. We answered with titanium.',
    description: 'Rugged 49mm titanium case, dual-frequency precision GPS, 100m water resistance, and up to 72 hours in low-power tracking mode.',
    basePrice: 799,
    featured: true,
    badge: 'Extreme Sport',
    filterTag: 'ultra',
    screenSize: '49mm Sapphire UltraDisplay 3000 nits',
    chip: 'Mango S10 SiP',
    batteryLife: 'Up to 72 hours',
    colors: [
      { name: 'Natural Titanium', hex: '#9CA3AF', image: '/assets/wearable_ultra.jpg' },
      { name: 'Black Titanium', hex: '#18181B', image: '/assets/wearable_black.jpg' }
    ],
    specsSummary: [
      { label: 'Case Size', value: '49mm Aerospace Grade Titanium' },
      { label: 'Water Rating', value: '100m Water Resistant' }
    ],
    features: [{ title: 'Emergency Siren', description: '86-decibel sound pattern audible up to 600 feet.' }],
    whatsInTheBox: ['Wearable Ultra', 'Alpine Loop Band', 'Fast Magnetic USB-C Charger']
  },
  {
    id: 'wearable-pro',
    category: 'wearable',
    name: 'Wearable Pro',
    tagline: 'Thinner profile. Broadest wide-angle OLED.',
    description: 'Our thinnest watch ever with advanced sleep apnea notifications, faster charging, and water depth sensors.',
    basePrice: 399,
    filterTag: 'pro',
    screenSize: '46mm Jet Black Aluminum',
    chip: 'Mango S10 SiP',
    batteryLife: '18 hours all-day',
    colors: [
      { name: 'Jet Black Polished', hex: '#0A0A0A', image: '/assets/wearable_black.jpg' },
      { name: 'Burgundy Gold', hex: '#901435', image: '/assets/wearable_ultra.jpg' }
    ],
    specsSummary: [{ label: 'Thickness', value: '9.7 mm ultra-sleek' }],
    features: [{ title: 'Sleep Health', description: 'Breathing disturbance alerts.' }],
    whatsInTheBox: ['Wearable Pro', 'Sport Band', 'Magnetic Charger']
  },
  {
    id: 'wearable-standard',
    category: 'wearable',
    name: 'Wearable Standard',
    tagline: 'Heavy on features. Light on price.',
    description: 'Essential health metrics, crash detection, and fitness rings to keep you active every single day.',
    basePrice: 249,
    filterTag: 'active',
    colors: [
      { name: 'Silver Aluminum', hex: '#E5E7EB', image: '/assets/wearable_ultra.jpg' }
    ],
    specsSummary: [{ label: 'Case Size', value: '44mm Aluminum' }],
    features: [{ title: 'Fitness Tracking', description: 'Dozens of multi-sport workout metrics.' }],
    whatsInTheBox: ['Wearable Standard', 'Sport Band', 'Charger']
  },
  {
    id: 'wearable-active',
    category: 'wearable',
    name: 'Wearable Active',
    tagline: 'Compact fitness partner for your daily runs.',
    description: 'Lightweight silicone strap, vibrant high-contrast sunlight display, and swim-proof water rating.',
    basePrice: 199,
    filterTag: 'active',
    colors: [
      { name: 'Midnight Charcoal', hex: '#1E293B', image: '/assets/wearable_black.jpg' }
    ],
    specsSummary: [{ label: 'Battery', value: 'Up to 36 hours continuous tracking' }],
    features: [{ title: 'Swimproof', description: 'Rated to 50 meters water resistance.' }],
    whatsInTheBox: ['Wearable Active', 'Charger']
  },

  // --- HEADSETS ---
  {
    id: 'headset-spatial',
    category: 'headset',
    name: 'Headset Spatial',
    tagline: 'Welcome to the era of spatial computing.',
    description: 'Navigate by simply using your eyes, hands, and voice. Digital workspace windows float in your physical room with twin micro-OLED 4K eye engines.',
    basePrice: 3499,
    featured: true,
    badge: 'Spatial Computing',
    filterTag: 'spatial',
    screenSize: 'Twin 4K Micro-OLED Panels (23M Pixels)',
    chip: 'Dual Mango M-Core 2 + R1 Realtime Processor',
    colors: [
      { name: 'Space Silver', hex: '#94A3B8', image: '/assets/headset_spatial.jpg' }
    ],
    storageOptions: [
      { size: '256GB Flash Memory', priceDelta: 0 },
      { size: '512GB Flash Memory', priceDelta: 200 }
    ],
    specsSummary: [
      { label: 'Displays', value: 'Dual Micro-OLED 3D displays (23M Pixels)' },
      { label: 'Sensors', value: '12 cameras, 5 sensors, 6 microphones' }
    ],
    features: [{ title: 'Eye and Gesture Control', description: 'Look and pinch fingers to select.' }],
    whatsInTheBox: ['Headset Spatial', 'Dual Loop Band', 'Light Seal Cushion', 'External Battery Pack', '30W Adapter']
  },
  {
    id: 'headset-studio-xr',
    category: 'headset',
    name: 'Headset Studio XR',
    tagline: 'Cinematic virtual theater in true 8K depth.',
    description: 'Designed for studio film previewing, CAD architecture, and spatial gaming environments with 140-degree field of view.',
    basePrice: 3999,
    filterTag: 'studio',
    badge: 'Pro 8K',
    colors: [
      { name: 'Obsidian Black', hex: '#111827', image: '/assets/headset_spatial.jpg' }
    ],
    specsSummary: [{ label: 'Resolution', value: 'Ultra-Dense 8K Combined Resolution' }],
    features: [{ title: 'Zero Latency Link', description: '12ms glass-to-glass latency with R1 Coprocessor.' }],
    whatsInTheBox: ['Headset Studio XR', 'Studio Headstrap', 'Power Cable']
  },
  {
    id: 'headset-pro',
    category: 'headset',
    name: 'Headset Pro',
    tagline: 'Developer edition for spatial software engineers.',
    description: 'Unlocked low-level sensor access, raw camera feeds, and real-time point cloud meshes for custom XR applications.',
    basePrice: 4299,
    filterTag: 'developer',
    colors: [
      { name: 'Matte Titanium', hex: '#475569', image: '/assets/headset_pro.jpg' }
    ],
    specsSummary: [{ label: 'Dev Kit', value: 'Full Mango Spatial SDK toolchain access' }],
    features: [{ title: 'Live Telemetry', description: 'Real-time eye-tracking and gesture debugging stream.' }],
    whatsInTheBox: ['Headset Pro', 'Developer Cable', 'Calibrated Mount']
  },

  // --- EARBUDS ---
  {
    id: 'earbuds-pro',
    category: 'earbuds',
    name: 'Earbuds Pro',
    tagline: 'Acoustic mastery. Adaptive audio.',
    description: 'Up to 2x more Active Noise Cancellation than previous generation with dynamic head tracking soundscapes.',
    basePrice: 249,
    featured: true,
    badge: 'Active Noise Cancel',
    filterTag: 'pro',
    batteryLife: '6 hours (30 hours with case)',
    chip: 'Mango Audio H2 Chip',
    colors: [
      { name: 'Classic White', hex: '#F9FAFB', image: '/assets/earbuds_pro.jpg' },
      { name: 'Onyx Black', hex: '#111827', image: '/assets/earbuds_black.jpg' }
    ],
    specsSummary: [
      { label: 'Audio Tech', value: 'Personalized Spatial Audio with dynamic head tracking' },
      { label: 'Case', value: 'USB-C MagLock Fast Charging Case with built-in speaker' }
    ],
    features: [{ title: 'Adaptive Audio', description: 'Intelligently blends ANC and Transparency.' }],
    whatsInTheBox: ['Earbuds Pro', 'MagLock Charging Case', 'Silicone Ear Tips (XS, S, M, L)', 'USB-C Cable']
  },
  {
    id: 'earbuds-studio',
    category: 'earbuds',
    name: 'Earbuds Studio',
    tagline: 'Symphonic over-ear perfection.',
    description: 'An over-ear headphone reimagined with breathable canopy cushion and acoustically engineered earcups.',
    basePrice: 549,
    filterTag: 'studio',
    batteryLife: 'Up to 20 hours with ANC',
    colors: [
      { name: 'Midnight Charcoal', hex: '#1F2937', image: '/assets/earbuds_black.jpg' },
      { name: 'Burgundy Sunset', hex: '#800020', image: '/assets/earbuds_pro.jpg' }
    ],
    specsSummary: [{ label: 'Drivers', value: '40mm Mango designed dynamic driver' }],
    features: [{ title: 'Lossless Audio', description: 'Plug directly into Laptop or Tablet.' }],
    whatsInTheBox: ['Earbuds Studio', 'Smart Travel Shield Case', 'USB-C Cable']
  },
  {
    id: 'earbuds-sound',
    category: 'earbuds',
    name: 'Earbuds Sound',
    tagline: 'Universal comfort with personalized spatial acoustics.',
    description: 'Contoured fit with pinch-sensor touch stem and sweat-proof gym rating.',
    basePrice: 179,
    filterTag: 'lite',
    colors: [
      { name: 'Classic White', hex: '#F9FAFB', image: '/assets/earbuds_pro.jpg' }
    ],
    specsSummary: [{ label: 'Battery', value: 'Up to 30 hours with case' }],
    features: [{ title: 'Pinch Controls', description: 'Manage playback with tactile stem clicks.' }],
    whatsInTheBox: ['Earbuds Sound', 'Charging Case', 'USB-C Cable']
  },
  {
    id: 'earbuds-lite',
    category: 'earbuds',
    name: 'Earbuds Lite',
    tagline: 'Simple setup. Pure Mango acoustic clarity.',
    description: 'Instant pairing with all your Mango devices and all-day wireless convenience.',
    basePrice: 129,
    filterTag: 'lite',
    colors: [
      { name: 'Classic White', hex: '#F9FAFB', image: '/assets/earbuds_pro.jpg' }
    ],
    specsSummary: [{ label: 'Connection', value: 'Bluetooth 5.3 Low Energy' }],
    features: [{ title: 'One-Tap Setup', description: 'Auto-switches seamlessly between phone and laptop.' }],
    whatsInTheBox: ['Earbuds Lite', 'Case', 'Cable']
  },

  // --- SCREENS & HOME ---
  {
    id: 'screen-studio-5k',
    category: 'screens-home',
    name: 'Screen Studio 5K',
    tagline: 'A window into your imagination.',
    description: '27-inch 5K UltraVision display with 14.7 million pixels, 600 nits brightness, 12MP Ultra Wide camera with Center Stage, and studio-quality triple mics.',
    basePrice: 1599,
    filterTag: 'displays',
    screenSize: '27-inch 5K (5120x2880)',
    colors: [
      { name: 'Anodized Silver', hex: '#D1D5DB', image: '/assets/screen_cinema.jpg' }
    ],
    specsSummary: [{ label: 'Resolution', value: '5120 x 2880 at 218 ppi' }],
    features: [{ title: 'Center Stage Camera', description: 'Keeps you automatically framed in video calls.' }],
    whatsInTheBox: ['Screen Studio 5K', 'Thunderbolt Cable (1m)', 'Power Cord']
  },
  {
    id: 'screen-cinema-6k',
    category: 'screens-home',
    name: 'Screen Cinema 6K',
    tagline: 'The ultimate professional color grading monitor.',
    description: '32-inch 6K reference display with 1,000 nits sustained full-screen brightness and 1,000,000:1 contrast ratio.',
    basePrice: 4999,
    filterTag: 'displays',
    badge: 'Pro Reference',
    screenSize: '32-inch 6K (6016x3384)',
    colors: [
      { name: 'Anodized Silver', hex: '#D1D5DB', image: '/assets/screen_cinema.jpg' }
    ],
    specsSummary: [{ label: 'Peak Brightness', value: '1,600 nits peak HDR' }],
    features: [{ title: 'Reference Modes', description: 'Rec.709, DCI-P3, HDR Video presets.' }],
    whatsInTheBox: ['Screen Cinema 6K', 'Thunderbolt Pro Cable']
  },
  {
    id: 'home-speaker-360',
    category: 'screens-home',
    name: 'Home Speaker 360',
    tagline: 'Acoustic gravity. Omnidirectional clarity.',
    description: 'High-excursion woofer with 5 beamforming tweeters that scan room reflections to tailor audio to room geometry.',
    basePrice: 299,
    filterTag: 'audio',
    colors: [
      { name: 'Charcoal Mesh', hex: '#1F2937', image: '/assets/home_speaker.jpg' },
      { name: 'Starlight White', hex: '#F3F4F6', image: '/assets/home_speaker.jpg' }
    ],
    specsSummary: [{ label: 'Acoustics', value: '4-inch woofer + 5 beamforming tweeters' }],
    features: [{ title: 'Pip Assistant', description: 'Smart voice control for your whole home.' }],
    whatsInTheBox: ['Home Speaker 360', 'Color-matched Power Cable']
  },
  {
    id: 'home-hub-display',
    category: 'screens-home',
    name: 'Home Hub Display',
    tagline: 'Command center for your family and home.',
    description: '8-inch smart touchscreen with magnetic wall dock, Pip AI family reminders, and home security video previews.',
    basePrice: 229,
    filterTag: 'hub',
    colors: [
      { name: 'Warm Chalk', hex: '#E5E7EB', image: '/assets/home_speaker.jpg' }
    ],
    specsSummary: [{ label: 'Screen', value: '8" HD Smart Touchscreen' }],
    features: [{ title: 'Matter Hub', description: 'Controls connected smart devices effortlessly.' }],
    whatsInTheBox: ['Home Hub Display', 'Wall Mount', 'Power Adapter']
  },

  // --- ACCESSORIES ---
  {
    id: 'magnetic-smart-folio',
    category: 'accessories',
    name: 'Magnetic Smart Folio',
    tagline: 'Slim protection. Stand perfection.',
    description: 'Constructed from premium micro-twill fiber with seamless magnets that snap securely onto your Tablet.',
    basePrice: 79,
    filterTag: 'cases',
    colors: [
      { name: 'Burgundy Gold', hex: '#901435', image: '/assets/tablet_pro.jpg' },
      { name: 'Charcoal', hex: '#374151', image: '/assets/tablet_pro.jpg' }
    ],
    specsSummary: [{ label: 'Compatibility', value: 'Tablet Pro and Tablet Air' }],
    features: [{ title: 'Instant Snapping', description: 'Clicks magnetically in place.' }],
    whatsInTheBox: ['Magnetic Smart Folio']
  },
  {
    id: 'maglock-rapid-charger',
    category: 'accessories',
    name: 'MagLock Rapid Charger',
    tagline: 'Snap and power two devices simultaneously.',
    description: 'Fast-charges your Phone and Wearable at up to 25W with intelligent temperature regulation.',
    basePrice: 129,
    filterTag: 'charging',
    colors: [
      { name: 'Ceramic White', hex: '#F9FAFB', image: '/assets/maglock_charger.jpg' }
    ],
    specsSummary: [{ label: 'Speed', value: '25W Fast Inductive Qi2 Standard' }],
    features: [{ title: 'Foldable Travel Hinge', description: 'Folds flat for travel.' }],
    whatsInTheBox: ['MagLock Rapid Charger', 'Braided Cable']
  },
  {
    id: 'stylus-pen-pro',
    category: 'accessories',
    name: 'Stylus Pen Pro',
    tagline: 'Pixel-perfect accuracy. Advanced haptics.',
    description: 'Feels like real graphite on fine art paper with tilt, pressure sensitivity, and magnetic wireless pairing.',
    basePrice: 129,
    filterTag: 'stylus',
    colors: [
      { name: 'Matte White', hex: '#F9FAFB', image: '/assets/stylus_pen.jpg' }
    ],
    specsSummary: [{ label: 'Latency', value: 'Sub-9ms response time' }],
    features: [{ title: 'Haptic Engine', description: 'Vibrates lightly when switching tools.' }],
    whatsInTheBox: ['Stylus Pen Pro', 'Replacement Nib']
  },
  {
    id: 'alpine-woven-band',
    category: 'accessories',
    name: 'Alpine Woven Band',
    tagline: 'Two textile layers woven together seamlessly.',
    description: 'Engineered for high-altitude climbing and endurance running with corrosion-resistant titanium G-hook.',
    basePrice: 99,
    filterTag: 'bands',
    colors: [
      { name: 'Burgundy Woven', hex: '#800020', image: '/assets/wearable_ultra.jpg' },
      { name: 'Olive Green', hex: '#047857', image: '/assets/wearable_black.jpg' }
    ],
    specsSummary: [{ label: 'Sizes', value: 'Fits 130–210mm wrists' }],
    features: [{ title: 'Titanium G-Hook', description: 'Slides securely into loops without slipping.' }],
    whatsInTheBox: ['Alpine Woven Band']
  }
];

export const getProductById = (id: string): Product | undefined => {
  return ALL_PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (category: CategoryKey): Product[] => {
  return ALL_PRODUCTS.filter(p => p.category === category);
};
