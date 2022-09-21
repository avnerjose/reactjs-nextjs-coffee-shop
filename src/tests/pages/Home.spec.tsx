import { describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../../pages/index";

vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({
    asPath: "/",
  })),
}));

describe("Home page component", () => {
  it("should render correctly", () => {
    render(<HomePage />);

    expect(screen.getByText("Shop Here")).toBeInTheDocument();
    expect(screen.getAllByText("About Us").length).toBe(2);
    expect(screen.getByText("Coffee Varieties")).toBeInTheDocument();
    expect(screen.getByText("Popular Products")).toBeInTheDocument();
    expect(screen.getByText("Developed by Avner José")).toBeInTheDocument();
  });
});
