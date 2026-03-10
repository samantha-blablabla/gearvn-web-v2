import { render, screen } from "@testing-library/react";
import { ProductSection } from "./ProductSection";

const mockProducts = [
  {
    id: "1",
    name: "Màn hình ASUS 24 inch",
    slug: "man-hinh-asus-24",
    imageUrl: "/test.jpg",
    price: 4590000,
    inStock: true,
  },
];

describe("ProductSection", () => {
  it("renders section title", () => {
    render(<ProductSection title="Màn Hình Mới Nhất" products={mockProducts} />);
    expect(screen.getByText("Màn Hình Mới Nhất")).toBeInTheDocument();
  });

  it("renders view all link when provided", () => {
    render(
      <ProductSection
        title="Màn Hình Mới Nhất"
        products={mockProducts}
        viewAllHref="/man-hinh"
      />
    );
    expect(screen.getByText("Xem tất cả")).toBeInTheDocument();
  });
});
