/**
 * Factory to create a React Native Paper (MD3) theme from
 * neutral tokens.
 *
 * RN Paper uses the MD3 system of Material Design 3, with a different
 * structure from MUI web. This adapter does the mapping.
 */

import { MD3LightTheme, configureFonts, type MD3Theme } from 'react-native-paper';

type Tokens = {
  name: string;
  palette: {
    primary: { main: string; light: string; dark: string; contrastText: string };
    secondary: { main: string; light: string; dark: string; contrastText: string };
    background: { default: string; paper: string; sidebar?: string };
    text: { primary: string; secondary: string; disabled: string; onDark?: string };
    divider: string;
    success: { main: string; light: string; dark: string; contrastText: string };
    error: { main: string; light: string; dark: string; contrastText: string };
    warning: { main: string; light: string; dark: string; contrastText: string };
    info: { main: string; light: string; dark: string; contrastText: string };
  };
  typography: {
    fontFamily: string;
    weights: { regular: number; medium: number; semibold: number; bold: number };
    scale: Record<string, {
      fontSize: number;
      lineHeight: number;
      weight: number;
      letterSpacing: number;
    }>;
  };
  shape: { borderRadius: number; borderRadiusLarge: number; borderRadiusPill: number };
  shadows: { none: string; sm: string; md: string; lg: string; xl: string };
  spacing: { base: number };
};

export type ExtendedPaperTheme = MD3Theme & {
  extended: {
    spacing: (n: number) => number;
    shape: { small: number; medium: number; large: number; pill: number };
    palette: Tokens['palette'];
    typography: Tokens['typography'];
  };
};

export function createPaperTheme(tokens: Tokens): ExtendedPaperTheme {
  // MD3 uses a system of "roles" (primary, onPrimary, primaryContainer,
  // onPrimaryContainer, surface, onSurface, etc.). We map our tokens
  // to these roles.

  // Extract the primary font name from the CSS font-family string.
  // Contract: the first value before the comma is the intended primary font.
  // For "Averta" this resolves to "Averta"; for "DM Sans" to "DM Sans".
  // RN Paper uses this as the base font for configureFonts().
  const primaryFont = tokens.typography.fontFamily
    .split(',')[0]
    .replace(/["']/g, '')
    .trim();

  const paperFontConfig = { fontFamily: primaryFont };

  return {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: tokens.palette.primary.main,
      onPrimary: tokens.palette.primary.contrastText,
      primaryContainer: tokens.palette.primary.light,
      onPrimaryContainer: tokens.palette.primary.dark,

      secondary: tokens.palette.secondary.main,
      onSecondary: tokens.palette.secondary.contrastText,
      secondaryContainer: tokens.palette.secondary.light,
      onSecondaryContainer: tokens.palette.secondary.dark,

      tertiary: tokens.palette.info.main,
      onTertiary: tokens.palette.info.contrastText,
      tertiaryContainer: tokens.palette.info.light,
      onTertiaryContainer: tokens.palette.info.dark,

      error: tokens.palette.error.main,
      onError: tokens.palette.error.contrastText,
      errorContainer: tokens.palette.error.light,
      onErrorContainer: tokens.palette.error.dark,

      background: tokens.palette.background.default,
      onBackground: tokens.palette.text.primary,

      surface: tokens.palette.background.paper,
      onSurface: tokens.palette.text.primary,
      surfaceVariant: tokens.palette.background.default,
      onSurfaceVariant: tokens.palette.text.secondary,

      outline: tokens.palette.divider,
      outlineVariant: tokens.palette.divider,

      inverseSurface: tokens.palette.text.primary,
      inverseOnSurface: tokens.palette.background.paper,
      inversePrimary: tokens.palette.primary.light,

      elevation: {
        level0: 'transparent',
        level1: tokens.palette.background.paper,
        level2: tokens.palette.background.paper,
        level3: tokens.palette.background.paper,
        level4: tokens.palette.background.paper,
        level5: tokens.palette.background.paper,
      },

      shadow: 'rgba(15, 23, 42, 0.08)',
      scrim: 'rgba(0, 0, 0, 0.32)',
    },
    fonts: configureFonts({ config: paperFontConfig }),
    roundness: tokens.shape.borderRadius,
    // Extra field with original tokens — useful when a component
    // needs something that standard MD3 doesn't expose (e.g. success color,
    // sidebar background, specific typography tokens).
    extended: {
      spacing: (n: number) => n * tokens.spacing.base,
      shape: {
        small: tokens.shape.borderRadius,
        medium: tokens.shape.borderRadiusLarge,
        large: tokens.shape.borderRadiusLarge,
        pill: tokens.shape.borderRadiusPill,
      },
      palette: tokens.palette,
      typography: tokens.typography,
    },
  };
}
