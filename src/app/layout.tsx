import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jonathan Huth | Software Engineer",
  description:
    "Personal website and portfolio of Jonathan Huth, Software Engineer",
  keywords: "Jonathan Huth, Software Engineer, Web Developer, React, Next.js",
  authors: [{ name: "Jonathan Huth", url: "https://jhuth.dev" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://jhuth.dev",
  },
  openGraph: {
    type: "website",
    url: "https://jhuth.dev",
    title: "Jonathan Huth | Software Engineer",
    description:
      "Personal website and portfolio of Jonathan Huth, Software Engineer",
    siteName: "Jonathan Huth Personal Site",
    images: [
      {
        url: "/images/avatar.jpg",
        width: 200,
        height: 200,
        alt: "Jonathan Huth",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Jonathan Huth | Software Engineer",
    description:
      "Personal website and portfolio of Jonathan Huth, Software Engineer",
    images: ["/images/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white scroll-smooth">
      <head>
        {/* JSON-LD structured data */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jonathan Huth",
              url: "https://jhuth.dev",
              jobTitle: "Software Engineer",
              email: "jhuth@berkeley.edu",
              sameAs: [
                "https://github.com/jonhuth",
                "https://www.linkedin.com/in/jonathan-huth/",
              ],
              image: "https://jhuth.dev/images/avatar.jpg",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "UC Berkeley",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
