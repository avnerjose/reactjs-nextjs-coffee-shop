import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { Stats } from ".";

describe("Stats section component", () => {
  it("should render correctly", () => {
    render(<Stats />);

    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("Coffee Varieties")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("Tested Hours")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("Coffee Brands")).toBeInTheDocument();
    expect(screen.getByText("265")).toBeInTheDocument();
    expect(screen.getByText("Coffee Markets")).toBeInTheDocument();
  });
});
