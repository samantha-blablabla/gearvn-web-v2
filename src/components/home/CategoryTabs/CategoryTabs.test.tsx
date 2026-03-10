import { render, screen } from "@testing-library/react";
import { CategoryTabs } from "./CategoryTabs";

describe("CategoryTabs", () => {
  it("renders all 5 tabs", () => {
    render(<CategoryTabs />);
    expect(screen.getByText("Tất cả danh mục khuyến mãi")).toBeInTheDocument();
    expect(screen.getByText("Hệ Thống Showroom")).toBeInTheDocument();
  });
});
