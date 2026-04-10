import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SliderDot } from "./SliderDot";

const meta = {
  title: "Atoms/SliderDot",
  component: SliderDot,
  args: {
    active: true,
    ariaLabel: "Go to certification one",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SliderDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => undefined,
  },
};

export const Inactive: Story = {
  args: {
    active: false,
    onClick: () => undefined,
  },
};
