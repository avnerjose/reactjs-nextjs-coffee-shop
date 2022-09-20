import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { AboutUs } from ".";

describe("AboutUs section component", () => {
  it("should render correctly", () => {
    render(<AboutUs />);

    expect(screen.getAllByRole("heading").length).toBe(1);
    expect(screen.getByAltText("Separator")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Lorem ipsum dolor sit amet consectetur adipisicing elit/
      )
    ).toBeInTheDocument();
  });
});
