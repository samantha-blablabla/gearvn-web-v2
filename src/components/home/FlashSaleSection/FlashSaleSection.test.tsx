import { render, screen } from "@testing-library/react";
import { FlashSaleSection } from "./FlashSaleSection";

const mockProducts = [
  {
    id: "1",
    name: "Laptop ASUS ROG",
    slug: "asus-rog",
    imageUrl: "/test.jpg",
    price: 25990000,
    originalPrice: 32000000,
    inStock: true,
  },
];

describe("FlashSaleSection", () => {
  it("renders section title", () => {
    render(<FlashSaleSection products={mockProducts} />);
    expect(screen.getByText("Khuyến Mãi Hôm Nay")).toBeInTheDocument();
  });

  it("renders view all link", () => {
    render(<FlashSaleSection products={mockProducts} />);
    expect(screen.getByText("Xem tất cả")).toBeInTheDocument();
  });
});
