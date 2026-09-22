// src/screens/tools/NoteDetailScreen.jsx
// Matches "NOTES (INSIDE).svg" — view a note, edit it inline, or delete it.

import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { format } from "date-fns";
import { supabase } from "../../lib/supabaseClient";
import { colors } from "../../theme/colors";

export default function NoteDetailScreen() {
  const router = useRouter();
  const { noteId } = useLocalSearchParams();

  const [note, setNote] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [loadError, setLoadError] = useState("");

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadNote = useCallback(async () => {
    if (!noteId) return;
    setStatus("loading");
    setLoadError("");

    const { data, error } = await supabase.from("notes").select("*").eq("id", noteId).maybeSingle();

    if (error) {
      setLoadError(error.message);
      setStatus("error");
      return;
    }
    if (!data) {
      setLoadError("This note no longer exists.");
      setStatus("error");
      return;
    }

    setNote(data);
    setTitle(data.title ?? "");
    setBody(data.body ?? "");
    setStatus("ready");
  }, [noteId]);

  useFocusEffect(
    useCallback(() => {
      loadNote();
    }, [loadNote])
  );

  function cancelEdit() {
    setEditing(false);
    setErrorMessage("");
    setTitle(note?.title ?? "");
    setBody(note?.body ?? "");
  }

  async function handleSaveEdit() {
    if (!body.trim()) {
      setErrorMessage("A note can't be empty.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    const { data, error } = await supabase
      .from("notes")
      .update({ title: title.trim(), body: body.trim() })
      .eq("id", noteId)
      .select()
      .single();
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setNote(data);
    setEditing(false);
  }

  function confirmDelete() {
    Alert.alert("Delete this note?", "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: handleDelete },
    ]);
  }

  async function handleDelete() {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);
    if (error) {
      Alert.alert("Couldn't delete note", error.message);
      return;
    }
    router.back();
  }

  if (status === "loading") {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <Text style={styles.title}>Note</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.centeredBody}>
          <Text style={styles.emptyTitle}>Couldn't load this note</Text>
          <Text style={styles.emptyBody}>{loadError}</Text>
          <Pressable accessibilityRole="button" onPress={loadNote} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Try again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {editing ? "Edit Note" : note.title?.trim() || "Note"}
        </Text>
        {editing ? (
          <View style={styles.headerSpacer} />
        ) : (
          <Pressable accessibilityRole="button" onPress={() => setEditing(true)} hitSlop={12}>
            <Text style={styles.editLink}>Edit</Text>
          </Pressable>
        )}
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.formWrap}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          {editing ? (
            <>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Title</Text>
                <View style={styles.input}>
                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Title"
                    placeholderTextColor={colors.placeholder}
                    style={styles.inputText}
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Note</Text>
                <View style={[styles.input, styles.bodyInput]}>
                  <TextInput
                    value={body}
                    onChangeText={setBody}
                    placeholderTextColor={colors.placeholder}
                    style={[styles.inputText, styles.bodyInputText]}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

              <View style={styles.editActions}>
                <Pressable accessibilityRole="button" onPress={cancelEdit} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={handleSaveEdit}
                  disabled={submitting}
                  style={({ pressed }) => [
                    styles.save,
                    styles.saveInline,
                    (pressed || submitting) && styles.savePressed,
                  ]}
                >
                  <Text style={styles.saveText}>{submitting ? "SAVING..." : "SAVE"}</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.dateLabel}>{formatDate(note.created_at)}</Text>
              <Text style={styles.bodyText}>{note.body}</Text>

              <Pressable accessibilityRole="button" onPress={confirmDelete} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete note</Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function formatDate(iso) {
  try {
    return format(new Date(iso), "MMM d, yyyy · h:mm a");
  } catch {
    return "";
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bgScreen,
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgScreen,
  },
  centeredBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 10,
  },
  header: {
    backgroundColor: colors.primaryTint15,
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerSpacer: {
    flex: 1,
  },
  backArrow: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: colors.textDark,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: colors.textDark,
    flexShrink: 1,
  },
  editLink: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: colors.primary,
  },
  formWrap: {
    flex: 1,
  },
  form: {
    padding: 24,
    gap: 16,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  input: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bodyInput: {
    minHeight: 160,
  },
  inputText: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    padding: 0,
  },
  bodyInputText: {
    minHeight: 130,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
  },
  bodyText: {
    fontSize: 15,
    color: colors.textBody,
    fontFamily: "Inter-Regular",
    lineHeight: 22,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 19,
  },
  editActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 40,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelText: {
    color: colors.textDark,
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  save: {
    borderRadius: 40,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  saveInline: {
    flex: 1,
  },
  savePressed: {
    opacity: 0.7,
  },
  saveText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  deleteButton: {
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  deleteText: {
    color: colors.error,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  emptyTitle: {
    fontSize: 17,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: colors.textDark,
    textAlign: "center",
  },
  emptyBody: {
    fontSize: 13,
    color: colors.textBody,
    textAlign: "center",
    lineHeight: 19,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    paddingHorizontal: 24,
    paddingVertical: 13,
    marginTop: 8,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
});
