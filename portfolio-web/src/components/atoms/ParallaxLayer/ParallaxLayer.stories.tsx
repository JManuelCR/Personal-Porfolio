import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ParallaxLayer } from "./ParallaxLayer";

const meta = {
  title: "Atoms/ParallaxLayer",
  component: ParallaxLayer,
  args: {
    speed: 1,
  },
  argTypes: {
    speed: {
      control: { type: "range", min: 0.2, max: 1.8, step: 0.1 },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-line bg-panel p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ParallaxLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ParallaxLayer {...args} className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-400/20 to-sky-500/20">
      <div className="absolute bottom-4 left-4 text-sm text-foreground">Depth Layer</div>
    </ParallaxLayer>
  ),
};
