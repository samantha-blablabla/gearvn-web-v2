"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types";

interface CartContextValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  items: CartItem[];
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
}

const CartContext = createContext<CartContextValue>({
  cartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  items: [],
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
});

// Demo items — replace with real API data when backend is ready
const DEMO_CART_ITEMS: CartItem[] = [
  {
    quantity: 1,
    product: {
      id: "cart-demo-1",
      name: "Laptop Gaming Asus ROG Strix G16 RTX 4060 16 inch 165Hz",
      slug: "laptop-gaming-asus-rog-strix-g16",
      imageUrl: "/assets/images/placeholder-product.svg",
      price: 28_990_000,
      originalPrice: 32_990_000,
      inStock: true,
    },
  },
  {
    quantity: 1,
    product: {
      id: "cart-demo-2",
      name: "Laptop Gaming Lenovo LOQ 15IRX9 RTX 4060 15.6 inch 144Hz",
      slug: "laptop-gaming-lenovo-loq-15irx9",
      imageUrl: "/assets/images/placeholder-product.svg",
      price: 22_490_000,
      originalPrice: 25_990_000,
      inStock: true,
      giftCount: 5,
    },
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(DEMO_CART_ITEMS);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Lock body scroll when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === newItem.product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === newItem.product.id
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        items,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
      }}
    >
      {children}

      {/* Backdrop — covers full screen including navbar (z-[60] > navbar z-50) */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/50",
          "transition-opacity duration-300",
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
