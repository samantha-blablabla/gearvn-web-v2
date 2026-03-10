"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ArrowUpDown } from "lucide-react";
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

const DEMO_PRODUCTS: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Laptop Gaming Asus ROG Strix G16 ${i + 1} RTX 4060 16 inch 165Hz`,
  slug: `laptop-gaming-asus-rog-strix-g16-${i + 1}`,
  imageUrl: "/assets/images/placeholder-product.svg",
  price: 28_990_000 - i * 500_000,
  originalPrice: 32_990_000 - i * 400_000,
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

  const productMap: Record<TabKey, Product[]> = {
    laptop: laptopProducts ?? DEMO_PRODUCTS,
    pc: pcProducts ?? DEMO_PRODUCTS,
    monitor: monitorProducts ?? DEMO_PRODUCTS,
    gaming: gamingProducts ?? DEMO_PRODUCTS,
  };

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const products = productMap[activeTab].slice(0, 8);

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    setActiveSubFilter(TABS.find((t) => t.key === key)!.subFilters[0]);
  };

  return (
    <section
      className={cn("bg-[var(--color-surface-subtle)] py-8 lg:py-[32px]", className)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-3">
          {/* ── Left Sidebar — stretches to match product grid height ── */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-[280px]">
            {/* Banner 1 — flex-1 so both banners split available height equally */}
            <div className="relative flex-1 min-h-[280px] rounded-[8px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/sidebar-banner-1.jpg"
                alt="Build PC - Tặng màn OLED 240Hz khi mua PC GVN"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            {/* Banner 2 */}
            <div className="relative flex-1 min-h-[280px] rounded-[8px] overflow-hidden bg-[var(--color-surface-muted)]">
              <Image
                src="/assets/images/sidebar-banner-2.jpg"
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
              <div className="flex">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    className={cn(
                      "flex-1 text-center pb-3 text-[16px] md:text-[18px] leading-[22px] transition-colors",
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
                    "shrink-0 h-[46px] px-3 rounded-[8px] text-[14px] font-medium leading-[18px] text-[var(--color-text-figma-primary)]",
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
              <button className="flex items-center gap-2 h-[44px] w-[150px] px-2 bg-white border border-[#e5e5e5] rounded-[8px] text-[14px] font-medium text-[var(--color-text-figma-primary)]">
                <ArrowUpDown size={16} className="shrink-0" />
                <span className="flex-1 text-left">Xếp theo</span>
                <ChevronRight size={16} className="rotate-90 shrink-0" />
              </button>

              {/* Xem tất cả */}
              <Link
                href={`/${activeTab}`}
                className="flex items-center gap-2 text-[16px] font-semibold leading-[22px] text-[var(--color-link)] hover:underline"
              >
                Xem tất cả
                <ChevronRight size={20} />
              </Link>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
