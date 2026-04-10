import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CertificationCard } from "./CertificationCard";

const meta = {
  title: "Molecules/CertificationCard",
  component: CertificationCard,
  args: {
    badge: "AZ-900",
    title: "Azure Fundamentals",
    issuer: "Microsoft Azure",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fazure-architect.webp?alt=media",
    skills: ["Azure Architecture", "Cloud Security", "Infrastructure as Code"],
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
