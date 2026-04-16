# MUI Icons (`@mui/icons-material`)

Material Icons catalog that ships with MUI. It's the **only** accepted icon source in web prototypes for this skill. No bare SVG, emoji in place of icon, or competing libs (Lucide, Feather, Heroicons, Tabler).

Searchable catalog: https://mui.com/material-ui/material-icons/

## Installation

The package is a peer of `@mui/material`. In this skill's boilerplates it's already listed in `package.json`:

```bash
npm i @mui/icons-material
```

Requires the same peer deps as `@mui/material` (`react`, `react-dom`, `@emotion/react`, `@emotion/styled`).

## Import (single standard)

**Always default import by subpath**, one icon per line:

```tsx
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
```

Don't do `import { Add } from '@mui/icons-material'` — that pulls the entire barrel and explodes Vite's bundle/HMR in dev. Always use the subpath `/IconName`.

## Variants

Each icon has up to five variants, accessed by suffix in the module name:

| Variant | Suffix | When to use |
| --- | --- | --- |
| Filled (default) | none | Default for both themes in this skill. |
| Outlined | `Outlined` | Use consistently if you adopt it; don't mix with Filled. |
| Rounded | `Rounded` | Softer style; Playlist handles it well, SmartDesk avoids it. |
| Two Tone | `TwoTone` | Rarely — fixed colors, hard to harmonize with theme. |
| Sharp | `Sharp` | If you want to reinforce SmartDesk's serious vibe. |

```tsx
import DeleteIcon from '@mui/icons-material/Delete';            // Filled
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
```

**Skill rule:** choose one variant at the start of the project and keep it throughout the UI. Default is Filled.

## Usage

Icons from `@mui/icons-material` are `SvgIcon` components under the hood — they accept the same props.

### In buttons

```tsx
<Button variant="contained" startIcon={<AddIcon />}>
  New lead
</Button>

<IconButton aria-label="More options">
  <MoreVertIcon />
</IconButton>
```

### Inside other components

```tsx
<ListItemIcon>
  <InboxIcon />
</ListItemIcon>

<Chip icon={<CheckIcon />} label="Active" color="success" />
```

## Important props

### `fontSize`

Controls size via semantic scale (preferable to `style.fontSize`):

```tsx
<AddIcon fontSize="small" />    // 20px
<AddIcon />                      // 24px (medium, default)
<AddIcon fontSize="large" />    // 35px
<AddIcon fontSize="inherit" /> // inherits from parent (useful inside Typography)
```

### `color`

Accepts theme tokens (`primary`, `secondary`, `action`, `disabled`, `error`, `info`, `success`, `warning`) or `inherit`:

```tsx
<ErrorIcon color="error" />
<DashboardIcon color="primary" />
<MenuIcon color="inherit" />  // in a dark AppBar, for example
```

For custom colors, use `sx` with a theme token — **never literal hex**:

```tsx
<StarIcon sx={{ color: 'primary.light' }} />
```

### `sx`

Accepts MUI's full styling system. Use for out-of-scale sizing or spacing:

```tsx
<AddIcon sx={{ fontSize: 32, mr: 1 }} />
```

## Accessibility

- Purely decorative icon next to text: no extra attributes needed (text already labels it).
- Icon without text (e.g., `<IconButton>`): **always** add descriptive `aria-label` on the button.

```tsx
<IconButton aria-label="Delete record">
  <DeleteIcon />
</IconButton>
```

## Anti-patterns

Forbidden in the skill:

```tsx
// ❌ Barrel import — large bundle, slow HMR
import { Add, Delete } from '@mui/icons-material';

// ❌ Bare / inline SVG
<svg viewBox="0 0 24 24">...</svg>

// ❌ Emoji as icon
<Button>➕ Add</Button>

// ❌ Competing lib
import { Plus } from 'lucide-react';

// ❌ Literal hex color
<AddIcon sx={{ color: '#4F46E5' }} />

// ❌ Mixing variants without reason
<AddIcon /> ... <DeleteOutlinedIcon />
```

## Finding the right name

1. Visual catalog: https://mui.com/material-ui/material-icons/ (search by word).
2. The component name is the icon name in PascalCase, no spaces. "Add Circle Outline" → `AddCircleOutline`, "File Download" → `FileDownload`.
3. Subpath = same name: `@mui/icons-material/AddCircleOutline`.
