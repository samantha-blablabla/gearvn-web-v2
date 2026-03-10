"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  cartCount?: number;
  className?: string;
}

export function Navbar({ cartCount = 0, className }: NavbarProps) {
  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50",
        className
      )}
      /* Figma: bg_primary/700 = #C10007 */
      style={{ backgroundColor: "#C10007" }}
    >
      <div
        className="max-w-[1440px] mx-auto px-[120px] py-[16px] flex items-center gap-[12px]"
      >
        {/* ── Logo ─────────────────────────────────── */}
        <Link
          href="/"
          className="flex-shrink-0 flex flex-col items-start justify-center overflow-hidden w-[140px]"
        >
          <Image
            src="/assets/images/logo-gearvn.svg"
            alt="GEARVN"
            width={140}
            height={32}
            priority
            className="block"
          />
        </Link>

        {/* ── Center: Danh mục + Search ── flex-[1_0_0] justify-center (Figma exact) */}
        <div className="flex flex-[1_0_0] items-center justify-center gap-[12px]">
          {/* Danh mục button — bg_red_darker = #9F0712 */}
          <button
            className={cn(
              "flex items-center gap-[8px] px-[16px] py-[12px]",
              "rounded-[10px] shrink-0",
              "text-white font-medium text-[16px] leading-[24px]",
              "transition-colors"
            )}
            style={{ backgroundColor: "#9F0712" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8A0610")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#9F0712")}
          >
            {/* hamburger icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2.4" y="4.8" width="19.2" height="2.4" rx="1.2" fill="white" />
              <rect x="2.4" y="10.8" width="12" height="2.4" rx="1.2" fill="white" />
              <rect x="2.4" y="16.8" width="19.2" height="2.4" rx="1.2" fill="white" />
            </svg>
            Danh mục
          </button>

          {/* Search input — 420px fixed (Figma) */}
          <div className="w-[420px]">
            <div
              className={cn(
                "flex items-center gap-[10px]",
                "bg-white border border-[#E5E5E5] rounded-[8px]",
                "h-[44px] px-[10px]"
              )}
            >
              <input
                type="search"
                placeholder="Bạn cần tìm gì?"
                className={cn(
                  "flex-1 min-w-0 bg-transparent outline-none",
                  "text-[15px] font-normal leading-[20px]",
                  "text-[var(--color-text-primary)]",
                  "placeholder:text-[#A1A1A1]"
                )}
              />
              <button className="flex-shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5 3a7.5 7.5 0 1 0 4.55 13.47l3.74 3.74a.75.75 0 1 0 1.06-1.06l-3.74-3.74A7.5 7.5 0 0 0 10.5 3ZM4.5 10.5a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Cart + Login ───────────────── */}
        <div className="flex items-center gap-[12px] relative">
          {/* Cart button — neutral/950 = #0A0A0A */}
          <button
            className={cn(
              "flex items-center justify-center",
              "min-w-[48px] px-[16px] py-[12px]",
              "rounded-[10px] text-white",
              "transition-colors"
            )}
            style={{ backgroundColor: "#0A0A0A" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1C1C1C")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0A0A0A")}
            aria-label="Giỏ hàng"
          >
            <ShoppingCart size={24} strokeWidth={1.5} />
          </button>

          {/* Cart badge */}
          {cartCount > 0 && (
            <span
              className={cn(
                "absolute left-[30px] top-[5px]",
                "flex items-center justify-center",
                "w-[20px] h-[20px] rounded-full",
                "text-white text-[12px] font-medium leading-[16px]"
              )}
              style={{ backgroundColor: "#C10007" }}
            >
              {cartCount}
            </span>
          )}

          {/* Login button — neutral/950 = #0A0A0A */}
          <button
            className={cn(
              "flex items-center gap-[8px]",
              "min-w-[48px] px-[16px] py-[12px]",
              "rounded-[10px] text-white",
              "transition-colors"
            )}
            style={{ backgroundColor: "#0A0A0A" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1C1C1C")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0A0A0A")}
          >
            <User size={24} strokeWidth={1.5} />
            <span className="text-[16px] font-medium leading-[24px] whitespace-nowrap">
              Đăng nhập
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
