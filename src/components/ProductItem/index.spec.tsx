import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import { Product, ProductItem } from ".";
import { useCart } from "@hooks";

vi.mock("@src/hooks/useCart.ts", () => ({
  useCart: vi.fn(() => ({
    addProductToCart: vi.fn(),
  })),
}));

const mockedProduct: Product = {
  id: "mocked-id",
  category: "mocked-category",
  image: {
    url: "mocked-url",
  },
  name: "mocked-name",
  price: 10,
  slug: "mocked-product",
};

describe("ProductItem component", () => {
  it("should render correctly", () => {
    render(<ProductItem product={mockedProduct} />);

    expect(screen.getByAltText(mockedProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockedProduct.category)).toBeInTheDocument();
  });

  it("should have a link to the product page", () => {
    render(<ProductItem product={mockedProduct} />);

    expect(screen.getByText(mockedProduct.name)).toHaveAttribute(
      "href",
      `/product/${mockedProduct.slug}`
    );
  });

  it("should add product to cart on click", () => {
    const mockedAddProductToCart = vi.fn();
    vi.mocked(useCart).mockReturnValue({
      addProductToCart: mockedAddProductToCart,
    } as any);

    render(<ProductItem product={mockedProduct} />);

    const shoppingCartButton = screen.getByRole("button");

    fireEvent.click(shoppingCartButton);

    expect(mockedAddProductToCart).toHaveBeenCalledWith(mockedProduct.id);
  });
});
