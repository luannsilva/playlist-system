import { createPaperTheme } from './createPaperTheme';
import { smartdeskTokens } from '../../tokens/smartdesk';

/**
 * React Native Paper theme for the SmartDesk brand.
 *
 * IMPORTANT: Averta is commercial. On mobile, self-host .otf/.ttf inside
 * /assets/fonts and load via expo-font. Fallback: Albert Sans via
 * @expo-google-fonts/albert-sans.
 *
 * Usage:
 *   import { PaperProvider } from 'react-native-paper';
 *   import { smartdeskTheme } from 'playlist-system/adapters/native/smartdesk.theme';
 *
 *   <PaperProvider theme={smartdeskTheme}>
 *     <App />
 *   </PaperProvider>
 */
export const smartdeskTheme = createPaperTheme(smartdeskTokens);
