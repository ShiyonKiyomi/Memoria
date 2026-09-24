import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, spacing, fontSizes, fontWeights } from "../theme";

//value and onChangeText handles the input
//label is the optional text above the text field
//placeholder shows the text when the text field is empty
//secureTextEntry is the one that shows the *** in sensitive text fields
export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
}) {
     return (
        <View style={styles.field}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                textAlignVertical="center"
            />
        </View>
  );
}

const styles = StyleSheet.create({
    field: { 
        gap: spacing.xs, 
        alignSelf: "stretch" 
    },
    label: {
        fontSize: fontSizes.caption,
        fontWeight: fontWeights.semibold,
        color: colors.textMuted,
    },
    input: {
        height: 52,
        paddingHorizontal: spacing.md,
        borderRadius: 14,
        backgroundColor: colors.white,
        color: colors.textDark,
        fontSize: fontSizes.bodyText,
    },
});