import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders logo", () => {
    render(<Footer />);
    expect(screen.getByText("gear")).toBeInTheDocument();
  });

  it("renders hotline", () => {
    render(<Footer />);
    expect(screen.getByText("Hotline: 1800 6426")).toBeInTheDocument();
  });

  it("renders link columns", () => {
    render(<Footer />);
    expect(screen.getByText("Về Gearvn")).toBeInTheDocument();
    expect(screen.getByText("Chính Sách")).toBeInTheDocument();
    expect(screen.getByText("Hỗ Trợ")).toBeInTheDocument();
  });
});
