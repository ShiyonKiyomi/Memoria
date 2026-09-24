import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, fontSizes, fontWeights } from "../theme";

// rightIcon and onRightPress is for Notes
// title is used for showing title such as "Dashboard" "Books" and others in the header
// showBackButton is used to show the back button. It's only applied to headers that have a back functionality
export default function Header({ title, showBackButton = false, rightIcon = null, onRightPress }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.side}>
        {showBackButton && (
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="chevron-back" size={25} color={colors.textDark} />
          </Pressable>
        )}
      </View>

      {/* Title text */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* rightIcon is the boolean check */}
      <View style={styles.side}>
        {rightIcon && (
          <Pressable onPress={onRightPress} hitSlop={8}>
            <Ionicons name={rightIcon} size={25} color={colors.textDark} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: colors.primaryTint15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  side: {
    width: 44,
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "left",
    fontSize: fontSizes.screenTitle,
    fontFamily: "Inter-Bold",
    fontWeight: fontWeights.bold,
    color: colors.textDark,
  },
});

