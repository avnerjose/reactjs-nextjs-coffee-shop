import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { CheckoutOrder } from ".";
import { useCart } from "@hooks";

type Product = {
  id: string;
  name: string;
  slug: string;
  image: {
    url: string;
  };
  price: number;
  category: string;
  smallDescription: string;
  amount: number;
};

const MOCKED_PRODUCTS: Product[] = [
  {
    id: "mocked-id",
    name: "mocked-name",
    slug: "mocked-slug",
    image: {
      url: "mocked-url",
    },
    price: 10,
    category: "mocked-category",
    smallDescription: "mocked-description",
    amount: 10,
  },
];

vi.mock("@src/hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    products: [],
    totalProductsPrice: 0,
  })),
}));

vi.mock("@src/hooks/useOrder", () => ({
  useOrder: vi.fn(() => ({
    shippingPrice: 0,
  })),
}));

describe("CheckoutOrder component", () => {
  it("should render correctly", () => {
    render(<CheckoutOrder />);

    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getAllByText("Total")).toHaveLength(2);
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
  });

  it("should show product list", () => {
    const MOCKED_TOTAL_PRODUCT_PRICE = MOCKED_PRODUCTS.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0);

    vi.mocked(useCart).mockReturnValue({
      products: MOCKED_PRODUCTS,
      totalProductsPrice: MOCKED_TOTAL_PRODUCT_PRICE,
    } as any);

    render(<CheckoutOrder />);

    MOCKED_PRODUCTS.forEach((product) => {
      expect(screen.getByText(`${product.name} x${product.amount}`));
    });
  });
});
