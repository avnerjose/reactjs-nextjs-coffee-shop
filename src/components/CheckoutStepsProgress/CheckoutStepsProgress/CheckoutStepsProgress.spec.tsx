import { CheckoutStepsProgress } from "@components";
import { CHECKOUT_STEPS_NAMES } from "./index";
import { render, screen } from "@testing-library/react";
import { describe } from "vitest";

describe("CheckoutStepsProgress component", () => {
  it("should render correctly", () => {
    render(<CheckoutStepsProgress activeStep={1} />);

    CHECKOUT_STEPS_NAMES.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
