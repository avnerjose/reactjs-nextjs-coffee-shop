import { render, screen } from "@testing-library/react";
import { CheckoutStepsProgressItem } from ".";

describe("CheckoutStepsProgressItem component", () => {
  it("should render correctly", () => {
    render(
      <CheckoutStepsProgressItem
        label="mocked-label"
        activeStep={1}
        index={1}
      />
    );

    expect(screen.getByText("mocked-label")).toBeInTheDocument();
  });
});
