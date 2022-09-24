import React from "react";
import {
  CartContext,
  CartContextProps,
  Product,
} from "../../src/contexts/CartContext";
import { DecoratorFn } from "@storybook/react";
import { useParameter } from "@storybook/addons";
import { useState } from "react";

export const CartDecorator: DecoratorFn = (Story, context) => {
  const initialState = useParameter<CartContextProps>("cart", {
    isCartLoading: false,
    products: [] as Product[],
    totalProductsAmount: 0,
    totalProductsPrice: 0,
    updateProductAmount: () => {},
    removeProductFromCart: (p) => {},
    handleAddProductToCart: (p, a) => {},
    cleanCart: () => {},
  });

  const [state] = useState({ ...initialState });

  return (
    <CartContext.Provider value={state as CartContextProps}>
      <Story {...context} />
    </CartContext.Provider>
  );
};
