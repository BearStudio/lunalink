import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://bearstudio.github.io/lunalink";
const TITLE = "lunalink - Type-safe URL building for TypeScript";
const DESCRIPTION =
  "Lightweight TypeScript library to build URLs with type-safe path parameters and automatic query strings. Under 1KB, ESM & CJS.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "lunalink",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/lunalink.jpeg",
        width: 1920,
        height: 1080,
        alt: "lunalink - Type-safe URL building for TypeScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/lunalink.jpeg"],
  },
  keywords: [
    "typescript",
    "url-builder",
    "type-safe",
    "path-parameters",
    "query-string",
    "lunalink",
  ],
  authors: [{ name: "BearStudio", url: "https://www.bearstudio.fr" }],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "lunalink",
  description: DESCRIPTION,
  url: SITE_URL,
  codeRepository: "https://github.com/BearStudio/lunalink",
  programmingLanguage: "TypeScript",
  runtimePlatform: "Node.js",
  license: "https://opensource.org/licenses/MIT",
  author: {
    "@type": "Organization",
    name: "BearStudio",
    url: "https://www.bearstudio.fr",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
