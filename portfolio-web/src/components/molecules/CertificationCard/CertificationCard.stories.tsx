import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CertificationCard } from "./CertificationCard";

const meta = {
  title: "Molecules/CertificationCard",
  component: CertificationCard,
  args: {
    badge: "AZ-900",
    title: "Azure Fundamentals",
    issuer: "Microsoft Azure",
    active: true,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CertificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inactive: Story = {
  args: {
    active: false,
  },
};
