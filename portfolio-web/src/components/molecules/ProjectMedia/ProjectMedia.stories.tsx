import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectMedia } from "./ProjectMedia";

const meta = {
  title: "Molecules/ProjectMedia",
  component: ProjectMedia,
  args: {
    title: "Insurance EDA",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/projects%2Finsurance-eda-cover.webp?alt=media",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/projects%2Finsurance-eda-preview.mp4?alt=media",
  },
  argTypes: {
    title: { control: "text" },
    imageUrl: { control: "text" },
    videoUrl: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ProjectMedia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
