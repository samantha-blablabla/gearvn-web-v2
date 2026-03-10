# GearvnWebV2 — Figma to Code Workflow

## Overview

```
Figma Design  →  Spec Markdown  →  Claude Code  →  Component/Page  →  QA
   (Designer)      (Dev fills)       (AI builds)     (Code review)   (Visual check)
```

---

## Responsive Design Strategy

Figma có **3 viewport** cần implement:

| Viewport | Figma Frame Name | Width Target | Tailwind Prefix |
|----------|-----------------|--------------|-----------------|
| Desktop  | `Desktop / *`   | 1440px       | `lg:` / default |
| Tablet   | `Tablet / *`    | 768px        | `md:`           |
| Mobile   | `Mobile / *`    | 375px        | (default / base) |

### Quy tắc build responsive

1. **Mobile-first**: viết style default cho mobile trước, dùng `md:` và `lg:` để override lên
2. **Desktop node**: dùng làm layout reference chính (spacing, sizing, typography scale)
3. **Tablet node**: thường là bước giữa — grid collapse, spacing thu nhỏ
4. **Mobile node**: layout đơn giản nhất — stack dọc, full-width, padding nhỏ hơn

### Breakpoints dùng trong code

```css
/* Tailwind config — mặc định */
sm:  640px   /* không dùng nhiều — in-between */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop bắt đầu */
xl:  1280px  /* Desktop mid */
2xl: 1536px  /* Wide monitor */
```

> Content lock tại `max-w-[1440px]` trên desktop. Tablet/Mobile thì `w-full` + padding thu nhỏ.

### Padding responsive chuẩn

```tsx
// Section wrapper pattern
<div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]">
```

| Viewport | Horizontal Padding |
|----------|--------------------|
| Mobile   | `px-4` (16px)      |
| Tablet   | `px-10` (40px)     |
| Desktop  | `px-[120px]`       |

---

## Three Workflow Modes

### Mode A — Figma MCP Live *(fastest, most accurate)*

Use when: VSCode Figma extension is running with Dev Mode active.

```
1. Designer finalizes frame trong Figma (Desktop + Tablet + Mobile)
2. Dev mở VSCode trong thư mục GearvnWebV2
3. Mở Figma extension → bật Dev Mode → MCP server khởi động tại 127.0.0.1:3845
4. Tạo spec file — điền node ID cho cả 3 viewport (section 7 của template)
5. Prompt Claude Code với cả 3 node IDs → AI fetch từng viewport
6. Review, QA ở 3 breakpoint, commit
```

**Prompt mẫu khi MCP live:**
```
Read CLAUDE.md and docs/specs/components/[name].md.

Use Figma MCP to fetch:
- Desktop: node [DESKTOP_NODE_ID] from file [FILE_KEY]
- Tablet:  node [TABLET_NODE_ID]  from file [FILE_KEY]
- Mobile:  node [MOBILE_NODE_ID]  from file [FILE_KEY]

Build the [ComponentName] component with full responsive support.
```

---

### Mode B — Dev Mode Manual Copy *(async-safe, offline)*

Use when: Designer chia sẻ Figma link có Dev Mode access, không làm real-time.

```
1. Mở Figma trong browser → click vào frame
2. Dev Mode panel → tab "Inspect"
3. Chuyển đổi giữa Desktop / Tablet / Mobile frame và copy values vào spec
4. Điền cả 3 cột trong bảng Responsive Behavior của template
5. Commit spec file
6. Prompt Claude Code: "Read CLAUDE.md and docs/specs/[name].md, then build [ComponentName]"
```

---

### Mode C — Screenshot Reference *(fallback only)*

Use when: Không có Dev Mode, không có MCP, deadline gấp.

```
1. Screenshot cả 3 viewport (Desktop, Tablet, Mobile) từ Figma
2. Điền những gì có thể vào spec
3. Gửi screenshots + partial spec cho Claude Code
4. AI infer values — verify thủ công sau khi build
```

> ⚠️ Mode C kém chính xác hơn. Nên upgrade lên Mode A hoặc B khi có thể.

