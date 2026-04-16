import { createPaperTheme } from './createPaperTheme';
import { playlistTokens } from '../../tokens/playlist';

/**
 * React Native Paper theme for the Playlist brand.
 *
 * Usage (Expo + RN Paper):
 *   import { PaperProvider } from 'react-native-paper';
 *   import { playlistTheme } from 'playlist-system/adapters/native/playlist.theme';
 *
 *   <PaperProvider theme={playlistTheme}>
 *     <App />
 *   </PaperProvider>
 *
 * Font loading:
 *   Use expo-font or @expo-google-fonts/dm-sans to load DM Sans.
 *   Example (app entry):
 *     import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold }
 *       from '@expo-google-fonts/dm-sans';
 */
export const playlistTheme = createPaperTheme(playlistTokens);
