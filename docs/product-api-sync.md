# GearvnWebV2 — Product API Sync Rules

> **Mục đích**: Đảm bảo dữ liệu sản phẩm từ API được map chính xác vào `Product` interface
> mà không gây lệch UI. Đọc file này trước khi viết bất kỳ data-fetching / mapping logic nào.
>
> **Áp dụng cho**: tất cả AI agent, dev handoff, và integration code.

---

## Interface chuẩn

```typescript
// src/types/index.ts
interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  inStock?: boolean;
  category?: string;
  badges?: string[];    // Tối đa 2, mỗi item ≤ 20 ký tự
  specs?: string[];     // Không giới hạn số lượng
  vouchers?: string[];  // Tối đa 2, mỗi item ≤ 20 ký tự
}
```

---

## Mapping Rules (bắt buộc)

### `name`
- Lấy từ API field: `product_name` hoặc `title`
- Không truncate tại đây — component tự xử lý `line-clamp-2`
- Nên giữ ≤ 80 ký tự để không bị cắt xấu

### `price`
- Luôn là số nguyên VND (`number`)
- KHÔNG format tại đây — dùng `formatVND(price)` trong component
- Nếu API trả về string: `parseInt(apiPrice.replace(/\D/g, ""), 10)`

### `originalPrice`
- Chỉ set nếu `originalPrice > price` (đang giảm giá)
- Nếu API không có: bỏ qua (undefined) — component sẽ không hiện strikethrough
- Discount % được tính tự động bởi `calcDiscountPercent(originalPrice, price)`

### `imageUrl`
- Ưu tiên ảnh chất lượng cao nhất có sẵn (≥ 400px)
- Fallback: `/assets/images/placeholder-product.png`
- Next.js `<Image>` yêu cầu domain phải được whitelist trong `next.config.mjs`
- **Xem thêm: phần "Image Domain Whitelist" bên dưới**

### `rating`
- Kiểu `number`, thang 0–5
- Nếu API trả về thang 0–10: chia đôi
- Nếu không có: để `undefined` — Zone 3 (star row) sẽ ẩn hoàn toàn

### `badges` — **Giới hạn nghiêm ngặt**
```
Rule 1: Tối đa 2 items (badges[0] và badges[1])
Rule 2: Mỗi badge ≤ 20 ký tự sau khi truncate
Rule 3: badges[0] = red solid bg (#C10007) — dùng cho nhãn độc quyền/nổi bật
Rule 4: badges[1] = light red bg (#FFE2E2) — dùng cho nhãn phụ (trả góp, deal...)
```

**Mapping từ API:**
```typescript
function mapBadges(apiProduct: ApiProduct): string[] {
  const badges: string[] = [];

  // Priority order for Badge 1 (red solid)
  if (apiProduct.is_exclusive) badges.push("Độc quyền");
  else if (apiProduct.is_flash_sale) badges.push("Flash Sale");
  else if (apiProduct.is_new) badges.push("Mới về");
  else if (apiProduct.label_1) badges.push(apiProduct.label_1.slice(0, 20));

  // Badge 2 (light red)
  if (apiProduct.has_installment) badges.push("Trả góp 0%");
  else if (apiProduct.label_2) badges.push(apiProduct.label_2.slice(0, 20));

  return badges.slice(0, 2); // Enforce max 2
}
```

### `specs` — Chip specs trong block xám
```
Rule: Mỗi spec ngắn gọn, ≤ 20 ký tự
Rule: Thứ tự quan trọng: CPU → GPU → Screen size → Refresh rate
Rule: Không thêm đơn vị thừa (dùng "16GB" không phải "RAM 16GB")
```

**Mapping từ API:**
```typescript
function mapSpecs(apiProduct: ApiProduct): string[] {
  const specs: string[] = [];
  if (apiProduct.cpu)           specs.push(apiProduct.cpu.slice(0, 20));
  if (apiProduct.gpu)           specs.push(apiProduct.gpu.slice(0, 20));
  if (apiProduct.screen_size)   specs.push(apiProduct.screen_size);   // e.g. "15.6 inch"
  if (apiProduct.refresh_rate)  specs.push(apiProduct.refresh_rate);  // e.g. "165Hz"
  if (apiProduct.resolution)    specs.push(apiProduct.resolution);    // e.g. "2K"
  if (apiProduct.ram)           specs.push(apiProduct.ram);           // e.g. "16GB"
  if (apiProduct.storage)       specs.push(apiProduct.storage);       // e.g. "512GB SSD"
  return specs;
}
```

### `vouchers` — **Giới hạn nghiêm ngặt**
```
Rule 1: Tối đa 2 items
Rule 2: Mỗi voucher ≤ 20 ký tự
Rule 3: vouchers[0] = green (#F0FDF4 / #009966) — ưu tiên voucher sinh viên/thành viên
Rule 4: vouchers[1] = orange (#FFF7ED / #F54A00) — ưu tiên quà tặng/combo deal
```

