"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

export interface CateShowcaseProps {
  mouseProducts?: Product[];
  laptopProducts?: Product[];
  className?: string;
}

const MOUSE_NAMES = [
  "Chuột Gaming Logitech G Pro X Superlight 2",
  "Chuột Gaming Razer DeathAdder V3 Pro",
  "Chuột Gaming Corsair M75 Air Wireless",
  "Chuột Gaming ASUS ROG Harpe Ace Aim Lab",
  "Chuột Gaming DareU EM901X Wireless",
  "Chuột Gaming Razer Viper V3 HyperSpeed",
  "Chuột Gaming Logitech G502 X Plus",
  "Chuột Gaming Corsair Dark Core RGB Pro",
  "Chuột Gaming SteelSeries Aerox 5 Wireless",
  "Chuột Gaming Rapoo VT9 Pro",
];

const DEMO_PRODUCTS: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `showcase-product-${i + 1}`,
  name: MOUSE_NAMES[i],
  slug: `chuot-gaming-${i + 1}`,
  imageUrl: "/assets/images/placeholder-product.svg",
  price: 1_990_000 - i * 100_000,
  originalPrice: 2_490_000 - i * 50_000,
  rating: 4.8,
  reviewCount: 200 + i * 20,
  inStock: true,
  badges: ["GEARVN Độc Quyền", "Trả góp 0%"],
  specs: ["Wireless", "25600 DPI", "60g", "Hero 25K", "USB-C", "Onboard memory"],
  vouchers: ["Giảm 100k", "Voucher 50k"],
}));

const LAPTOP_NAMES = [
  "Laptop Gaming ASUS ROG Zephyrus G14 RTX 4060",
  "Laptop Gaming MSI Raider GE78 HX RTX 4080",
  "Laptop Lenovo Legion Pro 5 RTX 4070",
  "Laptop Dell Alienware m16 R2 RTX 4070",
  "Laptop Gaming ASUS TUF A16 RTX 4060",
  "Laptop Acer Predator Helios Neo 16 RTX 4060",
  "Laptop HP Omen 16 RTX 4070",
  "Laptop MSI Stealth 16 Studio RTX 4070",
  "Laptop ASUS Zenbook Pro 14 OLED RTX 4060",
  "Laptop Lenovo Yoga Pro 9i RTX 4060",
];

const DEMO_LAPTOP_PRODUCTS: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `laptop-showcase-${i + 1}`,
  name: LAPTOP_NAMES[i],
  slug: `laptop-gaming-showcase-${i + 1}`,
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

const SORT_OPTIONS = [
  { key: "featured", label: "Nổi bật", icon: Sparkles },
  { key: "price-desc", label: "Giá giảm dần", icon: TrendingDown },
  { key: "price-asc", label: "Giá tăng dần", icon: TrendingUp },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["key"];

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
  const [activeSort, setActiveSort] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const currentSort = SORT_OPTIONS.find((s) => s.key === activeSort)!;

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>(":scope > div");
    if (!firstCard) return;
    const amount = firstCard.offsetWidth + 4; // card width + gap
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

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
            className="flex items-center gap-1 text-[14px] md:text-[16px] font-semibold leading-[22px] text-[var(--color-link)] hover:underline shrink-0"
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

          {/* Sort dropdown */}
          <div ref={sortRef} className="hidden md:block relative shrink-0">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className={cn(
                "flex items-center gap-2 h-[46px] w-[170px] px-3 bg-white border rounded-[8px] text-[14px] font-medium text-[var(--color-text-figma-primary)] transition-colors",
                sortOpen ? "border-[var(--color-primary)] shadow-sm" : "border-[#e5e5e5]"
              )}
            >
              <currentSort.icon size={16} className="shrink-0" />
              <span className="flex-1 text-left truncate">{currentSort.label}</span>
              <ChevronRight size={16} className={cn("shrink-0 transition-transform duration-200", sortOpen ? "-rotate-90" : "rotate-90")} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />
                <div className="absolute left-0 top-[calc(100%+4px)] z-30 w-[170px] bg-white border border-[#e5e5e5] rounded-[8px] shadow-[var(--shadow-md)] py-1 overflow-hidden">
                  {SORT_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.key}
                        onClick={() => { setActiveSort(option.key); setSortOpen(false); }}
                        className={cn(
                          "flex items-center gap-3 w-full px-3 py-[10px] text-[14px] font-medium text-left transition-colors",
                          activeSort === option.key
                            ? "bg-[var(--color-surface-red-subtle)] text-[var(--color-primary)]"
                            : "text-[var(--color-text-figma-primary)] hover:bg-[#f5f5f5]"
                        )}
                      >
                        <Icon size={16} className="shrink-0" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product cards — horizontal scroll + nav arrows */}
        <div className="relative group/scroll">
          {/* Prev arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Trước"
            className={cn(
              "hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10",
              "size-[42px] items-center justify-center rounded-full",
              "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
              "border border-[var(--glass-border)]",
              "hover:bg-[var(--glass-bg-hover)] transition-all duration-200"
            )}
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-1 overflow-x-auto scroll-smooth scrollbar-hide py-2 -my-2"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[calc(50%-2px)] md:w-[calc(33.333%-3px)] lg:w-[calc(25%-3px)]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Tiếp"
            className={cn(
              "hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10",
              "size-[42px] items-center justify-center rounded-full",
              "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
              "border border-[var(--glass-border)]",
              "hover:bg-[var(--glass-bg-hover)] transition-all duration-200"
            )}
          >
            <ChevronRight size={20} />
          </button>
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
            <div className="relative flex-1 h-[140px] md:h-[200px] lg:h-[334px] rounded-[12px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/showcase-banner-1.svg"
                alt="Banner khuyến mãi 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 594px"
              />
            </div>
            <div className="relative flex-1 h-[140px] md:h-[200px] lg:h-[334px] rounded-[12px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/showcase-banner-2.svg"
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
