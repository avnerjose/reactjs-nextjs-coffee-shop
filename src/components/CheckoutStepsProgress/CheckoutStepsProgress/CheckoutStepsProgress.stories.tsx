import { CheckoutStepsProgress } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: CheckoutStepsProgress,
} as ComponentMeta<typeof CheckoutStepsProgress>;

const Template: ComponentStory<typeof CheckoutStepsProgress> = (args) => (
  <CheckoutStepsProgress {...args} />
);

export const Step1 = Template.bind({});
Step1.args = {
  activeStep: 0,
};

export const Step2 = Template.bind({});
Step2.args = {
  activeStep: 1,
};

export const Step3 = Template.bind({});
Step3.args = {
  activeStep: 2,
};

export const Step4 = Template.bind({});
Step4.args = {
  activeStep: 3,
};

export const CheckoutCompleted = Template.bind({});
CheckoutCompleted.args = {
  activeStep: 4,
};
