// app/_layout.jsx
// Root layout: loads fonts, holds the splash screen until ready, wraps the
// whole app in SafeAreaProvider + AuthProvider, and defines the root Stack.

// app/_layout.jsx
// Root layout: loads fonts, holds the splash screen until ready, waits for
// auth state to resolve, and defines the root Stack. Each screen renders
// its own header band, so the native Stack header is disabled everywhere.

import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

function RootLayoutNav() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}