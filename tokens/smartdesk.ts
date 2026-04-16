/**
 * SmartDesk Theme Tokens
 *
 * Single source of truth for the SmartDesk theme. These tokens are neutral
 * (not dependent on MUI or RN Paper). The adapters in /adapters/web and
 * /adapters/native translate these values to the specific structure
 * of each lib.
 *
 * Visual identity: monochromatic black/white/grays, dark sidebar,
 * solid black primary buttons, Apple/Linear/Vercel style.
 *
 * ⚠️ AVERTA FONT: this theme uses Averta, a licensed commercial font.
 * To work, the project needs Averta files in
 * /public/fonts/ (web) or /assets/fonts/ (RN) and appropriate license.
 * If there's no license, the skill can fall back to Albert Sans
 * (Google Fonts, similar) — documented in README.
 */

export const smartdeskTokens = {
  name: 'smartdesk',

  palette: {
    // Primary — solid black, used in main action buttons
    // ("Start Chatting Now", "Record", "Next: Bot Persona")
    primary: {
      main: '#0A0A0A',
      light: '#374151', // suggested hover/pressed (not explicitly observed)
      dark: '#000000',  // pressed state
      contrastText: '#FFFFFF',
    },

    // Secondary — medium gray, rarely used
    secondary: {
      main: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
      contrastText: '#FFFFFF',
    },

    // Backgrounds
    background: {
      default: '#F5F7F9',  // screen canvas (very light gray)
      paper: '#FFFFFF',    // cards, surfaces
      // ⚠️ SMARTDESK EXCLUSIVE: sidebar and topbar are dark
      // (unlike Playlist which are white)
      sidebar: '#0F1114',  // slight bluish tint, not pure black
    },

    // Text
    text: {
      primary: '#0A0A0A',    // headings and main body
      onDark: '#FFFFFF',     // text on dark sidebar
      secondary: '#6B7280',  // captions, "Here's a snapshot..."
      disabled: '#9CA3AF',   // placeholders
    },

    // Borders and dividers
    divider: '#E5E7EB',

    // Status
    success: {
      main: '#10B981',       // "+12% from last week"
      light: '#D1FAE5',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#DC2626',       // "-5% from last week"
      light: '#FEE2E2',
      dark: '#B91C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      dark: '#D97706',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0A0A0A',       // monochromatic: info = primary
      light: '#F3F4F6',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
  },

  // Typography — Averta (commercial, requires license)
  // Fallback stack includes Albert Sans (Google Fonts, similar) and system
  typography: {
    // NOTE: The first font in the stack (before the comma) is the primary font name
    // used by the adapters (MUI and RN Paper). For this theme, it is "Averta".
    fontFamily: '"Averta", "Albert Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    // If the project doesn't have Averta license, the template provides
    // @font-face pointing to files in /public/fonts/ and includes
    // Albert Sans via Google as automatic fallback
    fallbackGoogleFontUrl:
      'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap',
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
    borderRadius: 8,
    borderRadiusLarge: 12,
    borderRadiusPill: 999,
  },

  // Almost imperceptible shadows — cards use more border than shadow
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(10, 10, 10, 0.04)',
    md: '0 1px 3px 0 rgba(10, 10, 10, 0.05), 0 1px 2px 0 rgba(10, 10, 10, 0.03)',
    lg: '0 4px 6px -1px rgba(10, 10, 10, 0.06), 0 2px 4px -1px rgba(10, 10, 10, 0.03)',
    xl: '0 10px 15px -3px rgba(10, 10, 10, 0.07), 0 4px 6px -2px rgba(10, 10, 10, 0.03)',
  },

  spacing: {
    base: 8,
  },

  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;

export type SmartdeskTokens = typeof smartdeskTokens;
