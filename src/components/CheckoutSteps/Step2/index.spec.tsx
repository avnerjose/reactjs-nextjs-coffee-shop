import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import { Step2 } from ".";
import { DELIVERY_METHODS } from "@contexts";
import { useOrder } from "@hooks";

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

const setup = () => {
  render(
    <Step2 handleNext={mockedHandleNext} handleReturn={mockedHandleReturn} />
  );

  fireEvent.blur(screen.getByPlaceholderText("Street"));
  fireEvent.blur(screen.getByPlaceholderText("ZIP code"));
  fireEvent.blur(screen.getByPlaceholderText("Neighborhood"));
  fireEvent.blur(screen.getByPlaceholderText("City"));
  fireEvent.blur(screen.getByPlaceholderText("Number"));
};

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
    deliveryMethods: DELIVERY_METHODS,
  })),
}));

describe("Step2 component", () => {
  it("should render correctly", () => {
    render(
      <Step2 handleNext={mockedHandleNext} handleReturn={mockedHandleReturn} />
    );

    expect(screen.getByText("Delivery Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Street")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ZIP code")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Neighborhood")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Number")).toBeInTheDocument();
  });

  it("should be able to click on return button", () => {
    render(
      <Step2 handleNext={mockedHandleNext} handleReturn={mockedHandleReturn} />
    );

    fireEvent.click(screen.getByText("Return"));

    expect(mockedHandleReturn).toHaveBeenCalledOnce();
  });

  it("should be able to select delivery method", () => {
    const mockedSetSelectedDeliveryMethod = vi.fn();

    vi.mocked(useOrder).mockReturnValue({
      setSelectedDeliveryMethod: mockedSetSelectedDeliveryMethod,
      deliveryMethods: DELIVERY_METHODS,
    } as any);

    render(
      <Step2 handleNext={mockedHandleNext} handleReturn={mockedHandleReturn} />
    );

    fireEvent.click(screen.getByText(DELIVERY_METHODS[1].label));

    expect(mockedSetSelectedDeliveryMethod).toHaveBeenCalledWith(1);
  });

  it("should display required errors when submitting with empty values", async () => {
    setup();

    fireEvent.click(screen.getByTestId("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(5);
  });

  it("should display error message when submitting number smaller or equal then zero", async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: {
        value: "Mocked street",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: {
        value: "Mocked city",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Neighborhood"), {
      target: {
        value: "Mocked neighborhood",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Number"), {
      target: {
        value: "0",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("ZIP code"), {
      target: {
        value: "12345-678",
      },
    });

    fireEvent.click(screen.getByTestId("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockedHandleNext).not.toHaveBeenCalled();
  });

  it("should display error message when zip code doesn't match format", async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: {
        value: "Mocked street",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: {
        value: "Mocked city",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Neighborhood"), {
      target: {
        value: "Mocked neighborhood",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Number"), {
      target: {
        value: "10",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("ZIP code"), {
      target: {
        value: "12345-6",
      },
    });

    fireEvent.click(screen.getByTestId("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockedHandleNext).not.toHaveBeenCalled();
  });

  it("should be able to submit forms with valid data", async () => {
    const mockedSetDeliveryAddress = vi.fn();

    vi.mocked(useOrder).mockReturnValue({
      setDeliveryAddress: mockedSetDeliveryAddress,
      deliveryMethods: DELIVERY_METHODS,
    } as any);

    setup();

    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: {
        value: "Mocked street",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: {
        value: "Mocked city",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Neighborhood"), {
      target: {
        value: "Mocked neighborhood",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Number"), {
      target: {
        value: "10",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("ZIP code"), {
      target: {
        value: "12345-678",
      },
    });

    fireEvent.click(screen.getByTestId("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    await waitFor(() => expect(mockedHandleNext).toHaveBeenCalled());
    expect(mockedSetDeliveryAddress).toHaveBeenCalledWith({
      street: "Mocked street",
      city: "Mocked city",
      neighborhood: "Mocked neighborhood",
      number: 10,
      zipCode: "12345-678",
    });
  });
});
