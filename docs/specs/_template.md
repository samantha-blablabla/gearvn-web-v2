# [Component/Page Name]

> **Spec version**: 1.0
> **Status**: `[ ] Draft` / `[ ] In Review` / `[ ] Ready to Build` / `[ ] Built` / `[ ] QA Passed`
> **Assigned dev**: @username
> **Last updated**: YYYY-MM-DD

### Figma Nodes

| Viewport | Frame Name | Node ID | Figma Link |
|----------|-----------|---------|------------|
| Desktop (1440px) | `ComponentName/Desktop` | `xxxx:xxxx` | [link] |
| Tablet (768px)   | `ComponentName/Tablet`  | `xxxx:xxxx` | [link] |
| Mobile (375px)   | `ComponentName/Mobile`  | `xxxx:xxxx` | [link] |

> Figma file key: `Ny81e1RasD47Ifn7GHDVIj`

---

## 1. Purpose & Context

[2–3 câu: Component này làm gì, xuất hiện ở đâu, có business logic hoặc điều kiện nào không.]

---

## 2. Design Tokens

> Copy exact values từ Figma Dev Mode "Inspect" panel.
> Tất cả token names phải khớp với `src/styles/design-tokens.css`. Thêm token mới ở đó nếu cần.

### Colors

| Token Name | CSS Variable | Hex Value | Usage |
|------------|-------------|-----------|-------|
| Primary Brand | `--color-primary` | `#E53935` | CTA button background |
| ... | ... | ... | ... |

### Typography

| Element | Weight | Size (px) | Line Height (px) | Tailwind |
|---------|--------|-----------|------------------|----------|
| Title | 600 | 16 | 24 | `text-base font-semibold` |
| ... | ... | ... | ... | ... |

### Spacing & Sizing

| Property | Desktop | Tablet | Mobile | Tailwind |
|----------|---------|--------|--------|----------|
| Padding | 16px | 12px | 8px | `p-2 md:p-3 lg:p-4` |
| Gap | 12px | 8px | 8px | `gap-2 lg:gap-3` |
| Border radius | 8px | 8px | 8px | `rounded-lg` |
| ... | ... | ... | ... | ... |

### Shadows & Effects

| Effect | CSS Value | Tailwind |
|--------|-----------|----------|
| Default shadow | `0 1px 3px rgba(0,0,0,0.08)` | `shadow-sm` |
| Hover shadow | `0 4px 12px rgba(0,0,0,0.12)` | `shadow-md` |

---

## 3. Layout & Structure

### Component Tree (Desktop)

```
ComponentName (element)
├── ChildA (div)
│   ├── SubChildA (element)
│   └── SubChildB (element) — conditional on mobile
└── ChildB (div)
    └── SubChildC (element)
```

> Ghi rõ elements ẩn/hiện theo viewport, thứ tự thay đổi, conditional slots.

### Responsive Behavior

| Breakpoint | Layout | Key Changes | Figma Node |
|------------|--------|-------------|------------|
| Mobile (default, < 768px) | Full width, stack dọc | padding `px-4`, hide [X element] | `xxxx:xxxx` |
| Tablet (`md:` ≥ 768px) | 2 columns hoặc compress | padding `px-10`, show [Y element] | `xxxx:xxxx` |
| Desktop (`lg:` ≥ 1024px) | Full layout 1440px | padding `px-[120px]`, max-w-[1440px] | `xxxx:xxxx` |

### States

| State | Visual Change | Responsive Notes |
|-------|--------------|-----------------|
| Default | base styles | — |
| Hover | ... | Không áp dụng trên touch device |
| Active/Pressed | ... | Touch feedback trên mobile |
| Disabled | opacity-50, cursor-not-allowed | — |
| Loading | skeleton shimmer | — |
| Empty / Out of stock | ... | — |

---

## 4. Props / Data Contract

```typescript
export interface ComponentNameProps {
  // required
  id: string;
  // optional
  className?: string;
}
```

---

## 5. Vietnamese Copy

| Element | Text (vi-VN) | Notes |
|---------|-------------|-------|
| CTA Button | "Thêm vào giỏ" | |
| Out of stock | "Hết hàng" | |
| ... | ... | ... |

---

## 6. Assets Required

| Asset | File Name | Format | Size | Source |
|-------|-----------|--------|------|--------|
| Placeholder | placeholder.svg | SVG | flexible | Export từ Figma |
| Icon | icon-name.svg | SVG | 20×20 | Lucide: `IconName` |

---

## 7. Figma MCP Fetch

Khi MCP server đang chạy, dùng prompt sau cho Claude Code:

```
Read CLAUDE.md and docs/specs/[path-to-this-file].md first.

Use Figma MCP to fetch all 3 viewports:
- Desktop: node [DESKTOP_NODE_ID] from file Ny81e1RasD47Ifn7GHDVIj
- Tablet:  node [TABLET_NODE_ID]  from file Ny81e1RasD47Ifn7GHDVIj
- Mobile:  node [MOBILE_NODE_ID]  from file Ny81e1RasD47Ifn7GHDVIj

Build [ComponentName] with mobile-first responsive (Tailwind: md: tablet, lg: desktop).
```

> Nếu chỉ có Desktop node, Claude Code sẽ infer Tablet/Mobile từ Desktop design.

---

## 8. Acceptance Criteria

### Desktop (1440px)
- [ ] Pixel-accurate so với Figma Desktop frame
- [ ] max-w-[1440px] mx-auto, px-[120px]

### Tablet (768px)
- [ ] Layout đúng với Figma Tablet frame
- [ ] Không bị overflow hoặc vỡ layout

### Mobile (375px)
- [ ] Layout đúng với Figma Mobile frame
- [ ] Touch targets ≥ 44×44px
- [ ] Không scroll ngang (không có overflow-x)

### General
- [ ] Tất cả states (hover, disabled, loading, empty) hoạt động
- [ ] Zero TypeScript errors: `npx tsc --noEmit`
- [ ] Dùng CSS variables — không hardcode màu
- [ ] Vietnamese copy khớp section 5
- [ ] Export từ `src/components/{category}/{ComponentName}/index.ts`

---

## 9. Claude Code Build Prompt

> Copy-paste block này làm prompt cho Claude Code.

```
Read CLAUDE.md and docs/specs/[path-to-this-file].md first.

Build the [ComponentName] component for GearvnWebV2.
Tech stack: Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui
Location: src/components/[category]/[ComponentName]/

Requirements:
1. Mobile-first responsive: base = mobile, md: = tablet (768px), lg: = desktop (1024px+)
2. Section wrapper: max-w-[1440px] mx-auto px-4 md:px-10 lg:px-[120px]
3. CSS variables từ design-tokens.css (thêm mới nếu cần)
4. Theo đúng component file structure trong CLAUDE.md
5. Implement tất cả states từ spec section 3
6. Props interface từ section 4, Vietnamese copy từ section 5
7. next/image cho ảnh, lucide-react cho icons

[Khi MCP đang chạy:]
Use Figma MCP to fetch:
- Desktop: node [DESKTOP_NODE_ID] from file Ny81e1RasD47Ifn7GHDVIj
- Tablet:  node [TABLET_NODE_ID]
- Mobile:  node [MOBILE_NODE_ID]

Không cài package mới khi chưa được approve.
Sau khi build, xác nhận tất cả acceptance criteria trong section 8.
```
