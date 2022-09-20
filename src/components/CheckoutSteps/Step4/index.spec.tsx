import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { Step4 } from ".";
import {
  DELIVERY_METHODS,
  PAYMENT_METHODS,
} from "@contexts";

const mockedHandleReturn = vi.fn();
const mockedSetActiveStep = vi.fn();
const mockedContactInfo = {
  firstName: "Mocked first name",
  lastName: "Mocked last name",
  phoneNumber: "Mocked phone number",
  email: "Mocked e-mail",
};
const mockedDeliveryAddress = {
  street: "Mocked street",
  zipCode: "Mocked ZIP code",
  number: 20,
  city: "Mocked city",
  neighborhood: "Mocked neighborhood",
};

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
    products: MOCKED_PRODUCTS,
    totalProductsPrice: MOCKED_PRODUCTS.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0),
  })),
}));

vi.mock("@src/hooks/useOrder", () => ({
  useOrder: vi.fn(() => ({
    contactInfo: mockedContactInfo,
    deliveryAddress: mockedDeliveryAddress,
    deliveryMethods: DELIVERY_METHODS,
    selectedDeliveryMethod: 0,
    paymentMethods: PAYMENT_METHODS,
    selectedPaymentMethod: 0,
  })),
}));

describe("Step4 component", () => {
  beforeEach(() => {
    render(
      <Step4
        handleReturn={mockedHandleReturn}
        setActiveStep={mockedSetActiveStep}
      />
    );
  });

  it("should render correctly", () => {
    expect(screen.getByText("Your contact information")).toBeInTheDocument();
    expect(screen.getByText("Delivery information")).toBeInTheDocument();
    expect(screen.getByText("Payment method")).toBeInTheDocument();
    Object.values(mockedDeliveryAddress).forEach((value) => {
      expect(screen.getByText(new RegExp(`${value}`))).toBeInTheDocument();
    });
    Object.values(mockedContactInfo).forEach((value) => {
      expect(screen.getByText(new RegExp(`${value}`))).toBeInTheDocument();
    });
  });

  it("should be able to click on return button", () => {
    fireEvent.click(screen.getByText("Return"));

    expect(mockedHandleReturn).toHaveBeenCalledOnce();
  });

  it("should be able to edit information on different sections", () => {
    const editButtons = screen.getAllByText("Edit");

    editButtons.forEach((element, index) => {
      fireEvent.click(element);

      switch (index) {
        case 0:
          expect(mockedSetActiveStep).toHaveBeenCalledWith(1);
          break;
        case 1:
        case 2:
          expect(mockedSetActiveStep).toHaveBeenCalledWith(2);
          break;
      }
    });
  });

  it("should be able to click on finish order button", () => {
    fireEvent.click(screen.getByText("Finish Order"));

    expect(mockedSetActiveStep).toHaveBeenCalledWith(4);
  });
});
