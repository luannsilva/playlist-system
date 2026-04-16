---
name: playlist-system
description: "Design system for UI prototypes in React web (Material UI v6) and React Native (React Native Paper + Expo), with two named themes \u2014 playlist (vibrant indigo, DM Sans) and smartdesk (monochromatic black/white, Averta). Trigger on any UI task \u2014 dashboard, screen, component, prototype, form, card, button, layout, navigation. In projects already marked as playlist-system (detectable by PROTOTYPE.md mentioning the skill, theme.ts importing from adapters, or 'playlist-system' dependency in package.json) follow the active theme silently. In projects without markers, ask once per session if the user wants to adopt the skill (with which theme) before proceeding. Also trigger on audit requests, adjustments (\"review design system\", \"fix to match theme\", \"use playlist-system\") or mentions of themes by name. Do not trigger on non-UI tasks (script, backend, CLI, docs) even if the project is marked."
---

# playlist-system

Design system for React web prototypes (MUI v6) and React Native (RN Paper + Expo), with two themes: **playlist** (vibrant indigo, DM Sans) and **smartdesk** (monochromatic, Averta).

## Decision flow

Every task starts with the same question: *has the project adopted the skill?*

Look for markers:
- `PROTOTYPE.md` at the root mentioning the skill and the theme
- `package.json` with `playlist-system` in dependencies
- `theme.ts` (or `src/theme.ts`) importing from the skill's adapters
- Comment at the top of the entry point (`App.tsx`, `main.tsx`) stating it follows the skill
- `.claude/skills/playlist-system/` copied locally

Any one is enough to confirm adoption.

**If there are markers → silent mode.** Follow the active theme without asking. Details in "Silent mode" below.

**If there are no markers → ask once per session** (via `AskUserQuestion`):

> Do you want to use playlist-system in this project?
> - Yes, **playlist** theme (vibrant indigo, DM Sans)
> - Yes, **smartdesk** theme (monochromatic, Averta)
> - No, follow current stack

Respect the answer for the rest of the session. Do not re-ask for each new button. If the answer is "no", stay out of the way — do not push MUI over Tailwind/Chakra/CSS modules.

After "yes", decide between **bootstrap** (empty/new project) or **adoption** (project already has code and its own stack) by inspecting the files. Both sections are described below.

**Do not ask on non-UI tasks** (running scripts, editing README, debugging backend) even if the project is marked. The skill only enters on visual tasks.

## Silent mode

You are in a project already adopted. Typical request: "add an export button" or "new reports screen". Flow:

1. Read the project's `theme.ts` to know the active theme — it affects visual choices (light vs dark sidebar, primary button tone).
2. Take a look at `App.demo.tsx` (or equivalent file) — how do similar components already appear? Copy the visual pattern.
3. Import from `@mui/material` (web) or `react-native-paper` (native). The reason not to rewrite styled HTML/View: the library already solved accessibility, keyboard nav, theming, and components respond to theme tokens automatically.
4. Use tokens via `sx` (web) or `useTheme()` (native). Avoiding hardcoded values is what keeps the theme as the single source of truth — if you write `#4F46E5` in a component, a brand adjustment tomorrow will not reflect there.
5. For less common components (DataGrid, Autocomplete, Timeline, SpeedDial, customization via slots), consult the official MUI MCP if installed, or fall back to `references/mui-llms-index.md`. This avoids hallucinating props that don't exist in the current version.

**Brief transparency:** when delivering the change, mention in one line what was done in terms of pattern — *"I used `Button` contained following the active playlist theme."* It is not a report, it is a short signal that the DS was respected. For obvious additions (`Typography`, `Box`) you can omit.

## Bootstrap mode

Empty project, new scaffold.

1. **Target:** web (dashboard, SaaS, admin, CRM) → `templates/web-vite/`. Mobile (app, iOS, Android, Expo) → `templates/native-expo/`. If ambiguous, ask.
2. **Theme:** if the user has not chosen yet, check `references/theme-detection.md`. When in doubt, ask — theme is a brand decision, not an implementation one.
3. **Scaffold:** use the `scripts/scaffold.mjs` script to copy the chosen template, replace the placeholders (`__REPLACE_WITH_THEME__`) with the theme, and fix the import in `theme.ts`. Usage: `node playlist-system/scripts/scaffold.mjs --target web --theme playlist --dest ./my-prototype`. The script handles substring replacement and file names.
4. **Install deps:** `pnpm install` (or `npm`/`yarn`) inside the newly created folder.
5. **Official MUI MCP (bootstrap only):** try to install if not already connected — `search_mcp_registry(["mui", "material-ui"])` and `suggest_connectors`. If it fails, follow `references/mcp-install-guide.md` for the manual step-by-step. If the user declines, the skill continues working with the bundled index as fallback.
6. **Markers:** the `scaffold.mjs` already creates a `PROTOTYPE.md` at the project root marking the chosen theme. This ensures future sessions enter silent mode directly.

