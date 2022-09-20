import { CheckoutStepsProgressItem } from "../CheckoutStepsProgressItem";

export const CHECKOUT_STEPS_NAMES = [
  "Contact information",
  "Delivery information",
  "Payment method",
  "Order confirmation",
];

interface CheckoutStepsProgressProps {
  activeStep: number;
}

export function CheckoutStepsProgress({
  activeStep,
}: CheckoutStepsProgressProps) {
  return (
    <ul className="flex items-center justify-center w-full ">
      {CHECKOUT_STEPS_NAMES.map((step, index) => (
        <CheckoutStepsProgressItem
          key={step}
          index={index}
          label={step}
          activeStep={activeStep}
        />
      ))}
    </ul>
  );
}
