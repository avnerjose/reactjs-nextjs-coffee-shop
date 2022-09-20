import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { Step3 } from ".";
import { PAYMENT_METHODS } from "../../../contexts/OrderContext";

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

const mockedHandleNext = vi.fn();
const mockedHandleReturn = vi.fn();
const mockedSetSelectedPaymentMethod = vi.fn();

vi.mock("../../../hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    products: MOCKED_PRODUCTS,
    totalProductsPrice: MOCKED_PRODUCTS.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0),
  })),
}));

vi.mock("../../../hooks/useOrder", () => ({
  useOrder: vi.fn(() => ({
    paymentMethods: PAYMENT_METHODS,
    setSelectedPaymentMethod: mockedSetSelectedPaymentMethod,
  })),
}));

describe("Step3 component", () => {
  beforeEach(() => {
    render(
      <Step3 handleNext={mockedHandleNext} handleReturn={mockedHandleReturn} />
    );
  });

  it("should render correctly", () => {
    expect(screen.getByText("Payment method")).toBeInTheDocument();
    expect(screen.getByText("Confirm Order")).toBeInTheDocument();
    expect(screen.getByText("Return")).toBeInTheDocument();
  });

  it("should be able to click on return button", () => {
    fireEvent.click(screen.getByText("Return"));

    expect(mockedHandleReturn).toHaveBeenCalledOnce();
  });

  it("should be able to click on confirm order button", () => {
    fireEvent.click(screen.getByText("Confirm Order"));

    expect(mockedHandleNext).toHaveBeenCalledOnce();
  });

  it("should be able to select payment methods", () => {
    fireEvent.click(screen.getByText(PAYMENT_METHODS[1].label));

    expect(mockedSetSelectedPaymentMethod).toHaveBeenCalledWith(1);
  });
});
