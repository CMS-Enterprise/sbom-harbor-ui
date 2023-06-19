import path from 'path'

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    path.dirname(
      require.resolve(path.join('@storybook/addon-links', 'package.json'))
    ),
    path.dirname(
      require.resolve(path.join('@storybook/addon-essentials', 'package.json'))
    ),
    path.dirname(
      require.resolve(
        path.join('@storybook/addon-interactions', 'package.json')
      )
    ),
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "vite.config.ts",
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
