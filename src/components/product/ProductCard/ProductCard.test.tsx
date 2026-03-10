import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

const mockProduct: Product = {
  id: "1",
  name: "Laptop ASUS ROG Zephyrus G14",
  slug: "asus-rog-zephyrus-g14",
  imageUrl: "/assets/images/test.jpg",
  price: 29990000,
  originalPrice: 35000000,
  rating: 4.5,
  reviewCount: 128,
  isNew: true,
  inStock: true,
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it("renders sale price and original price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("29.990.000 ₫")).toBeInTheDocument();
    expect(screen.getByText("35.000.000 ₫")).toBeInTheDocument();
  });

  it("renders 'Mới' badge when isNew is true", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Mới")).toBeInTheDocument();
  });

  it("shows out of stock state", () => {
    render(<ProductCard product={{ ...mockProduct, inStock: false }} />);
    expect(screen.getByText("Hết hàng")).toBeInTheDocument();
  });
});
