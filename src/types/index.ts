export type CategoryKey = 
  | 'laptop'
  | 'tablet'
  | 'phone'
  | 'wearable'
  | 'headset'
  | 'earbuds'
  | 'screens-home'
  | 'entertainment'
  | 'accessories'
  | 'tracker'
  | 'giftcard';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface StorageOption {
  size: string;
  priceDelta: number;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  category: CategoryKey;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  featured?: boolean;
  badge?: string;
  filterTag?: string;
  colors: ProductColor[];
  storageOptions?: StorageOption[];
  screenSize?: string;
  chip?: string;
  batteryLife?: string;
  specsSummary: SpecItem[];
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  storySections?: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    videoUrl?: string;
    stats?: { label: string; value: string }[];
    alignment?: 'left' | 'right';
  }[];
  galleryImages?: string[];
  whatsInTheBox: string[];
}

export interface CategoryFeatureHighlight {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  videoUrl?: string;
  badge: string;
}

export interface CategoryInfo {
  key: CategoryKey;
  route: string;
  displayName: string;
  headline: string;
  subheadline: string;
  iconName: string;
  models: {
    name: string;
    route: string;
    image: string;
    badge?: string;
  }[];
  filters: {
    id: string;
    label: string;
  }[];
  featureHighlights: CategoryFeatureHighlight[];
  legalText: string;
  heroImage: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  category: CategoryKey;
  selectedColor: ProductColor;
  selectedStorage?: StorageOption;
  hasCarePlus: boolean;
  carePlusPrice: number;
  tradeInCredit: number;
  unitPrice: number;
  quantity: number;
}

export interface SupportArticle {
  id: string;
  category: CategoryKey;
  title: string;
  summary: string;
  readTime: string;
  icon?: string;
  content: string;
}

export type OrderStatus = 'Order Placed' | 'Preparing' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface OrderItem {
  name: string;
  color: string;
  storage?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  status: OrderStatus;
  statusStep: number; // 1 to 4
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

