import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "This is a Photo Gallery app developed for the Clever Estate interview process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased px-7">{children}</body>
    </html>
  );
}
