// app/(tabs)/_layout.jsx
// Bottom tab bar group. Styling (tabBarStyle, active tint color) belongs to
// Role 3 in Section 4 once the theme colors are wired in — this is just the
// route structure: Dashboard, Courses, Tools, Profile.

import { Tabs } from "expo-router";
import { colors } from "../../src/theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Figma header components render inside each screen instead
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="courses/index" options={{ title: "Courses" }} />
      {/* "Tools" isn't a single route in the file tree (it's Calendar/Reminders/
          Notes as separate top-level routes) — swap this tab for whichever
          entry point the Figma tab bar actually points to, e.g. reminders or
          a small tools-menu screen, once that's decided. */}
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
