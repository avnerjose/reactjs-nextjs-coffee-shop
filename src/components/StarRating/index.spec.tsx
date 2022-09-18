import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { StarRating } from ".";

describe("StarRating component", () => {
  it("should be able to show star with no decimal value", () => {
    render(<StarRating rating={4} />);

    expect(screen.getAllByAltText("full star")).toHaveLength(4);
    expect(screen.getAllByAltText("empty star")).toHaveLength(1);
    expect(screen.queryAllByAltText("half star")).toHaveLength(0);
  });

  it("should be able to show star with decimal value smaller then 0.5", () => {
    render(<StarRating rating={3.2} />);

    expect(screen.getAllByAltText("full star")).toHaveLength(3);
    expect(screen.getAllByAltText("empty star")).toHaveLength(2);
    expect(screen.queryAllByAltText("half star")).toHaveLength(0);
  });

  it("should be able to show star with decimal value greater or equal to 0.5", () => {
    render(<StarRating rating={3.5} />);

    expect(screen.getAllByAltText("full star")).toHaveLength(3);
    expect(screen.getAllByAltText("empty star")).toHaveLength(1);
    expect(screen.queryAllByAltText("half star")).toHaveLength(1);
  });
});
