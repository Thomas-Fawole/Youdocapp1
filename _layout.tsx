import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { MedicationProvider } from '../contexts/MedicationContext';
import { UserProvider } from '../contexts/UserContext';
import { AuthProvider } from '../contexts/SupabaseAuthContext';

function AppContent() {
  const { colors } = useTheme();
  
  return (
    <NavigationThemeProvider value={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        primary: colors.primary,
      }
    }}>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="symptom-checker" options={{ headerShown: false }} />
        <Stack.Screen name="my-medication" options={{ headerShown: false }} />
        <Stack.Screen name="add-medication" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="connected-devices" options={{ headerShown: false }} />
        <Stack.Screen name="add-device" options={{ headerShown: false }} />
        <Stack.Screen name="health-records" options={{ headerShown: false }} />
        <Stack.Screen name="emergency-contacts" options={{ headerShown: false }} />
        <Stack.Screen name="medical-history" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ headerShown: false }} />
        <Stack.Screen name="health-support" options={{ headerShown: false }} />
        <Stack.Screen name="subscription" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="health-articles" options={{ headerShown: false }} />
        <Stack.Screen name="article-detail" options={{ headerShown: false }} />
        <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
        <Stack.Screen name="terms-of-service" options={{ headerShown: false }} />
        <Stack.Screen name="hipaa-compliance" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar 
        style={colors.statusBarStyle} 
        backgroundColor={colors.headerBackground} 
        translucent={false} 
      />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    'ReadexPro-Medium': require('../assets/fonts/ReadexPro-Medium.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <MedicationProvider>
            <AppContent />
          </MedicationProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
