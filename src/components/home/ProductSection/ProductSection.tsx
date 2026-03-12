"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

export interface ProductSectionProps {
  title: string;
  viewAllHref?: string;
  products: Product[];
  className?: string;
  /** Show as horizontal scroll with arrows */
  scrollable?: boolean;
}

export function ProductSection({
  title,
  viewAllHref,
  products,
  className,
  scrollable = true,
}: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 860;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="max-w-[1440px] mx-auto px-[120px]">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4 pt-6">
          <h2
            className={cn(
              "text-[20px] font-bold leading-[28px]",
              "text-[var(--color-text-figma-primary)]",
              "relative",
              "after:absolute after:bottom-[-4px] after:left-0",
              "after:w-[40px] after:h-[3px] after:bg-[var(--color-primary)] after:rounded-full"
            )}
          >
            {title}
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className={cn(
                "text-[13px] font-medium text-[var(--color-primary)]",
                "hover:underline flex items-center gap-1"
              )}
            >
              Xem tất cả
              <ChevronRight size={14} />
            </Link>
          )}
        </div>

        {/* Products */}
        {scrollable ? (
          <div className="relative group/section">
            {/* Scroll left */}
            <button
              onClick={() => scroll("left")}
              aria-label="Cuộn trái"
              className={cn(
                "absolute left-[-16px] top-1/2 -translate-y-1/2 z-10",
                "w-[32px] h-[32px] rounded-full flex items-center justify-center",
                "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
                "border border-[var(--glass-border)]",
                "opacity-0 group-hover/section:opacity-100 transition-all duration-200",
                "hover:bg-[var(--glass-bg-hover)]"
              )}
            >
              <ChevronLeft size={16} className="text-[var(--color-text-primary)]" />
            </button>

            {/* Scroll right */}
            <button
              onClick={() => scroll("right")}
              aria-label="Cuộn phải"
              className={cn(
                "absolute right-[-16px] top-1/2 -translate-y-1/2 z-10",
                "w-[32px] h-[32px] rounded-full flex items-center justify-center",
                "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
                "border border-[var(--glass-border)]",
                "opacity-0 group-hover/section:opacity-100 transition-all duration-200",
                "hover:bg-[var(--glass-bg-hover)]"
              )}
            >
              <ChevronRight size={16} className="text-[var(--color-text-primary)]" />
            </button>

            {/* Scrollable row */}
            <div
              ref={scrollRef}
              className={cn(
                "flex gap-[12px] overflow-x-auto scroll-smooth",
                "scrollbar-hide pb-2"
              )}
              style={{ scrollbarWidth: "none" }}
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[210px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-[12px]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
