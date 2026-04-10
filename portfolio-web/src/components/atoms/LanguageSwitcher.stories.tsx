import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import { LanguageSwitcher } from "@/components/atoms/LanguageSwitcher";

const meta = {
  title: "Atoms/LanguageSwitcher",
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={{}}>
        <div className="p-6">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  args: {
    value: "es",
  },
  argTypes: {
    value: {
      control: "inline-radio",
      options: ["es", "en"],
    },
  },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
