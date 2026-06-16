export type ProductCategory =
  | "MAKEUP"
  | "SKINCARE"
  | "FRAGRANCE"
  | "FASHION"
  | "ACCESSORIES";

export type VariantType = "SHADE" | "SIZE" | "FINISH";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface ProductVariant {
  id: string;
  label: string;
  type: VariantType;
  value: string; // hex, size label, finish name
  stock: number;
  sku?: string;
  priceOverride?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  category: ProductCategory;
  metadata?: Record<string, unknown>; // ingredients, fabric composition, etc.
  images: { url: string; alt?: string; position: number }[];
  variants: ProductVariant[];
  isPublished: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string;
    zip: string;
  };
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
}

export interface ThemeConfig {
  colors: {
    brandBackground: string;
    brandSurface: string;
    brandPrimary: string;
    brandGold: string;
    brandForeground: string;
    brandMuted: string;
    brandBorder: string;
  };
  typography: {
    fontSerif: string;
    fontSans: string;
  };
  geometry: {
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
    radius2xl: string;
  };
  shadows: {
    cardHover: string;
    menuFloat: string;
    buttonGlow: string;
  };
}
