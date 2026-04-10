import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CertificationSlider } from "./CertificationSlider";

const items = [
  {
    badge: "EGADE",
    title: "Business Analytics Candidate",
    issuer: "EGADE Business School",
    dotLabel: "Go to Business Analytics Candidate",
  },
  {
    badge: "AZURE",
    title: "Cloud Fundamentals Track",
    issuer: "Microsoft Learn",
    dotLabel: "Go to Cloud Fundamentals Track",
  },
  {
    badge: "DATA",
    title: "Data Foundations Track",
    issuer: "Microsoft Learn",
    dotLabel: "Go to Data Foundations Track",
  },
  {
    badge: "POWER",
    title: "Power BI Reporting Track",
    issuer: "Microsoft Learn",
    dotLabel: "Go to Power BI Reporting Track",
  },
];

const meta = {
  title: "Organisms/CertificationSlider",
  component: CertificationSlider,
  args: {
    eyebrow: "Validation Track",
    title: "Certifications & Signals",
    subtitle: "Executive education and cloud/data foundations organized in a responsive slider.",
    previousLabel: "Previous certification",
    nextLabel: "Next certification",
    statusLabel: "Active certification",
    items,
    autoPlay: false,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CertificationSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    autoPlayInterval: 2200,
  },
};
