import { NextPage } from "next";
import { useState } from "react";
import {
  Step1,
  Step2,
  Step3,
  Footer,
  Header,
  CheckoutHero,
} from "../components";
import { Step4 } from "../components/CheckoutSteps/Step4";
import { CheckoutStepsProgress } from "../components/CheckoutStepsProgress";

const CheckOut: NextPage = () => {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);

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
        return (
          <Step3
            handleNext={() => setActiveStep(3)}
            handleReturn={() => setActiveStep(1)}
          />
        );
      case 3:
        return <Step4 handleReturn={() => setActiveStep(2)} />;
      default:
        return <Step1 handleNext={() => setActiveStep(1)} />;
    }
  };

  return (
    <>
      <Header isFixed />
      <CheckoutHero />
      <div className="flex flex-col max-w-screen-xl mx-auto">
        <div className="flex items-center justify-center max-w-[80%] mt-4  gap-5 mx-auto w-full">
          <CheckoutStepsProgress activeStep={activeStep} />
        </div>
        <HandleStep />
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;
