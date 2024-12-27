import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SettingsProvider } from '../context/settings-context';
import { useThemeColor } from '../hooks/useThemeColor';

export default function RootLayout() {
  const backgroundColor = useThemeColor('backdrop');
  const color = useThemeColor('text');

  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerStyle: { backgroundColor },
            headerTintColor: color,
            headerTitleStyle: { color },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </SettingsProvider>
  );
}
