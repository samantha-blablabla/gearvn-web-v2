# Image Guide — GearvnWebV2

Tài liệu này liệt kê **toàn bộ hình ảnh cần cung cấp** cho website, kèm kích thước xuất file, đường dẫn chính xác, và naming convention.

---

## Naming Convention

| Quy tắc | Ví dụ đúng | Ví dụ sai |
|---------|-----------|-----------|
| Luôn **kebab-case** | `hero-main-1.jpg` | `HeroMain1.jpg` |
| Số thứ tự ở **cuối** | `review-1.jpg` | `1-review.jpg` |
| **Không dấu**, không space | `man-hinh.png` | `màn hình.png` |
| Ảnh thật → `.jpg` (quality 85) | `product-asus-rog.jpg` | |
| Logo/icon có nền trong → `.png` | `vnpay.png` | |
| Vector → `.svg` | `logo-gearvn.svg` | |

---

## Folder Structure

```
public/assets/
├── icons/
│   └── category-tabs/          ← SVG icons (đã có, không cần thêm)
└── images/
    ├── logo-gearvn.svg          ← đã có
    ├── placeholder-product.svg  ← đã có
    ├── banners/
    ├── categories/
    ├── brands/
    ├── products/
    ├── reviews/
    ├── payment/
    └── shipping/
```

---

## Chi tiết từng loại ảnh

### 1. Banners — `public/assets/images/banners/`

