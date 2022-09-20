import { describe } from "vitest";
import { formatToCurrency } from "./format_money";

describe("Format money util", () => {
  it("should be able to work with brazilian currency", () => {
    const formattedValue = formatToCurrency(10);

    expect(formattedValue).toContain("R$");
    expect(formattedValue).toContain("10");
  });
});
