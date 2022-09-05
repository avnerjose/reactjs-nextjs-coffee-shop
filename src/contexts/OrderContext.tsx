import { createContext, ReactNode, useState } from "react";

type ContactInfoProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

type DeliveryAddressProps = {
  street: string;
  zipCode: string;
  number: number;
  city: string;
  neighborhood: string;
};

interface OrderProviderProps {
  children: ReactNode;
}

interface OrderContextProps {
  deliveryMethods: typeof DELIVERY_METHODS;
  paymentMethods: typeof PAYMENT_METHODS;
  selectedDeliveryMethod: number;
  selectedPaymentMethod: number;
  shippingPrice: number;
  contactInfo: ContactInfoProps;
  deliveryAddress: DeliveryAddressProps;
  setSelectedDeliveryMethod: (p: number) => void;
  setSelectedPaymentMethod: (p: number) => void;
  setContactInfo: (p: ContactInfoProps) => void;
  setDeliveryAddress: (p: DeliveryAddressProps) => void;
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
    email: "",
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
        contactInfo,
        deliveryAddress,
        setSelectedDeliveryMethod,
        setSelectedPaymentMethod,
        setContactInfo,
        setDeliveryAddress,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
