import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Footer,
  Header,
  CheckoutHero,
  CheckoutStepsProgress,
  SuccessfulPurchaseModal,
} from "@components";
import { useCart } from "@hooks";
import { useRouter } from "next/router";

const CheckOut: NextPage = () => {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const router = useRouter();
  const { totalProductsAmount, isCartLoading } = useCart();

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
        return (
          <Step4
            handleReturn={() => setActiveStep(2)}
            setActiveStep={setActiveStep}
          />
        );
      default:
        return <Step1 handleNext={() => setActiveStep(1)} />;
    }
  };

  useEffect(() => {
    if (totalProductsAmount === 0 && !isCartLoading) {
      router.push("/");
    }
  }, [totalProductsAmount, isCartLoading]);

  return (
    <>
      <Header isFixed />
      <SuccessfulPurchaseModal isOpen={activeStep === 4} />
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
