#!/usr/bin/env bash
# GearvnWebV2 — One-time project bootstrap
# Run from the project root: bash scripts/init-project.sh
# Requirements: Node.js 18+, npm

set -e

echo "================================================"
echo " GearvnWebV2 — Project Initialization"
echo "================================================"
echo ""

# 1. Bootstrap Next.js 14 App Router project
echo "[1/7] Creating Next.js project..."
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git \
  --yes

# 2. Install additional dependencies
echo "[2/7] Installing dependencies..."
npm install lucide-react clsx tailwind-merge

# 3. Init shadcn/ui
echo "[3/7] Initializing shadcn/ui..."
npx shadcn@latest init --defaults --yes

# 4. Add baseline shadcn components
echo "[4/7] Adding shadcn components..."
npx shadcn@latest add button badge card skeleton dialog sheet tooltip \
  dropdown-menu separator --yes

# 5. Create directory structure
echo "[5/7] Creating directory structure..."
mkdir -p docs/specs/components
mkdir -p docs/specs/pages
mkdir -p src/components/{ui,layout,product,cart,shared}
mkdir -p src/types
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/assets/{icons,images}

# 6. Create design-tokens.css
echo "[6/7] Creating design tokens..."
cat > src/styles/design-tokens.css << 'CSS'
/* GearvnWebV2 — Design Tokens */
/* Source of truth for all CSS custom properties */
/* Update this file when design system changes in Figma */
/* See also: docs/design-system.md */

:root {
  /* ── Brand Colors ───────────────────────────── */
  --color-primary: #E53935;
  --color-primary-dark: #B71C1C;
  --color-primary-light: #EF9A9A;

  /* ── Surface ────────────────────────────────── */
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F5F5F5;
  --color-surface-muted: #EEEEEE;

  /* ── Text ───────────────────────────────────── */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #757575;
  --color-text-disabled: #BDBDBD;
  --color-text-inverse: #FFFFFF;

  /* ── Border ─────────────────────────────────── */
  --color-border: #E0E0E0;
  --color-border-strong: #9E9E9E;

  /* ── Semantic ───────────────────────────────── */
  --color-success: #43A047;
  --color-warning: #FB8C00;
  --color-error: #E53935;
  --color-info: #1E88E5;

  /* ── Special ────────────────────────────────── */
  --color-star: #FFC107;

  /* ── Border Radius ──────────────────────────── */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* ── Shadows ────────────────────────────────── */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);
}
CSS

# 7. Create utility files
echo "[7/7] Creating utility files..."

cat > src/lib/utils.ts << 'TS'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export function calcDiscountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}
TS

cat > src/types/index.ts << 'TS'
// Shared TypeScript types for GearvnWebV2
// Add project-wide interfaces and types here

export interface Product {
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
}

export interface CartItem {
  product: Product;
  quantity: number;
}
TS

# Update tailwind.config.ts to use CSS variables
cat > tailwind.config.ts << 'TS'
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          subtle: "var(--color-surface-subtle)",
          muted: "var(--color-surface-muted)",
        },
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-disabled": "var(--color-text-disabled)",
        "text-inverse": "var(--color-text-inverse)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        star: "var(--color-star)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "var(--shadow-sm)",
        "card-hover": "var(--shadow-md)",
        modal: "var(--shadow-lg)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
TS

# Add design-tokens import to globals.css
# Prepend the import (append to existing file)
echo '@import "../styles/design-tokens.css";' | cat - src/app/globals.css > /tmp/globals_tmp.css && mv /tmp/globals_tmp.css src/app/globals.css

echo ""
echo "================================================"
echo " Setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Review src/styles/design-tokens.css and update colors from Figma"
echo "  2. Fill out docs/design-system.md with your actual design tokens"
echo "  3. Run: ./scripts/new-component.sh <category> <ComponentName>"
echo "  4. Fill the generated spec in docs/specs/components/"
echo "  5. Open Claude Code and start building!"
echo ""
echo "  Dev server: npm run dev"
echo "  Type check: npx tsc --noEmit"
echo ""
