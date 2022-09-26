// // .storybook/main.js

// const path = require("path");

// module.exports = {
//   stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
//   /** Expose public folder to storybook as static */
//   staticDirs: ["../public"],
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "storybook-addon-apollo-client",
//     "storybook-addon-next-router",
//     {
//       name: "storybook-addon-next",
//       options: {
//         nextConfigPath: path.resolve(__dirname, "../next.config.js"),
//       },
//     },
//     "@storybook/addon-postcss",
//     {
//       name: "@storybook/addon-postcss",
//       options: {
//         postcssLoaderOptions: {
//           implementation: require("postcss"),
//         },
//       },
//     },
//   ],
//   core: {
//     builder: "webpack5",
//   },
//   webpackFinal: async (config) => {
//     /**
//      * Add support for alias-imports
//      * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
//      */
//     config.resolve.alias = {
//       ...config.resolve?.alias,
//       "@": [path.resolve(__dirname, "../src/"), path.resolve(__dirname, "../")],
//       "@components": [
//         path.resolve(__dirname, "../src/components/index.ts"),
//         path.resolve(__dirname, "../src/components/index.ts"),
//       ],
//       "@hooks": [
//         path.resolve(__dirname, "../src/hooks/index.ts"),
//         path.resolve(__dirname, "../src/hooks/index.ts"),
//       ],
//       "@utils": [
//         path.resolve(__dirname, "../src/utils/index.ts"),
//         path.resolve(__dirname, "../src/utils/index.ts"),
//       ],
//       "@contexts": [
//         path.resolve(__dirname, "../src/contexts/index.ts"),
//         path.resolve(__dirname, "../src/contexts/index.ts"),
//       ],
//       "@codegen/graphql": [
//         path.resolve(__dirname, "../src/graphql/generated/graphql.tsx"),
//         path.resolve(__dirname, "../src/graphql/generated/graphql.tsx"),
//       ],
//       "@codegen/page": [
//         path.resolve(__dirname, "../src/graphql/generated/page.tsx"),
//         path.resolve(__dirname, "../src/graphql/generated/page.tsx"),
//       ],
//       "@decorators": [
//         path.resolve(__dirname, "./decorators/index.ts"),
//         path.resolve(__dirname, "./decorators/index.ts"),
//       ],
//     };

//     /**
//      * Fixes font import with /
//      * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
//      */
//     config.resolve.roots = [
//       path.resolve(__dirname, "../public"),
//       "node_modules",
//     ];

//     return config;
//   },
// };

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
};
