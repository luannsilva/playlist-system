# Mobile Prototype — playlist-system

This project follows the **playlist-system** design system (mobile target).

- **Active theme:** __REPLACE_WITH_THEME__ (playlist | smartdesk)
- **Stack:** Expo (SDK 51) + React Native + React Native Paper
- **Pattern source:** https://github.com/YOUR_USER/playlist-system

## Project rules

1. **Never** use `<View>` + `TouchableOpacity` as a button; use `<Button>` from `react-native-paper`.
2. **Never** hardcode color/font/spacing in `style`; use `useTheme()` and read `theme.colors.*`, `theme.roundness`, `theme.extended.spacing(n)`.
3. For less common components, consult `playlist-system/references/rn-paper-components.md`.
4. New components should follow the visual pattern of `App.tsx`.

## Fonts

- **playlist**: DM Sans via `@expo-google-fonts/dm-sans`.
- **smartdesk**: Averta (commercial, self-hosted in `/assets/fonts`) or fallback Albert Sans via `@expo-google-fonts/albert-sans`.
