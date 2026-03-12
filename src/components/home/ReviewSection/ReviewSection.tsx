"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, formatVND } from "@/lib/utils";
import type { Product } from "@/types";

export interface ReviewCard {
  id: string;
  title: string;
  thumbnailUrl: string;
  product?: Pick<Product, "name" | "imageUrl" | "price" | "originalPrice">;
  href: string;
}

export interface VideoCard {
  id: string;
  title: string;
  thumbnailUrl: string;
  href: string;
}

export interface ReviewSectionProps {
  reviewCards?: ReviewCard[];
  videoCards?: VideoCard[];
  className?: string;
}

const REVIEW_TITLES = [
  "Trải nghiệm Chuột Logitech G Pro X Superlight 2 sau 30 ngày",
  "Setup bàn làm việc Gaming tối giản dưới 10 triệu",
  "So sánh bàn phím cơ Akko vs Keychron — cái nào đáng mua?",
  "Review ghế EDRA Mars E-GC sau 6 tháng sử dụng",
  "Unbox & đánh giá nhanh Laptop ASUS ROG Strix G16",
  "Top 5 tai nghe gaming dưới 2 triệu đáng mua nhất",
  "Trên tay màn hình ViewSonic 27 inch 2K 165Hz",
  "Review bộ PC build 15 triệu chơi mượt mọi game",
  "So sánh Razer Viper V3 vs Logitech G Pro — ai thắng?",
  "Góc setup gaming RGB cực đẹp của Gearvn fan",
];

const REVIEW_PRODUCTS: Pick<Product, "name" | "imageUrl" | "price" | "originalPrice">[] = [
  { name: "Chuột Gaming Logitech G Pro X Superlight 2 Wireless", imageUrl: "/assets/images/placeholder-product.svg", price: 1_990_000, originalPrice: 2_490_000 },
  { name: "Bàn phím cơ Akko 3068B Plus Black & Gold", imageUrl: "/assets/images/placeholder-product.svg", price: 1_290_000, originalPrice: 1_590_000 },
  { name: "Tai nghe Gaming Corsair HS80 RGB Wireless", imageUrl: "/assets/images/placeholder-product.svg", price: 2_890_000, originalPrice: 3_490_000 },
  { name: "Ghế Gaming EDRA Mars E-GC", imageUrl: "/assets/images/placeholder-product.svg", price: 3_490_000, originalPrice: 4_290_000 },
  { name: "Laptop ASUS ROG Strix G16 RTX 4060", imageUrl: "/assets/images/placeholder-product.svg", price: 29_990_000, originalPrice: 34_990_000 },
  { name: "Tai nghe Razer BlackShark V2 X USB", imageUrl: "/assets/images/placeholder-product.svg", price: 1_490_000, originalPrice: 1_890_000 },
  { name: "Màn hình ViewSonic VX2758-2KP-MHD 27 inch", imageUrl: "/assets/images/placeholder-product.svg", price: 5_990_000, originalPrice: 7_490_000 },
  { name: "VGA MSI GeForce RTX 4060 VENTUS 2X", imageUrl: "/assets/images/placeholder-product.svg", price: 7_990_000, originalPrice: 9_490_000 },
  { name: "Chuột Razer Viper V3 HyperSpeed", imageUrl: "/assets/images/placeholder-product.svg", price: 2_490_000, originalPrice: 2_990_000 },
  { name: "Bàn phím cơ Corsair K70 RGB Pro", imageUrl: "/assets/images/placeholder-product.svg", price: 3_290_000, originalPrice: 3_990_000 },
];

const DEFAULT_REVIEWS: ReviewCard[] = Array.from({ length: 10 }, (_, i) => ({
  id: `review-${i + 1}`,
  title: REVIEW_TITLES[i],
  thumbnailUrl: `/assets/images/reviews/review-portrait-${(i % 5) + 1}.svg`,
  product: REVIEW_PRODUCTS[i],
  href: `https://youtube.com/shorts/placeholder-${i + 1}`,
}));

