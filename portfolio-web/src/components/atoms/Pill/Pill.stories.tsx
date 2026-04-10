import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pill } from "./Pill";

const meta = {
  title: "Atoms/Pill",
  component: Pill,
  args: {
    children: "React 19",
    size: "default",
  },
  argTypes: {
    children: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["default", "small"],
    },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "small",
    children: "TypeScript",
  },
};
