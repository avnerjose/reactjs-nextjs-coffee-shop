import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { CartTable } from ".";

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
    id: "mocked-id-1",
    name: "mocked-name-1",
    slug: "mocked-slug-1",
    image: {
      url: "/mocked-url-1",
    },
    price: 20,
    category: "mocked-category-1",
    smallDescription: "mocked-description-1",
    amount: 10,
  },
  {
    id: "mocked-id-2",
    name: "mocked-name-2",
    slug: "mocked-slug-2",
    image: {
      url: "/mocked-url-2",
    },
    price: 10,
    category: "mocked-category-2",
    smallDescription: "mocked-description-2",
    amount: 5,
  },
];

// const { , removeProductFromCart } = useCart();

vi.mock("../../../hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    products: MOCKED_PRODUCTS,
    totalProductsPrice: MOCKED_PRODUCTS.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0),
    updateProductAmount: vi.fn(),
  })),
}));

describe("CartTable component", () => {
  beforeEach(() => {
    render(<CartTable />);
  });

  it("should render correctly", () => {
    const table = screen.getByRole("table");
    expect(table.querySelectorAll("th")).toHaveLength(6);
  });

  it("should be able to render cart table items", () => {
    const table = screen.getByRole("table");

    expect(table.querySelectorAll("tr").length).toBe(
      MOCKED_PRODUCTS.length + 1
    );
  });
});
