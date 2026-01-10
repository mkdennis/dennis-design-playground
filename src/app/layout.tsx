/**
 * ============================================
 * ROOT LAYOUT
 * ============================================
 *
 * This is the root layout for the entire application.
 * In Next.js App Router, layouts wrap all pages and persist
 * across navigation (they don't re-mount).
 *
 * Key concepts:
 * - Layouts are server components by default
 * - They receive children prop (the page content)
 * - Good place for: fonts, global styles, metadata, providers
 *
 * This layout:
 * 1. Sets up system fonts (for reliable rendering)
 * 2. Applies global styles
 * 3. Sets page metadata (title, description)
 */

import type { Metadata } from "next";
import "./globals.css";

/**
 * Page metadata
 *
 * This object defines SEO and browser metadata.
 * Next.js automatically generates the appropriate
 * <head> tags from this configuration.
 */
export const metadata: Metadata = {
  title: "Design Playground",
  description: "A personal component library playground for previewing and customizing React components",
};

/**
 * RootLayout Component
 *
 * @param children - The page content that will be rendered inside the layout
 *
 * The layout wraps all pages in the app, providing consistent structure.
 * Changes here affect every page.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * lang="en" is important for accessibility
     * Screen readers use this to determine pronunciation
     *
     * className="dark" forces dark mode
     * Tailwind's dark mode uses this class to apply dark styles
     */
    <html lang="en" className="dark">
      {/*
       * Body element setup:
       * - antialiased: Smoother font rendering
       *
       * We're using system fonts defined in globals.css
       * for reliable rendering without external font fetching.
       */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
