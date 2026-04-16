/**
 * Factory to create a MUI Theme from neutral tokens.
 *
 * Receives tokens (playlist or smartdesk) and produces a Theme object
 * ready to pass to the MUI v6 <ThemeProvider>.
 *
 * Also applies overrides for common components that work for both
 * themes — e.g. Button without uppercase, Card with subtle border instead of
 * strong shadow, etc.
 */

import { createTheme, type ThemeOptions, type Shadows } from '@mui/material/styles';

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
      textTransform?: 'none' | 'uppercase';
    }>;
  };
  shape: { borderRadius: number; borderRadiusLarge: number; borderRadiusPill: number };
  shadows: { none: string; sm: string; md: string; lg: string; xl: string };
  spacing: { base: number };
  breakpoints: { xs: number; sm: number; md: number; lg: number; xl: number };
};

export function createMuiTheme(tokens: Tokens) {
  // MUI requires an array of exactly 25 shadows (indices 0-24).
  // We map our short scale (none/sm/md/lg/xl) to that array.
  const shadowArray: Shadows = [
    tokens.shadows.none,
    tokens.shadows.sm,
    tokens.shadows.sm,
    tokens.shadows.md,
    tokens.shadows.md,
    tokens.shadows.md,
    tokens.shadows.lg,
    tokens.shadows.lg,
    tokens.shadows.lg,
    tokens.shadows.lg,
    tokens.shadows.lg,
    tokens.shadows.lg,
    tokens.shadows.lg,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
    tokens.shadows.xl,
  ];

  const typography: ThemeOptions['typography'] = {
    fontFamily: tokens.typography.fontFamily,
    fontWeightRegular: tokens.typography.weights.regular,
    fontWeightMedium: tokens.typography.weights.medium,
    fontWeightBold: tokens.typography.weights.bold,
  };

  // Apply each variant of the scale.
  // We convert px → rem (base 16) to respect the user's browser
  // zoom/accessibility preference. letterSpacing in em
  // for the same reason (scales with the font).
  const BASE_FONT_SIZE = 16;
  const variantOverrides: Record<string, { fontSize: string; lineHeight: number; fontWeight: number; letterSpacing: string; textTransform?: string }> = {};
  for (const [key, v] of Object.entries(tokens.typography.scale)) {
    variantOverrides[key] = {
      fontSize: `${v.fontSize / BASE_FONT_SIZE}rem`,
      lineHeight: v.lineHeight,
      fontWeight: v.weight,
      letterSpacing: `${v.letterSpacing / v.fontSize}em`,
      ...(v.textTransform ? { textTransform: v.textTransform } : {}),
    };
  }

  // Merge variant overrides into typography config
  Object.assign(typography, variantOverrides);

  return createTheme({
    // CSS variables: a MUI v6 feature that generates CSS custom properties
    // for each token. Improves SSR, allows inspection via devtools, and
    // avoids hydration mismatch. Official MUI v6 recommendation.
    cssVariables: true,
    palette: {
      mode: 'light',
      primary: tokens.palette.primary,
      secondary: tokens.palette.secondary,
      background: {
        default: tokens.palette.background.default,
        paper: tokens.palette.background.paper,
      },
      text: {
        primary: tokens.palette.text.primary,
        secondary: tokens.palette.text.secondary,
        disabled: tokens.palette.text.disabled,
      },
      divider: tokens.palette.divider,
      success: tokens.palette.success,
      error: tokens.palette.error,
      warning: tokens.palette.warning,
      info: tokens.palette.info,
    },
    typography,
    shape: {
      borderRadius: tokens.shape.borderRadius,
    },
    shadows: shadowArray,
    spacing: tokens.spacing.base,
    breakpoints: {
      values: tokens.breakpoints,
    },
    components: {
      // Button: no uppercase (theme already defines textTransform: none, but
      // we reinforce it here), and consistent default radius
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: tokens.shape.borderRadius,
            fontWeight: tokens.typography.weights.medium,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      // Card: subtle border instead of strong shadow (observed in designs)
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.borderRadiusLarge,
            border: `1px solid ${tokens.palette.divider}`,
            boxShadow: tokens.shadows.sm,
          },
        },
        defaultProps: {
          elevation: 0,
        },
      },
      // Paper: consistency with Card
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: tokens.shape.borderRadiusLarge,
          },
        },
      },
      // Chip: pill format for status badges (observed "Active",
      // "Follow-up", "AI Escalated", "At risk")
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.borderRadiusPill,
            fontWeight: tokens.typography.weights.medium,
          },
        },
      },
      // TextField: consistent border radius
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'small',
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.borderRadius,
          },
        },
      },
      // AppBar: white with subtle border-bottom (observed in
      // screenshots of both themes). We set explicit bgcolor because
      // color="inherit" + MUI default would still pull the primary.
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: `1px solid ${tokens.palette.divider}`,
            backgroundColor: tokens.palette.background.paper,
            color: tokens.palette.text.primary,
          },
        },
        defaultProps: {
          elevation: 0,
          color: 'default',
        },
      },
      // Alert: consistent radius, no thick left-border from the default
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.borderRadius,
          },
        },
      },
      // ListItemButton: used in nav/sidebar. In screenshots, the active item
      // has primary.light background (light indigo in playlist, light gray
      // in smartdesk) and primary.main text.
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.borderRadius,
            '&.Mui-selected': {
              backgroundColor: tokens.palette.primary.light,
              color: tokens.palette.primary.main,
              '&:hover': {
                backgroundColor: tokens.palette.primary.light,
              },
            },
          },
        },
      },
      // Tooltip: consistent dark background
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '12px',
            borderRadius: tokens.shape.borderRadius,
          },
        },
      },
    },
  });
}
