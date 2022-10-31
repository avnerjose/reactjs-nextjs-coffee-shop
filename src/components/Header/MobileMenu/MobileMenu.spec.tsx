import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MobileMenu } from ".";

vi.mock("next/link", () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  },
}));

const mockedSetSectionToScroll = vi.fn();
vi.mock("@src/hooks/useScroll", () => ({
  useScroll: vi.fn(() => ({
    setSectionToScroll: mockedSetSectionToScroll,
  })),
}));

describe("Mobile Menu Component", () => {
  const NAV_LABELS = ["Home", "About us", "Popular products", "Catalog"];
  it("should render correctly", () => {
    render(<MobileMenu isOpen={true} setIsOpen={vi.fn()} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText("Popular products")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
  });

  it("should not render when is open is false", () => {
    render(<MobileMenu isOpen={false} setIsOpen={vi.fn()} />);

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("About us")).not.toBeInTheDocument();
    expect(screen.queryByText("Popular products")).not.toBeInTheDocument();
    expect(screen.queryByText("Catalog")).not.toBeInTheDocument();
  });

  it("should call section to scroll and setIsOpen when selecting a home page link", () => {
    const mockedSetIsOpen = vi.fn();
    render(<MobileMenu isOpen={true} setIsOpen={mockedSetIsOpen} />);

    NAV_LABELS.forEach((label) => {
      const element = screen.getByText(label);

      fireEvent.click(element);
    });

    expect(mockedSetIsOpen).toHaveBeenCalledTimes(3);
    expect(mockedSetSectionToScroll).toHaveBeenCalledTimes(3);
  });
});