| File | Kích thước xuất | Dùng ở | Ghi chú |
|------|----------------|--------|---------|
| `banner-hero-1.png` | **604 × 340px** | HeroBanner — carousel chính (giữa, trên) | 16:9 ratio — slide được ✅ |
| `banner-hero-2.png` | **604 × 340px** | HeroBanner — carousel chính | ✅ |
| `banner-hero-3.png` | **604 × 340px** | HeroBanner — carousel chính | ✅ |
| `banner-sub-1.png` | **604 × 268px** | HeroBanner — carousel phụ (giữa, dưới) | Slide được ✅ |
| `banner-sub-2.png` | **604 × 268px** | HeroBanner — carousel phụ | ✅ |
| `banner-right-1.png` | **300 × 148px** | HeroBanner — cột phải, banner 1 | Static, không slide ✅ |
| `banner-right-2.png` | **300 × 148px** | HeroBanner — cột phải, banner 2 | ✅ |
| `banner-right-3.png` | **300 × 148px** | HeroBanner — cột phải, banner 3 | ✅ |
| `banner-right-4.png` | **300 × 148px** | HeroBanner — cột phải, banner 4 | ✅ |
| `flash-sale-banner.jpg` | **360 × 200px** | FlashSaleSection (tùy chỉnh) | Nằm trong gradient cam |
| `brand-main-1.jpg` | **478 × 239px** | BrandSection — left banner | Slide được |
| `brand-main-2.jpg` | **478 × 239px** | BrandSection — left banner | |
| `product-tab-sidebar-1.jpg` | **280 × 564px** | ProductTabSection — sidebar trên | flex-1, min-h 564px |
| `product-tab-sidebar-2.jpg` | **280 × 564px** | ProductTabSection — sidebar dưới | flex-1, min-h 564px |
| `cate-top-left.jpg` | **594 × 334px** | CateShowcase — banner top trái | |
| `cate-top-right.jpg` | **594 × 334px** | CateShowcase — banner top phải | |
| `cate-sidebar-mouse.jpg` | **200 × 300px** | CateShowcase — sidebar "Chuột" | Auto-height, min 200px |
| `cate-sidebar-laptop.jpg` | **200 × 300px** | CateShowcase — sidebar "Laptop" | |
| `news-top-banner.jpg` | **1200 × 200px** | NewsSection — banner đầu mục | Full-width dark banner |
| `news-featured.jpg` | **760 × 444px** | NewsSection — bài nổi bật (trái) | |
| `news-small-1.jpg` | **374 × 210px** | NewsSection — bài nhỏ (phải trên) | |
| `news-small-2.jpg` | **374 × 210px` | NewsSection — bài nhỏ (phải dưới) | |

> **Tip**: Tất cả banner dùng `next/image fill` nên ảnh sẽ crop/scale tự động. Xuất đúng tỉ lệ là đủ, không cần pixel-perfect.

---

### 2. Category Icons — `public/assets/images/categories/`

20 icon danh mục cho **FeaturedCategories**. Hiển thị: `70 × 70px`. Xuất: `140 × 140px` (2x).

| File | Tên hiển thị |
|------|-------------|
| `laptop.png` | Laptop |
| `pc.png` | PC |
| `mainboard.png` | Mainboard |
| `cpu.png` | CPU |
| `vga.png` | VGA |
| `case.png` | Case |
| `nguon.png` | Nguồn |
| `tan.png` | Tản |
| `ram.png` | RAM |
| `o-cung.png` | Ổ cứng |
| `man-hinh.png` | Màn hình |
| `ban-phim.png` | Bàn phím |
| `chuot.png` | Chuột |
| `tai-nghe.png` | Tai nghe |
| `ghe.png` | Ghế |
| `loa.png` | Loa |
| `sac.png` | Sạc |
| `phu-kien.png` | Phụ kiện |
| `thiet-bi-vp.png` | Thiết bị VP |
| `console.png` | Console |

> Format: `.png` nền trong. Nếu dùng `.svg` cũng được.

---

### 3. Brand Logos — `public/assets/images/brands/`

Dùng trong **BrandSection** (grid 4 cols × 3 rows, overflow-clip + nav arrows). Ô logo: `200 × 60px`, `p-[8px]`, `rounded-[8px]`. Xuất: `200 × 60px`, PNG nền trong.

| File | Thương hiệu |
|------|------------|
| `asus.png` | ASUS |
| `acer.png` | Acer |
| `msi.png` | MSI |
| `razer.png` | Razer |
| `gigabyte.png` | GIGABYTE |
| `lenovo.png` | Lenovo |
| `viewsonic.png` | ViewSonic |
| `corsair.png` | Corsair |
| `logitech.png` | Logitech |
| `akko.png` | Akko |
| `edra.png` | EDRA |
| `steelseries.png` | SteelSeries |

---

### 4. Product Images — `public/assets/images/products/`

Dùng trong **ProductCard** và **FlashSaleProductCard**. Hiển thị: `160 × 160px`. Xuất: **400 × 400px** (để zoom đẹp).

Tên file đặt theo **slug sản phẩm**:

```
asus-rog-zephyrus-g14.jpg
logitech-g-pro-x.jpg
msi-titan-gt77.jpg
...
```

> Fallback mặc định khi không có ảnh: `placeholder-product.svg` (đã có sẵn).

---

### 5. Review Thumbnails — `public/assets/images/reviews/`

Dùng trong **ReviewSection** — 2 carousel:

| File | Kích thước xuất | Carousel |
|------|----------------|---------|
| `review-portrait-1.jpg` → `review-portrait-10.jpg` | **244 × 433px** | "Góc Review Thực Tế" (dọc) |
| `review-product-1.jpg` → `review-product-10.jpg` | **88 × 88px** | Mini product image trong card review |
| `video-thumb-1.jpg` → `video-thumb-10.jpg` | **319 × 180px** | "Video Review Sản Phẩm" (16:9) |

---

### 6. Payment Logos — `public/assets/images/payment/`

Hiển thị trong ô `50 × 30px` ở Footer, layout **2 rows × 4 cols** (8 logos tổng).
Xuất: **100 × 50px** (2x), PNG nền trong, `border-radius: 4px`.

| File | Dịch vụ | Vị trí |
|------|--------|--------|
| `vnpay.png` | VNPay | Row 1, Col 1 |
| `momo.png` | MoMo | Row 1, Col 2 |
| `visa.png` | Visa | Row 1, Col 3 |
| `mastercard.png` | Mastercard | Row 1, Col 4 |
| `jcb.png` | JCB | Row 2, Col 1 |
| `napas.png` | Napas | Row 2, Col 2 |
| `zalopay.png` | ZaloPay | Row 2, Col 3 |
| `shopee-pay.png` | ShopeePay | Row 2, Col 4 |

---

### 7. Shipping Logos — `public/assets/images/shipping/`

Hiển thị trong ô `50 × 30px` ở Footer, layout **1 row × 4 cols** (4 logos tổng).
Xuất: **100 × 50px** (2x), PNG nền trong, `border-radius: 4px`.

| File | Đơn vị |
|------|-------|
| `ghn.png` | Giao Hàng Nhanh |
| `ghtk.png` | Giao Hàng Tiết Kiệm |
| `viettel-post.png` | Viettel Post |
| `vnpost.png` | VN Post |

---

### 8. Misc — `public/assets/images/`

| File | Kích thước | Ghi chú |
|------|-----------|---------|
| `logo-gearvn.svg` | — | Đã có. Logo trắng cho Navbar + Footer |
| `placeholder-product.svg` | 160 × 160px | Đã có. Fallback cho ảnh sản phẩm |
| `bct-logo.png` | **180 × 70px** | Badge "Đã Thông Báo Bộ Công Thương" (Footer) |

---

## Tóm tắt số lượng

| Loại | Số file | Folder |
|------|---------|--------|
| Banners | 20 | `banners/` |
| Category icons | 20 | `categories/` |
| Brand logos | 12 | `brands/` |
| Product images | Tùy số SP | `products/` |
| Review thumbnails | 10 portrait + 10 mini + 10 video = 30 | `reviews/` |
| Payment logos | 8 | `payment/` |
| Shipping logos | 4 | `shipping/` |
| Misc | 3 (2 đã có) | `images/` |
| **Tổng** | **~97 files** | |

---

## Checklist khi bàn giao ảnh

- [ ] Đúng tên file (kebab-case, không dấu)
- [ ] Đúng folder
- [ ] Ảnh `.jpg` xuất quality 85, không quá 200KB/file
- [ ] Logo `.png` nền trong, không quá 50KB/file
- [ ] Resize đúng kích thước xuất trong bảng trên
