import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, vi } from "vitest";
import { Step1 } from ".";
import { useOrder } from "../../../hooks";

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

const mockedHandleNext = vi.fn();

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
    contactInfo: {},
    setContactInfo: vi.fn(),
  })),
}));

const setup = () => {
  render(<Step1 handleNext={mockedHandleNext} />);

  fireEvent.blur(screen.getByPlaceholderText("First name"));
  fireEvent.blur(screen.getByPlaceholderText("Last name"));
  fireEvent.blur(screen.getByPlaceholderText("Phone number"));
  fireEvent.blur(screen.getByPlaceholderText("E-mail"));
};

describe("Step1 component", () => {
  it("should render correctly", () => {
    setup();

    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
  });

  it("should display required error when submitting without filling fields", async () => {
    setup();

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(4);
    expect(mockedHandleNext).not.toHaveBeenCalled();
  });

  it("should display matching error when email is invalid", async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: {
        value: "Mocked first name",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: {
        value: "Mocked last name",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone number"), {
      target: {
        value: "+12 (34) 56789-1234",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: {
        value: "invalid email",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockedHandleNext).not.toHaveBeenCalled();
  });

  it("should display matching error when phone number is invalid", async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: {
        value: "Mocked first name",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: {
        value: "Mocked last name",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone number"), {
      target: {
        value: "+12 (34) 56789-12  ",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: {
        value: "mocked@email.com",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockedHandleNext).not.toHaveBeenCalled();
  });

  it("should be able to submit form if data is valid", async () => {
    const mockedSetContactInfo = vi.fn();

    vi.mocked(useOrder).mockReturnValue({
      setContactInfo: mockedSetContactInfo,
    } as any);

    setup();

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: {
        value: "Mocked first name",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: {
        value: "Mocked last name",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone number"), {
      target: {
        value: "+12 (34) 56789-1290",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: {
        value: "mocked@email.com",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.queryAllByRole("alert")).toHaveLength(0);
    await waitFor(() =>
      expect(mockedSetContactInfo).toHaveBeenCalledWith({
        firstName: "Mocked first name",
        lastName: "Mocked last name",
        phoneNumber: "+12 (34) 56789-1290",
        email: "mocked@email.com",
      })
    );
    expect(mockedHandleNext).toHaveBeenCalled();
  });
});
