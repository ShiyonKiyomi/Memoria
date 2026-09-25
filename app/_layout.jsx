// app/_layout.jsx
// Root layout: loads fonts, holds the splash screen until ready, wraps the
// whole app in SafeAreaProvider + AuthProvider, and defines the root Stack.

// app/_layout.jsx
// Root layout: loads fonts, holds the splash screen until ready, waits for
// auth state to resolve, and defines the root Stack. Each screen renders
// its own header band, so the native Stack header is disabled everywhere.

import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { colors } from "../../src/theme/colors";
import { StyleSheet } from "react-native";
import { HomeIcon, ScheduleIcon, NotesIcon, ProfileIcon } from "../../src/components/icons";


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
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard", tabBarIcon:({color, size}) => <HomeIcon color={color} size={size} />  }} />
      <Tabs.Screen name="calendar/index" options={{ title: "Schedule",  tabBarIcon:({color, size}) => <ScheduleIcon color={color} size={size} />  }} />
      <Tabs.Screen name="notes/index" options={{ title: "Notes",  tabBarIcon:({color, size}) => <NotesIcon color={color} size={size} />  }} />
      <Tabs.Screen name="profile/index" options={{ title: "Profile",  tabBarIcon:({color, size}) => <ProfileIcon color={color} size={size} />  }} />








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


const styles = StyleSheet.create({


})







