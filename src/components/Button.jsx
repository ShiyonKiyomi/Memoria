import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, fontSizes, fontWeights } from "../theme";

{/*style={({ pressed }) Handles the pressed state (For looks)*/}
{/*Implementing a button has to dictate what the button will do once pressed */}
{/*Buttons have 2 state, Primary which is the normal and Disabled which disable press */}
export default function Button({title, onPress, disabled = false}) {
    return(
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                disabled && styles.disabled,
                pressed && !disabled && styles.pressed,
            ]}
        >
            <Text style = {styles.title}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        flex: 1,
        overflow: "hidden",
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xl,
    },
    disabled: {
        opacity: 0.5
    },
    pressed: {
        opacity: 0.8
    },
    title: {
        color: colors.white,
        fontSize: fontSizes.bodyText,
        fontWeight: fontWeights.bold,
        textAlign: "center",
    },
});