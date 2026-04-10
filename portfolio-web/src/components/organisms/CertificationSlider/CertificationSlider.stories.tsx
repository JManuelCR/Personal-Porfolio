import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CertificationSlider } from "./CertificationSlider";

const items = [
  {
    id: "cert-001",
    badge: "EGADE",
    title: "Business Analytics Candidate",
    issuer: "EGADE Business School",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fegade-logo.webp?alt=media",
    skills: ["Business Intelligence", "Statistical Modeling", "Decision Making"],
    dotLabel: "Go to Business Analytics Candidate",
  },
  {
    id: "cert-002",
    badge: "AZURE",
    title: "Cloud Fundamentals Track",
    issuer: "Microsoft Learn",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fazure-architect.webp?alt=media",
    skills: ["Azure Architecture", "Cloud Security", "Infrastructure as Code"],
    dotLabel: "Go to Cloud Fundamentals Track",
  },
  {
    id: "cert-003",
    badge: "DATA",
    title: "Data Foundations Track",
    issuer: "Microsoft Learn",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fibm-data-science.webp?alt=media",
    skills: ["Python", "Machine Learning", "Data Visualization"],
    dotLabel: "Go to Data Foundations Track",
  },
  {
    id: "cert-004",
    badge: "POWER",
    title: "Power BI Reporting Track",
    issuer: "Microsoft Learn",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fanahuac-logo.webp?alt=media",
    skills: ["Analytics", "Reporting", "Power BI"],
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