const VIDEO_TITLES = [
  "Đập hộp Laptop MSI Titan GT77 — Quái vật gaming 80 triệu!",
  "Build PC 20 triệu chơi mọi game 2K Max Setting",
  "So sánh RTX 4060 vs RTX 4070 — Chênh 5 triệu có đáng?",
  "Review màn hình cong Samsung Odyssey G9 49 inch",
  "Top 5 chuột gaming bán chạy nhất tại GearVN 2024",
  "Hướng dẫn tản nhiệt nước custom cho người mới bắt đầu",
  "Laptop văn phòng Lenovo ThinkPad vs Dell Latitude — nên chọn ai?",
  "Test game Cyberpunk 2077 trên RTX 4090 — 4K Ultra có mượt?",
  "Setup góc gaming 50 triệu siêu đẹp cho streamer",
  "Bàn phím cơ dưới 1 triệu nào đáng mua nhất 2024?",
];

const DEFAULT_VIDEOS: VideoCard[] = Array.from({ length: 10 }, (_, i) => ({
  id: `video-${i + 1}`,
  title: VIDEO_TITLES[i],
  thumbnailUrl: `/assets/images/reviews/video-thumb-${(i % 4) + 1}.svg`,
  href: `https://youtube.com/watch?v=placeholder-${i + 1}`,
}));

const SCROLL_AMOUNT = 280;
// Number of items cloned at each end to create infinite illusion
const CLONE_COUNT = 5;

/**
 * Infinite loop carousel hook.
 * Clones CLONE_COUNT items at both ends of the list, initialises scroll to
 * the start of the real items, then silently teleports when the user scrolls
 * into the clone zone — making the loop seamless.
 */
