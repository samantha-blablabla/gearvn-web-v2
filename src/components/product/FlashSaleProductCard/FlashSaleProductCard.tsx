import Image from "next/image";
import Link from "next/link";
import { cn, formatVND, calcDiscountPercent } from "@/lib/utils";
import type { Product } from "@/types";

export interface FlashSaleProductCardProps {
  product: Product;
  /** Fire badge text — max 20 ký tự, chỉ dùng cho chương trình Flash Sale */
  badgeText?: string;
  /** Items remaining out of total (used for loadbar) */
  remainCount?: number;
  totalCount?: number;
  className?: string;
}

/**
 * Product card variant designed specifically for the Flash Sale / HotDeals section.
 * Figma node: 122:13236 (ProductCard instance inside 66:393 HotDeals)
 *
 * Differences from regular ProductCard:
 * - Header fire badge ("Giảm sâu đến 40%") positioned top-RIGHT (Figma: items-end)
 * - No specs tags, no secondary badges, no voucher chips, no star rating
 * - Has LoadBar (stock remaining indicator) at the bottom
 * - Fixed width 220px
 */
export function FlashSaleProductCard({
  product,
  badgeText = "Giảm sâu đến 40%",
  remainCount = 2,
  totalCount = 10,
  className,
}: FlashSaleProductCardProps) {
  // Enforce 20-char max on badge text
  const safeBadgeText = badgeText.slice(0, 20);
  const discountPct = product.originalPrice
    ? calcDiscountPercent(product.originalPrice, product.price)
    : 0;

  const fillPct = totalCount > 0 ? (remainCount / totalCount) * 100 : 0;

  return (
    <Link
      href={`/san-pham/${product.slug ?? product.id}`}
      className={cn(
        "flex flex-col w-[176px] md:w-[190px] lg:w-[220px] shrink-0",
        "bg-white border border-[#E5E5E5] rounded-[8px]",
        "hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] transition-shadow duration-200",
        className
      )}
    >
      {/* ── Image area ─────────────────────────────── */}
      <div className="relative flex flex-col h-[176px] md:h-[190px] lg:h-[220px] pt-[12px] px-[8px]">
        {/* Fire badge — top-RIGHT (Figma node 120:4152, items-end) */}
        <div className="flex justify-end w-full px-[4px]">
          <div
            className={cn(
              "flex items-center gap-[4px] overflow-hidden shrink-0",
              "bg-[var(--color-flash-badge-bg)] border border-[var(--color-flash-badge-border)]",
              "rounded-[4px] px-[4px] py-[2px]"
            )}
          >
            {/* heroicons-mini/fire — exact SVG from Figma Design System (node 17:6550) */}
            <div className="relative shrink-0 size-[16px] overflow-hidden">
              <svg
                className="absolute"
                style={{ inset: "8.55% 15% 10% 14.99%" }}
                viewBox="0 0 11.2019 13.0328"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.40094 2.58213C11.0794 4.12853 11.9971 7.55344 10.4507 10.2319C8.90428 12.9103 5.47937 13.828 2.80094 12.2816C0.122497 10.7352 -0.795205 7.31031 0.751193 4.63187C0.885911 4.39854 1.03489 4.17856 1.19638 3.97241C1.35767 3.76653 1.66887 3.79766 1.83088 4.00298C2.05307 4.28456 2.30612 4.54065 2.58494 4.76614C2.85105 4.98136 3.21435 4.72758 3.2036 4.3855C3.202 4.33453 3.20119 4.28336 3.20119 4.23201C3.20119 3.49717 3.36632 2.80091 3.66149 2.17829C4.088 1.2786 4.78606 0.532697 5.6498 0.046418C5.84739 -0.0648232 6.09017 0.0337929 6.19137 0.236707C6.66494 1.18619 7.41322 2.01187 8.40094 2.58213ZM8.80119 8.23203C8.80119 9.99934 7.3685 11.432 5.60119 11.432C4.07056 11.432 2.78445 10.3133 2.47331 8.88671C2.39845 8.54351 2.8249 8.37196 3.12434 8.5556C3.51316 8.79407 3.95102 8.94917 4.40547 9.0068C4.64758 9.0375 4.83005 8.81519 4.81303 8.57174C4.80518 8.45952 4.80119 8.34624 4.80119 8.23203C4.80119 7.09051 5.19967 6.04206 5.86511 5.21819C5.94816 5.11536 6.08034 5.06489 6.21013 5.0899C7.68621 5.37427 8.80119 6.67294 8.80119 8.23203Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="font-semibold text-[11px] leading-[14px] text-white whitespace-nowrap">
              {safeBadgeText}
            </span>
          </div>
        </div>

        {/* Product image */}
        <div className="flex items-center justify-center flex-1">
          <div className="relative size-[128px] md:size-[150px] lg:size-[160px]">
            <Image
              src={product.imageUrl ?? "/assets/images/placeholder-product.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 150px, 160px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* ── Content area ───────────────────────────── */}
      <div className="flex flex-col gap-[6px] md:gap-[8px] px-[8px] md:px-[12px] py-[6px] md:py-[8px]">
        {/* Product name — 2 lines max, truncate with ellipsis */}
        <div className="h-[32px] md:h-[40px] overflow-hidden shrink-0">
          <p className="font-medium text-[11px] md:text-[12px] leading-[14px] md:leading-[16px] text-[var(--color-text-figma-primary)] line-clamp-2">
            {product.name}
          </p>
        </div>

        {/* Price block */}
        <div className="flex flex-col gap-[2px] md:gap-[4px]">
          {/* Original price + discount % */}
          <div className="flex items-center gap-[4px]">
            {product.originalPrice && (
              <span
                className="text-[12px] md:text-[15px] font-normal leading-[16px] md:leading-[20px] line-through"
                style={{ color: "var(--color-flash-price-original)" }}
              >
                {formatVND(product.originalPrice)}
              </span>
            )}
            {discountPct > 0 && (
              <span
                className={cn(
                  "rounded-[4px] px-[4px] py-[1px]",
                  "font-semibold text-[10px] md:text-[11px] leading-[13px] md:leading-[14px] whitespace-nowrap"
                )}
                style={{
                  backgroundColor: "var(--color-flash-discount-bg)",
                  color: "var(--color-flash-discount-text)",
                }}
              >
                -{discountPct}%
              </span>
            )}
          </div>
          {/* Sale price */}
          <span
            className="font-bold text-[16px] md:text-[18px] lg:text-[20px] leading-[20px] md:leading-[24px] lg:leading-[26px]"
            style={{ color: "var(--color-flash-price-sale)" }}
          >
            {formatVND(product.price)}
          </span>
        </div>
      </div>

      {/* ── LoadBar ────────────────────────────────── */}
      <div className="flex flex-col gap-[8px] px-[8px] md:px-[12px] pb-[16px] md:pb-[24px] pt-[8px] md:pt-[12px]">
        <div
          className="relative h-[15px] w-full rounded-[8px] overflow-hidden"
          style={{ backgroundColor: "var(--color-flash-loadbar-track)" }}
        >
          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-[8px]"
            style={{
              width: `${fillPct}%`,
              background:
                "linear-gradient(to right, rgba(193,0,7,0), rgba(193,0,7,0.8))",
            }}
          />
          {/* Label */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "font-semibold text-[11px] leading-[14px] text-white"
            )}
          >
            Còn {remainCount}/{totalCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
