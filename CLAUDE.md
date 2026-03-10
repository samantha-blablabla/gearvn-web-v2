# CLAUDE.md — GearvnWebV2 AI Agent Instructions

## Project Identity

- **Name**: GearvnWebV2 — Vietnamese e-commerce platform for tech/gaming gear
- **Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Language in UI**: Vietnamese (vi-VN)
- **Currency**: VND — always format with `toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })`

---

## Directory Rules (NEVER violate)

| Type | Location |
|------|----------|
| Design spec files | `docs/specs/components/` or `docs/specs/pages/` |
| Global design tokens | `docs/design-system.md` |
| CSS custom properties | `src/styles/design-tokens.css` |
| Reusable components | `src/components/{category}/{ComponentName}/` |
| shadcn primitives | `src/components/ui/` — **never hand-edit** |
| Pages | `src/app/{route}/page.tsx` |
| Layouts | `src/app/{route}/layout.tsx` |
| Global styles | `src/app/globals.css` (Tailwind directives only) |
| Shared types | `src/types/index.ts` |
| Utilities | `src/lib/utils.ts` |
| Public assets | `public/assets/{icons,images}/` |

---

## Component File Structure (mandatory)

Every component MUST have this exact structure:

```
src/components/{category}/{ComponentName}/
├── {ComponentName}.tsx      ← main component, named export
├── {ComponentName}.test.tsx ← test file (stub is OK if no spec)
└── index.ts                 ← barrel: export { ComponentName } from './{ComponentName}'
```

Example for `ProductCard` in category `product`:
```
src/components/product/ProductCard/
├── ProductCard.tsx
├── ProductCard.test.tsx
└── index.ts
```

---

## Code Style Rules

1. **Named exports only** — no `export default` for components.
2. **Props interface** always named `{ComponentName}Props` and exported.
3. **Use `cn()` from `@/lib/utils`** for all className merging — never string concatenation.
4. **CSS variables** — use `var(--color-primary)` etc., never hardcoded hex values.
5. **No inline styles** unless the value is dynamic (computed at runtime).
6. **Tailwind only** — no CSS module files for component styles.
7. **`next/image`** for ALL images — never `<img>` tags.
8. **`next/link`** for ALL internal links — never `<a>` tags.
9. **Server Components by default** — add `"use client"` only when needed (event handlers, hooks, browser APIs).
10. **No `any` type** — use `unknown` and narrow it, or use proper types.
11. **Vietnamese text** directly in JSX — no i18n library for V1.

---

## Design Token Usage

**Before writing any color, spacing, or shadow value:**
1. Open `src/styles/design-tokens.css`
2. Check if the token already exists
3. If not — ADD it there first, then use the CSS variable

Standard token naming:
```css
--color-primary         /* brand red: #E53935 */
--color-primary-dark    /* hover: #B71C1C */
--color-primary-light   /* light tint: #EF9A9A */
--color-surface         /* white: #FFFFFF */
--color-surface-subtle  /* light gray: #F5F5F5 */
--color-surface-muted   /* medium gray: #EEEEEE */
--color-text-primary    /* near black: #1A1A1A */
--color-text-secondary  /* medium gray: #757575 */
--color-text-disabled   /* light gray: #BDBDBD */
--color-text-inverse    /* white: #FFFFFF */
--color-border          /* light border: #E0E0E0 */
--color-border-strong   /* medium border: #9E9E9E */
--color-success         /* green: #43A047 */
--color-warning         /* orange: #FB8C00 */
--color-error           /* red: #E53935 */
--color-star            /* yellow: #FFC107 */
```

---

## Figma MCP Integration

The Figma Dev Mode MCP server may be available at `http://127.0.0.1:3845/mcp` (configured in `.mcp.json`).

**When MCP tools are available in your tool list (e.g. `figma_get_node`, `figma_get_file`):**
- Use `figma_get_node` with the node ID from the spec file to fetch exact measurements
- Extract from the response:
  - `fills[0].color` → convert RGB (0–1 scale) to hex
  - `style.fontSize`, `style.fontWeight`, `style.lineHeightPx`
  - `absoluteBoundingBox.width` / `.height`
  - `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`
  - `itemSpacing` → gap in auto-layout
  - `cornerRadius`
  - `effects` → box shadows
- **MCP values override spec file values** — MCP is ground truth

**When MCP is NOT available:**
- Read the spec file from `docs/specs/` and implement from those values
- The spec template is designed to contain all numeric values — never ask the user for values already in the spec

---

## When Given a Build Task

1. **Read the spec first**: `docs/specs/{components|pages}/{name}.md`
2. **Check `src/styles/design-tokens.css`**: ensure all colors/fonts from spec exist
3. **Check for similar components**: reuse patterns from `src/components/`
4. **Build in this order**:
   - a. TypeScript interface/types
   - b. Component structure (JSX skeleton)
   - c. Tailwind styling per spec
   - d. States: hover, disabled, loading skeleton, empty/out-of-stock
   - e. Barrel export in `index.ts`
5. **After building**: verify all acceptance criteria in the spec

---

## Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProductCard` |
| Component files | PascalCase.tsx | `ProductCard.tsx` |
| Hooks | camelCase, use* | `useCartStore` |
| Types/Interfaces | PascalCase | `ProductCardProps` |
| CSS variables | kebab-case | `--color-primary` |
| Spec files | kebab-case.md | `product-card.md` |
| Route folders | kebab-case | `product-detail/` |
| Script files | kebab-case.sh | `new-component.sh` |

---

## Allowed Packages

```
next, react, react-dom
typescript
tailwindcss, postcss, autoprefixer
shadcn/ui (via: npx shadcn@latest add <component>)
lucide-react
clsx, tailwind-merge
```

**To add a new package**: state what you need and why, then wait for developer approval.

---

## DO NOT

- Modify `src/components/ui/` files (shadcn-managed)
- Use hardcoded hex colors — always use CSS variables
- Use `<img>` or `<a>` tags
- Use `export default` for components
- Use `any` type
- Create a component without a corresponding spec file
- Install packages without approval
- Add English UI text — all copy must be Vietnamese
