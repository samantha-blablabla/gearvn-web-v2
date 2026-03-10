# FlashSaleSection — Component Spec

**Figma source:** Node `66:393` (HotDeals frame inside Desktop/Home `48:14095`)
**File:** `src/components/home/FlashSaleSection/FlashSaleSection.tsx`
**Status:** ✅ Implemented

---

## Purpose

Full-width section on the homepage displaying time-limited flash sale products.
Contains a countdown timer, date range, product carousel, and pagination controls.

---

## Layout Structure

```
<section>  ← full width, bg #F5F5F5
  <div max-w-[1440px] px-[120px] py-[32px]>
    <div rounded-[32px] gradient-warm-orange px-[32px] py-[32px] gap-[32px]>
      ① Banner placeholder (120px tall orange gradient)
      ② Countdown & Date row
      ③ Product cards row (scrollable)
      ④ Pagination bar (dots + buttons)
    </div>
  </div>
</section>
```

---

## Zone Details

### ① Banner Placeholder
| Property | Value |
|----------|-------|
| Height | `120px` |
| Border radius | `24px` |
| Background | gradient `#FFA983 → #F54A00` (top → bottom) |
| Inner shadow | `inset 0px 4px 4px 0px rgba(255,102,0,0.4)` |

> Replace with actual promotional banner image when assets are ready.

---

### ② Countdown & Date Row — `flex items-center justify-between py-[8px]`

**Date pills (left side):**
- Two pills showing `dateFrom` / `dateTo` (format: `dd/mm`)
- Style: `bg-[#F5F5F5] rounded-[8px] px-[12px] py-[10px]`
- Text: `font-semibold text-[16px] leading-[22px] text-[#262626]`
- Gap between pills: `10px`

**Countdown (right side):**
- 3 boxes: Hours : Minutes : Seconds
- Each box: `bg-[#F5F5F5] rounded-[8px] p-[12px] min-w-[49px]`
- Text: `font-semibold text-[18px] leading-[22px] text-[#262626]`
- Separator `:`: `font-semibold text-[18px] text-black`
- Gap: `10px`

---

### ③ Product Cards Row
- Horizontal scroll container: `flex gap-[12px] overflow-x-auto scrollbar-hide`
- Uses `FlashSaleProductCard` component — see `flash-sale-product-card.md`
- Each card: `w-[220px]` fixed
- Scroll step: `5 × (220px + 12px gap) = 1160px` per page click

---

### ④ Pagination Bar — `flex items-center justify-between py-[8px]`

**Dots (left):**
- Container: `bg-[rgba(229,229,229,0.02)] rounded-full p-[8px]`
- Shadow: `0px 2px 8px 0px rgba(0,0,0,0.15)`
- Inactive dot: `size-[6px] rounded-full bg-[#D4D4D4] opacity-60`
- Active dot: `w-[24px] h-[6px] rounded-full bg-[#E5E5E5]`
- Gap: `6px`

**Right group:**
- "Xem tất cả khuyến mãi" link → `/khuyen-mai`
  - Style: `bg-[#F5F5F5] rounded-[8px] px-[12px] py-[10px]`
  - Text: `font-semibold text-[16px] leading-[22px] text-[#262626]`
  - Hover: `bg-[#E5E5E5]`
- Prev/Next chevron buttons (same bg style, `size-[20px]` icon)
- Gap between link and buttons: `16px`, gap between prev/next: `8px`

---

## Outer Container
| Property | Value |
|----------|-------|
| Section bg | `#F5F5F5` |
| Content max-width | `1440px` |
| Horizontal padding | `120px` |
| Vertical padding | `32px` |
| Inner container bg | gradient `#FFD7C6 → #FF4800` |
| Inner border radius | `32px` |
| Inner padding | `32px` |
| Gap between zones | `32px` |

---

## Props

```ts
interface FlashSaleSectionProps {
  products: Product[];     // required — list of products for carousel
  endTime?: Date;          // countdown target time
  dateFrom?: string;       // default: "dd/mm"
  dateTo?: string;         // default: "dd/mm"
  className?: string;
}
```

---

## Design Tokens Used
```
--color-flash-sale-outer-bg:     #F5F5F5
--color-flash-sale-gradient-from: #FFD7C6
--color-flash-sale-gradient-to:  #FF4800
--color-flash-sale-banner-from:  #FFA983
--color-flash-sale-banner-to:    #F54A00
```

---

## Notes for Devs
- `FlashSaleProductCard` is a **separate component** from the regular `ProductCard`.
  Do NOT use the regular `ProductCard` inside this section.
- The fire badge on `FlashSaleProductCard` is positioned **top-right** of the image area
  (matches Figma `items-end` / `justify-end` on the badge container, node `120:4152`).
- The banner placeholder (`①`) should be replaced with a real `<Image>` once assets are provided.
- Countdown is purely client-side (`"use client"`). The rest could be Server Component if needed in future.
