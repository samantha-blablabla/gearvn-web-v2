# FlashSaleProductCard — Component Spec

> **Spec version**: 2.0
> **Status**: `[x] Built`
> **Figma source**: Node `122:13236` (ProductCard inside HotDeals `66:393`) — file `Ny81e1RasD47Ifn7GHDVIj`
> **Component**: `src/components/product/FlashSaleProductCard/FlashSaleProductCard.tsx`
> **Last updated**: 2026-03-10

---

## 1. Purpose & Context

Card sản phẩm chuyên dùng **duy nhất** trong `FlashSaleSection` (HotDeals frame).
**KHÔNG dùng ở bất kỳ section nào khác trên website.**
Khác với `ProductCard` thông thường về bố cục và nội dung hiển thị.

---

## 2. Dimensions

| Property | Value |
|----------|-------|
| Width | `220px` (fixed, `shrink-0`) |
| Height | auto (content-driven) |
| Border radius | `8px` |
| Background | `#FFFFFF` |
| Border | `1px solid #E5E5E5` |
| Hover shadow | `0 4px 16px rgba(0,0,0,0.10)` |

---

## 3. Layout Structure

```
FlashSaleProductCard (Link, w-[220px] shrink-0, flex col)
├── Zone 1: Image area (h-[220px], pt-[12px] px-[8px])
│   ├── Fire badge row (flex justify-end)  ← TOP-RIGHT, chỉ dùng cho Flash Sale
│   └── Product image (size-[160px], object-contain, centered)
├── Zone 2: Content area (px-[12px] py-[8px], gap-[8px])
│   ├── Product name (text-[12px] medium, h-[40px] line-clamp-2)
│   └── Price block (gap-[4px])
│       ├── Original price + discount chip (flex row)
│       └── Sale price
└── Zone 3: LoadBar (px-[12px] pt-[12px] pb-[24px])
    └── Progress bar with "Còn n/total" label
```

---

## 4. Zone Details

### Zone 1 — Fire Badge (top-RIGHT, Figma node `120:4152`)

| Property | Value |
|----------|-------|
| Position | `flex justify-end w-full px-[4px]` |
| Background | `#C10007` (`--color-flash-badge-bg`) |
| Border | `1px solid #FFA2A2` (`--color-flash-badge-border`) |
| Border radius | `4px` |
| Padding | `px-[4px] py-[2px]` |
| Icon | `heroicons-mini/fire` SVG, `size-[16px]`, white fill |
| Text | `badgeText` prop — `11px / 600 / leading-[14px] / white` |

### Zone 2 — Price Block

| Element | Style |
|---------|-------|
| Original price | `15px / 400 / leading-[20px] / #737373 / line-through` |
| Discount badge | `bg-[#FFE2E2] text-[#E7000B] 11px/600 rounded-[4px] px-[4px] py-[1px]` |
| Sale price | `20px / 700 / leading-[26px] / #C10007` |

### Zone 3 — LoadBar

| Property | Value |
|----------|-------|
| Track | `h-[15px] rounded-[8px] bg-[#FFC9C9]` |
| Fill | gradient `rgba(193,0,7,0) → rgba(193,0,7,0.8)`, width = `(remainCount/totalCount) * 100%` |
| Label | `"Còn {remainCount}/{totalCount}"` — `11px / 600 / white`, centered absolute |

---

## 5. UI Rules (bắt buộc tuân theo)

### 5.1 Fire Badge — `badgeText` prop
- **Chỉ sử dụng cho chương trình Flash Sale** — không dùng cho purpose khác
- Mặc định: `"Giảm sâu đến 40%"`
- **Độ dài tối đa: 20 ký tự** — component tự động `slice(0, 20)`
- Ví dụ đúng: `"Giảm sâu đến 40%"`, `"Sale 50%"`, `"Hot Deal"`
- Ví dụ sai: `"Khuyến mãi đặc biệt Flash Sale"` → tự động bị cắt
- Text màu **trắng**, nền đỏ `#C10007`, icon lửa bên trái

