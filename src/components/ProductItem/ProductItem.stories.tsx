import { ComponentMeta } from "@storybook/react";
import { ProductItem as ProductItemComponent } from ".";

export default {
  component: ProductItemComponent,
} as ComponentMeta<typeof ProductItemComponent>;

export const ProductItem = () => (
  <ProductItemComponent
    product={{
      category: "mocked category",
      id: "mocked-id",
      image: {
        url: "/costa_rica.png",
      },
      name: "Mocked name",
      price: 10,
      slug: "mocked-slug",
    }}
  />
);
