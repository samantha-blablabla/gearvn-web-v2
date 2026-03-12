# ProductCard — Component Spec

> **Spec version**: 2.0
> **Status**: `[x] Built`
> **Figma source**: Node `122:13288` — file `Ny81e1RasD47Ifn7GHDVIj`
> **Component**: `src/components/product/ProductCard/ProductCard.tsx`
> **Last updated**: 2026-03-10

---

## Figma Nodes

| Viewport | Frame Name | Node ID |
|----------|-----------|---------|
| Desktop (1440px) | `ProductCard/Desktop` | `122:13288` |
| Tablet (768px) | TBD | TBD |
| Mobile (375px) | TBD | TBD |

---

## 1. Purpose & Context

Card hiển thị thông tin sản phẩm trên toàn site (trừ FlashSaleSection dùng `FlashSaleProductCard` riêng).
Xuất hiện trong: `ProductTabSection`, `CateShowcase`, ProductGrid, Search Results, Category pages.

---

## 2. Layout Structure

```
ProductCard (Link, flex col, w-full, rounded-[8px], border #E5E5E5)
├── Zone 1: Image area (h-[220px], pt-[12px] px-[8px])
│   ├── Top badge row (flex justify-end, min-h-[20px])  ← dành cho frame custom sau này
│   └── Product image (size-[160px], object-contain, centered)
├── Zone 2: Content area (px-[12px] py-[8px], gap-[8px])
│   ├── 2a: Badges + Name + Specs (gap-[4px])
│   │   ├── Badge row (flex gap-[4px]) — tối đa 2 badges
│   │   ├── Product name (text-[12px] medium, h-[40px] line-clamp-2)
│   │   └── Specs block (bg-[#F5F5F5] p-[8px] rounded-[8px], flex-wrap)
│   └── 2c: Price area (gap-[4px], mt-auto)
│       ├── Original price + discount badge (flex row)
│       ├── Sale price
│       └── Voucher chips — tối đa 2 chips
└── Zone 3: Star rating (px-[12px] pt-[12px] pb-[24px])
    └── Star icon + score + review count
```

---

## 3. Design Tokens

### Colors (all defined in `src/styles/design-tokens.css`)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-surface` | `#FFFFFF` | Card background |
| `#E5E5E5` | — | Card border (not tokenized separately) |
| `--color-badge-primary-bg` | `#C10007` | Badge 1 background |
| `--color-badge-primary-border` | `#FFA2A2` | Badge 1 border |
| `--color-badge-secondary-bg` | `#FFE2E2` | Badge 2 background, discount badge bg |
| `--color-badge-secondary-text` | `#C10007` | Badge 2 text |
| `--color-text-figma-primary` | `#262626` | Product name |
| `--color-spec-block-bg` | `#F5F5F5` | Specs block background |
| `--color-spec-chip-bg` | `#E5E5E5` | Spec chip background |
| `--color-spec-chip-text` | `#525252` | Spec chip text |
| `#737373` | — | Original (struck) price, review count |
| `--color-discount-text` | `#E7000B` | Discount % badge text |
| `--color-flash-price-sale` | `#C10007` | Sale price |
| `--color-voucher-green-bg` | `#F0FDF4` | Voucher 1 background |
| `--color-voucher-green-text` | `#009966` | Voucher 1 text |
| `--color-voucher-orange-bg` | `#FFF7ED` | Voucher 2 background |
| `--color-voucher-orange-text` | `#F54A00` | Voucher 2 text |
| `--color-star` | `#FFC107` | Star icon fill |
| `--color-star-score-text` | `#404040` | Star score number |

### Typography

| Element | Size | Weight | Line-height | Notes |
|---------|------|--------|-------------|-------|
| Badge text | 11px | 600 | 14px | Max 20 ký tự |
| Product name | 12px | 500 | 16px | 2-line clamp, h-[40px] |
| Spec chip | 10px | 400 | 12px | — |
| Original price | 15px | 400 | 20px | Strikethrough |
| Discount % | 11px | 600 | 14px | — |
| Sale price | 20px | 700 | 26px | — |
| Voucher text | 11px | 400 | 14px | Max 20 ký tự |
| Star score | 12px | 600 | 16px | — |
| Review count | 12px | 400 | 16px | — |

### Dimensions

| Property | Value |
|----------|-------|
| Card width | `w-full` (fills grid column) |
| Card height | auto (content-driven, đồng đều nhờ reserved zones) |
| Card border-radius | `8px` |
| Image area height | `h-[220px]` (fixed) |
| Product image | `size-[160px]`, `object-contain` |
| Zone 2 padding | `px-[12px] py-[8px]` |
| Zone 3 padding | `px-[12px] pt-[12px] pb-[24px]` |

---

## 4. UI Rules (bắt buộc tuân theo)

### 4.1 Badges
- Hiển thị **tối đa 2 badges** (badges[0] và badges[1])
- Badge 1: nền đỏ đậm `#C10007`, border `#FFA2A2`, chữ trắng
- Badge 2: nền đỏ nhạt `#FFE2E2`, chữ đỏ `#C10007`, không border
- **Độ dài tối đa: 20 ký tự** mỗi badge — nếu dài hơn phải truncate hoặc rút gọn
- Ví dụ đúng: `"Độc quyền"`, `"Trả góp 0%"`, `"Mới về"`
- Ví dụ sai: `"GEARVN Độc Quyền"` → quá dài, dùng `"Độc quyền"` thay thế

