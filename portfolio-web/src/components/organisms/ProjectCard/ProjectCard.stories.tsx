import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCard } from "./ProjectCard";

const meta = {
  title: "Organisms/ProjectCard",
  component: ProjectCard,
  args: {
    project: {
      id: "data-science-insurance-eda",
      category: "data_science",
      name: "Insurance EDA & Predictive Exploration",
      stack: ["Python", "Pandas", "Scikit-learn"],
      impact: "Estadistica avanzada y validacion de hipotesis de negocio",
      visual: "Interactive Plotly Dashboards",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/projects%2Finsurance-eda-cover.webp?alt=media",
      videUrl:
        "https://firebasestorage.googleapis.com/v0/b/portfolio-media-demo.appspot.com/o/projects%2Finsurance-eda-preview.mp4?alt=media",
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
