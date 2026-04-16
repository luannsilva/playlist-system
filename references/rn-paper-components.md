# React Native Paper — quick guide

Guide for the most commonly used components in mobile prototypes with the playlist/smartdesk themes. Stack: Expo + React Native Paper (MD3).

## Central principle

RN Paper is the mobile equivalent of MUI. All components respect the theme automatically (MD3 color roles: `primary`, `onPrimary`, `surface`, `onSurface`, etc.). **Never** use `<View>` + `TouchableOpacity` with hardcoded styles simulating a button — use Paper's `<Button>`.

## Accessing the theme

```tsx
import { useTheme } from 'react-native-paper';
import type { ExtendedPaperTheme } from 'playlist-system/adapters/native/createPaperTheme';

function MyComponent() {
  const theme = useTheme<ExtendedPaperTheme>();
  // theme.colors.primary, theme.colors.surface, theme.roundness
  // theme.extended.spacing(2), theme.extended.palette.success.main
  // theme.extended.typography.scale.h4
}
```

The `extended` field was added by the adapter because standard MD3 doesn't expose `success`/`warning`, nor sidebar/typography-specific tokens.

## Layout

- **`View`** — from `react-native`; use for containers. Not exclusive to Paper.
- **`ScrollView`** — for screens that exceed height.
- **`SafeAreaView`** (from `react-native-safe-area-context`) — avoids notch/status bar.
- **Flex** — use `flexDirection`, `gap`, `padding` via `style` prop with values from `theme.extended.spacing()`.

## Typography

```tsx
<Text variant="headlineMedium">Title</Text>
<Text variant="bodyMedium">Body</Text>
<Text variant="labelSmall">Metadata</Text>
```

MD3 variants: `displayLarge`, `displayMedium`, `displaySmall`, `headlineLarge`, `headlineMedium`, `headlineSmall`, `titleLarge`, `titleMedium`, `titleSmall`, `bodyLarge`, `bodyMedium`, `bodySmall`, `labelLarge`, `labelMedium`, `labelSmall`.

Never use bare `<Text>` from `react-native` — use Paper's `<Text>` (inherits theme).

## Buttons

```tsx
<Button mode="contained" onPress={...}>Primary</Button>
<Button mode="outlined">Secondary</Button>
<Button mode="text">Tertiary</Button>
<Button mode="contained" buttonColor={theme.colors.error}>Danger</Button>
<Button mode="contained" icon="plus">New</Button>
```

`icon` accepts names from `react-native-vector-icons/MaterialCommunityIcons` by default. See "Icons" section below.

### IconButton / FAB

```tsx
<IconButton icon="pencil" size={20} onPress={...} />
<FAB icon="plus" onPress={...} style={{ position: 'absolute', right: 16, bottom: 16 }} />
```

## Inputs

```tsx
<TextInput label="Name" mode="outlined" value={v} onChangeText={setV} />
<TextInput label="Email" keyboardType="email-address" autoCapitalize="none" />
<TextInput label="Description" multiline numberOfLines={4} />
```

Use `mode="outlined"` consistent with the web theme.

## Cards

```tsx
<Card mode="outlined">
  <Card.Title title="Client" subtitle="Acme Corp" />
  <Card.Content>
    <Text>Content</Text>
  </Card.Content>
  <Card.Actions>
    <Button>View more</Button>
  </Card.Actions>
</Card>
```

`mode="outlined"` applies subtle border consistent with the theme.

## Chips

```tsx
<Chip>Active</Chip>
<Chip mode="outlined">Follow-up</Chip>
<Chip icon="alert" mode="outlined">At risk</Chip>
```

## AppBar

```tsx
<Appbar.Header>
  <Appbar.BackAction onPress={back} />
  <Appbar.Content title="Dashboard" subtitle="Last 30 days" />
  <Appbar.Action icon="magnify" onPress={search} />
</Appbar.Header>
```

## Lists

