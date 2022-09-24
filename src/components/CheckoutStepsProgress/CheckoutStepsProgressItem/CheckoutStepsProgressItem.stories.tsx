import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckoutStepsProgressItem } from ".";

export default {
  component: CheckoutStepsProgressItem,
} as ComponentMeta<typeof CheckoutStepsProgressItem>;

const Template: ComponentStory<typeof CheckoutStepsProgressItem> = (args) => (
  <CheckoutStepsProgressItem {...args} />
);

export const Active = Template.bind({});
Active.args = {
  index: 0,
  label: "Active",
  activeStep: 0,
};

export const Inactive = Template.bind({});
Inactive.args = {
  index: 1,
  label: "Inactive",
  activeStep: 0,
};

export const Completed = Template.bind({});
Completed.args = {
  index: 0,
  label: "Completed",
  activeStep: 1,
};