**Mapping từ API:**
```typescript
function mapVouchers(apiProduct: ApiProduct): string[] {
  const vouchers: string[] = [];
  if (apiProduct.student_discount) vouchers.push(apiProduct.student_discount.slice(0, 20));
  else if (apiProduct.voucher_1)   vouchers.push(apiProduct.voucher_1.slice(0, 20));

  if (apiProduct.gift_voucher)     vouchers.push(apiProduct.gift_voucher.slice(0, 20));
  else if (apiProduct.voucher_2)   vouchers.push(apiProduct.voucher_2.slice(0, 20));

  return vouchers.slice(0, 2);
}
```

---

## Hàm map hoàn chỉnh

Khi tích hợp API thật, tạo file `src/lib/mapProduct.ts` với nội dung:

```typescript
import type { Product } from "@/types";

// Thay ApiProduct bằng type từ API docs thực tế
export function mapApiProductToProduct(apiProduct: unknown): Product {
  const p = apiProduct as Record<string, unknown>;

  return {
    id:            String(p.id ?? ""),
    name:          String(p.name ?? p.title ?? ""),
    slug:          String(p.slug ?? p.handle ?? ""),
    imageUrl:      String(p.image_url ?? p.thumbnail ?? ""),
    price:         Number(p.price ?? p.sale_price ?? 0),
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    rating:        p.rating ? Number(p.rating) : undefined,
    reviewCount:   p.review_count ? Number(p.review_count) : undefined,
    inStock:       p.in_stock !== false && p.stock_quantity !== 0,
    category:      p.category ? String(p.category) : undefined,
    badges:        mapBadges(p),
    specs:         mapSpecs(p),
    vouchers:      mapVouchers(p),
  };
}

function mapBadges(p: Record<string, unknown>): string[] | undefined {
  const badges: string[] = [];
  if (p.badge_1) badges.push(String(p.badge_1).slice(0, 20));
  if (p.badge_2) badges.push(String(p.badge_2).slice(0, 20));
  return badges.length > 0 ? badges.slice(0, 2) : undefined;
}

function mapSpecs(p: Record<string, unknown>): string[] | undefined {
  const specs: string[] = [];
  const candidates = ["cpu", "gpu", "screen_size", "refresh_rate", "resolution", "ram", "storage"];
  for (const key of candidates) {
    if (p[key]) specs.push(String(p[key]).slice(0, 20));
  }
  return specs.length > 0 ? specs : undefined;
}

function mapVouchers(p: Record<string, unknown>): string[] | undefined {
  const vouchers: string[] = [];
  if (p.voucher_1) vouchers.push(String(p.voucher_1).slice(0, 20));
  if (p.voucher_2) vouchers.push(String(p.voucher_2).slice(0, 20));
  return vouchers.length > 0 ? vouchers.slice(0, 2) : undefined;
}
```

> File này chưa tồn tại — tạo khi có API contract thực tế.
> Template mapping ở trên là ví dụ — tên field API phải khớp với API docs.

---

## Image Domain Whitelist

Khi API trả về `imageUrl` từ CDN ngoài (không phải `/public/`), phải thêm domain vào:

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.gearvn.com",  // ← thêm domain CDN thực tế
      },
      {
        protocol: "https",
        hostname: "**.gearvn.com",
      },
    ],
  },
};
```

> Không được dùng `unoptimized: true` — mất lợi ích lazy load và resize của Next.js Image.

---

## Product Image — Zone 1 Notes

> Xem chi tiết: `docs/specs/components/product-card.md` → Section 5

Vùng hình ảnh (Zone 1, `h-[220px]`) có **top badge row slot** (`min-h-[20px]`) để chứa:
- Frame trang trí (New Year, sale event...)
- Badge đặc biệt (fire icon, star icon...)

**Khi API trả về `frame_type` hoặc `overlay_type`:**
- Map sang prop `topBadgeSlot` (sẽ được thêm vào component khi có thiết kế)
- Không tự ý đặt cứng frame vào `ProductCard` — tạo wrapper component riêng
- Ví dụ: `NewYearProductCard`, `EventProductCard`

---

## Validation trước khi render

Trước khi pass `Product` vào `<ProductCard>`, đảm bảo:

```typescript
function validateProduct(p: Product): Product {
  return {
    ...p,
    // Enforce badge rules
    badges: p.badges
      ?.map((b) => b.slice(0, 20))
      .slice(0, 2)
      .filter(Boolean),
    // Enforce voucher rules
    vouchers: p.vouchers
      ?.map((v) => v.slice(0, 20))
      .slice(0, 2)
      .filter(Boolean),
    // Price safety
    price: Math.max(0, p.price),
    originalPrice:
      p.originalPrice && p.originalPrice > p.price
        ? p.originalPrice
        : undefined,
  };
}
```

---

## Checklist khi tích hợp API mới

- [ ] Đọc API docs — xác định field names cho `name`, `price`, `imageUrl`, `slug`
- [ ] Tạo `src/lib/mapProduct.ts` với `mapApiProductToProduct()`
- [ ] Whitelist image domain trong `next.config.mjs`
- [ ] Đảm bảo `badges` ≤ 2 items, mỗi ≤ 20 ký tự
- [ ] Đảm bảo `vouchers` ≤ 2 items, mỗi ≤ 20 ký tự
- [ ] Test card render ở các trạng thái: full data, no badges, no specs, no rating, out of stock
- [ ] Chạy `npx tsc --noEmit` — zero errors
- [ ] Visual check tại 1440px / 768px / 375px