```tsx
<List.Item
  title="João Silva"
  description="joao@example.com"
  left={(props) => <Avatar.Text {...props} label="J" size={40} />}
  right={(props) => <List.Icon {...props} icon="chevron-right" />}
  onPress={...}
/>
```

For long lists use `FlatList` from `react-native` and pass `List.Item` as `renderItem`.

## Avatars

```tsx
<Avatar.Text size={40} label="JS" />
<Avatar.Icon size={40} icon="account" />
<Avatar.Image size={40} source={{ uri: '...' }} />
```

## Feedback

- **`Snackbar`** — toast
- **`Dialog`** / **`Portal`** — modal
- **`ActivityIndicator`** — spinner
- **`ProgressBar`** — bar
- **`Banner`** — sticky alert

## Modals

```tsx
<Portal>
  <Dialog visible={visible} onDismiss={hide}>
    <Dialog.Title>Confirm</Dialog.Title>
    <Dialog.Content>
      <Text>Are you sure?</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={hide}>Cancel</Button>
      <Button mode="contained" onPress={confirm}>Confirm</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>
```

## Navigation

RN Paper **does not** include navigation. Use `@react-navigation/native` + `@react-navigation/native-stack` + `@react-navigation/bottom-tabs`. Integrate with the Paper theme by passing `theme` in `NavigationContainer`.

## Style pattern

Use `theme.extended.spacing(n)` and `theme.colors.*` in `style`:

```tsx
// ✅ good
<View style={{ padding: theme.extended.spacing(2), backgroundColor: theme.colors.surface }} />

// ❌ bad
<View style={{ padding: 16, backgroundColor: '#FFFFFF' }} />
```

## Icons

RN Paper uses **Material Community Icons** (`react-native-vector-icons/MaterialCommunityIcons`) by default — it's the mobile equivalent of MUI's Material Icons on web. **Don't** mix with competing icon libs (Lucide, Feather, Ionicons) or emoji.

The `icon` props of Paper components (`Button`, `IconButton`, `FAB`, `Appbar.Action`, `List.Icon`, `Chip`, `Avatar.Icon`, `TextInput.Icon`) accept **the icon name as a string**:

```tsx
<Button icon="plus" mode="contained">New</Button>
<IconButton icon="pencil" onPress={edit} />
<FAB icon="message-plus" onPress={newChat} />
<Chip icon="alert-circle" mode="outlined">At risk</Chip>
```

Searchable catalog: https://pictogrammers.com/library/mdi/ — use the exact name in kebab-case.

### Using icons outside a Paper component

Import directly from the vector icons package:

```tsx
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Icon name="trash-can-outline" size={20} color={theme.colors.error} />
```

On Expo, `react-native-vector-icons` already comes via `@expo/vector-icons` — you can also use:

```tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
<MaterialCommunityIcons name="trash-can-outline" size={20} color={theme.colors.error} />
```

Either path works; choose one and keep it consistent throughout the project.

### Skill rules

- **Material Community Icons only.** No Lucide, Feather, Heroicons, emoji.
- Color via `theme.colors.*` — never literal hex.
- Default size: `size={20}` for inline icons, `size={24}` for standalone.
- When using the `icon` prop (string), **don't** wrap it in a component.

## Fonts

- **playlist**: DM Sans via `@expo-google-fonts/dm-sans`, load with `useFonts`.
- **smartdesk**: Averta (self-host in `/assets/fonts`) via `expo-font` + `Font.loadAsync`, or fallback Albert Sans via `@expo-google-fonts/albert-sans`.

Example playlist:

```tsx
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

const [fontsLoaded] = useFonts({ DMSans_400Regular, DMSans_500Medium, DMSans_700Bold });
if (!fontsLoaded) return <ActivityIndicator />;
```

## Limitations vs MUI

- No 12-col Grid — use manual flex or `react-native-grid-component`.
- No complex DataGrid — use `FlatList` + `List.Item` or custom tables.
- Typography variant names differ (MD3 vs Material web).
