/* eslint-disable prettier/prettier */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CartDecorator, OrderDecorator } from "@decorators";
import { CheckoutOrder as CheckoutOrderComponent } from ".";
import { Product } from "@contexts";

const MOCKED_PRODUCTS: Product[] = [
  {
    id: "mocked-id",
    name: "mocked product 1",
    slug: "mocked-slug",
    image: {
      url: "mocked-url",
    },
    price: 10,
    category: "mocked-category",
    smallDescription: "mocked-description",
    amount: 10,
  },
  {
    id: "mocked-id2",
    name: "mocked product 2",
    slug: "mocked-slug2",
    image: {
      url: "mocked-url2",
    },
    price: 20,
    category: "mocked-category2",
    smallDescription: "mocked-description2",
    amount: 3,
  },
];

export default {
  title: "Components/CheckoutOrder",
  component: CheckoutOrderComponent,
  decorators: [CartDecorator, OrderDecorator],
} as ComponentMeta<typeof CheckoutOrderComponent>;

export const CheckoutOrder: ComponentStory<typeof CheckoutOrderComponent> = () => (
  <CheckoutOrderComponent />
);

CheckoutOrder.parameters = {
  cart: {
    products: MOCKED_PRODUCTS,
    totalProductsPrice: MOCKED_PRODUCTS.reduce(
      (acc, cur) => acc + cur.amount * cur.price,
      0
    ),
  },
  order: {
    shippingPrice: 10,
  },
};
