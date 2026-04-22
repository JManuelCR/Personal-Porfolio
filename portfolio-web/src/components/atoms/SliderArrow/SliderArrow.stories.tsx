import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SliderArrow } from "./SliderArrow";

const meta = {
  title: "Atoms/SliderArrow",
  component: SliderArrow,
  args: {
    direction: "next",
    ariaLabel: "Next certification",
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SliderArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: () => undefined,
  },
};
