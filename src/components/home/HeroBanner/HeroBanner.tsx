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
import { useCategoryMenu } from "@/components/layout/CategoryMenuContext";

export interface HeroBannerProps {
  className?: string;
}

const sidebarMenuItems = [
  { icon: Laptop,     label: "Laptop",                       href: "/laptop" },
  { icon: Gamepad2,   label: "Laptop Gaming",                href: "/laptop-gaming" },
  { icon: Monitor,    label: "PC GVN",                       href: "/pc-gvn" },
  { icon: Cpu,        label: "Main, CPU, VGA",               href: "/main-cpu-vga" },
  { icon: Box,        label: "Case, Nguồn, Tản",             href: "/case-nguon-tan" },
  { icon: HardDrive,  label: "Ổ Cứng, RAM, Thẻ Nhớ",        href: "/o-cung-ram" },
  { icon: Volume2,    label: "Loa, Micro, Webcam",           href: "/loa-micro" },
  { icon: Monitor,    label: "Màn Hình",                     href: "/man-hinh" },
  { icon: Keyboard,   label: "Bàn Phím",                     href: "/ban-phim" },
  { icon: Mouse,      label: "Chuột + Lót Chuột",            href: "/chuot" },
  { icon: Headphones, label: "Tai Nghe",                     href: "/tai-nghe" },
  { icon: Box,        label: "Ghế - Bàn",                    href: "/ghe-ban" },
  { icon: Network,    label: "Phần Mềm, Mạng",               href: "/phan-mem-mang" },
  { icon: Gamepad,    label: "Handheld, Console",            href: "/handheld-console" },
  { icon: PlugZap,    label: "Phụ Kiện (Hub, sạc, cáp...)", href: "/phu-kien" },
  { icon: Info,       label: "Dịch vụ và thông tin khác",    href: "/dich-vu" },
];

const mainBanners = [
  { src: "/assets/images/banners/banner-hero-1.png", alt: "Khuyến mãi hấp dẫn 1" },
  { src: "/assets/images/banners/banner-hero-2.png", alt: "Khuyến mãi hấp dẫn 2" },
  { src: "/assets/images/banners/banner-hero-3.png", alt: "Khuyến mãi hấp dẫn 3" },
];

const subBanners = [
  { src: "/assets/images/banners/banner-sub-1.png", alt: "Banner phụ 1" },
  { src: "/assets/images/banners/banner-sub-2.png", alt: "Banner phụ 2" },
];

const rightBanners = [
  { src: "/assets/images/banners/banner-right-1.png", alt: "Banner chính sách 1", bg: "#c4c4c4" },
  { src: "/assets/images/banners/banner-right-2.png", alt: "Banner chính sách 2", bg: "#c4c4c4" },
  { src: "/assets/images/banners/banner-right-3.png", alt: "Banner chính sách 3", bg: "#c4c4c4" },
  { src: "/assets/images/banners/banner-right-4.png", alt: "Banner chính sách 4", bg: "#c4c4c4" },
];

export function HeroBanner({ className }: HeroBannerProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const { menuOpen } = useCategoryMenu();

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
        "py-[24px] md:py-4 lg:py-[32px]",
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-10 lg:px-[120px]">
        {/* ── Desktop 3-column layout ── */}
        <div className="flex items-start gap-[8px]">
          {/* ── Left: Sidebar menu — desktop only ── */}
          <div
            className={cn(
              "hidden lg:flex flex-shrink-0 w-[280px] h-[616px]",
              "bg-[var(--color-surface)] rounded-[12px]",
              "border border-[var(--color-border-light)]",
              "flex-col justify-center px-[8px] py-[8px]",
              "transition-shadow duration-200",
              menuOpen && "relative z-50 shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
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

          {/* ── Middle: Main + Sub banners ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-[8px]">
            {/* Main banner carousel */}
            <div className="relative w-full h-[180px] md:h-[280px] lg:h-[340px] rounded-[12px] overflow-hidden">
              <Image
                src={mainBanners[mainIndex].src}
                alt={mainBanners[mainIndex].alt}
                fill
                className="object-cover"
                priority
              />

              {/* Prev button — desktop only (touch swipe on mobile/tablet) */}
              <button
                onClick={prevMain}
                aria-label="Banner trước"
                className={cn(
                  "hidden lg:flex",
                  "absolute left-[12px] top-1/2 -translate-y-1/2",
                  "w-[32px] h-[32px] rounded-[16px] items-center justify-center",
                  "bg-white/15 backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
                  "border border-white/20 hover:bg-white/30 transition-all duration-200"
                )}
              >
                <ChevronLeft size={16} className="text-white" />
              </button>

              {/* Next button — desktop only */}
              <button
                onClick={nextMain}
                aria-label="Banner tiếp theo"
                className={cn(
                  "hidden lg:flex",
                  "absolute right-[12px] top-1/2 -translate-y-1/2",
                  "w-[32px] h-[32px] rounded-[16px] items-center justify-center",
                  "bg-white/15 backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
                  "border border-white/20 hover:bg-white/30 transition-all duration-200"
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

            {/* Secondary banner carousel — visible on all breakpoints */}
            <div className="relative w-full h-[160px] md:h-[220px] lg:h-[268px] rounded-[12px] overflow-hidden">
              <Image
                src={subBanners[subIndex].src}
                alt={subBanners[subIndex].alt}
                fill
                className="object-cover"
              />

              {/* Prev button — desktop only */}
              <button
                onClick={prevSub}
                aria-label="Banner phụ trước"
                className={cn(
                  "hidden lg:flex",
                  "absolute left-[12px] top-1/2 -translate-y-1/2",
                  "w-[32px] h-[32px] rounded-[16px] items-center justify-center",
                  "bg-white/15 backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
                  "border border-white/20 hover:bg-white/30 transition-all duration-200"
                )}
              >
                <ChevronLeft size={16} className="text-white" />
              </button>

              {/* Next button — desktop only */}
              <button
                onClick={nextSub}
                aria-label="Banner phụ tiếp theo"
                className={cn(
                  "hidden lg:flex",
                  "absolute right-[12px] top-1/2 -translate-y-1/2",
                  "w-[32px] h-[32px] rounded-[16px] items-center justify-center",
                  "bg-white/15 backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)]",
                  "border border-white/20 hover:bg-white/30 transition-all duration-200"
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

          {/* ── Right: Policy banners — desktop/tablet column ── */}
          <div className="hidden md:flex flex-col gap-[8px] w-[140px] lg:flex-1 lg:w-auto md:h-[508px] lg:h-[616px]">
            {rightBanners.map((banner, i) => (
              <div
                key={i}
                className="relative flex-1 rounded-[12px] min-h-0 overflow-hidden"
                style={{ backgroundColor: banner.bg }}
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: 4 policy banners as horizontal scroll ── */}
        <div className="flex gap-[8px] mt-[8px] overflow-x-auto scrollbar-hide md:hidden">
          {rightBanners.map((banner, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[243px] h-[120px] rounded-[12px] overflow-hidden"
              style={{ backgroundColor: banner.bg }}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
