import { NextPage } from "next";
import { useState } from "react";
import {
  CheckoutOrder,
  Step1,
  Step2,
  Step3,
  Footer,
  Header,
  CheckoutHero,
} from "../components";

const CheckOut: NextPage = () => {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);

  const HandleStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 handleNext={() => setActiveStep(1)} />;
      case 1:
        return (
          <Step2
            handleNext={() => setActiveStep(2)}
            handleReturn={() => setActiveStep(0)}
          />
        );
      case 2:
        return <Step3 handleReturn={() => setActiveStep(1)} />;
      default:
        return <Step1 handleNext={() => setActiveStep(1)} />;
    }
  };

  return (
    <>
      <Header isFixed />
      <CheckoutHero />
      <div className="flex max-w-screen-xl mx-auto">
        <HandleStep />
        <CheckoutOrder />
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;
