import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { describe, expect, it, vi } from "vitest";
import { Header } from ".";
import { useCart } from "../../hooks/useCart";
import { useScroll } from "../../hooks/useScroll";

vi.mock("next/link", () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  },
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({
    asPath: "/",
  })),
}));

vi.mock("../../hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    totalProductsAmount: 0,
  })),
}));

vi.mock("../../hooks/useScroll", () => ({
  useScroll: vi.fn(() => ({
    setSectionToScroll: vi.fn(),
  })),
}));

afterEach(() => {
  vi.mocked(useRouter).mockRestore();
});

const NAV_LABELS = ["Home", "About Us", "Popular products", "Catalog"];

describe("Header Component", () => {
  it("should render correctly", () => {
    render(<Header />);

    NAV_LABELS.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("should not have search input on pages different from catalog", () => {
    render(<Header />);

    expect(
      screen.queryByPlaceholderText("Search for products here")
    ).not.toBeInTheDocument();
  });

  it("should have search input on catalog page", async () => {
    vi.mocked(useRouter).mockReturnValue({
      asPath: "/catalog",
    } as any);

    render(<Header />);

    expect(
      screen.queryByPlaceholderText("Search for products here")
    ).toBeInTheDocument();
  });

  it("should display cart total amount of products when amount is greater then zero", () => {
    vi.mocked(useCart).mockReturnValue({
      totalProductsAmount: 10,
    } as any);

    render(<Header />);

    expect(screen.getByText(10)).toBeInTheDocument();
  });

  it("should not display cart total amount of products when amount is equal to zero", () => {
    render(<Header />);

    expect(screen.queryByText(0)).not.toBeInTheDocument();
  });

  it("should call setSectionToScroll on click", () => {
    const mockedSetSectionToScroll = vi.fn();
    vi.mocked(useScroll).mockReturnValue({
      setSectionToScroll: mockedSetSectionToScroll,
    });

    render(<Header />);

    NAV_LABELS.forEach((label) => {
      const link = screen.getByText(label);

      fireEvent.click(link);
    });

    expect(mockedSetSectionToScroll).toHaveBeenCalledTimes(3);
  });

  it("should be transparent when scroll is 0", () => {
    render(<Header isFixed />);

    expect(screen.getByTestId("header")).toHaveClass("bg-opacity-[0.3]");
  });
});
