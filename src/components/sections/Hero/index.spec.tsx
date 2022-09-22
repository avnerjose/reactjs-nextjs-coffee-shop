import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { HeroSection } from ".";

describe("Hero section component", () => {
  it("should render correctly", () => {
    render(<HeroSection />);

    expect(screen.getByText("Coffee Shop")).toBeInTheDocument();
    expect(screen.getByText("Shop Here")).toBeInTheDocument();
    expect(
      screen.getByText(/Lorem ipsum dolor sit amet consectetur adipisicing/),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Separator")).toBeInTheDocument();
  });
});