### 5.2 Product Name
- Hiển thị **tối đa 2 dòng** — luôn dùng `line-clamp-2`
- Chiều cao cố định `h-[40px]` để đồng đều card trong carousel
- Nếu dài hơn 2 dòng: tự động truncate với `...`
- Font: `12px / 500 / leading-[16px] / #262626`

### 5.3 Price
- Luôn hiển thị đủ 3 thành phần: giá gốc (gạch ngang) + chip % giảm + giá sale
- Nếu không có `originalPrice`: chỉ hiện giá sale, ẩn dòng trên
- Discount % tính tự động bằng `calcDiscountPercent(originalPrice, price)`
- Sale price: `20px / 700 / #C10007`

### 5.4 LoadBar
- Luôn hiển thị (không ẩn dù `remainCount = 0`)
- Khi `remainCount = 0`: fill width = 0%, label = `"Còn 0/{totalCount}"` (hết hàng)
- Khi `remainCount >= totalCount`: fill width = 100%

---

## 6. ⚠️ KHÔNG bao gồm (khác với ProductCard)

| Tính năng | Trạng thái |
|-----------|-----------|
| Badges (Badge 1, Badge 2) | ❌ Không có |
| Specs block (FullHD, IPS...) | ❌ Không có |
| Voucher chips | ❌ Không có |
| Star rating / review count | ❌ Không có |
| Custom frame / overlay | ❌ **Tuyệt đối không thêm** |

> **Quan trọng**: `FlashSaleProductCard` **không có slot cho frame trang trí**.
> Khác với `ProductCard` (có top badge row slot cho event frames),
> `FlashSaleProductCard` luôn chỉ hiển thị đúng như thiết kế Figma — fire badge cố định top-right.
> Nếu muốn card khác cho event đặc biệt → tạo component riêng, không modify component này.

---

## 7. Props Interface

```typescript
interface FlashSaleProductCardProps {
  product: Product;
  /** Fire badge text — max 20 ký tự, chỉ dùng cho Flash Sale
   *  Default: "Giảm sâu đến 40%"
   *  Component tự slice(0, 20) nếu vượt giới hạn */
  badgeText?: string;
  /** Số sản phẩm còn lại (default: 2) */
  remainCount?: number;
  /** Tổng số sản phẩm trong đợt (default: 10) */
  totalCount?: number;
  className?: string;
}
```

> `product.badges`, `product.specs`, `product.vouchers` bị **bỏ qua hoàn toàn** trong component này.

---

## 8. Design Tokens

```css
--color-flash-badge-bg:        #C10007   /* fire badge background */
--color-flash-badge-border:    #FFA2A2   /* fire badge border */
--color-flash-loadbar-track:   #FFC9C9   /* loadbar track */
--color-flash-discount-bg:     #FFE2E2   /* discount % badge bg */
--color-flash-discount-text:   #E7000B   /* discount % text */
--color-flash-price-sale:      #C10007   /* sale price */
--color-flash-price-original:  #737373   /* original price (strikethrough) */
```

---

## 9. States

| State | Visual |
|-------|--------|
| Default | White bg, border `#E5E5E5`, no shadow |
| Hover | `box-shadow: 0 4px 16px rgba(0,0,0,0.10)` |
| Out of stock | LoadBar fill = 0%, label "Còn 0/{total}" |

---

## 10. Acceptance Criteria

- [ ] Fire badge luôn ở top-RIGHT (không bao giờ top-left)
- [ ] `badgeText` tự động cắt ở 20 ký tự
- [ ] Product name `line-clamp-2`, `h-[40px]` — không bao giờ overflow card
- [ ] Đủ 3 thành phần giá khi có `originalPrice`
- [ ] LoadBar hiển thị đúng tỉ lệ `remainCount/totalCount`
- [ ] Không hiển thị badges, specs, vouchers, star rating
- [ ] Không có bất kỳ custom frame/overlay nào
- [ ] Chỉ dùng trong `FlashSaleSection` — không import ở nơi khác
- [ ] Zero TypeScript errors: `npx tsc --noEmit`
