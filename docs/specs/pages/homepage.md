# Spec: Homepage (Desktop / Home)

**Status**: Built
**Figma Node**: `48-14095` in file `Ny81e1RasD47Ifn7GHDVIj`
**Figma Frame**: Desktop / Home — 1440×7628px
**Route**: `/` → `src/app/page.tsx`

---

## Layout

| Section | Component | Height | Notes |
|---------|-----------|--------|-------|
| Navbar | `Navbar` | 82px | Sticky, dark bg |
| Category Tabs | `CategoryTabs` | 66px | 5 navigation links |
| Hero Banner | `HeroBanner` | ~680px | Sidebar + banners |
| Flash Sale | `FlashSaleSection` | auto | Red bg, countdown |
| Product sections | `ProductSection` (×N) | auto | Reusable carousel |
| Brand banner | — | 220px | Placeholder |
| Newsletter CTA | — | ~160px | Red bg, email form |
| Footer | `Footer` | auto | Dark bg |

---

## Design Tokens Used

- `--color-navbar-bg`: `#171717`
- `--color-primary`: `#E53935`
- `--color-surface-subtle`: `#F5F5F5` (section bg)
- `--color-surface-red-subtle`: `#FEF2F2` (sidebar icon bg)
- `--color-border-light`: `#D4D4D4` (sidebar card border)
- `--color-text-figma-primary`: `#262626` (Figma ground truth)

---

## Hero Banner (node `58:12701`) — Exact values from MCP

| Property | Value |
|----------|-------|
| Container padding | `px-[120px] py-[32px]` |
| Container bg | `#F5F5F5` |
| Container gap | `8px` |
| Sidebar width | `280px` |
| Sidebar height | `616px` |
| Sidebar bg | `white` |
| Sidebar border | `1px solid #D4D4D4` |
| Sidebar border-radius | `12px` |
| Sidebar padding | `8px` |
| Menu item icon bg | `#FEF2F2` |
| Menu item icon size | `20px` |
| Menu item icon padding | `4px` |
| Menu item icon radius | `4px` |
| Menu item text | `Inter Medium 14px #262626` |
| Middle column width | `604px` |
| Main banner height | `340px` |
| Secondary banner height | `268px` |
| Banner border-radius | `12px` |
| Banner nav button size | `32px` |
| Banner nav button radius | `16px` |
| Banner nav button bg | `rgba(229,229,229,0.02)` |
| Banner nav shadow | `0px 0px 5.333px rgba(0,0,0,0.2)` |
| Banner dot active | `w-16px h-6px white` |
| Banner dot inactive | `6px circle white/60` |
| Right column | `flex-1` (≈300px) |
| Right column banners | `4 equal-height slots` |

---

## Sidebar Menu Items (16 items, from MCP)

1. Laptop
2. Laptop Gaming
3. PC GVN
4. Main, CPU, VGA
5. Case, Nguồn, Tản
6. Ổ Cứng, RAM, Thẻ Nhớ
7. Loa, Micro, Webcam
8. Màn Hình
9. Bàn Phím
10. Chuột + Lót Chuột
11. Tai Nghe
12. Ghế - Bàn
13. Phần Mềm, Mạng
14. Handheld, Console
15. Phụ Kiện (Hub, sạc, cáp...)
16. Dịch vụ và thông tin khác

---

## CategoryTabs (node `52:21357`) — Exact values from MCP screenshot

5 nav links on white bar, 66px tall, px-[120px]:
1. Tất cả danh mục khuyến mãi
2. Tin tức, review sản phẩm
3. Tra Cứu Bảo Hành
4. Tra Cứu Hóa Đơn
5. Hệ Thống Showroom

Text: `--color-primary` red, icons at 16px.

---

## Acceptance Criteria

- [x] Navbar sticky on scroll
- [x] CategoryTabs shows all 5 items in red
- [x] Sidebar shows all 16 menu items with icons
- [x] Main banner carousel with prev/next + dots
- [x] Secondary banner carousel
- [x] 4 right column banner slots
- [x] Flash sale section with countdown timer
- [x] ProductCard shows sale price, original price, discount badge, rating
- [x] ProductSection horizontal scroll with arrows
- [x] Newsletter CTA section
- [x] Footer with links and social icons
- [ ] Replace placeholder banners with real images
- [ ] Connect product data to real API
