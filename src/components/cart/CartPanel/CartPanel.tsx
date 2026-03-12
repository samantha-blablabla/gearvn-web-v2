"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatVND } from "@/lib/utils";
import { useCart } from "@/components/layout/CartContext";
import { useState, useEffect, useCallback } from "react";
import type { CartItem } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Figma icon SVGs — extracted via MCP from file Ny81e1RasD47Ifn7GHDVIj
// DO NOT replace with Lucide equivalents — shapes differ from Figma spec
// ─────────────────────────────────────────────────────────────────────────────

// remove icon — Figma node 62:68172
// viewBox "0 0 10.5 1.5" at inset(45.83% 20.83%) inside 18×18 container
// → rect at (3.75, 8.25), size 10.5×1.5
const IconMinus = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M14.25 9.75H3.75V8.25H14.25V9.75Z" fill="#C10007" />
  </svg>
);

// add icon — Figma node 62:67499
// viewBox "0 0 10.5 10.5" at inset(20.83%) inside 18×18 container
// → cross path translated by (3.75, 3.75)
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" fill="#C10007" />
  </svg>
);

// delete_outline icon — Figma node 62:72907 — fill: #A1A1A1 (currentColor)
// viewBox "0 0 11.6667 15" at inset(12.5% 20.83%) inside 20×20 container
// → translate(4.167, 2.5)
const IconTrash = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <g transform="translate(4.167, 2.5)">
      <path
        d="M0.833333 13.3333C0.833333 14.25 1.58333 15 2.5 15H9.16667C10.0833 15 10.8333 14.25 10.8333 13.3333V5C10.8333 4.08333 10.0833 3.33333 9.16667 3.33333H2.5C1.58333 3.33333 0.833333 4.08333 0.833333 5V13.3333ZM3.33333 5H8.33333C8.79167 5 9.16667 5.375 9.16667 5.83333V12.5C9.16667 12.9583 8.79167 13.3333 8.33333 13.3333H3.33333C2.875 13.3333 2.5 12.9583 2.5 12.5V5.83333C2.5 5.375 2.875 5 3.33333 5ZM8.75 0.833333L8.15833 0.241667C8.00833 0.0916666 7.79167 0 7.575 0H4.09167C3.875 0 3.65833 0.0916666 3.50833 0.241667L2.91667 0.833333H0.833333C0.375 0.833333 0 1.20833 0 1.66667C0 2.125 0.375 2.5 0.833333 2.5H10.8333C11.2917 2.5 11.6667 2.125 11.6667 1.66667C11.6667 1.20833 11.2917 0.833333 10.8333 0.833333H8.75Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

// heroicons-mini/gift icon — Figma node I365:6874;471:4081
// viewBox "0 0 12.8 12.8" at inset(10%) inside 16×16 container
// → translate(1.6, 1.6)
const IconGift = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <g transform="translate(1.6, 1.6)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.60015 3.2C9.85122 2.86574 10 2.45024 10 2C10 0.89543 9.10457 0 8 0C7.34576 0 6.76489 0.314139 6.4 0.799808C6.03511 0.314139 5.45424 0 4.8 0C3.69543 0 2.8 0.89543 2.8 2C2.8 2.45024 2.94878 2.86574 3.19985 3.2H1C0.447715 3.2 0 3.64772 0 4.2V4.6C0 5.15229 0.447716 5.6 1 5.6H5.8V3.2H7V5.6H11.8C12.3523 5.6 12.8 5.15229 12.8 4.6V4.2C12.8 3.64772 12.3523 3.2 11.8 3.2H9.60015ZM8.8 2C8.8 2.44183 8.44183 2.8 8 2.8H7.2L7.2 2C7.2 1.55817 7.55818 1.2 8 1.2C8.44183 1.2 8.8 1.55817 8.8 2ZM4 2C4 2.44183 4.35817 2.8 4.8 2.8H5.6V2C5.6 1.55817 5.24183 1.2 4.8 1.2C4.35817 1.2 4 1.55817 4 2Z"
        fill="#C10007"
      />
      <path d="M5.8 6.8H0.8V10.6C0.8 11.815 1.78497 12.8 3 12.8H5.8V6.8Z" fill="#C10007" />
      <path d="M7 12.8V6.8H12V10.6C12 11.015 11.015 12.8 9.8 12.8H7Z" fill="#C10007" />
    </g>
  </svg>
);

