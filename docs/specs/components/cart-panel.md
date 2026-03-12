# CartPanel — Component Spec

> **Spec version**: 1.0
> **Status**: `[x] Built`
> **Figma source**: Node `367:6723` — file `Ny81e1RasD47Ifn7GHDVIj`
> **Component**: `src/components/cart/CartPanel/CartPanel.tsx`
> **Last updated**: 2026-03-11

---

## Figma Nodes

| Element | Node ID |
|---------|---------|
| CartPanel (root) | `367:6723` |
| Header | `356:26910` |
| ItemsArea | `362:28850` |
| CartItem (instance 1) | `362:28858` |
| CartItem (instance 2) | `365:6816` |
| CTA Footer ("Divider") | `365:8814` |
| QtyStepper | `364:7035` |
| close icon | `62:54690` |
| delete_outline icon | `62:72907` |
| remove (minus) icon | `62:68172` |
| add (plus) icon | `62:67499` |

---

## 1. Purpose & Context

Panel giỏ hàng dạng drawer trượt từ phải sang, hiện khi user bấm nút Giỏ hàng trên Navbar.
Mục tiêu UX: giữ user ở trang hiện tại, cho phép xem/chỉnh sửa giỏ rồi proceed checkout — không điều hướng ngay.

Không dùng cho: mobile (sẽ dùng bottom sheet riêng — chưa implement).

---

## 2. Layout Structure

```
CartPanel (fixed top-0 right-0, w-[480px], h-screen, z-[61])
├── Header (h-[64px], px-[16px] py-[16px], bg-white)
│   ├── Title "Giỏ hàng của bạn" (20px/SemiBold)
│   └── Close button (min-w-[48px], icon 24×24)
├── ItemsArea (flex-1, overflow-y-auto, p-[16px], gap-[8px])
│   └── CartItem × n (bg-white, p-[16px], rounded-[8px])
│       ├── MainContent (flex row, gap-[12px])
│       │   ├── Image (80×80px, rounded-[8px])
│       │   └── Context (flex-1, gap-[8px])
│       │       ├── Row 1: Product name + Delete button
│       │       ├── Row 2: Price block + QtyStepper
│       │       └── Row 3 (optional): Gift badge
│       └── SubContent: WarrantyCard (bg-[#f5f5f5], p-[12px], rounded-[8px])
│           ├── Radio button (16×16px)
│           ├── Row 1: "Gói bảo hành" + "490.000đ x1"
│           ├── Row 2: Description (max 2 dòng)
│           └── Row 3: "Tìm hiểu thêm" link
└── Footer / CTA (shrink-0, bg-white, p-[16px])
    └── CTA Button (bg-[#c10007], p-[16px], rounded-[10px], w-full)
```

---

## 3. Design Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-surface-subtle` | `#F5F5F5` | Panel bg, WarrantyCard bg |
| `--color-surface-red-subtle` | `#FEF2F2` | QtyStepper bg, Gift badge bg |
| `--color-flash-price-sale` | `#C10007` | QtyStepper border/icons, Sale price, CTA button |
| `--color-text-figma-primary` | `#262626` | Header title, Product name, Warranty label |
| `#737373` | — | Original price, Warranty description |
| `#A1A1A1` | — | Delete icon default color |
| `--color-link` | `#155DFC` | "Tìm hiểu thêm" link |
| `--color-navbar-bg` | `#C10007` | CTA button hover (same brand red) |

---

## 4. Typography

| Element | Size | Weight | Line-height | Notes |
|---------|------|--------|-------------|-------|
| Header title | 20px | 600 | 26px | "Giỏ hàng của bạn" |
| Product name | 14px | 500 | 18px | **Max 2 dòng** — `line-clamp-2` |
| Original price | 15px | 400 | 20px | Strikethrough, `#737373` |
| Sale price | 20px | 700 | 26px | `#c10007` |
| QtyStepper count | 16px | 500 | 20px | `#c10007` |
| Gift badge text | 11px | 600 | 14px | `#c10007` |
| Warranty label | 14px | 500 | 18px | `#262626` |
| Warranty price | 14px | 500 | 18px | `#262626` |
| Warranty qty ("x1") | 12px | 500 | 16px | `#262626` |
| Warranty description | 11px | 500 | 14px | `#737373`, **max 2 dòng** |
| "Tìm hiểu thêm" | 11px | 500 | 14px | `--color-link` |
| CTA button | 18px | 600 | 22px | white |

