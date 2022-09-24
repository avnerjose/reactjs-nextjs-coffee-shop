import React from "react";
import { DecoratorFn } from "@storybook/react";
import {
  DELIVERY_METHODS,
  OrderContext,
  OrderContextProps,
  PAYMENT_METHODS,
} from "../../src/contexts/OrderContext";
import { useParameter, useState } from "@storybook/addons";

export const OrderDecorator: DecoratorFn = (Story) => {
  const initialState = useParameter<OrderContextProps>("order", {
    contactInfo: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    deliveryAddress: {
      city: "",
      neighborhood: "",
      number: 0,
      street: "",
      zipCode: "",
    },
    deliveryMethods: DELIVERY_METHODS,
    paymentMethods: PAYMENT_METHODS,
    selectedDeliveryMethod: 0,
    selectedPaymentMethod: 0,
    shippingPrice: 0,
    setContactInfo: () => {},
    setDeliveryAddress: () => {},
    setSelectedDeliveryMethod: () => {},
    setSelectedPaymentMethod: () => {},
  });

  const [state] = useState({ ...initialState });

  return (
    <OrderContext.Provider value={state as OrderContextProps}>
      <Story />
    </OrderContext.Provider>
  );
};
