import { ComponentMeta } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { MobileMenu as MobileMenuComponent } from ".";

export default {
  component: MobileMenuComponent,
  title: "Components/Mobile Menu",
  args: {
    isOpen: true,
    setIsOpen: () => console.log("Set is open"),
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
  argTypes: {
    setIsOpen: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof MobileMenuComponent>;

export const MobileMenu = {};
