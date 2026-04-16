/**
 * App.demo.tsx — showcase of main components in the active theme.
 *
 * Serves as a live reference for silent mode: when adding new
 * components, Claude can inspect this file and follow the same
 * patterns (Button variants, Card layout, status chips, etc.).
 *
 * Can be replaced by the real prototype screen, but keep at least
 * one example of each key primitive (Button, Card, TextField,
 * Chip, Typography, layout with Stack/Grid).
 */

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

export function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Playlist System — Demo
          </Typography>
          <IconButton size="small">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>L</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h3" gutterBottom>Dashboard</Typography>
            <Typography variant="body2" color="text.secondary">
              Last 30 days
            </Typography>
          </Box>

          {/* KPI row */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            {[
              { label: 'Active customers', value: '1,284', trend: '+12%' },
              { label: 'MRR', value: '$48.2K', trend: '+8%' },
              { label: 'Churn risk', value: '23', trend: '-4%' },
            ].map((kpi) => (
              <Card key={kpi.label} sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    {kpi.label}
                  </Typography>
                  <Typography variant="h4" sx={{ my: 0.5 }}>
                    {kpi.value}
                  </Typography>
                  <Chip
                    label={kpi.trend}
                    size="small"
                    color={kpi.trend.startsWith('+') ? 'success' : 'error'}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Forms & actions */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Actions</Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="primary">Primary</Button>
                  <Button variant="outlined">Secondary</Button>
                  <Button variant="text">Tertiary</Button>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip label="Active" color="primary" />
                  <Chip label="Follow-up" color="warning" variant="outlined" />
                  <Chip label="At risk" color="error" variant="outlined" />
                  <Chip label="AI Escalated" color="primary" variant="outlined" />
                </Stack>
                <TextField label="Search customers" fullWidth />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
