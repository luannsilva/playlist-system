/**
 * Playlist Theme Tokens
 *
 * Single source of truth for the Playlist theme. These tokens are neutral
 * (not dependent on MUI or RN Paper). The adapters in /adapters/web and
 * /adapters/native translate these values to the specific structure
 * of each lib.
 *
 * Visual identity: vibrant modern SaaS, indigo as brand color,
 * very light gray backgrounds, DM Sans typography.
 */

export const playlistTokens = {
  name: 'playlist',

  palette: {
    // Primary — vibrant indigo, used in action buttons, active nav,
    // "Active"/"AI Escalated" badges, charts, general accent
    primary: {
      main: '#4F46E5',
      light: '#EEF2FF', // active nav background, outlined badges, subtle hover
      dark: '#4338CA',  // hover/pressed state of primary buttons
      contrastText: '#FFFFFF',
    },

    // Secondary — in the real Playlist design, secondary doesn't appear.
    // The design uses primary everywhere and falls back to semantic colors
    // (success, warning, error, info) for specific actions. We keep
    // this field only because MUI requires it, replicating primary. Use
    // variant="outlined" or "text" to hierarchize actions instead of
    // changing color to "secondary".
    secondary: {
      main: '#4F46E5',
      light: '#EEF2FF',
      dark: '#4338CA',
      contrastText: '#FFFFFF',
    },

    // Backgrounds
    background: {
      default: '#F5F6F8',  // screen canvas
      paper: '#FFFFFF',    // cards, surfaces
    },

    // Text
    text: {
      primary: '#0F172A',   // headings and main body
      secondary: '#64748B', // captions, metadata, "Last 30 days"
      disabled: '#94A3B8',  // placeholders, disabled text
    },

    // Borders and dividers
    divider: '#E5E7EB',

    // Status
    success: {
      main: '#10B981',       // "+12% from last month" arrows
      light: '#D1FAE5',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#B91C1C',       // text of "At risk" / "Churn risk" badges
      light: '#FEE2E2',      // background of those badges
      dark: '#991B1B',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      dark: '#D97706',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#4F46E5',       // same tone as primary in this theme
      light: '#EEF2FF',
      dark: '#4338CA',
      contrastText: '#FFFFFF',
    },
  },

  // Typography — DM Sans via Google Fonts, 4 weights
  typography: {
    // NOTE: The first font in the stack (before the comma) is the primary font name
    // used by the adapters (MUI and RN Paper). For this theme, it is "DM Sans".
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    googleFontUrl:
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    scale: {
      h1: { fontSize: 48, lineHeight: 1.2, weight: 700, letterSpacing: -0.5 },
      h2: { fontSize: 36, lineHeight: 1.25, weight: 700, letterSpacing: -0.25 },
      h3: { fontSize: 28, lineHeight: 1.3, weight: 600, letterSpacing: 0 },
      h4: { fontSize: 22, lineHeight: 1.35, weight: 600, letterSpacing: 0 },
      h5: { fontSize: 18, lineHeight: 1.4, weight: 600, letterSpacing: 0 },
      h6: { fontSize: 16, lineHeight: 1.4, weight: 600, letterSpacing: 0 },
      body1: { fontSize: 15, lineHeight: 1.5, weight: 400, letterSpacing: 0 },
      body2: { fontSize: 14, lineHeight: 1.5, weight: 400, letterSpacing: 0 },
      button: { fontSize: 14, lineHeight: 1.5, weight: 500, letterSpacing: 0, textTransform: 'none' as const },
      caption: { fontSize: 12, lineHeight: 1.4, weight: 400, letterSpacing: 0 },
      overline: { fontSize: 11, lineHeight: 1.4, weight: 500, letterSpacing: 0.5, textTransform: 'uppercase' as const },
    },
  },

  shape: {
    borderRadius: 8,       // buttons, inputs, non-pill badges
    borderRadiusLarge: 12, // larger cards (KPI cards, dashboard tiles)
    borderRadiusPill: 999, // chips, status pills ("Active", "Follow-up")
  },

  // Very subtle shadows — Linear/Notion style. Cards from screenshots
  // practically have no shadow, just an outline via border.
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
    md: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04)',
    lg: '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.04)',
    xl: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
  },

  // Standard MUI spacing: 8px base
  spacing: {
    base: 8,
  },

  // Standard MUI breakpoints
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;

export type PlaylistTokens = typeof playlistTokens;
