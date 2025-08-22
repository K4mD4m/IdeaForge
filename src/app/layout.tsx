import { Providers } from "./components/Providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IdeaForge | Ignite Your Creativity",
  description: "Share, collaborate and launch ideas together.",
  icons: {
    icon: "/others/bulb-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
