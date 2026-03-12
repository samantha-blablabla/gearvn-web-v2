"use client";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlashSaleProductCard } from "@/components/product/FlashSaleProductCard";
import type { Product } from "@/types";

export interface FlashSaleSectionProps {
  products: Product[];
  /** Sale end time for countdown */
  endTime?: Date;
  /** Active date range for display (e.g. "12/06") */
  dateFrom?: string;
  dateTo?: string;
  className?: string;
}

// ── Countdown hook ──────────────────────────────────────────────────────────
function useCountdown(endTime?: Date) {
  const calc = useCallback(() => {
    if (!endTime) return { h: 0, m: 0, s: 0 };
    const diff = Math.max(0, endTime.getTime() - Date.now());
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }, [endTime]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    if (!endTime) return;
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [endTime, calc]);

  return time;
}

// ── Countdown box ───────────────────────────────────────────────────────────
function CountdownBox({ value }: { value: number }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "bg-[#F5F5F5] rounded-[6px] md:rounded-[8px] p-[8px] md:p-[12px]",
        "font-semibold text-[14px] md:text-[18px] leading-[18px] md:leading-[22px] text-[#262626]",
        "min-w-[36px] md:min-w-[49px]"
      )}
    >
      {String(value).padStart(2, "0")}
    </div>
  );
}

// ── Date pill ───────────────────────────────────────────────────────────────
function DatePill({ label }: { label: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "bg-[#F5F5F5] rounded-[6px] md:rounded-[8px] px-[8px] md:px-[12px] py-[8px] md:py-[10px]",
        "font-semibold text-[13px] md:text-[16px] leading-[18px] md:leading-[22px] text-[#262626]",
        "whitespace-nowrap"
      )}
    >
      {label}
    </div>
  );
}

// ── Chevron button ──────────────────────────────────────────────────────────
function NavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Trang trước" : "Trang sau"}
      className={cn(
        "flex items-center justify-center",
        "rounded-[8px] px-[12px] py-[10px]",
        "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
        "border border-[var(--glass-border)]",
        "transition-all duration-200 hover:bg-[var(--glass-bg-hover)]"
      )}
    >
      {direction === "left" ? (
        <ChevronLeft size={20} className="text-[#262626]" />
      ) : (
        <ChevronRight size={20} className="text-[#262626]" />
      )}
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function FlashSaleSection({
  products,
  endTime,
  dateFrom = "dd/mm",
  dateTo = "dd/mm",
  className,
}: FlashSaleSectionProps) {
  const { h, m, s } = useCountdown(endTime);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track active dot for pagination indicator
  const [activeDot, setActiveDot] = useState(0);
  const totalPages = Math.ceil(products.length / 5);

  const getCardStep = () => {
    const el = scrollRef.current;
    if (!el) return 232;
    const firstCard = el.querySelector<HTMLElement>(":scope > *");
    return firstCard ? firstCard.offsetWidth + 12 : 232;
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getCardStep() * 2; // scroll 2 cards at a time
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  // Update active dot on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardStep = getCardStep();
      const page = Math.round(el.scrollLeft / (cardStep * 5));
      setActiveDot(page);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const dots = Array.from({ length: Math.max(totalPages, 10) });

  return (
    <section
      className={cn("w-full", className)}
      style={{ backgroundColor: "var(--color-flash-sale-outer-bg)" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px] py-4 lg:py-[32px]">
        {/* ── Inner rounded gradient container ─────── */}
        <div
          className="flex flex-col gap-4 lg:gap-[32px] rounded-[16px] lg:rounded-[32px] px-3 md:px-[24px] lg:px-[32px] py-4 lg:py-[32px] w-full"
          style={{
            background:
              "linear-gradient(to bottom, #FFD7C6, #FF4800)",
          }}
        >
          {/* ── Banner placeholder ─────────────────── */}
          <div
            className="w-full h-[80px] md:h-[100px] lg:h-[120px] rounded-[12px] lg:rounded-[24px] relative overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, #FFA983, #F54A00)",
              boxShadow: "inset 0px 4px 4px 0px rgba(255,102,0,0.4)",
            }}
          />

          {/* ── Countdown & Date row ───────────────── */}
          <div className="flex flex-row items-center justify-between gap-2 md:gap-3 py-[8px]">
            {/* Date pills (left) */}
            <div className="flex gap-[6px] md:gap-[10px] items-start">
              <DatePill label={dateFrom} />
              <DatePill label={dateTo} />
            </div>

            {/* Countdown (right) */}
            <div className="flex items-center gap-[6px] md:gap-[10px]">
              <CountdownBox value={h} />
              <span className="font-semibold text-[14px] md:text-[18px] leading-[22px] text-black">
                :
              </span>
              <CountdownBox value={m} />
              <span className="font-semibold text-[14px] md:text-[18px] leading-[22px] text-black">
                :
              </span>
              <CountdownBox value={s} />
            </div>
          </div>

          {/* ── Product cards + pagination ─────────── */}
          <div className="flex flex-col gap-[16px]">
            {/* Scrollable cards row */}
            <div
              ref={scrollRef}
              className="flex gap-[12px] overflow-x-auto scrollbar-hide"
            >
              {products.map((product) => (
                <FlashSaleProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom: dots + buttons */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-[8px]">
              {/* Dot pagination */}
              <div
                className="hidden md:flex gap-[6px] items-center p-[8px] rounded-full"
                style={{
                  background: "rgba(229,229,229,0.02)",
                  boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.15)",
                }}
              >
                {dots.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-full transition-all duration-200",
                      i === activeDot
                        ? "w-[24px] h-[6px] bg-[#E5E5E5]"
                        : "size-[6px] bg-[#D4D4D4] opacity-60"
                    )}
                  />
                ))}
              </div>

              {/* Right: "Xem tất cả" + prev/next */}
              <div className="flex items-center gap-[16px]">
                <Link
                  href="/khuyen-mai"
                  className={cn(
                    "flex items-center justify-center",
                    "bg-[#F5F5F5] rounded-[8px] px-[12px] py-[10px] min-h-[44px]",
                    "font-semibold text-[14px] md:text-[16px] leading-[22px] text-[#262626]",
                    "whitespace-nowrap hover:bg-[#E5E5E5] transition-colors"
                  )}
                >
                  Xem tất cả khuyến mãi
                </Link>
                <div className="hidden lg:flex items-center gap-[8px]">
                  <NavButton direction="left" onClick={() => scroll("left")} />
                  <NavButton direction="right" onClick={() => scroll("right")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
