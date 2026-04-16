# MUI web components — quick guide

This guide covers the most commonly used components in prototypes and how to use them with the playlist/smartdesk themes. For advanced components (DataGrid, custom Autocomplete, Timeline), consult the official MUI MCP or `references/mui-llms-index.md`.

## Central principle

Every component from `@mui/material` respects the theme automatically. You **don't** need to pass colors; use `color="primary" | "secondary" | "success" | "error" | "warning" | "info"`, variants, and `sx` with tokens (`primary.main`, `text.secondary`, `background.paper`, etc.).

## Layout primitives

- **`Box`** — div with access to `sx`. Use for wrappers and spacing.
- **`Stack`** — flex container vertical (default) or horizontal (`direction="row"`). Prefer Stack over Box + manual flex.
- **`Grid`** — responsive 12-col layout. Use for dashboards and complex forms.
- **`Container`** — limits max width (maxWidth="sm|md|lg|xl"). Page wrapper.
- **`Divider`** — separator line, already uses `theme.palette.divider`.

## Typography

- **`Typography`** — always use this, never bare `<h1>`, `<p>` or `<span>`.
- Variants: `h1` to `h6`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `overline`, `button`.
- Color via `color="text.primary"` (default), `"text.secondary"`, or `sx={{ color: 'primary.main' }}`.

```tsx
<Typography variant="h4" gutterBottom>Title</Typography>
<Typography variant="body2" color="text.secondary">Metadata</Typography>
```

## Buttons

```tsx
<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined">Secondary</Button>
<Button variant="text">Tertiary</Button>
<Button variant="contained" color="error">Danger</Button>
```

No uppercase (theme already removes it). No elevation (theme already disables it). Never use bare HTML `<button>` in prototypes.

### IconButton

```tsx
<IconButton size="small"><EditIcon fontSize="small" /></IconButton>
```

## Inputs

```tsx
<TextField label="Name" fullWidth /> // default: outlined, small
<TextField label="Email" type="email" helperText="We never share" />
<TextField label="Description" multiline rows={4} />
<TextField select label="Plan" value={v} onChange={...}>
  <MenuItem value="free">Free</MenuItem>
  <MenuItem value="pro">Pro</MenuItem>
</TextField>
```

For autocomplete, searches, or custom selects, use the `Autocomplete` component (consult MCP/llms-index).

## Cards

```tsx
<Card>
  <CardHeader title="Report" subheader="Last week" />
  <CardContent>...</CardContent>
  <CardActions>
    <Button>View more</Button>
  </CardActions>
</Card>
```

The theme already applies subtle border + large radius. Don't add manual box-shadow.

## Status / Chips

```tsx
<Chip label="Active" color="primary" />
<Chip label="Follow-up" color="warning" variant="outlined" />
<Chip label="At risk" color="error" variant="outlined" />
<Chip label="AI Escalated" color="primary" variant="outlined" />
```

Chip is already a pill by default in the theme. Icon via `icon={<DoneIcon />}`.

## AppBar + Toolbar

```tsx
<AppBar position="sticky">
  <Toolbar>
    <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
      App
    </Typography>
    <IconButton><NotificationsIcon /></IconButton>
  </Toolbar>
</AppBar>
```

Theme already removes shadow and adds subtle border-bottom. AppBar inherits `bgcolor: 'background.paper'`.

## Lists

```tsx
<List>
  <ListItem secondaryAction={<IconButton><DeleteIcon /></IconButton>}>
    <ListItemAvatar><Avatar>A</Avatar></ListItemAvatar>
    <ListItemText primary="João Silva" secondary="joao@example.com" />
  </ListItem>
</List>
```

## Tables (simple)

```tsx
<TableContainer component={Paper}>
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Client</TableCell>
        <TableCell align="right">MRR</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((r) => (
        <TableRow key={r.id}>
          <TableCell>{r.name}</TableCell>
          <TableCell align="right">{r.mrr}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

For complex tables (sort, filter, pagination): use `@mui/x-data-grid` (separate package).

## Feedback

- **`Alert`** — `<Alert severity="success|info|warning|error">...`
- **`Snackbar`** — temporary toast
- **`Dialog`** — modal
- **`CircularProgress`** / **`LinearProgress`** — loading
- **`Skeleton`** — loading placeholder

## Modals

```tsx
<Dialog open={open} onClose={close}>
  <DialogTitle>Confirm</DialogTitle>
  <DialogContent>
    <DialogContentText>Are you sure?</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={close}>Cancel</Button>
    <Button variant="contained" onClick={confirm}>Confirm</Button>
  </DialogActions>
</Dialog>
```

## Icons

Always from `@mui/icons-material` (MUI Material Icons package). Full guide: `references/mui-icons.md`.

```tsx
import AddIcon from '@mui/icons-material/Add';
<Button startIcon={<AddIcon />}>New</Button>
```

Short rules:

- Default import by subpath (`'@mui/icons-material/Add'`), never barrel (`{ Add } from '@mui/icons-material'`).
- Choose **one** variant (Filled / Outlined / Rounded / Sharp / TwoTone) and keep it throughout the project. Default is Filled.
- `fontSize="small|medium|large|inherit"` for size; `color="primary|error|..."` for color via theme.
- `IconButton` without text requires `aria-label`.
- Forbidden: bare SVG, emoji in place of icon, competing libs (Lucide/Feather/Heroicons), literal hex in color.

## `sx` pattern

Use theme tokens, never literal values:

```tsx
// ✅ good
<Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, color: 'primary.main' }} />

// ❌ bad
<Box sx={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', color: '#4F46E5' }} />
```

`sx={{ p: 2 }}` = `padding: theme.spacing(2)` = `16px`. Numbers are multipliers of base spacing (8px).

## When to pull the MCP

- Advanced components not listed here
- When you need to customize via slots/overrides
- When the prop you remember might have changed in a version
- Layout patterns that aren't obvious (e.g., collapsible sidebar, permanent drawer)

Command: `search_mcp_registry(["mui", "material-ui"])` or use already-connected MCP.
