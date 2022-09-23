import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from ".";

describe("Footer component", () => {
  it("should render correctly", () => {
    render(<Footer />);

    expect(screen.getByText("Developed by Avner José")).toBeInTheDocument();
    expect(screen.getByText(/All Rights reserved/)).toBeInTheDocument();
  });
});
