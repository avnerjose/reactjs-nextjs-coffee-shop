import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { SuccessfulPurchaseModal } from ".";
import { useCart } from "@hooks";

vi.mock("next/link", () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  },
}));

vi.mock("@src/hooks/useCart.ts", () => ({
  useCart: vi.fn(() => ({
    cleanCart: vi.fn(),
  })),
}));

describe("SuccessfulPurchaseModal component", () => {
  it("should render correctly", () => {
    render(<SuccessfulPurchaseModal isOpen />);

    expect(
      screen.getByText("Your purchase was successful!")
    ).toBeInTheDocument();
  });

  it("should not render if isOpen is false", () => {
    render(<SuccessfulPurchaseModal isOpen={false} />);

    expect(
      screen.queryByText("Your purchase was successful!")
    ).not.toBeInTheDocument();
  });

  it("should clean cart when clinking 'Keep Shopping' button", () => {
    const mockedCleanCart = vi.fn();
    vi.mocked(useCart).mockReturnValue({
      cleanCart: mockedCleanCart,
    } as any);

    render(<SuccessfulPurchaseModal isOpen />);

    const keepShoppingButton = screen.getByText("Keep Shopping");

    fireEvent.click(keepShoppingButton);

    expect(mockedCleanCart).toHaveBeenCalledOnce();
  });
});
