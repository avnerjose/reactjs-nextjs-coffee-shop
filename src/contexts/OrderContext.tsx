import { createContext, ReactNode, useState } from "react";

interface OrderProviderProps {
  children: ReactNode;
}

interface OrderContextProps {
  deliveryMethods: typeof DELIVERY_METHODS;
  paymentMethods: typeof PAYMENT_METHODS;
  selectedDeliveryMethod: number;
  selectedPaymentMethod: number;
  shippingPrice: number;
  setSelectedDeliveryMethod: (p: number) => void;
  setSelectedPaymentMethod: (p: number) => void;
}

export const OrderContext = createContext<OrderContextProps>(
  {} as OrderContextProps
);

const DELIVERY_METHODS = [
  {
    label: "Delivery",
    price: 10,
  },
  {
    label: "Self-pickup",
    price: 0,
  },
];

const PAYMENT_METHODS = [
  {
    label: "Credit Card",
    image: "/card_operators.png",
  },
  {
    label: "PIX",
  },
  {
    label: "Paypal",
  },
];

export function OrderProvider({ children }: OrderProviderProps) {
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    zipCode: "",
    number: 0,
    city: "",
    neighborhood: "",
  });
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);

  return (
    <OrderContext.Provider
      value={{
        deliveryMethods: DELIVERY_METHODS,
        paymentMethods: PAYMENT_METHODS,
        selectedDeliveryMethod,
        selectedPaymentMethod,
        shippingPrice: DELIVERY_METHODS[selectedDeliveryMethod].price,
        setSelectedDeliveryMethod,
        setSelectedPaymentMethod,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
