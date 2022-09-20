import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import { CartFooter } from ".";

vi.mock("@src/hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    totalProductsPrice: 10,
  })),
}));

vi.mock("@src/hooks/useOrder", () => ({
  useOrder: vi.fn(() => ({
    shippingPrice: 5,
  })),
}));

describe("CartFooter section component", () => {
  it("should render correctly", () => {
    render(<CartFooter />);

    expect(screen.getByText("Keep Shopping")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Proceed to checkout")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${10 + 5}`))).toBeInTheDocument();
  });
});
