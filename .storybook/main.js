module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next",
    "storybook-addon-apollo-client",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  env: (config) => ({
    ...config,
    NODE_ENV: "test",
  }),
};
