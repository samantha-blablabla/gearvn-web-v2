"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

export interface ProductTabSectionProps {
  laptopProducts?: Product[];
  pcProducts?: Product[];
  monitorProducts?: Product[];
  gamingProducts?: Product[];
  className?: string;
}

const TABS = [
  { key: "laptop", label: "Laptop", subFilters: ["Laptop AI", "Laptop Văn phòng", "Laptop Gaming", "Laptop Đồ họa - Kĩ Thuật", "Laptop Sinh viên"] },
  { key: "pc", label: "PC", subFilters: ["PC Gaming", "PC Văn phòng", "PC Đồ họa"] },
  { key: "monitor", label: "Màn hình", subFilters: ["Gaming", "Văn phòng", "Đồ họa", "4K"] },
  { key: "gaming", label: "Gaming Gear", subFilters: ["Chuột", "Bàn phím", "Tai nghe", "Ghế gaming"] },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const SORT_OPTIONS = [
  { key: "featured", label: "Nổi bật", icon: Sparkles },
  { key: "price-desc", label: "Giá giảm dần", icon: TrendingDown },
  { key: "price-asc", label: "Giá tăng dần", icon: TrendingUp },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["key"];

const LAPTOP_NAMES = [
  "Laptop Gaming Asus ROG Strix G16 RTX 4060",
  "Laptop Gaming MSI Katana 15 RTX 4070",
  "Laptop Lenovo Legion 5 Pro RTX 4060",
  "Laptop Dell Gaming G15 RTX 4050",
  "Laptop ASUS TUF Gaming A15 RTX 4060",
  "Laptop Acer Nitro V ANV15 RTX 4050",
  "Laptop HP Victus 16 RTX 4060",
  "Laptop MSI Thin GF63 RTX 4050",
  "Laptop ASUS Vivobook Pro 15 OLED",
  "Laptop Lenovo IdeaPad Gaming 3 RTX 3050",
  "Laptop Gaming Asus ROG Flow Z13 RTX 4060",
  "Laptop MSI Creator Z16 HX RTX 4070",
  "Laptop Lenovo ThinkPad X1 Carbon Gen 11",
  "Laptop Dell XPS 15 9530 RTX 4060",
  "Laptop ASUS Zenbook 14 OLED UX3405",
  "Laptop Acer Swift X 14 RTX 4050",
  "Laptop HP Spectre x360 16 RTX 4050",
  "Laptop MSI Prestige 14 Evo RTX 4060",
  "Laptop ASUS ProArt Studiobook 16 OLED",
  "Laptop Lenovo Yoga 9i Gen 8 RTX 4050",
];

const DEMO_PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: LAPTOP_NAMES[i],
  slug: `laptop-gaming-${i + 1}`,
  imageUrl: "/assets/images/placeholder-product.svg",
  price: 28_990_000 - (i % 10) * 500_000,
  originalPrice: 32_990_000 - (i % 10) * 400_000,
  rating: 4.5,
  reviewCount: 120 + i * 10,
  inStock: true,
  badges: ["GEARVN Độc Quyền", "Trả góp 0%"],
  specs: ["Core i9", "RTX 4060", "16 inch", "165Hz"],
  vouchers: ["HSSV giảm 500k", "Voucher 200k"],
}));