## Adoption mode

The user adopted the skill in a project that **already has code** and its own stack (ex.: Next.js with Tailwind, CRA with CSS modules, Vite with Chakra). Here the challenge is conflict, not empty scaffolding.

Ask about scope before touching anything:

- **Migrate the entire project** — remove competing stack, install `@mui/material` + `@emotion/react` + `@emotion/styled`, wrap the app with `ThemeProvider`, refactor existing components. Parts of the project may break visually and require rework.
- **Scope only to the new** — create an isolated route or folder with its own `ThemeProvider`. The rest of the project stays untouched. Useful for experiments or partial onboarding.
- **Cancel adoption** — the user changes their mind; follow the current stack.

After the answer:
- *Migrate*: run the audit/fix checklist against the entire project, add deps, create `theme.ts` and `PROTOTYPE.md` marking the project.
- *Scope*: build the isolated feature with its own `ThemeProvider`, add MUI deps, **do not** add `PROTOTYPE.md` at the root (only inside the feature folder) — this avoids triggering silent mode in code outside scope.
- *Cancel*: nothing to do.

## Audit/fix mode

User asks for review or adjustment ("does this follow the design system?", "fix to use the theme"). The skill **fixes, not just points out** — the goal is to deliver the code up to standard.

1. Check `checklists/prototype-checklist.md` for the formal criteria.
2. Scan relevant files looking for common violations:
   - Native HTML playing the role of component (`<button>`, `<input>`, `<div>` styled as card) → replace with MUI/RN Paper equivalent.
   - Colors, fonts, spacings or radius hardcoded (`#xxxxxx`, `'16px'`, literal font names) → swap for theme tokens (`theme.palette.*`, `theme.spacing()`, `theme.shape.borderRadius`, or shorthand in `sx`).
   - Imports from competing libs (Chakra, Mantine, arbitrary Tailwind) → refactor to MUI/RN Paper.
   - `ThemeProvider` / `CssBaseline` missing → add.
3. Apply fixes directly in the code. At the end, deliver a summary per file of what changed.
4. If any violation requires an ambiguous decision (ex.: which variant of `Button` fits a specific case), then ask first — but only in those exceptions.

## Non-negotiable principles

1. **Components from the library, not styled HTML.** The library already solved accessibility, focus, keyboard nav, theming. A custom `<button>` does not give any of this for free. Web: `@mui/material`. Native: `react-native-paper`.
2. **Icons are also from the library.** Web: `@mui/icons-material` (ex.: `import AddIcon from '@mui/icons-material/Add'`). Native: `MaterialCommunityIcons` via the `icon` prop of Paper components (ex.: `<Button icon="plus">`) or `react-native-vector-icons/MaterialCommunityIcons` directly. No loose SVG, emoji in place of icon, or competing icon libs (Lucide, Feather, Heroicons) — breaks visual consistency and bundle weight.
3. **Theme tokens, not literal values.** When every component pulls colors, fonts, and spacing from the theme, a brand change propagates everywhere at once. Hardcoded `#4F46E5` in a component means that value won't update when the theme changes — breaking the single source of truth. Use `theme.palette.primary.main`, `theme.spacing(2)`, or the shorthand `sx={{ color: 'primary.main', p: 2 }}` instead. See `references/patterns.md` for examples.
4. **Consult the authoritative source for less common components.** MUI v6 has ~70 components with hundreds of props that change between versions. For basics (`Button`, `TextField`, `Card`, `Typography`, `Box`, `Stack`) you can write from memory. For complex ones (`DataGrid`, `Autocomplete`, `Timeline`, `SpeedDial`) or slot-based customization, check the MCP or `references/mui-llms-index.md` first — hallucinating a prop that doesn't exist wastes the user's debugging time.

## Architecture

```
playlist-system/
├── SKILL.md                    # this file
├── README.md                   # installation via GitHub
├── scripts/
│   └── scaffold.mjs            # copies template + injects theme
├── tokens/                     # single source (no lib)
│   ├── playlist.ts
│   └── smartdesk.ts
├── adapters/
│   ├── web/                    # tokens → MUI Theme
│   └── native/                 # tokens → RN Paper MD3
├── templates/
│   ├── web-vite/
│   └── native-expo/
├── references/                 # on demand
│   ├── theme-detection.md
│   ├── mui-web-components.md
│   ├── mui-icons.md
│   ├── rn-paper-components.md
│   ├── patterns.md
│   ├── mui-llms-index.md
│   └── mcp-install-guide.md
├── checklists/
│   └── prototype-checklist.md
└── evals/
    └── evals.json              # test cases for skill iteration
```

Neutral tokens at the center, adapters by library, templates with live showcase, references loaded only when needed — this keeps SKILL.md lean and allows brand changes to propagate from one place.
