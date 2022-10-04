import { SuccessfulPurchaseModal as SuccessfulPurchaseModalComponent } from ".";
import { ComponentMeta } from "@storybook/react";
import { CartDecorator } from "@decorators";

export default {
  title: "Components/SuccessfulPurchaseModal",
  component: SuccessfulPurchaseModalComponent,
  decorators: [CartDecorator],
} as ComponentMeta<typeof SuccessfulPurchaseModalComponent>;

export const SuccessfulPurchaseModal = () => (
  <SuccessfulPurchaseModalComponent isOpen={true} />
);
