import type { Metadata } from "next";
import { getActiveTheme, themeToCSS } from "@/lib/theme";

export const metadata: Metadata = {
  title: { default: "Contessa", template: "%s — Contessa" },
  description: "Luxury makeup & high-end fashion, curated for you.",
};

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetched once per request; React cache() deduplicates across components.
  const theme = await getActiveTheme();
  const cssVariables = themeToCSS(theme);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Inject theme CSS variables before any stylesheet so every component
          can consume `var(--brand-primary)` etc. without a flash.
          This string is pure CSS with no user-controlled interpolation —
          all values are typed by ThemeConfig and validated at save time.
        */}
        <style
          id="contessa-theme"
          dangerouslySetInnerHTML={{ __html: cssVariables }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-sans)",
          backgroundColor: "var(--brand-background)",
          color: "var(--brand-foreground)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
