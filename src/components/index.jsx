import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

export function Button({ title, onPress, disabled = false, variant = "primary" }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" ? styles.secondaryButton : styles.primaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text style={[styles.label, variant === "secondary" && styles.secondaryLabel]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 10,
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  primaryButton: { backgroundColor: colors.primary },
  secondaryButton: { backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1 },
  disabledButton: { opacity: 0.5 },
  pressedButton: { opacity: 0.82 },
  label: { color: colors.white, fontSize: 15, fontWeight: "700" },
  secondaryLabel: { color: colors.textDark },
});
