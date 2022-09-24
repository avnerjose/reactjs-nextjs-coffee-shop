import { ComponentMeta } from "@storybook/react";
import { Footer as FooterComponent } from ".";

export default {
  title: "Components/Footer",
  component: FooterComponent,
} as ComponentMeta<typeof FooterComponent>;

export const Footer = () => <FooterComponent />;
