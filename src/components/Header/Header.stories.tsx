import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from ".";

export default {
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Regular = Template.bind({});

export const WithSearchInput = Template.bind({});
WithSearchInput.parameters = {
  nextRouter: {
    asPath: "/catalog",
  },
};

window.scrollY = 100;