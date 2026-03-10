# GearvnWebV2 — Design System

> **Figma file**: `https://www.figma.com/design/Ny81e1RasD47Ifn7GHDVIj/Gearvn-Web-v2`
> **File key**: `Ny81e1RasD47Ifn7GHDVIj`
> **Last synced**: 2026-03-10

> ⚠️ File này là source of truth cho tất cả design tokens.
> Mọi giá trị ở đây phải tồn tại trong `src/styles/design-tokens.css`.
> Khi Figma update → update cả 2 file.

---

## Breakpoints & Responsive Strategy

### Viewport Targets

| Viewport | Width Target | Tailwind Prefix | Figma Frame Prefix |
|----------|-------------|-----------------|-------------------|
| Mobile   | 375px       | `(default/base)` | `Mobile / *`     |
| Tablet   | 768px       | `md:`            | `Tablet / *`     |
| Desktop  | 1440px      | `lg:`            | `Desktop / *`    |

### Section Padding Pattern (mandatory)

```tsx
// Dùng cho tất cả sections — KHÔNG dùng px cứng ở root layout
<div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]">
```

| Viewport | Padding | Value |
|----------|---------|-------|
| Mobile   | `px-4`  | 16px  |
| Tablet   | `px-10` | 40px  |
| Desktop  | `px-[120px]` | 120px |

### Grid Patterns

```tsx
// Product grid
"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-[12px]"

// 2-column layout (e.g. sidebar + main)
"flex flex-col lg:flex-row gap-4 lg:gap-6"

// 4-column feature grid
"grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
```

### Typography Scale (responsive)

```tsx
// Section heading
"text-[18px] md:text-[20px] lg:text-[20px] font-bold"

// Card title (2 lines)
"text-[13px] lg:text-[14px] font-medium leading-[18px] lg:leading-[20px]"

// Price sale
"text-[18px] lg:text-[20px] font-bold"
```

---

## Color Palette

| Token Name | CSS Variable | Hex | Usage |
|------------|-------------|-----|-------|
| Primary Brand | `--color-primary` | `#E53935` | CTA buttons, key actions |
| Primary Dark | `--color-primary-dark` | `#B71C1C` | Button hover/active |
| Primary Light | `--color-primary-light` | `#EF9A9A` | Backgrounds, highlights |
| Surface | `--color-surface` | `#FFFFFF` | Card backgrounds, page bg |
| Surface Subtle | `--color-surface-subtle` | `#F5F5F5` | Section backgrounds |
| Surface Muted | `--color-surface-muted` | `#EEEEEE` | Dividers, skeleton |
| Text Primary | `--color-text-primary` | `#1A1A1A` | Headlines, body text |
| Text Secondary | `--color-text-secondary` | `#757575` | Captions, secondary info |
| Text Disabled | `--color-text-disabled` | `#BDBDBD` | Disabled states |
| Text Inverse | `--color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| Border | `--color-border` | `#E0E0E0` | Card borders, dividers |
| Border Strong | `--color-border-strong` | `#9E9E9E` | Input borders (focused) |
| Success | `--color-success` | `#43A047` | In-stock badges |
| Warning | `--color-warning` | `#FB8C00` | Low stock warnings |
| Error | `--color-error` | `#E53935` | Error messages |
| Info | `--color-info` | `#1E88E5` | Info tooltips |
| Star Rating | `--color-star` | `#FFC107` | Star icons |

### Figma-sourced Extended Tokens

| Token | CSS Variable | Hex | Source Node |
|-------|-------------|-----|-------------|
| Navbar BG | `--color-navbar-bg` | `#C10007` | `57:5163` — primary/700 |
| Navbar Btn Menu | `--color-navbar-btn-menu` | `#9F0712` | `57:5163` — bg_red_darker |
| Navbar Btn Dark | `--color-navbar-btn-dark` | `#0A0A0A` | `57:5163` — neutral/950 |
| Figma Text Primary | `--color-text-figma-primary` | `#262626` | Design System |
| Flash Sale Badge BG | `--color-flash-badge-bg` | `#C10007` | `66:393` |
| Flash Sale Badge Border | `--color-flash-badge-border` | `#FFA2A2` | `66:393` |
| Flash Loadbar Track | `--color-flash-loadbar-track` | `#FFC9C9` | `66:393` |
| Flash Discount BG | `--color-flash-discount-bg` | `#FFE2E2` | `66:393` |
| Flash Discount Text | `--color-flash-discount-text` | `#E7000B` | `66:393` |
| Flash Price Sale | `--color-flash-price-sale` | `#C10007` | `66:393` |

---

## Typography

**Font Family**: Inter (Google Fonts)

| Scale | Size (px) | Weight | Line Height (px) | Usage |
|-------|-----------|--------|------------------|-------|
| Display | 32 | 700 | 40 | Page hero titles |
| H1 | 24 | 700 | 32 | Section headings |
| H2 | 20 | 600 | 28 | Sub-section headings |
| H3 | 16 | 600 | 24 | Card titles |
| H6-18 | 18 | 600 | 22 | Countdown numbers |
| Body Large | 16 | 400 | 24 | Lead paragraphs |
| Body | 15 | 400 | 20 | Product name, body |
| Body Small | 12 | 500 | 16 | Card labels |
| Caption | 11 | 600 | 14 | Badges, discount % |