// ── QtyStepper ────────────────────────────────────────────────────────────────
// Figma node 364:7035
// bg-[#fef2f2] border-[#c10007] rounded-[8px] gap-[8px]
// Buttons 36×36px p-[8px]; Count 16px/Medium/20px/#c10007

function QtyStepper({
  value,
  onDecrement,
  onIncrement,
}: {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-[var(--color-surface-red-subtle)] border border-[var(--color-flash-price-sale)] rounded-[8px] shrink-0">
      <button
        onClick={onDecrement}
        className="w-[36px] h-[36px] flex items-center justify-center p-2 rounded-[8px] hover:bg-red-100 transition-colors shrink-0"
        aria-label="Giảm số lượng"
      >
        <IconMinus />
      </button>

      {/* Count — 16px/Medium/20px/#c10007 */}
      <span className="text-[16px] font-medium leading-[20px] text-[var(--color-flash-price-sale)] shrink-0 min-w-[16px] text-center">
        {value}
      </span>

      <button
        onClick={onIncrement}
        className="w-[36px] h-[36px] flex items-center justify-center p-2 rounded-[8px] hover:bg-red-100 transition-colors shrink-0"
        aria-label="Tăng số lượng"
      >
        <IconPlus />
      </button>
    </div>
  );
}

// ── WarrantyCard ──────────────────────────────────────────────────────────────
// Figma: SubContent — bg-[#f5f5f5] p-[12px] rounded-[8px] gap-[8px]
//
// Rule: description max 2 dòng (line-clamp-2), "Tìm hiểu thêm" link hiện riêng
// dòng dưới — luôn visible dù text có bị clamp hay không (Option B)

