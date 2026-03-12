import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatVND, calcDiscountPercent } from "@/lib/utils";
import type { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const {
    name,
    slug,
    imageUrl,
    price,
    originalPrice,
    rating,
    reviewCount,
    inStock = true,
    badges,
    specs,
    vouchers,
  } = product;

  const discountPercent =
    originalPrice && originalPrice > price
      ? calcDiscountPercent(originalPrice, price)
      : null;

  return (
    <Link
      href={`/san-pham/${slug}`}
      className={cn(
        "group flex flex-col w-full",
        "bg-[var(--color-surface)] rounded-[8px]",
        "border border-[#E5E5E5]",
        "transition-shadow duration-200",
        !inStock && "opacity-70",
        className
      )}
    >
      {/* ── Zone 1: Image area — h-[220px] ── */}
      <div className="flex flex-col pt-3 px-2 h-[220px] shrink-0">
        {/* Top badge row (empty placeholder to maintain spacing) */}
        <div className="flex justify-end w-full min-h-[20px]" />

        {/* Product image centered in remaining space */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative size-[160px]">
            <Image
              src={imageUrl || "/assets/images/placeholder-product.svg"}
              alt={name}
              fill
              sizes="160px"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* ── Zone 2: Content area — px-[12px] py-[8px] ── */}
      <div className="flex flex-col gap-2 px-3 py-2 flex-1">

        {/* 2a: badges → name → specs (gap-[4px]) */}
        <div className="flex flex-col gap-1">

          {/* Badges row — min-h reserved so cards align even without badges */}
          <div className="flex gap-1 flex-wrap min-h-[20px] items-center">
            {badges?.[0] && (
              <span className="inline-flex items-center px-1 py-[2px] rounded-[4px] bg-[var(--color-badge-primary-bg)] border border-[var(--color-badge-primary-border)] text-[11px] font-semibold leading-[14px] text-white whitespace-nowrap">
                {badges[0]}
              </span>
            )}
            {badges?.[1] && (
              <span className="inline-flex items-center px-1 py-[2px] rounded-[4px] bg-[var(--color-badge-secondary-bg)] text-[11px] font-semibold leading-[14px] text-[var(--color-badge-secondary-text)] whitespace-nowrap">
                {badges[1]}
              </span>
            )}
          </div>

          {/* Product name — 2-line clamp fixed height 40px */}
          <div className="h-[40px] overflow-hidden shrink-0">
            <p className="text-[12px] font-medium leading-[16px] text-[var(--color-text-figma-primary)] line-clamp-2">
              {name}
            </p>
          </div>

          {/* Specs block — always reserves min-h; background only shows when there are specs */}
          {/* h-[52px] = p-2 (8+8) + 2 chip rows (16px each) + gap-y-1 (4px) = 52px exactly */}
          <div
            className={cn(
              "h-[52px] rounded-[8px] flex flex-wrap content-start gap-x-2 gap-y-1 overflow-hidden",
              specs && specs.length > 0
                ? "bg-[var(--color-spec-block-bg)] p-2"
                : ""
            )}
          >
            {specs?.slice(0, 5).map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center px-[6px] py-[2px] rounded-[4px] bg-[var(--color-spec-chip-bg)] text-[10px] font-normal leading-[12px] text-[var(--color-spec-chip-text)] whitespace-nowrap"
              >
                {spec.length > 15 ? spec.slice(0, 15) + "…" : spec}
              </span>
            ))}
          </div>
        </div>

        {/* 2c: price area — pushed to bottom with mt-auto */}
        <div className="flex flex-col gap-1 mt-auto">

          {/* Original price row + discount badge */}
          {originalPrice && originalPrice > price && (
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-normal leading-[20px] text-[#737373] line-through">
                {formatVND(originalPrice)}
              </span>
              {discountPercent !== null && (
                <span className="inline-flex items-center px-1 py-[1px] rounded-[4px] bg-[var(--color-badge-secondary-bg)] text-[11px] font-semibold leading-[14px] text-[var(--color-discount-text)]">
                  -{discountPercent}%
                </span>
              )}
            </div>
          )}

          {/* Sale price */}
          <span className="text-[20px] font-bold leading-[26px] text-[var(--color-flash-price-sale)]">
            {formatVND(price)}
          </span>

          {/* Voucher chips — min-h reserved so cards align even without vouchers */}
          <div className="flex gap-1 overflow-hidden min-h-[22px] items-center">
            {vouchers?.[0] && (
              <span className="inline-flex items-center px-1 py-[2px] rounded-[4px] bg-[var(--color-voucher-green-bg)] text-[11px] font-normal leading-[14px] text-[var(--color-voucher-green-text)] whitespace-nowrap">
                {vouchers[0]}
              </span>
            )}
            {vouchers?.[1] && (
              <span className="inline-flex items-center px-1 py-[2px] rounded-[4px] bg-[var(--color-voucher-orange-bg)] text-[11px] font-normal leading-[14px] text-[var(--color-voucher-orange-text)] whitespace-nowrap">
                {vouchers[1]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Zone 3: Star rating — px-[12px] pt-[12px] pb-[24px] ── */}
      {rating !== undefined && (
        <div className="px-3 pt-3 pb-6">
          <div className="flex items-center gap-1">
            <Star
              size={16}
              className="fill-[var(--color-star)] text-[var(--color-star)] shrink-0"
            />
            <span className="text-[12px] font-semibold leading-[16px] text-[var(--color-star-score-text)]">
              {rating.toFixed(1)}
            </span>
            {reviewCount !== undefined && (
              <span className="text-[12px] font-normal leading-[16px] text-[#737373]">
                ({reviewCount} đánh giá)
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
