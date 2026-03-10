import { render, screen } from "@testing-library/react";
import { HeroBanner } from "./HeroBanner";

describe("HeroBanner", () => {
  it("renders sidebar menu items", () => {
    render(<HeroBanner />);
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Màn Hình")).toBeInTheDocument();
    expect(screen.getByText("Tai Nghe")).toBeInTheDocument();
  });
});
