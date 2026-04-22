import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileVisualNarrative } from "./ProfileVisualNarrative";

const phases = [
  {
    id: "phase-1",
    stage: "Industrial Core",
    title: "Hardware & Low-Level Control",
    description:
      "Design and implementation of low-cost PLC and power circuitry with assembler tooling.",
    imageGallery: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fanahuac-logo.webp?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fegade-logo.webp?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fibm-data-science.webp?alt=media",
    ],
    backgroundLayer:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fazure-architect.webp?alt=media",
    floatingElement:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fegade-logo.webp?alt=media",
    parallaxSpeed: 0.2,
  },
  {
    id: "phase-2",
    stage: "Connectivity",
    title: "CAN-BUS Protocol Intelligence",
    description:
      "CAN-BUS network monitoring for critical fault detection in automotive systems.",
    imageGallery: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fscrum-master.webp?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fudemy-python.webp?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fanahuac-logo.webp?alt=media",
    ],
    backgroundLayer:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fanahuac-logo.webp?alt=media",
    floatingElement:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/certs%2Fibm-data-science.webp?alt=media",
    parallaxSpeed: 0.65,
  },
];

const meta = {
  title: "Organisms/ProfileVisualNarrative",
  component: ProfileVisualNarrative,
  args: {
    phases,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProfileVisualNarrative>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
