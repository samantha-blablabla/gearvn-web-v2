"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Laptop,
  Gamepad2,
  Monitor,
  Cpu,
  HardDrive,
  Volume2,
  Keyboard,
  Mouse,
  Headphones,
  Box,
  Network,
  Gamepad,
  PlugZap,
  Info,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroBannerProps {
  className?: string;
}

const sidebarMenuItems = [
  { icon: Laptop, label: "Laptop", href: "/laptop" },
  { icon: Gamepad2, label: "Laptop Gaming", href: "/laptop-gaming" },
  { icon: Monitor, label: "PC GVN", href: "/pc-gvn" },
  { icon: Cpu, label: "Main, CPU, VGA", href: "/main-cpu-vga" },
  { icon: Box, label: "Case, Nguồn, Tản", href: "/case-nguon-tan" },
  { icon: HardDrive, label: "Ổ Cứng, RAM, Thẻ Nhớ", href: "/o-cung-ram" },
  { icon: Volume2, label: "Loa, Micro, Webcam", href: "/loa-micro" },
  { icon: Monitor, label: "Màn Hình", href: "/man-hinh" },
  { icon: Keyboard, label: "Bàn Phím", href: "/ban-phim" },
  { icon: Mouse, label: "Chuột + Lót Chuột", href: "/chuot" },
  { icon: Headphones, label: "Tai Nghe", href: "/tai-nghe" },
  { icon: Box, label: "Ghế - Bàn", href: "/ghe-ban" },
  { icon: Network, label: "Phần Mềm, Mạng", href: "/phan-mem-mang" },
  { icon: Gamepad, label: "Handheld, Console", href: "/handheld-console" },
  { icon: PlugZap, label: "Phụ Kiện (Hub, sạc, cáp...)", href: "/phu-kien" },
  { icon: Info, label: "Dịch vụ và thông tin khác", href: "/dich-vu" },
];

const mainBanners = [
  { src: "/assets/images/banner-hero-1.jpg", alt: "Khuyến mãi hấp dẫn 1" },
  { src: "/assets/images/banner-hero-2.jpg", alt: "Khuyến mãi hấp dẫn 2" },
  { src: "/assets/images/banner-hero-3.jpg", alt: "Khuyến mãi hấp dẫn 3" },
];

const subBanners = [
  { src: "/assets/images/banner-sub-1.jpg", alt: "Banner phụ 1" },
  { src: "/assets/images/banner-sub-2.jpg", alt: "Banner phụ 2" },
];

const rightBanners = [
  { src: "/assets/images/banner-right-1.jpg", alt: "Banner chính sách 1", bg: "#c4c4c4" },
  { src: "/assets/images/banner-right-2.jpg", alt: "Banner chính sách 2", bg: "#c4c4c4" },
  { src: "/assets/images/banner-right-3.jpg", alt: "Banner chính sách 3", bg: "#c4c4c4" },
  { src: "/assets/images/banner-right-4.jpg", alt: "Banner chính sách 4", bg: "#c4c4c4" },
];

