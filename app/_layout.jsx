// app/_layout.jsx
// Root layout: loads fonts, holds the splash screen until ready, wraps the
// whole app in SafeAreaProvider + AuthProvider, and defines the root Stack.

import { useEffect, useCallback } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { AuthProvider } from "../src/context/AuthContext";

// Keep the splash screen visible while fonts load, so the first render
// doesn't flash in the system font.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // splash screen is still showing
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          {/* headerShown: false everywhere — Header.jsx (Role 3, Section 4)
              is the only header that should ever render on screen. */}
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
