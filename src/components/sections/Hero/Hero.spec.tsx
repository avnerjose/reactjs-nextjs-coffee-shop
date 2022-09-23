import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { HeroSection } from ".";

describe("Hero section component", () => {
  it("should render correctly", () => {
    render(<HeroSection />);

    expect(
      screen.getByText("Start your day with a black coffee")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti modi corrupti, adipisci rem temporibus."
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText("Separator")).toBeInTheDocument();
    expect(screen.getByText("Shop Here")).toHaveAttribute("href", "/catalog");
  });
});
