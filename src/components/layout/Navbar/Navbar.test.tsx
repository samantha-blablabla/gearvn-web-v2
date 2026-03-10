import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders the logo", () => {
    render(<Navbar />);
    expect(screen.getByText("gear")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<Navbar />);
    expect(screen.getByPlaceholderText(/Bạn cần tìm gì/)).toBeInTheDocument();
  });
});
