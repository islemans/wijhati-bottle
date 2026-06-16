import { cache } from "react";
import { prisma } from "./prisma";

export type ThemeConfig = {
  colors: {
    brandBackground: string; // page bg — warm alabaster
    brandSurface: string;    // card/panel bg — slightly off-white
    brandPrimary: string;    // main accent — blush rose
    brandGold: string;       // premium accent — champagne gold
    brandForeground: string; // body text — near-black
    brandMuted: string;      // secondary text — warm gray
    brandBorder: string;     // dividers — barely-there warm line
  };
  typography: {
    fontSerif: string; // headers, product names
    fontSans: string;  // body, labels, UI
  };
  geometry: {
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
    radius2xl: string;
  };
  shadows: {
    cardHover: string;
    menuFloat: string;
    buttonGlow: string;
  };
};

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    brandBackground: "#fdfaf7",
    brandSurface: "#f9f4ef",
    brandPrimary: "#c9888a",
    brandGold: "#c9a96e",
    brandForeground: "#2c2420",
    brandMuted: "#9c8c84",
    brandBorder: "#ede5dd",
  },
  typography: {
    fontSerif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSans: '"Inter", "DM Sans", system-ui, sans-serif',
  },
  geometry: {
    radiusSm: "0.375rem",
    radiusMd: "0.625rem",
    radiusLg: "0.875rem",
    radiusXl: "1.25rem",
    radius2xl: "1.75rem",
  },
  shadows: {
    cardHover: "0 12px 40px -8px rgba(180, 120, 100, 0.18)",
    menuFloat: "0 20px 60px -12px rgba(44, 36, 32, 0.14)",
    buttonGlow: "0 4px 20px rgba(201, 136, 138, 0.35)",
  },
};

// React cache() deduplicates this call across the same render tree.
// Only one DB round-trip per request, even if called from multiple layouts.
export const getActiveTheme = cache(async (): Promise<ThemeConfig> => {
  try {
    const row = await prisma.themeSettings.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    });
    return row ? (row.config as ThemeConfig) : DEFAULT_THEME;
  } catch {
    // Fail gracefully to default so a DB hiccup never breaks the storefront.
    return DEFAULT_THEME;
  }
});

/** Converts a ThemeConfig object into a :root { } CSS variables block. */
export function themeToCSS(config: ThemeConfig): string {
  const { colors, typography, geometry, shadows } = config;
  return `
:root {
  /* Colors */
  --brand-background:  ${colors.brandBackground};
  --brand-surface:     ${colors.brandSurface};
  --brand-primary:     ${colors.brandPrimary};
  --brand-gold:        ${colors.brandGold};
  --brand-foreground:  ${colors.brandForeground};
  --brand-muted:       ${colors.brandMuted};
  --brand-border:      ${colors.brandBorder};

  /* Typography */
  --font-serif: ${typography.fontSerif};
  --font-sans:  ${typography.fontSans};

  /* Geometry */
  --radius-sm:  ${geometry.radiusSm};
  --radius-md:  ${geometry.radiusMd};
  --radius-lg:  ${geometry.radiusLg};
  --radius-xl:  ${geometry.radiusXl};
  --radius-2xl: ${geometry.radius2xl};

  /* Shadows */
  --shadow-card-hover: ${shadows.cardHover};
  --shadow-menu-float: ${shadows.menuFloat};
  --shadow-button-glow: ${shadows.buttonGlow};
}`.trim();
}
