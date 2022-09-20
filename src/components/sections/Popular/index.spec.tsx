import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { Popular } from ".";

describe("Popular section component", () => {
  it("should render correctly", () => {
    render(<Popular />);

    expect(screen.getByText("Popular Products")).toBeInTheDocument();
    expect(screen.getByAltText("Separator")).toBeInTheDocument();
  });
});
