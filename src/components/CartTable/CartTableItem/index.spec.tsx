import { useCart } from "@hooks";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, vi } from "vitest";
import { CartTableItem } from ".";

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

const mockedProduct: Product = {
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
};

const tableRow = document.createElement("tbody");

vi.mock("@src/hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    updateProductAmount: vi.fn(),
  })),
}));

describe("CartTableItem component", () => {
  it("should render correctly", () => {
    render(<CartTableItem product={mockedProduct} />, {
      container: document.body.appendChild(tableRow),
    });

    expect(screen.getByText(mockedProduct.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockedProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`${mockedProduct.price * mockedProduct.amount}`),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockedProduct.smallDescription),
    ).toBeInTheDocument();
  });

  it("should  be able to select amount greater or equal to 1", async () => {
    const mockedUpdateProductAmount = vi.fn();
    vi.mocked(useCart).mockReturnValue({
      updateProductAmount: mockedUpdateProductAmount,
    } as any);

    render(<CartTableItem product={mockedProduct} />, {
      container: document.body.appendChild(tableRow),
    });

    fireEvent.input(screen.getByRole("spinbutton"), {
      target: {
        value: 9,
      },
    });

    await waitFor(() => {
      expect(mockedUpdateProductAmount).toHaveBeenCalledTimes(2);
    });
  });

  it("should not be able to select amount smaller then 1", () => {
    const mockedUpdateProductAmount = vi.fn();
    vi.mocked(useCart).mockReturnValue({
      updateProductAmount: mockedUpdateProductAmount,
    } as any);

    render(<CartTableItem product={mockedProduct} />, {
      container: document.body.appendChild(tableRow),
    });

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: {
        value: -1,
      },
    });

    expect(mockedUpdateProductAmount).toHaveBeenCalledOnce();
  });

  it("should be able to remove item from cart", () => {
    const mockedRemoveProductFromCart = vi.fn();

    vi.mocked(useCart).mockReturnValue({
      removeProductFromCart: mockedRemoveProductFromCart,
      updateProductAmount: vi.fn(),
    } as any);

    const { container } = render(<CartTableItem product={mockedProduct} />, {
      container: document.body.appendChild(tableRow),
    });

    fireEvent.click(container.querySelector("svg") as SVGSVGElement);

    expect(mockedRemoveProductFromCart).toHaveBeenCalledWith(mockedProduct.id);
  });
});