---

## Step-by-Step: Building a New Component

### Step 1 — Designer: Chuẩn bị trong Figma
- [ ] Component finalized ở cả 3 viewport (Desktop / Tablet / Mobile)
- [ ] Đặt tên đúng: `ProductCard/Desktop`, `ProductCard/Tablet`, `ProductCard/Mobile`
- [ ] Dùng design system components (không detach instances)
- [ ] Dev Mode access được cấp cho team
- [ ] Ghi node ID của cả 3 frame vào spec file

### Step 2 — Dev: Scaffold và điền spec
```bash
# Chạy scaffold script
./scripts/new-component.sh <category> <ComponentName>

# Ví dụ:
./scripts/new-component.sh product ProductCard
```

Tạo ra:
- `src/components/product/ProductCard/` (component stub)
- `docs/specs/components/product-card.md` (spec từ template)

Điền vào spec:
- Figma link + node ID cho **cả 3 viewport**
- Design tokens (màu, typography, spacing) cho mỗi viewport
- Responsive behavior table
- Props interface
- Vietnamese copy
- Status → **In Review**

Commit: `git commit -m "docs: add spec for ProductCard"`

### Step 3 — (Tùy chọn) Team Lead: Review spec
- [ ] Token names khớp với `docs/design-system.md`
- [ ] Responsive behavior table đã điền đủ 3 viewport
- [ ] Props interface đúng
- [ ] Status → **Ready to Build**

### Step 4 — Dev: Prompt Claude Code

**Với MCP (Mode A):**
```
Read CLAUDE.md and docs/specs/components/product-card.md.

Use Figma MCP to fetch:
- Desktop: node [DESKTOP_NODE] from file Ny81e1RasD47Ifn7GHDVIj
- Tablet:  node [TABLET_NODE]  from file Ny81e1RasD47Ifn7GHDVIj
- Mobile:  node [MOBILE_NODE]  from file Ny81e1RasD47Ifn7GHDVIj

Build ProductCard with full responsive support (mobile-first).
```

**Không có MCP (Mode B/C):**
```
Read CLAUDE.md and docs/specs/components/product-card.md.
Build the ProductCard component from the spec values.
Implement mobile-first responsive using Tailwind breakpoints (md: tablet, lg: desktop).
```

### Step 5 — Claude Code builds
AI tự động:
1. Đọc `CLAUDE.md` conventions
2. Đọc spec file
3. Kiểm tra `src/styles/design-tokens.css`
4. **Fetch Desktop node → Tablet node → Mobile node** (nếu có MCP)
5. Build component mobile-first với `md:` và `lg:` overrides
6. Tạo barrel export

### Step 6 — Dev: Review & QA
- [ ] Visual match Figma tại **1440px** desktop
- [ ] Visual match Figma tại **768px** tablet
- [ ] Visual match Figma tại **375px** mobile
- [ ] Tất cả states hoạt động (hover, disabled, loading, empty)
- [ ] Chạy: `npx tsc --noEmit` (zero TypeScript errors)
- [ ] Update spec status → **Built**

### Step 7 — Commit
```bash
git add src/components/product/ProductCard/
git add docs/specs/components/product-card.md
git commit -m "feat: add ProductCard component (responsive)"
```

---

## Step-by-Step: Building a New Page

```bash
./scripts/new-page.sh products "Danh sách sản phẩm"
```

Tạo ra:
- `src/app/products/page.tsx`
- `docs/specs/pages/danh-sach-san-pham.md`

Prompt Claude Code:
```
Read CLAUDE.md and docs/specs/pages/danh-sach-san-pham.md.

Use Figma MCP to fetch Desktop/Tablet/Mobile frames for this page.
Build the product listing page — mobile-first, responsive.
Reuse: ProductCard, Navbar, Footer.
```

---

## Responsive Patterns Reference

### Layout collapse pattern
```tsx
// Desktop: side-by-side | Tablet: 2 cols | Mobile: 1 col
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-[12px]">
```

