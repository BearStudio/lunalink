import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lunalink - Type-safe URL building for TypeScript",
  description:
    "Lightweight TypeScript library to build URLs with type-safe path parameters and automatic query strings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
