<div align="center">

# playlist-system

**Design system skill for Claude** — UI prototypes with Material UI v6 (web) and React Native Paper (mobile)

[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen?logo=node.js)](https://nodejs.org)
[![MUI v6](https://img.shields.io/badge/MUI-v6-007FFF?logo=mui)](https://mui.com)
[![Expo](https://img.shields.io/badge/Expo-SDK_51-000020?logo=expo)](https://expo.dev)
[![npm](https://img.shields.io/npm/v/playlist-system?logo=npm)](https://www.npmjs.com/package/playlist-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Instead of styling HTML from scratch, Claude uses MUI/Paper with theme tokens.<br>
Prototypes come out consistent, accessible, and brand-aligned by design.

</div>

---

## Installation

### One command

Works in **Claude Code**, **Cursor**, **Windsurf**, **Codex** — any environment with Node 20+.

```bash
# Current project (installs in .claude/skills/)
npx playlist-system@latest install

# Global — available in all projects
npx playlist-system@latest install --global
```

Then just open Claude and ask for a prototype. The skill activates automatically on UI tasks.

### Alternatives

<details>
<summary>Via git clone (no npx)</summary>

```bash
git clone https://github.com/luannsilva/playlist-system.git .claude/skills/playlist-system
```

</details>

<details>
<summary>On Cowork (desktop)</summary>

Download the `.skill` from [releases](https://github.com/luannsilva/playlist-system/releases) and open — Cowork registers it automatically.

</details>

<details>
<summary>As npm dependency (to import tokens/adapters in code)</summary>

```bash
npm install playlist-system
```

</details>

### Updating

Already installed and want the latest version? Just run the install command again:

```bash
npx playlist-system@latest install
```

The `@latest` flag ensures npm fetches the newest release instead of a cached version.

---

## Themes

| Theme | Primary | Font | When to use |
| :--- | :--- | :--- | :--- |
| **playlist** | `#4F46E5` Indigo | DM Sans | CRM/SaaS dashboards, modern vibe |
| **smartdesk** | `#0A0A0A` Black | Averta (fallback Albert Sans) | Enterprise B2B products, monochromatic vibe |

Both are **light mode only**.

---

## Quick Start

### Scaffold (creates new project)

```bash
# Web (Vite + React + TS + MUI)
npx playlist-system scaffold --target web --theme playlist --dest ./my-crm

# Mobile (Expo + RN Paper)
npx playlist-system scaffold --target native --theme smartdesk --dest ./mobile-app
```

```bash
cd my-crm
npm install
npm run dev
```

### Manual — web

```tsx
// src/main.tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { playlistTheme } from 'playlist-system/adapters/web/playlist.theme';

<ThemeProvider theme={playlistTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

### Manual — mobile

```tsx
// App.tsx
import { PaperProvider } from 'react-native-paper';
import { playlistPaperTheme } from 'playlist-system/adapters/native/playlist.theme';

export default function App() {
  return (
    <PaperProvider theme={playlistPaperTheme}>
      <MainNavigator />
    </PaperProvider>
  );
}
```

---

## What the skill does

When installed, Claude automatically follows four principles:

1. **Components from the library, not styled HTML.** MUI on web, Paper on mobile. Never `<button>` or `TouchableOpacity` with manual styling.
2. **Icons also from the library.** Web: `@mui/icons-material`. Mobile: Material Community Icons via Paper.
3. **Theme tokens, never literal values.** Color, font, spacing always from `theme.*` or `sx`. Zero hardcoded hex.
4. **Authoritative source for complex components.** Official MUI MCP when available; `references/mui-llms-index.md` as fallback.

The skill operates in 4 modes: **silent** (project already marked), **bootstrap** (scaffold + installs deps), **adoption** (asks once per session on new projects), and **audit/fix** (reviews + fixes existing code).

---

## Repository structure

```
playlist-system/
├── SKILL.md                       # instructions for Claude
├── package.json                   # bin: npx playlist-system
├── bin/cli.mjs                    # CLI (install + scaffold)
│
├── tokens/                        # single source of truth
│   ├── playlist.ts                # indigo + DM Sans
│   └── smartdesk.ts               # black + Averta
│
├── adapters/
│   ├── web/                       # tokens → MUI createTheme()
│   │   ├── createMuiTheme.ts
│   │   ├── playlist.theme.ts
│   │   └── smartdesk.theme.ts
│   └── native/                    # tokens → RN Paper MD3 theme
│       ├── createPaperTheme.ts
│       ├── playlist.theme.ts
│       └── smartdesk.theme.ts
│
├── templates/
│   ├── web-vite/                  # boilerplate Vite + React + TS
│   └── native-expo/               # boilerplate Expo + Paper
│
├── references/                    # read on-demand by Claude
│   ├── mui-web-components.md      # quick guide MUI
│   ├── mui-icons.md               # complete icon guide
│   ├── rn-paper-components.md     # quick guide Paper
│   ├── patterns.md                # recurring patterns (KPI, sidebar, table...)
│   ├── theme-detection.md         # signals playlist vs smartdesk
│   ├── mui-llms-index.md          # fallback from official MCP
│   └── mcp-install-guide.md       # how to install MUI MCP
│
├── checklists/
│   └── prototype-checklist.md     # 10 verification blocks
│
├── scripts/scaffold.mjs           # scaffold engine
├── preview/demo-preview.html      # visual preview of 2 themes
└── evals/evals.json               # 3 test cases
```

---

## Visual preview

Open `preview/demo-preview.html` in your browser — toggle between the two themes. Useful to see at a glance what the skill produces without setting up a project.

---

## CLI

```
npx playlist-system@latest <command>

Commands:
  install              Install skill in .claude/skills/ of the project
  install --global     Install in ~/.claude/skills/ (all projects)
  scaffold             Create new project from template
  help                 Show help

Scaffold flags:
  --target <web|native>
  --theme  <playlist|smartdesk>
  --dest   <path>
```

---

## Requirements

- **Node 20+**
- **Claude** with skills support (Claude Code, Cursor, Windsurf, Codex, Cowork)
- Optional: Official MUI MCP ([installation guide](references/mcp-install-guide.md))

---

## Contributing

- Changes to **tokens** are breaking — bump minor and communicate first.
- Changes to **references** or **checklists** don't break anything, can go in patch.
- PRs for new patterns in `references/patterns.md` are welcome.

---

## License

MIT
