import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ToastProvider } from "@/components/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next Generation Social Media Web App.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // bg-[#101010]
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} max-w-[1270px] mx-auto`}>
        <ToastProvider />
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
