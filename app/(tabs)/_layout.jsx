// app/(tabs)/_layout.jsx
// Bottom tab bar group.
//
// IMPORTANT — Android hardware back button fix:
// Any screen a tab pushes to (Settings, Patient Info edit, etc.) MUST live
// inside that tab's own folder here, not as a top-level sibling of (tabs).
// A screen living outside (tabs) that gets pushed to from inside a tab will,
// on back, re-enter the tabs group at its FIRST tab (Dashboard) instead of
// returning to the tab you actually came from — Expo Router resolves back
// navigation by URL, not by literally remembering which tab was active.
// This is why settings.jsx and the Profile-linked patient-info.jsx now live
// under profile/, hidden from the tab bar via href: null, following the
// same pattern already used for calendar/new and notes/new.
//
// backBehavior="history" is a second safety net: it makes the hardware back
// button, when pressed at a TAB'S OWN ROOT screen (nothing left to pop
// within that tab), return to whichever tab you visited previously rather
// than jumping straight to the first tab.

import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { colors } from "../../src/theme/colors";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false, // Figma header components render inside each screen instead
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Home" }} />
      <Tabs.Screen name="calendar/index" options={{ title: "Schedule" }} />
      <Tabs.Screen name="notes/index" options={{ title: "Notes" }} />
      <Tabs.Screen name="profile/index" options={{ title: "Profile" }} />

      {/* Setting href to null completely removes the tab button while
          keeping the route alive inside that tab's own stack. */}
      <Tabs.Screen name="calendar/new" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="notes/new" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="notes/[noteId]" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="profile/settings" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="profile/patient-info" options={{ href: null, tabBarStyle: { display: "none" } }} />
    </Tabs>
  );
}
