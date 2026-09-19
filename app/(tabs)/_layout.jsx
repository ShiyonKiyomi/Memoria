// app/(tabs)/_layout.jsx
// Bottom tab bar group. Styling (tabBarStyle, active tint color) belongs to
// Role 3 in Section 4 once the theme colors are wired in.
//
// "profile" is now a folder (app/(tabs)/profile/index.jsx +
// app/(tabs)/profile/manage.jsx) instead of a flat file, so it must be
// referenced as "profile/index" here, with "profile/manage" declared and
// hidden via href: null — the same pattern already used for calendar/new
// and notes/new. Any nested file inside a tab-group folder becomes its own
// tab button unless explicitly hidden this way.

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
      <Tabs.Screen name="dashboard" options={{ title: "Home" }} />
      <Tabs.Screen name="calendar/index" options={{ title: "Calendar" }} />
      <Tabs.Screen name="reminders" options={{ title: "Reminders" }} />
      <Tabs.Screen name="profile/index" options={{ title: "Profile" }} />
      <Tabs.Screen name="notes/index" options={{ title: "Notes" }} />
      {/* Setting href to null completely removes the tab button. */}
      <Tabs.Screen name="calendar/new" options={{ href: null }} />
      <Tabs.Screen name="notes/new" options={{ href: null }} />
      <Tabs.Screen name="notes/[noteId]" options={{ href: null }} />
    </Tabs>
  );
}
