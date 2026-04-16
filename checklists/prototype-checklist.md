# Prototype checklist

Final checklist before considering a prototype "ready for review". Claude should go through this list before delivering the prototype. Applies to web (Vite) and mobile (Expo).

## 1. Theme and tokens

- [ ] The theme (`playlist` or `smartdesk`) was chosen explicitly and is applied in `main.tsx` / `App.tsx`.
- [ ] `ThemeProvider` wraps the entire tree; `CssBaseline` (web) or equivalent (mobile) is present.
- [ ] **Zero hex literals** in app code (not in `theme.ts`). Search: `rg '#[0-9A-Fa-f]{3,6}' src/ | grep -v theme.ts`.
- [ ] **Zero fontFamily literals** in app code. Font comes from theme.
- [ ] **Zero spacing literals** (e.g., `padding: '16px'`) in app. Use `sx={{ p: 2 }}` or `theme.spacing(2)`.

## 2. Components

- [ ] No `<div>`/`<button>`/`<input>`/`<h1>` to `<h6>` with inline styles instead of MUI components.
- [ ] On mobile, no `TouchableOpacity` + styles instead of `Button` from Paper.
- [ ] Typography uses `<Typography>` (web) or `<Text variant="...">` (mobile) for all text.
- [ ] Buttons use correct variants: `contained` only for primary page action; `outlined` for secondary; `text` for tertiary. Not "everything contained primary".

## 3. Icons

- [ ] Web: all icons imported from `@mui/icons-material` by default subpath (`import AddIcon from '@mui/icons-material/Add'`).
- [ ] Web: a single icon variant throughout the project (Filled OR Outlined OR Rounded, do not mix).
- [ ] Mobile: icons via `icon="name-mdi"` prop from Paper or `MaterialCommunityIcons` directly. No Lucide/Feather/Heroicons.
- [ ] No emoji in place of icon.
- [ ] `IconButton` / `Appbar.Action` without text have `aria-label` (web) or `accessibilityLabel` (mobile).

## 4. Layout and responsiveness

- [ ] Web: uses `Container` with `maxWidth` on content pages.
- [ ] Web: uses `Stack` or `Grid` instead of manual flex when possible.
- [ ] Web: tested at 768px (tablet) and 1280px (desktop) minimum.
- [ ] Mobile: tested on at least 1 screen size (e.g., iPhone 14 or Pixel 7).

## 5. Basic accessibility

- [ ] Inputs have visible `label` (no `placeholder` as only reference).
- [ ] Contrast checked in status states (success, warning, error) against background.
- [ ] Base font size = 16px (if user increases in browser, it should scale — that's why the theme uses rem, not px).
- [ ] Form inputs use `<TextField label="..." />` (MUI) or `<TextInput label="..." />` (Paper) — label is programmatically associated, not just visually adjacent text.
- [ ] Decorative images have `alt=""` or `aria-hidden="true"`; meaningful images have descriptive `alt` text.
- [ ] Color is not the only way to convey meaning — status indicators have both color AND icon or text (e.g., error chip has both red color and an error icon).
- [ ] Interactive elements have minimum 44x44px touch target on mobile (Paper components handle this by default).
- [ ] Page has a logical heading hierarchy (h1 → h2 → h3, no skipped levels).

## 6. States (don't forget)

- [ ] Loading: at least one data screen has `Skeleton` or `CircularProgress`/`ActivityIndicator` when it makes sense.
- [ ] Empty: main screen with list has empty state handled (icon + text + CTA).
- [ ] Error: critical flows (form submit) show `Alert`/`Snackbar` on failure.

## 7. Content

- [ ] Fake data is realistic (names, emails, values) — not `Lorem ipsum` or `User 1, User 2`.
- [ ] Copy in Portuguese OR English consistently; do not mix.
- [ ] Dates, currencies, and numbers formatted consistently (e.g., `R$ 1.250,00` or `$1,250.00`).

## 8. Dev experience

- [ ] `npm run dev` (web) or `npx expo start` (mobile) starts without blocking warnings.
- [ ] TypeScript compiles without errors (`tsc --noEmit`).
- [ ] `PROTOTYPE.md` from template was edited with what the prototype covers.

## 9. Prototype distribution

- [ ] Initial commit with scaffold structure before starting to edit.
- [ ] Project `README.md` explains how to run it.
- [ ] If sharing screenshots, take them on both breakpoints (web) or in simulator (mobile).

## 10. Final review (1 minute of critical eye)

Open the demo and ask yourself:

- [ ] Does it look like a serious product or a "intern prototype"?
- [ ] Are all spacings multiples of 8? (if there's a card with `padding: 14px`, it breaks the grid)
- [ ] Does visual hierarchy guide the eye? (title > subtitle > body > metadata)
- [ ] Does any component "scream" out of place? (color outside palette, icon different from others)

If it passed all 10 sections, it's ready for review.