---

## 5. UI Rules (bắt buộc tuân theo)

### 5.1 Product Name
- **Tối đa 2 dòng** — dùng `line-clamp-2` + `overflow-hidden` wrapper
- Không fixed height — chiều cao tự nhiên theo 1 hoặc 2 dòng thực tế
- Nếu text dài hơn 2 dòng: tự động truncate `...`

### 5.2 Gift Badge
- **Tối đa 1 badge duy nhất** — `product.giftCount` → hiển thị "Quà tặng kèm (n)"
- Không stack nhiều loại quà trong CartPanel — giữ cho gọn
- Chi tiết quà tặng từng loại → để ở trang product detail hoặc `/gio-hang` đầy đủ
- Chỉ hiển thị khi `giftCount > 0`

### 5.3 Warranty Description (Option B)
- **Nội dung cố định**: "Bảo hành thêm 1 năm ngoài bảo hành nhà sản xuất, bao gồm lỗi phần cứng, linh kiện và hỗ trợ kỹ thuật miễn phí tại nhà."
- **Max 2 dòng** — `line-clamp-2 overflow-hidden`
- **"Tìm hiểu thêm"** — link riêng dòng thứ 3, luôn hiển thị (không bị ẩn khi text clamp)
- Link dẫn đến `/chinh-sach-bao-hanh`

### 5.4 QtyStepper
- Background: `#FEF2F2`, border: `#C10007`, rounded-[8px]
- Buttons: 36×36px, p-[8px]
- Count: 16px/Medium/#c10007
- Nếu giảm về 0: sản phẩm bị xóa khỏi giỏ (`removeItem`)

### 5.5 Icons (Figma-exact, không dùng Lucide thay thế)
- **Minus** (Figma `62:68172`): filled rectangle `#C10007`
- **Plus** (Figma `62:67499`): filled cross `#C10007`
- **Delete/Trash** (Figma `62:72907`): filled trash shape, default `#A1A1A1` → hover `#C10007`
- **Gift** (Figma heroicons-mini/gift): compound fill `#C10007`
- **Close** (Figma `62:54690`): Lucide `X` acceptable (same visual shape)

### 5.6 Z-index Stack
- Backdrop: `z-[60]` — phủ toàn màn hình kể cả Navbar (`z-50`)
- CartPanel: `z-[61]` — trên backdrop
- CategoryMenu backdrop: `z-40` (bắt đầu từ `top-[80px]`, không phủ Navbar)

---

## 6. States

| State | Visual |
|-------|--------|
| Closed | `translate-x-full` — ẩn ngoài viewport phải |
| Open | `translate-x-0` — slide in từ phải, backdrop z-[60] |
| Slide animation | `transition-transform duration-300 ease-in-out` |
| Backdrop | `transition-opacity duration-300`, always in DOM |
| Empty cart | Icon giỏ hàng xám + text + "Tiếp tục mua sắm" button |
| Body scroll | `overflow: hidden` khi panel mở — via CartContext `useEffect` |

---

## 7. CartContext (src/components/layout/CartContext.tsx)

```typescript
interface CartContextValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  items: CartItem[];         // CartItem = { product: Product; quantity: number }
  totalPrice: number;        // sum(price × quantity) — không tính warranty
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
}
```

**Demo data**: 2 sản phẩm hardcoded trong `DEMO_CART_ITEMS` — thay bằng API call khi backend sẵn sàng.

**Backdrop**: render trong `CartProvider` (không phải trong CartPanel) — tránh circular import.

---

## 8. Acceptance Criteria

- [ ] Panel slide in/out mượt (`duration-300`)
- [ ] Product name luôn `line-clamp-2`, không fixed height
- [ ] Gift badge tối đa 1, chỉ hiện khi `giftCount > 0`
- [ ] Warranty description max 2 dòng + "Tìm hiểu thêm" luôn visible
- [ ] QtyStepper giảm về 0 → xóa sản phẩm
- [ ] Icons dùng đúng Figma SVG paths (minus, plus, trash, gift)
- [ ] CTA button hiển thị tổng tiền realtime
- [ ] Escape key đóng panel
- [ ] Body scroll lock khi mở
- [ ] Backdrop z-[60] phủ Navbar, panel z-[61]
- [ ] Empty state khi giỏ trống
