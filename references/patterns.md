# Patterns

Recurring visual patterns observed in Playlist and SmartDesk designs. Consult when you need to build a piece of screen that repeats across dashboards/CRM/SaaS admin.

> **Icons in the snippets below** — all come from `@mui/icons-material` (the [Material Icons library](https://mui.com/material-ui/material-icons/)). Never use bare SVG, emoji in place of icon, or competing libs (Lucide, Feather, Heroicons). Imports used on this page:
> ```ts
> import DashboardIcon from '@mui/icons-material/Dashboard';
> import MoreVertIcon from '@mui/icons-material/MoreVert';
> import FileDownloadIcon from '@mui/icons-material/FileDownload';
> import AddIcon from '@mui/icons-material/Add';
> import InboxIcon from '@mui/icons-material/Inbox';
> ```
> To discover other icons: browse the catalog at `mui.com/material-ui/material-icons/` and import by exact name (`import FooIcon from '@mui/icons-material/Foo'`).

## KPI row (dashboard top)

Row of 3 to 5 small cards with main metric + delta. Observed in virtually all dashboard screens.

```tsx
<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
  {kpis.map((kpi) => (
    <Card key={kpi.label} sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="caption" color="text.secondary">{kpi.label}</Typography>
        <Typography variant="h4" sx={{ my: 0.5 }}>{kpi.value}</Typography>
        <Chip
          label={kpi.trend}
          size="small"
          color={kpi.positive ? 'success' : 'error'}
          variant="outlined"
        />
      </CardContent>
    </Card>
  ))}
</Stack>
```

Notes:
- `variant="caption"` on label (small, gray) above the large number.
- `variant="h4"` on main metric — large enough to read from a distance.
- Delta in `Chip outlined` colored by sign (success if +, error if -).
- `sx={{ flex: 1 }}` distributes cards equally.

## Sidebar navigation

### Playlist theme — light sidebar

Background same as `background.paper` (white), active item with `primary.light` background (very light indigo).

```tsx
<List>
  <ListItemButton selected={path === '/dashboard'} onClick={() => go('/dashboard')}>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItemButton>
</List>
```

The `MuiListItemButton` override in the theme already handles the `selected` style (background `primary.light`, text `primary.main`).

### SmartDesk theme — dark sidebar

Background `background.sidebar` (`#0F1114`), white text, gray icons. Local override because standard MD3/MUI doesn't provide sidebar with opposite contrast:

```tsx
<Box sx={{
  bgcolor: (theme) => theme.palette.background.sidebar || theme.palette.primary.main,
  color: 'common.white',
  width: 240,
  height: '100vh',
  p: 2,
}}>
  <List>
    <ListItemButton
      selected={path === '/dashboard'}
      sx={{
        color: 'rgba(255,255,255,0.72)',
        '&.Mui-selected': {
          bgcolor: 'rgba(255,255,255,0.08)',
          color: 'common.white',
        },
        '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' },
      }}
    >
      <ListItemIcon sx={{ color: 'inherit' }}><DashboardIcon /></ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </List>
</Box>
```

## Chat inbox / conversation list

List of conversations with avatar + name + preview + timestamp + unread badge.

```tsx
<List>
  {conversations.map((c) => (
    <ListItemButton key={c.id} selected={c.id === activeId}>
      <ListItemAvatar>
        <Avatar>{c.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={c.name}
        secondary={c.lastMessage}
        primaryTypographyProps={{ fontWeight: c.unread ? 600 : 400 }}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <Stack alignItems="flex-end" spacing={0.5}>
        <Typography variant="caption" color="text.secondary">{c.time}</Typography>
        {c.unread > 0 && <Chip size="small" label={c.unread} color="primary" />}
      </Stack>
    </ListItemButton>
  ))}
</List>
```

## Table with status chips

Common tabular list in CRMs — client / MRR / status.

```tsx
<TableContainer component={Paper}>
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Client</TableCell>
        <TableCell align="right">MRR</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="right" />
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((r) => (
        <TableRow key={r.id} hover>
          <TableCell>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>{r.name[0]}</Avatar>
              <Typography variant="body2">{r.name}</Typography>
            </Stack>
          </TableCell>
          <TableCell align="right">{r.mrr}</TableCell>
          <TableCell>
            <Chip label={r.status} size="small"
                  color={statusColor(r.status)} variant="outlined" />
          </TableCell>
          <TableCell align="right">
            <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

`statusColor` helper:
```ts
const statusColor = (s: string) =>
  s === 'Active'    ? 'success'
  : s === 'At risk' ? 'error'
  : s === 'Follow-up' ? 'warning'
  : 'default';
```

For tables with sort, filter, pagination, use `@mui/x-data-grid` (separate package).

## Form vertical

Linear form with labels above, buttons at the end.

```tsx
<Card>
  <CardContent>
    <Typography variant="h5" gutterBottom>New client</Typography>
    <Divider sx={{ mb: 3 }} />
    <Stack spacing={2}>
      <TextField label="Name" fullWidth required />
      <TextField label="Email" type="email" fullWidth required />
      <TextField label="Plan" select fullWidth defaultValue="free">
        <MenuItem value="free">Free</MenuItem>
        <MenuItem value="pro">Pro</MenuItem>
        <MenuItem value="enterprise">Enterprise</MenuItem>
      </TextField>
      <TextField label="Notes" multiline rows={3} fullWidth />
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="text">Cancel</Button>
        <Button variant="contained">Save</Button>
      </Stack>
    </Stack>
  </CardContent>
</Card>
```

## Page header (title + actions)

```tsx
<Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mb: 3 }}>
  <Box>
    <Typography variant="h3" gutterBottom>Customers</Typography>
    <Typography variant="body2" color="text.secondary">
      {total} customers · Last updated {updated}
    </Typography>
  </Box>
  <Stack direction="row" spacing={1}>
    <Button variant="outlined" startIcon={<FileDownloadIcon />}>Export</Button>
    <Button variant="contained" startIcon={<AddIcon />}>New customer</Button>
  </Stack>
