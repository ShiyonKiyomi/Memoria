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
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing, fontSizes, fontWeights } from "../../src/theme";
import { Ionicons } from "@expo/vector-icons";

//replace Icons when new ones are imported in the files
const ICONS = {
  dashboard: ["home-outline", "home"],
  "calendar/index": ["calendar-outline", "calendar"],
  "notes/index": ["document-text-outline", "document-text"],
  "profile/index": ["person-outline", "person"],
};

function tabIcon(routeKey) {
  return function TabIcon({ focused, color }) {
    const [outline, filled] = ICONS[routeKey];
    return <Ionicons name={focused ? filled : outline} size={18} color={color} />;
  };
}

function tabLabel(text) {
  return function TabLabel({ focused, color }) {
    return (
      <Text style={[labelStyles.label, { color }, focused && labelStyles.labelActive]}>
        {text}
      </Text>
    );
  };
}

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();

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
        tabBarStyle: {
          position: "absolute",
          left: spacing.md,
          right: spacing.md,
          bottom: insets.bottom + spacing.sm,
          height: 56,
          borderRadius: radius.xl,
          backgroundColor: colors.primaryTint10,
          borderTopWidth: 0,
          elevation: 0,
          paddingHorizontal: spacing.sm,
        },
      }}
    >
      <Tabs.Screen name="dashboard" options={{ tabBarIcon: tabIcon("dashboard"), tabBarLabel: tabLabel("dashboard") }} />
      <Tabs.Screen name="calendar/index" options={{ tabBarIcon: tabIcon("calendar/index"), tabBarLabel: tabLabel("schedule") }} />
      <Tabs.Screen name="notes/index" options={{ tabBarIcon: tabIcon("notes/index"), tabBarLabel: tabLabel("notes") }} />
      <Tabs.Screen name="profile/index" options={{ tabBarIcon: tabIcon("profile/index"), tabBarLabel: tabLabel("profile") }} />

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

const labelStyles = {
  label: {
    fontSize: fontSizes.tabLabel,
    fontFamily: "Inter-Medium",
    fontWeight: fontWeights.medium,
    textAlign: "center",
  },
  labelActive: {
    fontFamily: "Inter-Bold",
    fontWeight: fontWeights.bold,
  },
};
