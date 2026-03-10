#!/usr/bin/env bash
# GearvnWebV2 — Scaffold a new page + spec file
# Usage: bash scripts/new-page.sh <route> "<Page Title>"
# Example: bash scripts/new-page.sh products "Danh sách sản phẩm"

set -e

ROUTE=$1
TITLE=$2

if [ -z "$ROUTE" ] || [ -z "$TITLE" ]; then
  echo "Usage: $0 <route> \"<Page Title>\""
  echo ""
  echo "Examples:"
  echo "  $0 products \"Danh sách sản phẩm\""
  echo '  $0 "products/[slug]" "Chi tiết sản phẩm"'
  echo "  $0 cart \"Giỏ hàng\""
  exit 1
fi

# Generate kebab-case spec file name from route
SLUG=$(echo "$ROUTE" | tr '/' '-' | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | tr -d '[]')

PAGE_DIR="src/app/$ROUTE"
SPEC_FILE="docs/specs/pages/$SLUG.md"

# Guard
if [ -d "$PAGE_DIR" ]; then
  echo "Warning: Page directory already exists: $PAGE_DIR"
fi

if [ -f "$SPEC_FILE" ]; then
  echo "Error: Spec file already exists: $SPEC_FILE"
  exit 1
fi

mkdir -p "$PAGE_DIR"
mkdir -p "docs/specs/pages"

# Create page file
cat > "$PAGE_DIR/page.tsx" << TSX
// Spec: ${SPEC_FILE}
// Build status: In Progress

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${TITLE} | GearvnWebV2",
};

export default function Page() {
  return (
    <main>
      {/* TODO: implement from docs/specs/pages/${SLUG}.md */}
    </main>
  );
}
TSX

# Copy and customize spec
cp "docs/specs/_template.md" "$SPEC_FILE"

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/\[Component\/Page Name\]/${TITLE} (Page)/" "$SPEC_FILE"
else
  sed -i "s/\[Component\/Page Name\]/${TITLE} (Page)/" "$SPEC_FILE"
fi

echo ""
echo "Page scaffolded:"
echo "  $PAGE_DIR/page.tsx"
echo ""
echo "Spec file created:"
echo "  $SPEC_FILE"
echo ""
echo "Next steps:"
echo "  1. Fill out $SPEC_FILE with Figma values"
echo "  2. List all components used on this page in section 3"
echo "  3. Prompt Claude Code:"
echo "     \"Read CLAUDE.md and $SPEC_FILE, then build the $TITLE page\""
echo "     \"Use existing components: Navbar, Footer, [other components]\""
echo ""
