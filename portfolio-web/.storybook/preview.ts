import type { Preview } from '@storybook/nextjs-vite'
import "../src/app/globals.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      defaultValue: "dark",
    },
  },
  parameters: {
    backgrounds: {
      default: "portfolio-dark",
      values: [{ name: "portfolio-dark", value: "#07131f" }],
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;