function WarrantyCard({
  selected,
  onToggle,
}: {
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start gap-2 bg-[var(--color-surface-subtle)] p-3 rounded-[8px] w-full">
      {/* Radio button — Figma: 16×16px circle, stroke #D4D4D4 when unselected */}
      <button
        onClick={onToggle}
        className="shrink-0 mt-0.5 flex items-center justify-center"
        aria-label={selected ? "Bỏ chọn gói bảo hành" : "Chọn gói bảo hành"}
      >
        <div
          className={cn(
            "w-4 h-4 rounded-full border-[1.25px] flex items-center justify-center transition-colors",
            selected
              ? "border-[var(--color-flash-price-sale)] bg-[var(--color-flash-price-sale)]"
              : "border-[#D4D4D4] bg-white"
          )}
        >
          {selected && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
        </div>
      </button>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Row 1: label + price — 14px/Medium/18px/#262626 */}
        <div className="flex items-center justify-between w-full font-medium text-[var(--color-text-figma-primary)] whitespace-nowrap">
          <p className="text-[14px] leading-[18px] shrink-0">Gói bảo hành</p>
          <div className="flex items-end gap-3 shrink-0">
            <p className="text-[14px] leading-[18px]">490.000đ</p>
            <p className="text-[12px] leading-[16px]">x1</p>
          </div>
        </div>

        {/* Row 2: description max 2 dòng — 11px/Medium/14px/#737373 */}
        <p className="text-[11px] font-medium leading-[14px] text-[#737373] line-clamp-2 overflow-hidden">
          Bảo hành thêm 1 năm ngoài bảo hành nhà sản xuất, bao gồm lỗi phần
          cứng, linh kiện và hỗ trợ kỹ thuật miễn phí tại nhà.
        </p>

        {/* "Tìm hiểu thêm" — Option B: riêng 1 dòng, luôn hiển thị */}
        <Link
          href="/chinh-sach-bao-hanh"
          className="text-[11px] font-medium leading-[14px] text-[var(--color-link)] hover:underline w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          Tìm hiểu thêm
        </Link>
      </div>
    </div>
  );
}

// ── CartItemRow ───────────────────────────────────────────────────────────────
// Figma: bg-white p-[16px] rounded-[8px] flex-col gap-[12px]
//
// Rules:
// - Tên sản phẩm: tối đa 2 dòng (line-clamp-2), không fixed height
// - Gift badge: tối đa 1 badge duy nhất (giftCount), không stack nhiều badges
// - Warranty: luôn hiển thị bên dưới MainContent

function CartItemRow({
  item,
  warrantySelected,
  onWarrantyToggle,
  onRemove,
  onUpdateQty,
}: {
  item: CartItem;
  warrantySelected: boolean;
  onWarrantyToggle: () => void;
  onRemove: () => void;
  onUpdateQty: (qty: number) => void;
}) {
  const { product, quantity } = item;

  return (
    <div className="bg-white flex flex-col gap-3 p-4 rounded-[8px] shrink-0 w-full">
      {/* MainContent: image + context */}
      <div className="flex gap-3 items-center w-full">
        {/* Image — 80×80px */}
        <div className="relative shrink-0 size-[80px] rounded-[8px] overflow-hidden bg-[var(--color-surface-subtle)]">
          <Image
            src={product.imageUrl || "/assets/images/placeholder-product.svg"}
            alt={product.name}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        </div>

        {/* Context: flex-1, flex-col gap-[8px] */}
        <div className="flex flex-1 flex-col gap-2 items-start justify-center min-w-0">

          {/* Row 1: product name (max 2 dòng) + delete button */}
          {/* Figma: name 14px/Medium/18px/#262626; delete button w-[44px] h-[40px] */}
          <div className="flex gap-2 items-start justify-between w-full">
            {/* Product name — max 2 dòng, overflow truncate */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-[14px] font-medium leading-[18px] text-[var(--color-text-figma-primary)] line-clamp-2">
                {product.name}
              </p>
            </div>

            {/* Delete button — Figma: w-[44px] h-[40px], icon delete_outline 20×20 */}
            {/* fill #A1A1A1 default → #C10007 on hover (via currentColor) */}
            <button
              onClick={onRemove}
              className="flex items-start justify-end w-[44px] h-[40px] shrink-0 overflow-clip rounded-[8px] text-[#A1A1A1] hover:text-[var(--color-flash-price-sale)] transition-colors"
              aria-label="Xóa sản phẩm"
            >
              <IconTrash />
            </button>
          </div>

          {/* Row 2: price + qty stepper */}
          <div className="flex items-end w-full">
            <div className="flex flex-1 flex-col items-start justify-center min-w-0">
              {/* Original price: 15px/Regular/20px/#737373 strikethrough */}
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-[15px] font-normal leading-[20px] text-[#737373] line-through whitespace-nowrap">
                  {formatVND(product.originalPrice)}
                </p>
              )}
              {/* Sale price: 20px/Bold/26px/#c10007 */}
              <p className="text-[20px] font-bold leading-[26px] text-[var(--color-flash-price-sale)] whitespace-nowrap">
                {formatVND(product.price)}
              </p>
            </div>

            <QtyStepper
              value={quantity}
              onDecrement={() => onUpdateQty(quantity - 1)}
              onIncrement={() => onUpdateQty(quantity + 1)}
            />
          </div>

          {/* Row 3: gift badge — tối đa 1 badge duy nhất */}
          {/* Figma: bg-[#fef2f2] px-[4px] py-[2px] rounded-[4px]; 11px/SemiBold/14px/#c10007 */}
          {product.giftCount !== undefined && product.giftCount > 0 && (
            <div className="flex items-center gap-1 bg-[var(--color-surface-red-subtle)] px-1 py-[2px] rounded-[4px] shrink-0">
              <IconGift />
              <p className="text-[11px] font-semibold leading-[14px] text-[var(--color-flash-price-sale)] whitespace-nowrap">
                Quà tặng kèm ({product.giftCount})
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SubContent: warranty card */}
      <WarrantyCard selected={warrantySelected} onToggle={onWarrantyToggle} />
    </div>
  );
}

// ── CartPanel ─────────────────────────────────────────────────────────────────
// Figma node 367:6723 — CartPanel
// w-[480px], h-[900px] → code: h-screen (adapts to real viewport height)
// fixed top-0 right-0, z-[61] (above backdrop z-[60] > navbar z-50)

export interface CartPanelProps {
  className?: string;
}

export function CartPanel({ className }: CartPanelProps) {
  const { cartOpen, closeCart, items, totalPrice, removeItem, updateQuantity } =
    useCart();

  const [warrantyMap, setWarrantyMap] = useState<Record<string, boolean>>({});

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    },
    [closeCart]
  );
  useEffect(() => {
    if (cartOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [cartOpen, handleKey]);

  const toggleWarranty = (productId: string) => {
    setWarrantyMap((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-screen w-[480px] z-[61]",
        "bg-[var(--color-surface-subtle)] flex flex-col",
        "shadow-[-4px_0_24px_rgba(0,0,0,0.12)]",
        "transition-transform duration-300 ease-in-out",
        cartOpen ? "translate-x-0" : "translate-x-full",
        className
      )}
      role="dialog"
      aria-label="Giỏ hàng"
      aria-modal="true"
    >
      {/* ── Header — h-[64px] p-[16px] bg-white ─────── Figma node 356:26910 */}
      <div className="flex items-center justify-between h-[64px] px-4 py-4 bg-white shrink-0">
        {/* Title: 20px/SemiBold/26px/#262626 */}
        <p className="text-[20px] font-semibold leading-[26px] text-[var(--color-text-figma-primary)] whitespace-nowrap shrink-0">
          Giỏ hàng của bạn
        </p>

        {/* Close button — Figma node 362:28838: min-w-[48px] px-[16px] py-[12px] rounded-[10px] */}
        <button
          onClick={closeCart}
          className="flex items-center justify-center min-w-[48px] px-4 py-3 rounded-[10px] text-[var(--color-text-figma-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors"
          aria-label="Đóng giỏ hàng"
        >
          {/* close icon — Figma node 62:54690 — using Lucide X (same shape) */}
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* ── Items Area — flex-1 overflow-y-auto ──────── Figma node 362:28850 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
            <ShoppingCart size={64} strokeWidth={1} className="text-[#D4D4D4]" />
            <div className="text-center">
              <p className="text-[16px] font-semibold text-[var(--color-text-figma-primary)]">
                Giỏ hàng trống
              </p>
              <p className="text-[13px] text-[#737373] mt-1">
                Hãy thêm sản phẩm vào giỏ hàng nhé!
              </p>
            </div>
            <button
              onClick={closeCart}
              className="px-6 py-2 rounded-[8px] border border-[#E5E5E5] text-[14px] font-medium text-[var(--color-text-figma-primary)] hover:bg-white transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-4">
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                warrantySelected={warrantyMap[item.product.id] ?? false}
                onWarrantyToggle={() => toggleWarranty(item.product.id)}
                onRemove={() => removeItem(item.product.id)}
                onUpdateQty={(qty) => updateQuantity(item.product.id, qty)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer CTA — bg-white p-[16px] ──────────── Figma node 365:8814 */}
      {items.length > 0 && (
        <div className="shrink-0 bg-white p-4">
          {/* Button: bg-[#c10007] p-[16px] rounded-[10px] w-full */}
          {/* Text: 18px/SemiBold/22px/white */}
          <Link
            href="/gio-hang"
            onClick={closeCart}
            className="flex items-center justify-center w-full bg-[var(--color-flash-price-sale)] hover:bg-[var(--color-navbar-bg)] transition-colors p-4 rounded-[10px] text-white text-[18px] font-semibold leading-[22px] whitespace-nowrap"
          >
            Xem giỏ hàng — {formatVND(totalPrice)}
          </Link>
        </div>
      )}
    </div>
  );
}