### Typography scale pattern
```tsx
// Desktop: large | Tablet: medium | Mobile: small
<h2 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold">
```

### Section padding pattern
```tsx
// Always use this wrapper for sections
<div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]">
```

### Hiding on mobile
```tsx
<div className="hidden md:block">  {/* tablet+ only */}
<div className="hidden lg:block">  {/* desktop only */}
<div className="block lg:hidden">  {/* mobile+tablet only */}
```

---

## Naming Convention Quick Reference

| Figma Layer Name | Spec File | Component/Route |
|-----------------|-----------|-----------------|
| `ProductCard/Desktop` | `specs/components/product-card.md` | `ProductCard/` |
| `Navbar/Desktop` | `specs/components/navbar.md` | `Navbar/` |
| `Homepage/Desktop` | `specs/pages/homepage.md` | `app/page.tsx` |
| `Product Listing/Desktop` | `specs/pages/product-listing.md` | `app/products/page.tsx` |
| `Product Detail/Desktop` | `specs/pages/product-detail.md` | `app/products/[slug]/page.tsx` |
| `Cart Drawer/Desktop` | `specs/components/cart-drawer.md` | `CartDrawer/` |

---

## Git Conventions

### Branch naming
```
feat/component-{name}     → new component
feat/page-{route}         → new page
docs/spec-{name}          → spec-only changes
fix/component-{name}      → bug fix
chore/design-tokens       → token updates
responsive/{name}         → responsive fix cho component cụ thể
```

### Commit messages (Conventional Commits)
```
docs: add spec for ProductCard (desktop + tablet + mobile)
feat: implement ProductCard component (responsive)
feat: implement product listing page (responsive)
fix: ProductCard layout broken on tablet
chore: update brand color tokens
responsive: fix Navbar collapse on mobile
```

### PR description phải có
- Link Figma frame (Desktop)
- Screenshot tại 1440px desktop
- Screenshot tại 768px tablet
- Screenshot tại 375px mobile
- Link spec file đã dùng
- Status checklist từ spec section 8

---

## Component Build Order (recommended)

```
Phase 1: Foundation
  design-tokens.css → tailwind.config.ts → Root layout

Phase 2: Layout Shell
  Navbar (Desktop → Tablet → Mobile) → MobileMenu drawer → Footer

Phase 3: Product Core
  ProductCard → FlashSaleProductCard → ProductGrid → PriceDisplay

Phase 4: Homepage Sections
  HeroBanner → CategoryTabs → FlashSaleSection → ProductSection

Phase 5: Pages
  Homepage → Product Listing → Product Detail

Phase 6: Cart & Conversion
  CartDrawer → CartItem → AddToCartButton

Phase 7: Secondary
  Search results → Category pages → Checkout flow
```

> **Ưu tiên**: Build Desktop hoàn chỉnh trước, sau đó add responsive breakpoints.
> Không để component nào thiếu responsive trước khi sang phase tiếp theo.

---

## Figma File Reference

| Frame Type | Figma Node | Status |
|------------|------------|--------|
| Desktop / Home | `48:14095` | ✅ Built (partial) |
| Navbar / Desktop | `57:5163` | ✅ Built |
| HotDeals / Desktop | `66:393` | ✅ Built |
| Tablet / Home | TBD | ⏳ Pending |
| Mobile / Home | TBD | ⏳ Pending |

---

## Figma MCP: How to Start the Server

1. Mở VSCode trong thư mục `GearvnWebV2`
2. Mở panel **Figma** trong VSCode sidebar
3. Mở Figma file (file chứa design)
4. Đảm bảo **Dev Mode** đang bật trong Figma
5. Extension tự động khởi động MCP server tại `http://127.0.0.1:3845/mcp`
6. Bắt đầu Claude Code session — tự kết nối qua `.mcp.json`
7. Nếu tools `mcp__figma__*` xuất hiện trong tool list → MCP đang live

**Nếu MCP không start:** restart VSCode, reopen Figma file, đảm bảo Dev Mode đang bật.
