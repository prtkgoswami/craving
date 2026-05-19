import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsProvider } from "./providers";

export const metadata: Metadata = {
  title: "Craving | AI Recipe Generator & Smart Macro Planner",
  description:
    "Instantly turn available ingredients into premium recipes with exact macro calculations. The ultimate developer-friendly SaaS tool for custom meal planning.",
  keywords: [
    "AI recipe generator",
    "ingredients meal planner",
    "macro tracking recipe tool",
    "saas recipe builder",
    "smart kitchen automation",
  ],
  authors: [{ name: "Craving Dev Team" }],
  openGraph: {
    title: "Craving | AI Recipe Generator & Smart Macro Planner",
    description:
      "Input ingredients, set macro limits, and generate michelin-star profiles instantly.",
    url: "https://craving-app.com", // Replace with production URL
    siteName: "Craving App",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://craving-app.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Craving SaaS Platform Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craving | AI Recipe Generator",
    description:
      "Input ingredients, set macros, and generate perfect dinner plans instantly.",
    images: ["https://craving-app.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-[#FDFBF7] text-[#2D3136]">
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
