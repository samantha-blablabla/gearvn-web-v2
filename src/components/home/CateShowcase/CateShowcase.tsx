"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

export interface CateShowcaseProps {
  mouseProducts?: Product[];
  laptopProducts?: Product[];
  className?: string;
}

const DEMO_PRODUCTS: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: `showcase-product-${i + 1}`,
  name: `Chuột Gaming Logitech G Pro X Superlight ${i + 1} Wireless`,
  slug: `chuot-logitech-g-pro-x-superlight-${i + 1}`,
  imageUrl: "/assets/images/placeholder-product.svg",
  price: 1_990_000 - i * 100_000,
  originalPrice: 2_490_000 - i * 50_000,
  rating: 4.8,
  reviewCount: 200 + i * 20,
  inStock: true,
  badges: ["GEARVN Độc Quyền", "Trả góp 0%"],
  specs: ["Wireless", "25600 DPI", "60g"],
  vouchers: ["Giảm 100k", "Voucher 50k"],
}));

const DEMO_LAPTOP_PRODUCTS: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: `laptop-showcase-${i + 1}`,
  name: `Laptop Gaming ASUS ROG Zephyrus G14 ${i + 1} RTX 4060`,
  slug: `laptop-asus-rog-zephyrus-g14-${i + 1}`,
  imageUrl: "/assets/images/placeholder-product.svg",
  price: 32_990_000 - i * 1_000_000,
  originalPrice: 38_990_000 - i * 500_000,
  rating: 4.7,
  reviewCount: 150 + i * 15,
  inStock: true,
  badges: ["GEARVN Độc Quyền", "Trả góp 0%"],
  specs: ["Ryzen 9", "RTX 4060", "14 inch", "165Hz"],
  vouchers: ["HSSV giảm 500k", "Voucher 200k"],
}));

const MOUSE_BRANDS = ["Logitech", "Razer", "Corsair", "ASUS", "DareU", "Rappo"];
const LAPTOP_BRANDS = ["ASUS", "MSI", "Lenovo", "Dell", "LG", "ACER"];

interface CategorySubSectionProps {
  title: string;
  href: string;
  brands: string[];
  products: Product[];
  sidebarImageSrc: string;
  sidebarImageAlt: string;
}

function CategorySubSection({
  title,
  href,
  brands,
  products,
  sidebarImageSrc,
  sidebarImageAlt,
}: CategorySubSectionProps) {
  const [activeBrand, setActiveBrand] = useState(brands[0]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-stretch gap-3">
      {/* Sidebar banner — stretches to match right column height */}
      <div className="hidden lg:block relative w-[280px] shrink-0 self-stretch rounded-[12px] overflow-hidden bg-[var(--color-surface-muted)]">
        <Image
          src={sidebarImageSrc}
          alt={sidebarImageAlt}
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] lg:text-[24px] font-semibold leading-[28px] text-[var(--color-text-figma-primary)]">
            {title}
          </h3>
          <Link
            href={href}
            className="flex items-center gap-1 text-[16px] font-semibold leading-[22px] text-[var(--color-link)] hover:underline shrink-0"
          >
            Xem tất cả
            <ChevronRight size={20} />
          </Link>
        </div>

        {/* Brand tabs + sort */}
        <div className="flex items-center justify-between gap-3">
          {/* Brand chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 flex-1">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={cn(
                  "shrink-0 h-[46px] px-3 rounded-[8px] border border-[#e5e5e5]",
                  "text-[14px] font-medium leading-[18px] text-[var(--color-text-figma-primary)] whitespace-nowrap",
                  "transition-colors",
                  activeBrand === brand
                    ? "bg-[#fafafa] shadow-sm"
                    : "bg-white hover:bg-[#f5f5f5]"
                )}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Sort */}
          <button className="hidden md:flex shrink-0 items-center gap-2 h-[46px] w-[150px] px-2 bg-white border border-[#e5e5e5] rounded-[8px] text-[14px] font-medium text-[var(--color-text-figma-primary)]">
            <ArrowUpDown size={16} className="shrink-0" />
            <span className="flex-1 text-left">Xếp theo</span>
            <ChevronRight size={16} className="rotate-90 shrink-0" />
          </button>
        </div>

        {/* Product cards — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CateShowcase({
  mouseProducts,
  laptopProducts,
  className,
}: CateShowcaseProps) {
  return (
    <section
      className={cn("bg-[var(--color-surface-subtle)] py-8 lg:py-[32px]", className)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]">
        <div className="flex flex-col gap-8">
          {/* Top banners */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 h-[200px] md:h-[334px] rounded-[12px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/showcase-banner-1.jpg"
                alt="Banner khuyến mãi 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 594px"
              />
            </div>
            <div className="relative flex-1 h-[200px] md:h-[334px] rounded-[12px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/showcase-banner-2.jpg"
                alt="Banner khuyến mãi 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 594px"
              />
            </div>
          </div>

          {/* Chuột Bán Chạy Nhất */}
          <CategorySubSection
            title="Chuột Bán Chạy Nhất"
            href="/chuot"
            brands={MOUSE_BRANDS}
            products={mouseProducts ?? DEMO_PRODUCTS}
            sidebarImageSrc="/assets/images/sidebar-mouse.jpg"
            sidebarImageAlt="Chuột gaming banner"
          />

          {/* Laptop Bán Chạy Nhất */}
          <CategorySubSection
            title="Laptop Bán Chạy Nhất"
            href="/laptop"
            brands={LAPTOP_BRANDS}
            products={laptopProducts ?? DEMO_LAPTOP_PRODUCTS}
            sidebarImageSrc="/assets/images/sidebar-laptop.jpg"
            sidebarImageAlt="Laptop banner"
          />
        </div>
      </div>
    </section>
  );
}
