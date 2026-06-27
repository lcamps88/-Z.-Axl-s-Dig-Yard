import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Z. Axl's Dig Yard | Boutique Play for Children 18mo–7yrs | Bethel, CT",
    template: "%s | Z. Axl's Dig Yard",
  },
  description:
    "A first-of-its-kind boutique indoor play sanctuary in Bethel, CT designed for children 18 months to 7 years. Rooted in emotional literacy and the science of play.",
  keywords: [
    "indoor play space", "Bethel CT", "children play", "emotional literacy",
    "sensory play", "birthday parties", "memberships", "CASEL", "trauma-informed",
  ],
  openGraph: { type: "website", locale: "en_US", siteName: "Z. Axl's Dig Yard" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-mist text-dusk">
        <AppShell>{children}</AppShell>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#1E2D40",
              color: "#ffffff",
              fontFamily: "Nunito, sans-serif",
              fontSize: "14px",
              borderRadius: "9999px",
              padding: "12px 20px",
            },
          }}
        />
      </body>
    </html>
  );
}
