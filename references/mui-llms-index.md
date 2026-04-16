# MUI llms-index (fallback)

Authoritative source (when network access available): https://mui.com/material-ui/llms.txt

This file is the **fallback** for when the official MUI MCP is unavailable. Lists the most relevant components with canonical doc path. When implementing something not in `mui-web-components.md`, prefer in this order:

1. Official MUI MCP (if connected) → search by component name.
2. Regenerate this file by running `curl https://mui.com/material-ui/llms.txt` and replacing the content below.
3. If neither is accessible, use the catalog below as a pointer to canonical URLs and read the docs directly.

## Inputs and Controls

- **Autocomplete** — https://mui.com/material-ui/react-autocomplete/
- **Button** — https://mui.com/material-ui/react-button/
- **Button Group** — https://mui.com/material-ui/react-button-group/
- **Checkbox** — https://mui.com/material-ui/react-checkbox/
- **Floating Action Button** — https://mui.com/material-ui/react-floating-action-button/
- **Radio Group** — https://mui.com/material-ui/react-radio-button/
- **Rating** — https://mui.com/material-ui/react-rating/
- **Select** — https://mui.com/material-ui/react-select/
- **Slider** — https://mui.com/material-ui/react-slider/
- **Switch** — https://mui.com/material-ui/react-switch/
- **Text Field** — https://mui.com/material-ui/react-text-field/
- **Transfer List** — https://mui.com/material-ui/react-transfer-list/
- **Toggle Button** — https://mui.com/material-ui/react-toggle-button/

## Data Display

- **Avatar** — https://mui.com/material-ui/react-avatar/
- **Badge** — https://mui.com/material-ui/react-badge/
- **Chip** — https://mui.com/material-ui/react-chip/
- **Divider** — https://mui.com/material-ui/react-divider/
- **Icons** — https://mui.com/material-ui/icons/
- **Material Icons (catalog)** — https://mui.com/material-ui/material-icons/
- **List** — https://mui.com/material-ui/react-list/
- **Table** — https://mui.com/material-ui/react-table/
- **Tooltip** — https://mui.com/material-ui/react-tooltip/
- **Typography** — https://mui.com/material-ui/react-typography/

## Feedback

- **Alert** — https://mui.com/material-ui/react-alert/
- **Backdrop** — https://mui.com/material-ui/react-backdrop/
- **Dialog** — https://mui.com/material-ui/react-dialog/
- **Progress (Circular/Linear)** — https://mui.com/material-ui/react-progress/
- **Skeleton** — https://mui.com/material-ui/react-skeleton/
- **Snackbar** — https://mui.com/material-ui/react-snackbar/

## Surfaces

- **Accordion** — https://mui.com/material-ui/react-accordion/
- **App Bar** — https://mui.com/material-ui/react-app-bar/
- **Card** — https://mui.com/material-ui/react-card/
- **Paper** — https://mui.com/material-ui/react-paper/

## Navigation

- **Bottom Navigation** — https://mui.com/material-ui/react-bottom-navigation/
- **Breadcrumbs** — https://mui.com/material-ui/react-breadcrumbs/
- **Drawer** — https://mui.com/material-ui/react-drawer/
- **Link** — https://mui.com/material-ui/react-link/
- **Menu** — https://mui.com/material-ui/react-menu/
- **Pagination** — https://mui.com/material-ui/react-pagination/
- **Speed Dial** — https://mui.com/material-ui/react-speed-dial/
- **Stepper** — https://mui.com/material-ui/react-stepper/
- **Tabs** — https://mui.com/material-ui/react-tabs/

## Layout

- **Box** — https://mui.com/material-ui/react-box/
- **Container** — https://mui.com/material-ui/react-container/
- **Grid** — https://mui.com/material-ui/react-grid/
- **Grid v2** — https://mui.com/material-ui/react-grid2/
- **Stack** — https://mui.com/material-ui/react-stack/
- **ImageList** — https://mui.com/material-ui/react-image-list/
- **Hidden** (deprecated, use `useMediaQuery`) — https://mui.com/material-ui/react-hidden/

## Utils

- **Click-Away Listener** — https://mui.com/material-ui/react-click-away-listener/
- **CssBaseline** — https://mui.com/material-ui/react-css-baseline/
- **Modal** — https://mui.com/material-ui/react-modal/
- **No SSR** — https://mui.com/material-ui/react-no-ssr/
- **Popover** — https://mui.com/material-ui/react-popover/
- **Popper** — https://mui.com/material-ui/react-popper/
- **Portal** — https://mui.com/material-ui/react-portal/
- **Textarea Autosize** — https://mui.com/material-ui/react-textarea-autosize/
- **Transitions** — https://mui.com/material-ui/transitions/
- **useMediaQuery** — https://mui.com/material-ui/react-use-media-query/

## Lab (still in preview)

- **Masonry** — https://mui.com/material-ui/react-masonry/
- **Timeline** — https://mui.com/material-ui/react-timeline/
- **Tree View (legacy)** — https://mui.com/material-ui/react-tree-view/

## MUI X (paid/separate packages)

- **Data Grid** — https://mui.com/x/react-data-grid/
- **Date Pickers** — https://mui.com/x/react-date-pickers/
- **Charts** — https://mui.com/x/react-charts/
- **Tree View v7** — https://mui.com/x/react-tree-view/

> `@mui/x-data-grid` community is free; Pro/Premium features require a license. In prototypes, use the community version.

## Customization (theming and system)

- **Theming (overview)** — https://mui.com/material-ui/customization/theming/
- **Default Theme Viewer** — https://mui.com/material-ui/customization/default-theme/
- **Palette** — https://mui.com/material-ui/customization/palette/
- **Typography** — https://mui.com/material-ui/customization/typography/
- **Spacing** — https://mui.com/material-ui/customization/spacing/
- **Breakpoints** — https://mui.com/material-ui/customization/breakpoints/
- **z-index** — https://mui.com/material-ui/customization/z-index/
- **Shadows** — https://mui.com/material-ui/customization/shadows/
- **Shape** — https://mui.com/material-ui/customization/shape/
- **Component Overrides (styleOverrides / defaultProps)** — https://mui.com/material-ui/customization/theme-components/
- **CSS Variables (`cssVariables: true`)** — https://mui.com/material-ui/customization/css-theme-variables/overview/
- **Dark Mode / Color Schemes** — https://mui.com/material-ui/customization/dark-mode/
- **The `sx` prop** — https://mui.com/system/getting-started/the-sx-prop/

## Getting Started (project level)

- **Install** — https://mui.com/material-ui/getting-started/installation/
- **Usage** — https://mui.com/material-ui/getting-started/usage/
- **Supported Platforms / Browsers** — https://mui.com/material-ui/getting-started/supported-platforms/
- **TypeScript** — https://mui.com/material-ui/guides/typescript/
- **Next.js App Router** — https://mui.com/material-ui/integrations/nextjs/
- **Vite** — https://mui.com/material-ui/integrations/vite/
- **Migration v5 → v6** — https://mui.com/material-ui/migration/upgrade-to-v6/

## How this skill chooses

- Prototype project = Vite (our template) or Next.js if user is already in one.
- Theme via `createTheme` + `ThemeProvider` + `CssBaseline` (our adapter already does this).
- `cssVariables: true` enabled in production (better SSR and theme toggle); disabled only in `preview/demo-preview.html` for compatibility with esm.sh + dynamic theme switching.
- MUI X: use `@mui/x-data-grid` community for tables with sort/filter/pagination.
- Lab: `Timeline` is acceptable; avoid `Masonry`, simple flex solves it.
