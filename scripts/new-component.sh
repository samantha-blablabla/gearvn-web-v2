#!/usr/bin/env bash
# GearvnWebV2 — Scaffold a new component + spec file
# Usage: bash scripts/new-component.sh <category> <ComponentName>
# Example: bash scripts/new-component.sh product ProductCard

set -e

CATEGORY=$1
COMPONENT=$2

if [ -z "$CATEGORY" ] || [ -z "$COMPONENT" ]; then
  echo "Usage: $0 <category> <ComponentName>"
  echo ""
  echo "Examples:"
  echo "  $0 product ProductCard"
  echo "  $0 layout Navbar"
  echo "  $0 cart CartDrawer"
  echo "  $0 shared RatingStars"
  exit 1
fi

# Convert PascalCase to kebab-case for spec file name
# e.g. ProductCard -> product-card
KEBAB=$(echo "$COMPONENT" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')

COMP_DIR="src/components/$CATEGORY/$COMPONENT"
SPEC_FILE="docs/specs/components/$KEBAB.md"

# Guard: don't overwrite existing files
if [ -d "$COMP_DIR" ]; then
  echo "Error: Component directory already exists: $COMP_DIR"
  exit 1
fi

if [ -f "$SPEC_FILE" ]; then
  echo "Error: Spec file already exists: $SPEC_FILE"
  exit 1
fi

# Create component directory
mkdir -p "$COMP_DIR"

# Create main component file
cat > "$COMP_DIR/$COMPONENT.tsx" << TSX
import { cn } from "@/lib/utils";

export interface ${COMPONENT}Props {
  className?: string;
}

export function ${COMPONENT}({ className }: ${COMPONENT}Props) {
  return (
    <div className={cn("", className)}>
      {/* TODO: implement from docs/specs/components/${KEBAB}.md */}
    </div>
  );
}
TSX

# Create barrel export
cat > "$COMP_DIR/index.ts" << TS
export { ${COMPONENT} } from "./${COMPONENT}";
export type { ${COMPONENT}Props } from "./${COMPONENT}";
TS

# Create test stub
cat > "$COMP_DIR/$COMPONENT.test.tsx" << TSX
import { render, screen } from "@testing-library/react";
import { ${COMPONENT} } from "./${COMPONENT}";

describe("${COMPONENT}", () => {
  it("renders without crashing", () => {
    const { container } = render(<${COMPONENT} />);
    expect(container.firstChild).toBeTruthy();
  });
});
TSX

# Copy spec template and set component name
cp "docs/specs/_template.md" "$SPEC_FILE"

# Replace placeholder title in spec (cross-platform sed)
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/\[Component\/Page Name\]/${COMPONENT}/" "$SPEC_FILE"
else
  sed -i "s/\[Component\/Page Name\]/${COMPONENT}/" "$SPEC_FILE"
fi

echo ""
echo "Component scaffolded:"
echo "  $COMP_DIR/$COMPONENT.tsx"
echo "  $COMP_DIR/index.ts"
echo "  $COMP_DIR/$COMPONENT.test.tsx"
echo ""
echo "Spec file created:"
echo "  $SPEC_FILE"
echo ""
echo "Next steps:"
echo "  1. Fill out $SPEC_FILE with Figma values"
echo "     (Figma link, node ID, colors, typography, spacing, props)"
echo "  2. Set spec status to 'Ready to Build'"
echo "  3. Prompt Claude Code:"
echo '     "Read CLAUDE.md and '"$SPEC_FILE"', then build the '"$COMPONENT"' component."'
echo ""
