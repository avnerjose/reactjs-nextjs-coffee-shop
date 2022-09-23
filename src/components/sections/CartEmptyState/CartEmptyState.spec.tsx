import { CartEmptyState } from "@components";
import { render, screen } from "@testing-library/react";
import { describe } from "vitest";

describe("Cart Empty state component", () => {
  it("should render correctly", () => {
    render(<CartEmptyState />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Looks like you haven't added any products to your cart yet"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Add products to cart")).toHaveAttribute(
      "href",
      "/catalog"
    );
  });
});
