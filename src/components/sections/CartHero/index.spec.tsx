import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { CartHero } from ".";

describe("CartHero section component", () => {
  it("should render correctly", () => {
    render(<CartHero />);

    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByAltText("Separator")).toBeInTheDocument();
  });
});