function useInfiniteCarousel(itemCount: number) {
  const ref = useRef<HTMLDivElement>(null);

  // On mount: scroll past the leading clones so the first real card is visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const firstReal = el.children[CLONE_COUNT] as HTMLElement | undefined;
    if (firstReal) el.scrollLeft = firstReal.offsetLeft;
  }, []);

  // Teleport when the viewport enters the clone zone
  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const firstReal = el.children[CLONE_COUNT] as HTMLElement | undefined;
    const lastReal = el.children[CLONE_COUNT + itemCount - 1] as HTMLElement | undefined;
    if (!firstReal || !lastReal) return;

    const realWidth = lastReal.offsetLeft + lastReal.offsetWidth - firstReal.offsetLeft;

    // Scrolled into leading clones → jump forward by one real-content width
    if (el.scrollLeft < firstReal.offsetLeft - 1) {
      el.scrollLeft += realWidth;
    }
    // Scrolled into trailing clones → jump backward by one real-content width
    else if (el.scrollLeft > lastReal.offsetLeft + lastReal.offsetWidth - 1) {
      el.scrollLeft -= realWidth;
    }
  }, [itemCount]);

  function scroll(dir: "prev" | "next") {
    ref.current?.scrollBy({
      left: dir === "prev" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  }

  return { ref, handleScroll, scroll };
}

function NavButton({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Trước" : "Tiếp"}
      className={cn(
        "hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10",
        "size-[42px] items-center justify-center rounded-full bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--glass-shadow)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] transition-all duration-200",
        direction === "prev" ? "-left-5" : "-right-5",
        className
      )}
    >
      {direction === "prev" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

export function ReviewSection({
  reviewCards = DEFAULT_REVIEWS,
  videoCards = DEFAULT_VIDEOS,
  className,
}: ReviewSectionProps) {
  const review = useInfiniteCarousel(reviewCards.length);
  const video = useInfiniteCarousel(videoCards.length);

  // Build cloned item lists: [last-5, ...real, first-5]
  const reviewItems = [
    ...reviewCards.slice(-CLONE_COUNT),
    ...reviewCards,
    ...reviewCards.slice(0, CLONE_COUNT),
  ];
  const videoItems = [
    ...videoCards.slice(-CLONE_COUNT),
    ...videoCards,
    ...videoCards.slice(0, CLONE_COUNT),
  ];

  return (
    <section
      className={cn("bg-[var(--color-surface-subtle)] pt-8 pb-12 lg:pt-[32px] lg:pb-[48px]", className)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px] flex flex-col gap-8">
        {/* ── Góc Review Thực Tế ── */}
        <div className="flex flex-col gap-4 py-6 rounded-[24px]">
          <h2 className="text-[20px] lg:text-[24px] font-semibold leading-[28px] text-[var(--color-text-figma-primary)]">
            Góc Review Thực Tế
          </h2>

          <div className="relative">
            <NavButton direction="prev" onClick={() => review.scroll("prev")} />

            <div
              ref={review.ref}
              onScroll={review.handleScroll}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
            >
              {reviewItems.map((card, idx) => (
                <Link
                  key={`${card.id}-${idx}`}
                  href={card.href}
                  className="shrink-0 flex flex-col rounded-[12px] overflow-hidden bg-white border border-[#e5e5e5] hover:shadow-md transition-shadow w-[calc(50vw-24px)] md:w-[244px]"
                >
                  <div className="relative w-full aspect-[244/433] bg-[#e5e5e5]">
                    <Image
                      src={card.thumbnailUrl}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) calc(50vw - 24px), 244px"
                    />
                  </div>

                  <div className="flex flex-col gap-2 items-center p-2 bg-white">
                    <h3 className="text-[14px] lg:text-[18px] font-semibold leading-[22px] text-[var(--color-text-figma-primary)] line-clamp-2 text-center px-2 w-full">
                      {card.title}
                    </h3>

                    {card.product && (
                      <div className="w-full border border-[#e5e5e5] rounded-[12px] flex items-center gap-1 pl-1 pr-2 py-3">
                        <div className="relative size-[88px] shrink-0">
                          <Image
                            src={card.product.imageUrl ?? "/assets/images/placeholder-product.svg"}
                            alt={card.product.name}
                            fill
                            className="object-contain"
                            sizes="88px"
                          />
                        </div>
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <p className="text-[11px] font-medium leading-[14px] text-[var(--color-text-figma-primary)] line-clamp-2">
                            {card.product.name}
                          </p>
                          {card.product.originalPrice && (
                            <span className="text-[12px] leading-[16px] text-[#737373] line-through">
                              {formatVND(card.product.originalPrice)}
                            </span>
                          )}
                          <span className="text-[16px] font-semibold leading-[20px] tracking-[-0.32px] text-[var(--color-flash-price-sale)]">
                            {formatVND(card.product.price)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <NavButton direction="next" onClick={() => review.scroll("next")} />
          </div>
        </div>

        {/* ── Video Review Sản Phẩm ── */}
        <div className="flex flex-col gap-4 rounded-[24px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] lg:text-[24px] font-semibold leading-[28px] text-[var(--color-text-figma-primary)]">
              Video Review Sản Phẩm
            </h2>
            <Link
              href="https://www.youtube.com/@gearvn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[16px] font-semibold leading-[22px] text-[var(--color-link)] hover:underline shrink-0"
            >
              Xem Youtube
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="relative">
            <NavButton direction="prev" onClick={() => video.scroll("prev")} />

            <div
              ref={video.ref}
              onScroll={video.handleScroll}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
            >
              {videoItems.map((v, idx) => (
                <Link
                  key={`${v.id}-${idx}`}
                  href={v.href}
                  className={cn(
                    "shrink-0 flex flex-col rounded-[12px] overflow-hidden bg-white border border-[#e5e5e5]",
                    "hover:shadow-md transition-shadow",
                    "w-[calc(50vw-24px)] md:w-[319px]"
                  )}
                >
                  <div className="relative w-full aspect-video bg-[#e5e5e5]">
                    <Image
                      src={v.thumbnailUrl}
                      alt={v.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) calc(50vw - 24px), 319px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-[48px] rounded-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="h-[74px] p-3 bg-white">
                    <p className="text-[16px] font-medium leading-[20px] text-[var(--color-text-figma-primary)] line-clamp-2">
                      {v.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <NavButton direction="next" onClick={() => video.scroll("next")} />
          </div>
        </div>
      </div>
    </section>
  );
}