### 4.2 Product Name
- Hiển thị **tối đa 2 dòng** — luôn dùng `line-clamp-2`
- Chiều cao cố định `h-[40px]` để đồng đều giữa các card
- Nếu text dài hơn 2 dòng: tự động truncate với `...`
- Font: `12px / 500 / leading-[16px] / #262626`

### 4.3 Voucher Chips
- Hiển thị **tối đa 2 chips** (vouchers[0] và vouchers[1])
- Chip 1 (green): bg `#F0FDF4`, text `#009966`
- Chip 2 (orange): bg `#FFF7ED`, text `#F54A00`
- **Độ dài tối đa: 20 ký tự** mỗi chip
- Ví dụ đúng: `"HSSV giảm 500k"`, `"Voucher 200k"`
- Row dùng `overflow-hidden` để không vỡ layout nếu cả 2 chips đều dài

### 4.4 Specs Block
- **Chiều cao cố định `h-[52px]`** — luôn reserve space dù có hay không có specs
  - Tính toán: `p-2 (8+8px)` + `row 1 (16px)` + `gap-y-1 (4px)` + `row 2 (16px)` = **52px**
- **Tối đa 5 chips** — `specs.slice(0, 5)`, chip thứ 6+ bị bỏ qua
- **Mỗi chip tối đa 15 ký tự** — nếu dài hơn truncate thành `"text…"`
- Dùng `flex-wrap content-start` — chips xếp từ trên xuống, tối đa 2 hàng
- `overflow-hidden` — chip nào tràn sang hàng 3 bị ẩn hoàn toàn (không clip giữa chip)
- **Khi không có specs**: block vẫn render nhưng không có background/padding — invisible spacer 52px
- Ví dụ chips hợp lệ: `"Wireless"`, `"25600 DPI"`, `"60g"`, `"Core i9"`, `"RTX 4060"`

### 4.5 Rating
- Chỉ hiển thị khi `rating !== undefined`
- Luôn hiển thị ở Zone 3 với padding cố định (`pb-[24px]`) để đồng đều chiều cao card

---

## 5. Zone 1 — Image Area (quan trọng — đọc kỹ)

> ⚠️ **Vùng này sẽ được mở rộng trong tương lai.**

Hiện tại Zone 1 có cấu trúc:
```
Zone 1 (h-[220px], pt-[12px] px-[8px])
├── Top badge row (flex justify-end, min-h-[20px])  ← SLOT cho frame/badge tùy chỉnh
└── Product image (size-[160px], centered)
```

**Top badge row** là slot dành cho các frame/badge đặc biệt theo từng context:
- FlashSaleSection: dùng `FlashSaleProductCard` riêng (có fire badge + "Giảm sâu đến 40%")
- Context khác (ví dụ: New Year banner, exclusive frame, event overlay...): thêm element vào slot này
- **Không bao giờ đặt cứng frame trang trí vào `ProductCard` — luôn truyền qua prop hoặc dùng component riêng**

Khi designer thêm frame mới (ví dụ banner "Happy New Gear 2026" như trong screenshot):
1. Tạo variant/wrapper component riêng (ví dụ: `NewYearProductCard`)
2. Hoặc thêm optional prop `topBadgeSlot?: React.ReactNode` vào `ProductCard`
3. Ghi rõ vào spec file trước khi implement

---

## 6. Props Interface

```typescript
// src/types/index.ts
interface Product {
  id: string;
  name: string;                  // Tối đa ~60 ký tự để vừa 2 dòng
  slug: string;
  imageUrl: string;
  price: number;                 // VND, dùng formatVND()
  originalPrice?: number;        // Nếu > price thì hiện strikethrough
  rating?: number;               // 0–5, hiện 1 chữ số thập phân
  reviewCount?: number;
  inStock?: boolean;             // false → opacity 70%
  badges?: string[];             // Tối đa 2 items, mỗi item ≤ 20 ký tự
  specs?: string[];              // Tối đa 5 chips hiển thị, mỗi chip ≤ 15 ký tự (truncate tự động)
  vouchers?: string[];           // Tối đa 2 items, mỗi item ≤ 20 ký tự
}
```

---

## 7. States

| State | Visual |
|-------|--------|
| Default | White bg, border `#E5E5E5`, no shadow |
| Hover | `box-shadow: 0 4px 16px rgba(0,0,0,0.10)` via transition |
| Out of stock (`inStock: false`) | `opacity-70` |
| No image | Fallback `/assets/images/placeholder-product.png` |
| No badges | Badge row vẫn render, `min-h-[20px]` giữ chỗ |
| No specs | Specs block vẫn render (`h-[52px]`), không có bg/padding — invisible spacer |
| No vouchers | Voucher row vẫn render, `min-h-[22px]` giữ chỗ |
| No rating | Zone 3 ẩn hoàn toàn |

---

## 8. Acceptance Criteria

- [ ] Pixel-accurate so với Figma node `122:13288` tại 1440px
- [ ] Badge row tối đa 2 items, text không quá 20 ký tự
- [ ] Product name luôn `line-clamp-2`, `h-[40px]`
- [ ] Voucher row tối đa 2 items, text không quá 20 ký tự
- [ ] Sale price hiển thị đúng khi không có `originalPrice`
- [ ] Card cao đều nhau trong cùng một row (nhờ `mt-auto` trên price area)
- [ ] Hover shadow hoạt động mượt (`transition-shadow duration-200`)
- [ ] Không dùng hardcode hex — chỉ dùng CSS variables
- [ ] Zero TypeScript errors: `npx tsc --noEmit`
