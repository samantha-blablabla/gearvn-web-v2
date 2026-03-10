// GearvnWebV2 — Shared TypeScript Types
// Add project-wide interfaces here

export interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  inStock?: boolean;
  category?: string;
  /** Up to 2 badges shown below product image. First = red solid, second = light red */
  badges?: string[];
  /** Spec chips shown in the gray specs block (e.g. "FullHD (1920×1080)", "IPS") */
  specs?: string[];
  /** Voucher chip labels. First = green, second = orange */
  vouchers?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
