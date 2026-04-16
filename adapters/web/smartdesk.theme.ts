import { createMuiTheme } from './createMuiTheme';
import { smartdeskTokens } from '../../tokens/smartdesk';

/**
 * MUI v6 theme for the SmartDesk brand (monochromatic, black/white, Averta).
 *
 * Usage:
 *   import { ThemeProvider, CssBaseline } from '@mui/material';
 *   import { smartdeskTheme } from 'playlist-system/adapters/web/smartdesk.theme';
 *
 *   <ThemeProvider theme={smartdeskTheme}>
 *     <CssBaseline />
 *     <App />
 *   </ThemeProvider>
 *
 * IMPORTANT: Averta is a commercial font and must be self-hosted with a
 * valid license. If unavailable, the theme falls back to Albert Sans
 * (Google Fonts) which has a similar geometric feel.
 *
 * Example self-host (put .woff2 files in /public/fonts/averta/ and add to CSS):
 *   @font-face {
 *     font-family: 'Averta';
 *     src: url('/fonts/averta/Averta-Regular.woff2') format('woff2');
 *     font-weight: 400; font-style: normal; font-display: swap;
 *   }
 */
export const smartdeskTheme = createMuiTheme(smartdeskTokens);
