import classNames from "classnames";
import { useEffect, useState } from "react";

const CHECKOUT_STEPS_NAMES = [
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

interface CheckoutStepsProgressItemProps {
  label: string;
  index: number;
  activeStep: number;
}

function CheckoutStepsProgressItem({
  label,
  index,
  activeStep,
}: CheckoutStepsProgressItemProps) {
  const [state, setState] = useState<"active" | "inactive" | "completed">(
    "inactive"
  );

  useEffect(() => {
    if (index === activeStep) {
      setState("active");
    } else if (index < activeStep) {
      setState("completed");
    } else {
      setState("inactive");
    }
  }, [index, activeStep]);

  return (
    <li
      className={classNames(
        "step-progress  list-none w-[20%] text-sm relative text-center",
        {
          "before:content-['1']":
            index === 0 && (state === "active" || state === "inactive"),
          "before:content-['2']":
            index === 1 && (state === "active" || state === "inactive"),
          "before:content-['3']":
            index === 2 && (state === "active" || state === "inactive"),
          "before:content-['4']":
            index === 3 && (state === "active" || state === "inactive"),
          "before:bg-brown-500 before:border-brown-500 before:text-white":
            state === "active",
          "before:content-['✔'] before:border-brown-500 before:text-brown-500":
            state === "completed",
          "after:bg-brown-500": state === "active" || state === "completed",
        }
      )}
    >
      {label}
    </li>
  );
}