export function HeroBanner({ className }: HeroBannerProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const prevMain = () =>
    setMainIndex((i) => (i - 1 + mainBanners.length) % mainBanners.length);
  const nextMain = () =>
    setMainIndex((i) => (i + 1) % mainBanners.length);

  const prevSub = () =>
    setSubIndex((i) => (i - 1 + subBanners.length) % subBanners.length);
  const nextSub = () =>
    setSubIndex((i) => (i + 1) % subBanners.length);

  return (
    <section
      className={cn(
        "w-full bg-[var(--color-surface-subtle)]",
        "py-[32px]",
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto px-[120px] flex items-center gap-[8px]">
      {/* ── Left: Sidebar menu ──────────────────────── */}
      <div
        className={cn(
          "flex-shrink-0 w-[280px] h-[616px]",
          "bg-[var(--color-surface)] rounded-[12px]",
          "border border-[var(--color-border-light)]",
          "flex flex-col justify-center px-[8px] py-[8px]"
        )}
      >
        {sidebarMenuItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center justify-between",
              "px-[8px] py-[4px] rounded-[var(--radius-md)]",
              "hover:bg-[var(--color-surface-subtle)] group transition-colors"
            )}
          >
            <div className="flex items-center gap-[12px]">
              <span
                className={cn(
                  "flex items-center justify-center p-[4px] rounded-[var(--radius-sm)]",
                  "bg-[var(--color-surface-red-subtle)]"
                )}
              >
                <Icon
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0"
                />
              </span>
              <span
                className={cn(
                  "text-[14px] font-medium leading-[18px] whitespace-nowrap",
                  "text-[var(--color-text-figma-primary)]",
                  "group-hover:text-[var(--color-primary)] transition-colors"
                )}
              >
                {label}
              </span>
            </div>
            <ChevronRight
              size={16}
              className="text-[var(--color-text-secondary)] flex-shrink-0"
            />
          </Link>
        ))}
      </div>

      {/* ── Middle: Main banners ────────────────────── */}
      <div className="flex-shrink-0 w-[604px] flex flex-col gap-[8px]">
        {/* Main banner carousel */}
        <div className="relative w-full h-[340px] rounded-[12px] overflow-hidden">
          <div
            className="relative w-full h-full bg-[var(--color-surface-muted)] rounded-[12px]"
            style={{ backgroundColor: "#d4d4d4" }}
          >
            {/* Placeholder — replaced by real image when assets available */}
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-secondary)] text-sm">
              Banner chính {mainIndex + 1}
            </div>
          </div>

          {/* Prev button */}
          <button
            onClick={prevMain}
            aria-label="Banner trước"
            className={cn(
              "absolute left-[12px] top-1/2 -translate-y-1/2",
              "w-[32px] h-[32px] rounded-[16px] flex items-center justify-center",
              "bg-white/10 backdrop-blur-sm shadow-[0_0_5px_rgba(0,0,0,0.2)]",
              "hover:bg-white/20 transition-colors"
            )}
          >
            <ChevronLeft size={16} className="text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={nextMain}
            aria-label="Banner tiếp theo"
            className={cn(
              "absolute right-[12px] top-1/2 -translate-y-1/2",
              "w-[32px] h-[32px] rounded-[16px] flex items-center justify-center",
              "bg-white/10 backdrop-blur-sm shadow-[0_0_5px_rgba(0,0,0,0.2)]",
              "hover:bg-white/20 transition-colors"
            )}
          >
            <ChevronRight size={16} className="text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center gap-[6px] px-[8px] py-[4px] rounded-full bg-black/10 backdrop-blur-sm">
            {mainBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setMainIndex(i)}
                aria-label={`Chuyển banner ${i + 1}`}
                className={cn(
                  "rounded-full transition-all",
                  i === mainIndex
                    ? "w-[16px] h-[6px] bg-white"
                    : "w-[6px] h-[6px] bg-white/60"
                )}
              />
            ))}
          </div>
        </div>

        {/* Secondary banner carousel */}
        <div className="relative w-full h-[268px] rounded-[12px] overflow-hidden">
          <div
            className="relative w-full h-full bg-[var(--color-surface-muted)] rounded-[12px]"
            style={{ backgroundColor: "#d4d4d4" }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-secondary)] text-sm">
              Banner phụ {subIndex + 1}
            </div>
          </div>

          {/* Prev button */}
          <button
            onClick={prevSub}
            aria-label="Banner phụ trước"
            className={cn(
              "absolute left-[12px] top-1/2 -translate-y-1/2",
              "w-[32px] h-[32px] rounded-[16px] flex items-center justify-center",
              "bg-white/10 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
              "hover:bg-white/20 transition-colors"
            )}
          >
            <ChevronLeft size={16} className="text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={nextSub}
            aria-label="Banner phụ tiếp theo"
            className={cn(
              "absolute right-[12px] top-1/2 -translate-y-1/2",
              "w-[32px] h-[32px] rounded-[16px] flex items-center justify-center",
              "bg-white/10 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
              "hover:bg-white/20 transition-colors"
            )}
          >
            <ChevronRight size={16} className="text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center gap-[6px] px-[8px] py-[4px] rounded-full bg-black/10 backdrop-blur-sm">
            {subBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setSubIndex(i)}
                aria-label={`Chuyển banner phụ ${i + 1}`}
                className={cn(
                  "rounded-full transition-all",
                  i === subIndex
                    ? "w-[16px] h-[6px] bg-white"
                    : "w-[6px] h-[6px] bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Policy banners ────────────────────── */}
      <div className="flex-1 flex flex-col gap-[8px] h-[616px]">
        {rightBanners.map((banner, i) => (
          <div
            key={i}
            className="flex-1 rounded-[12px] min-h-0"
            style={{ backgroundColor: banner.bg }}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
