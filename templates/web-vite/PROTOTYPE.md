# Prototype — playlist-system

This project follows the **playlist-system** design system.

- **Active theme:** __REPLACE_WITH_THEME__ (playlist | smartdesk)
- **Stack:** Vite + React 18 + TypeScript + Material UI v6
- **Pattern source:** https://github.com/YOUR_USER/playlist-system

## Project rules

1. **Never** create styled native HTML components. Always import from `@mui/material`.
2. **Never** hardcode color, font, spacing or radius. Use theme tokens via `sx={{ ... }}` or `theme.palette.*` / `theme.spacing()` / `theme.shape.borderRadius`.
3. For less common components (DataGrid, Autocomplete, slot customizations), consult the official MUI MCP or `playlist-system/references/mui-llms-index.md`.
4. New components should follow the visual pattern of `src/App.demo.tsx`.

## How to evolve

- New screen: create in `src/pages/` (or `src/features/`), consuming `@mui/material` and the theme imported in `src/theme.ts`.
- Global token adjustment: edit in `playlist-system/tokens/` and reinstall via `pnpm update playlist-system`.
