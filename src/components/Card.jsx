import { Pressable, StyleSheet, View } from "react-native";
import { colors, spacing } from "../theme";

{/*Everything nested inside <card> </card> is passed as the children prop*/}
{/*Passing nothing in accentColor renders nothing*/}
{/*Accent card is the one with the line strip */}
export default function Card({ children, onPress, accentColor, style }) {
    const content = (
        <View style = {styles.row}>
            {accentColor ? <View style ={[
                styles.accent, {backgroundColor: accentColor 
            }]} /> : null}
            <View style={styles.body}>{children}</View>
        </View>
    );

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                style={({ pressed}) => [styles.card, pressed && styles.pressed, style]}
            >
                {content}
            </Pressable>
        );
    }
    return <View style={[styles.card, style]}>{content}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primaryTint8,
        borderRadius: 16,
        padding: spacing.md,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14
    },
    accent: {
        width: 4,
        height: 44,
        borderRadius: 4,
    },
    body: {
        flex: 1,
        gap: 4
    },
    pressed: {
        opacity: 0.85
    },
});