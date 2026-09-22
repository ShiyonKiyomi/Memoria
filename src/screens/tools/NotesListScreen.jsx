// src/screens/tools/NotesListScreen.jsx
// Matches NOTES.svg — newest-first list of the active patient's notes.
// Tapping a card opens NoteDetailScreen; the + button opens NoteEditorScreen.

import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { format } from "date-fns";
import { supabase } from "../../lib/supabaseClient";
import { useActivePatient } from "../../lib/useActivePatient";
import { colors } from "../../theme/colors";

export default function NotesListScreen() {
  const router = useRouter();
  const {
    patientId,
    loading: patientLoading,
    missing: patientMissing,
    error: patientError,
    refresh: refreshPatient,
  } = useActivePatient();

  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [loadError, setLoadError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadNotes = useCallback(
    async ({ silent = false } = {}) => {
      if (!patientId) return;
      if (!silent) setStatus("loading");
      setLoadError("");

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: false });

      if (error) {
        setLoadError(error.message);
        setStatus("error");
        return;
      }

      setNotes(data ?? []);
      setStatus("ready");
    },
    [patientId]
  );

  // Refetch every time this tab is focused — e.g. coming back from
  // NoteEditorScreen after saving, or NoteDetailScreen after a delete.
  useFocusEffect(
    useCallback(() => {
      if (patientId) loadNotes();
    }, [patientId, loadNotes])
  );

  async function onPullRefresh() {
    setRefreshing(true);
    await loadNotes({ silent: true });
    setRefreshing(false);
  }

  if (patientLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (patientMissing) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Notes</Text>
        </View>
        <View style={styles.centeredBody}>
          <Text style={styles.emptyTitle}>Add patient info first</Text>
          <Text style={styles.emptyBody}>
            Notes are attached to a patient record. Fill in Patient &amp; Guardian info before adding notes.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/profile/patient-info")}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Go to Patient Info</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (patientError) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Notes</Text>
        </View>
        <ErrorBlock message={patientError} onRetry={refreshPatient} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/notes/new")}
          style={styles.addButton}
          hitSlop={10}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {status === "loading" ? (
        <View style={styles.centeredBody}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : status === "error" ? (
        <ErrorBlock message={loadError} onRetry={() => loadNotes()} />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={notes.length ? styles.list : styles.listEmpty}
          refreshing={refreshing}
          onRefresh={onPullRefresh}
          ListEmptyComponent={
            <View style={styles.centeredBody}>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptyBody}>Tap + to add your first note.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push(`/notes/${item.id}`)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title?.trim() || "Untitled note"}
              </Text>
              <Text style={styles.cardBody} numberOfLines={2}>
                {item.body}
              </Text>
              <Text style={styles.cardDate}>{formatDate(item.created_at)}</Text>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

function ErrorBlock({ message, onRetry }) {
  return (
    <View style={styles.centeredBody}>
      <Text style={styles.emptyTitle}>Something went wrong</Text>
      <Text style={styles.emptyBody}>{message}</Text>
      <Pressable accessibilityRole="button" onPress={onRetry} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Try again</Text>
      </Pressable>
    </View>
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
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: colors.textDark,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  list: {
    padding: 20,
    gap: 12,
  },
  listEmpty: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.noteHighlight,
    borderRadius: 18,
    padding: 18,
    gap: 6,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: colors.textDark,
  },
  cardBody: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.textBody,
    lineHeight: 18,
  },
  cardDate: {
    fontSize: 11,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    color: colors.textMuted,
    marginTop: 2,
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
