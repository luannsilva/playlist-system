// This project follows playlist-system. Theme: __REPLACE_WITH_THEME__
// Don't create <View style={{...hardcoded...}}> acting as button or card.
// Always import from react-native-paper and use theme tokens.

import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Appbar, Card, Text, Button, Chip, TextInput, ActivityIndicator } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { theme } from './theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Appbar.Header>
          <Appbar.Content title="Playlist System — Demo" />
          <Appbar.Action icon="account-circle" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          contentContainerStyle={{ padding: 16, gap: 16 }}
        >
          <Text variant="headlineMedium">Dashboard</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Last 30 days
          </Text>

          {/* KPI cards */}
          <View style={{ gap: 12 }}>
            {[
              { label: 'Active customers', value: '1,284', trend: '+12%' },
              { label: 'MRR', value: '$48.2K', trend: '+8%' },
              { label: 'Churn risk', value: '23', trend: '-4%' },
            ].map((kpi) => (
              <Card key={kpi.label} mode="outlined">
                <Card.Content>
                  <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    {kpi.label}
                  </Text>
                  <Text variant="headlineSmall" style={{ marginVertical: 4 }}>
                    {kpi.value}
                  </Text>
                  <Chip compact mode="outlined">{kpi.trend}</Chip>
                </Card.Content>
              </Card>
            ))}
          </View>

          {/* Actions */}
          <Card mode="outlined">
            <Card.Content style={{ gap: 12 }}>
              <Text variant="titleMedium">Actions</Text>
              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                <Button mode="contained">Primary</Button>
                <Button mode="outlined">Secondary</Button>
                <Button mode="text">Tertiary</Button>
              </View>
              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                <Chip>Active</Chip>
                <Chip mode="outlined">Follow-up</Chip>
                <Chip mode="outlined">At risk</Chip>
              </View>
              <TextInput label="Search customers" mode="outlined" />
            </Card.Content>
          </Card>
        </ScrollView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
