import { createMuiTheme } from './createMuiTheme';
import { playlistTokens } from '../../tokens/playlist';

/**
 * MUI v6 theme for the Playlist brand (indigo, vibrant, DM Sans).
 *
 * Usage:
 *   import { ThemeProvider, CssBaseline } from '@mui/material';
 *   import { playlistTheme } from 'playlist-system/adapters/web/playlist.theme';
 *
 *   <ThemeProvider theme={playlistTheme}>
 *     <CssBaseline />
 *     <App />
 *   </ThemeProvider>
 *
 * Requires DM Sans font loaded (via Google Fonts link or self-host).
 * Example link tag:
 *   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
 */
export const playlistTheme = createMuiTheme(playlistTokens);
