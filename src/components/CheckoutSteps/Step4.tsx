import { ArrowLeft } from "phosphor-react";
import { useCart, useOrder } from "../../hooks";
import { formatToCurrency } from "../../utils/format_money";
import { CheckoutOrder } from "../CheckoutOrder";

interface Step4Props {
  handleReturn: () => void;
}

export function Step4({ handleReturn }: Step4Props) {
  const {
    contactInfo,
    deliveryAddress,
    selectedDeliveryMethod,
    paymentMethods,
  } = useOrder();

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1.5fr,1fr]">
        <div className="flex flex-col p-8">
          <h3 className="font-title text-lg mb-4  after:content-[''] after:block after:h-[1px] after:w-[60%] after:border-t after:border-t-gray-500 after:border-dashed ">
            Your contact information
          </h3>
          <ul>
            <li>
              {contactInfo.firstName} {contactInfo.lastName}
            </li>
            <li>{contactInfo.phoneNumber}</li>
            <li>{contactInfo.email}</li>
          </ul>
        </div>
        <CheckoutOrder />
        <div className="px-8">
          <h3 className="font-title text-lg mb-4  after:content-[''] after:block after:h-[1px] after:w-[60%] after:border-t after:border-t-gray-500 after:border-dashed">
            Delivery information
          </h3>
          <div className="flex flex-col">
            <ul>
              <li>
                {deliveryAddress.street}, {deliveryAddress.number}
              </li>
              <li>
                {deliveryAddress.city}, {deliveryAddress.neighborhood}
              </li>
              <li>{deliveryAddress.zipCode}</li>
            </ul>
          </div>
        </div>
        <div className="px-8">
          <h3 className="font-title text-lg mb-4  after:content-[''] after:block after:h-[1px] after:w-[60%] after:border-t after:border-t-gray-500 after:border-dashed">
            Payment method
          </h3>
          <div className="flex items-center gap-2">
            <span>{paymentMethods[selectedDeliveryMethod].label}</span>
            {paymentMethods[selectedDeliveryMethod].image && (
              <img
                className="h-8"
                src={paymentMethods[selectedDeliveryMethod].image}
                alt={paymentMethods[selectedDeliveryMethod].label}
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-8 mb-4">
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => handleReturn()}
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft />
            <span>Return</span>
          </button>
          <button className="bg-brown-500 py-2 px-10 text-white">
            <span>Finish Order</span>
          </button>
        </div>
        <footer className="flex items-center gap-2 mt-4">
          Page
          <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
            4
          </span>
          of
          <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
            4
          </span>
        </footer>
      </div>
    </div>
  );
}
