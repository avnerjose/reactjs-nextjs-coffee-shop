import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { CheckoutHero } from ".";

describe("CheckoutHero section component", () => {
  it("should render correctly", () => {
    render(<CheckoutHero />);

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByAltText("Separator"));
  });
});