</Stack>
```

## Empty state

```tsx
<Card>
  <CardContent sx={{ textAlign: 'center', py: 8 }}>
    <InboxIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
    <Typography variant="h6" gutterBottom>No clients yet</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Add your first client to get started.
    </Typography>
    <Button variant="contained" startIcon={<AddIcon />}>New client</Button>
  </CardContent>
</Card>
```

## When to use which Button variant

Observed in designs and documented here to avoid the anti-pattern of "every button is `contained primary`":

- **`contained primary`** — one primary action per screen (submit, new item, confirm). Usually on the right or at the end of form.
- **`outlined`** — important secondary actions that coexist with the primary. Example: "Export" next to "New customer".
- **`text`** — tertiary actions, inline, cancellations, menu links. Example: "Cancel" in a modal, "View more" in a list.
- **`contained color="error"`** — destructive action (delete, cancel account). Use sparingly and with confirmation.

If you have three `contained primary` actions side by side, stop and reclassify: only one should be contained.

## Spacing mental model

`sx={{ p: 2 }}` = `theme.spacing(2)` = `16px`. Base 8. Conventions:

- Gap between vertical list items: `spacing={1}` (8px) or `spacing={2}` (16px).
- Internal Card padding: `p: 2` to `p: 3` (library already defines).
- Page padding (Container padding): `py: 4` (32px) or `py: 5` (40px).
- Separation between larger sections: `spacing={3}` (24px) or `spacing={4}` (32px).

Never write `padding: '16px'`. Always `p: 2`.

## Confirmation dialog

```tsx
<Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
  <DialogTitle>Delete customer?</DialogTitle>
  <DialogContent>
    <DialogContentText>
      This action cannot be undone. All data associated with this customer will be permanently removed.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button variant="text" onClick={handleClose}>Cancel</Button>
    <Button variant="contained" color="error" onClick={handleConfirm}>Delete</Button>
  </DialogActions>
</Dialog>
```

Notes:
- `maxWidth="xs" fullWidth` keeps the modal compact and centered.
- Destructive action uses `color="error"`, non-destructive uses `variant="text"`.
- `DialogContentText` provides semantic meaning and lighter color by default.

## Loading skeleton

```tsx
<Card>
  <CardContent>
    <Skeleton variant="text" width="40%" height={32} />
    <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
  </CardContent>
</Card>
```

Notes:
- Match the Skeleton shape to the content it replaces (text → text variant, chart → rectangular).
- Always add `borderRadius` to rectangular skeletons to match Card content.
- Use `width` percentages so skeletons adapt to container size.

## Inline feedback (Alert + Snackbar)

```tsx
{/* Persistent alert — use for important messages that should stay visible */}
<Alert severity="warning" sx={{ mb: 2 }}>
  3 customers have overdue invoices. <Button size="small">View all</Button>
</Alert>

{/* Transient toast — use for action confirmations ("saved", "deleted") */}
<Snackbar
  open={showToast}
  autoHideDuration={4000}
  onClose={closeToast}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert severity="success" onClose={closeToast}>
    Customer saved successfully.
  </Alert>
</Snackbar>
```

Notes:
- `Alert` for persistent messages the user needs to act on.
- `Snackbar` wrapping `Alert` for transient confirmations (4s auto-hide).
- `anchorOrigin` bottom-center avoids overlapping with FABs.