---

## Spacing Scale

| Token | Value | Tailwind | Usage |
|-------|-------|---------|-------|
| `--space-1` | 4px | `p-1` | Tight internal |
| `--space-2` | 8px | `p-2` | Element gaps |
| `--space-3` | 12px | `p-3` | Card padding |
| `--space-4` | 16px | `p-4` | Mobile section padding |
| `--space-6` | 24px | `p-6` | Large section padding |
| `--space-8` | 32px | `p-8` | Section gaps |
| `--space-10` | 40px | `p-10` | Tablet section padding |
| `--space-12` | 48px | `p-12` | Page margins |
| `--space-[120]` | 120px | `px-[120px]` | Desktop section padding |

---

## Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|---------|-------|
| `--radius-sm` | 4px | `rounded` | Chips, tags, badges |
| `--radius-md` | 6px | `rounded-md` | Buttons |
| `--radius-lg` | 8px | `rounded-lg` | Cards, inputs |
| `--radius-xl` | 12px | `rounded-xl` | Modals, drawers |
| `--radius-full` | 9999px | `rounded-full` | Avatars, pills |
| — | 10px | `rounded-[10px]` | Navbar buttons |
| — | 24px | `rounded-[24px]` | Flash Sale banner |
| — | 32px | `rounded-[32px]` | Flash Sale container |

---

## Shadows

| Token | CSS Value | Tailwind | Usage |
|-------|-----------|---------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | `shadow-sm` | Cards default |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.12)` | `shadow-md` | Cards hover |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.16)` | `shadow-lg` | Modals, drawers |

---

## Icon Library

Dùng **Lucide React** (`lucide-react`). Custom icons (từ Figma) inline SVG.

```tsx
import {
  ShoppingCart,    // cart
  Search,          // search
  ChevronDown,     // dropdowns
  ChevronLeft, ChevronRight, // navigation
  Star,            // ratings
  Heart,           // wishlist
  Menu,            // mobile nav hamburger
  X,               // close/dismiss
  Minus, Plus,     // quantity controls
  Truck,           // shipping info
  Shield,          // warranty
  RotateCcw,       // return policy
  Zap,             // flash sale
  User,            // login
} from "lucide-react";
```

**Custom SVG icons** (inline, từ Figma Design System):
- `heroicons-mini/fire` — node `17:6550`, dùng trong FlashSaleProductCard badge

---

## Component Inventory

### Layout

| Component | Spec File | Desktop | Tablet | Mobile | Status |
|-----------|-----------|---------|--------|--------|--------|
| Navbar | — | ✅ | ⏳ | ⏳ | Partial |
| Footer | — | ✅ | ⏳ | ⏳ | Partial |
| MobileMenu | — | — | — | ⏳ | Not started |

### Home Sections

| Component | Spec File | Desktop | Tablet | Mobile | Status |
|-----------|-----------|---------|--------|--------|--------|
| CategoryTabs | — | ✅ | ⏳ | ⏳ | Partial |
| HeroBanner | — | ✅ | ⏳ | ⏳ | Partial |
| FlashSaleSection | `specs/components/flash-sale-section.md` | ✅ | ⏳ | ⏳ | Partial |
| ProductSection | — | ✅ | ⏳ | ⏳ | Partial |

### Product

| Component | Spec File | Desktop | Tablet | Mobile | Status |
|-----------|-----------|---------|--------|--------|--------|
| ProductCard | `specs/components/product-card.md` | ✅ | ⏳ | ⏳ | Partial |
| FlashSaleProductCard | `specs/components/flash-sale-product-card.md` | ✅ | ⏳ | ⏳ | Partial |
| ProductGrid | — | ⏳ | ⏳ | ⏳ | Not started |

### Cart

| Component | Spec File | Desktop | Tablet | Mobile | Status |
|-----------|-----------|---------|--------|--------|--------|
| CartDrawer | — | ⏳ | ⏳ | ⏳ | Not started |
| CartItem | — | ⏳ | ⏳ | ⏳ | Not started |
| AddToCartButton | — | ⏳ | ⏳ | ⏳ | Not started |

### Pages

| Page | Spec File | Desktop | Tablet | Mobile | Status |
|------|-----------|---------|--------|--------|--------|
| Homepage | `specs/pages/homepage.md` | ✅ | ⏳ | ⏳ | Partial |
| Product Listing | — | ⏳ | ⏳ | ⏳ | Not started |
| Product Detail | — | ⏳ | ⏳ | ⏳ | Not started |
| Search Results | — | ⏳ | ⏳ | ⏳ | Not started |
| Cart / Checkout | — | ⏳ | ⏳ | ⏳ | Not started |

> **Legend**: ✅ Built | ⏳ Pending | — Not applicable

---

## Figma Node Reference

| Frame | Node ID | Viewport | Notes |
|-------|---------|----------|-------|
| Desktop / Home | `48:14095` | 1440px | Full homepage |
| Navbar | `57:5163` | 1440px | bg #C10007 |
| HotDeals / FlashSale | `66:393` | 1440px | Orange gradient |
| FlashSale ProductCard | `122:13236` | 1440px | w=220px |
| Fire Badge | `120:4152` | — | Design System component |
| Tablet / Home | TBD | 768px | Cần lấy từ Figma |
| Mobile / Home | TBD | 375px | Cần lấy từ Figma |