export function ProductTabSection({
  laptopProducts,
  pcProducts,
  monitorProducts,
  gamingProducts,
  className,
}: ProductTabSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("laptop");
  const [activeSubFilter, setActiveSubFilter] = useState<string>("Laptop AI");
  const [activeSort, setActiveSort] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentSort = SORT_OPTIONS.find((s) => s.key === activeSort)!;

  const productMap: Record<TabKey, Product[]> = {
    laptop: laptopProducts ?? DEMO_PRODUCTS,
    pc: pcProducts ?? DEMO_PRODUCTS,
    monitor: monitorProducts ?? DEMO_PRODUCTS,
    gaming: gamingProducts ?? DEMO_PRODUCTS,
  };

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const products = productMap[activeTab];

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    setActiveSubFilter(TABS.find((t) => t.key === key)!.subFilters[0]);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCol = el.querySelector<HTMLElement>(":scope > div");
    if (!firstCol) return;
    const step = firstCol.offsetWidth + 4; // column width + gap
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <section
      className={cn("bg-[var(--color-surface-subtle)] py-8 lg:py-[32px]", className)}
    >
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-10 lg:px-[120px]">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-[12px] lg:gap-3">
          {/* ── Left Sidebar — stretches to match product grid height ── */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-[280px]">
            {/* Banner 1 — flex-1 stretches to fill sidebar */}
            <div className="relative flex-1 min-h-[564px] rounded-[8px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/banners/product-tab-sidebar-1.svg"
                alt="Build PC - Tặng màn OLED 240Hz khi mua PC GVN"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            {/* Banner 2 — flex-1 stretches to fill sidebar */}
            <div className="relative flex-1 min-h-[564px] rounded-[8px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/banners/product-tab-sidebar-2.svg"
                alt="Gaming accessories banner"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            {/* Tab bar */}
            <div className="border-b border-[#e5e5e5]">
              <div className="flex overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    className={cn(
                      "shrink-0 w-[120px] lg:flex-1 lg:w-auto text-center pb-3 min-h-[44px] flex items-center justify-center text-[18px] leading-[22px] transition-colors",
                      activeTab === tab.key
                        ? "border-b-2 border-[var(--color-tab-active)] text-[var(--color-tab-active)] font-semibold -mb-px"
                        : "text-[#737373] font-medium opacity-30"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-filter chips */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {currentTab.subFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveSubFilter(filter)}
                  className={cn(
                    "shrink-0 h-[38px] md:h-[46px] px-3 rounded-[8px] text-[13px] md:text-[14px] font-medium leading-[18px] text-[var(--color-text-figma-primary)]",
                    "border border-[#e5e5e5] transition-colors whitespace-nowrap",
                    activeSubFilter === filter
                      ? "bg-white shadow-sm"
                      : "bg-white hover:bg-[#f5f5f5]"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Sort + Xem tất cả */}
            <div className="flex items-center justify-between">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-2 h-[44px] w-[140px] md:w-[170px] px-3 bg-white border rounded-[8px] text-[13px] md:text-[14px] font-medium text-[var(--color-text-figma-primary)] transition-colors",
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
                    <div className="absolute left-0 top-[calc(100%+4px)] z-30 w-[140px] md:w-[170px] bg-white border border-[#e5e5e5] rounded-[8px] shadow-[var(--shadow-md)] py-1 overflow-hidden">
                      {SORT_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.key}
                            onClick={() => { setActiveSort(option.key); setSortOpen(false); }}
                            className={cn(
                              "flex items-center gap-3 w-full px-3 py-[10px] text-[13px] md:text-[14px] font-medium text-left transition-colors",
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

              {/* Xem tất cả */}
              <Link
                href={`/${activeTab}`}
                className="flex items-center gap-2 text-[14px] md:text-[16px] font-semibold leading-[22px] text-[var(--color-link)] hover:underline"
              >
                Xem tất cả
                <ChevronRight size={18} className="md:size-[20px]" />
              </Link>
            </div>

            {/* Product horizontal scroll + nav arrows */}
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
                className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-[8px] overflow-x-auto scroll-smooth scrollbar-hide py-2 -my-2 -mx-[16px] px-[16px] md:mx-0 md:px-0 auto-cols-[220px] md:auto-cols-[calc(33.333%-6px)] lg:auto-cols-[calc(25%-6px)]"
                style={{ scrollbarWidth: "none" }}
              >
                {products.map((product) => (
                  <div key={product.id}>
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
      </div>
    </section>
  );
}
