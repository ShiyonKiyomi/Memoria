//Adjusted File - Perez

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { books } from "./data";
import { useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../src/theme";
import BackButton from "../../../src/components/back-button";
import { ModuleEntry, BookEntry } from "../../../src/components/module-component";

export default function BookPage() {
  const { bookId } = useLocalSearchParams();
  const {height, width,} = useWindowDimensions();

  const book = books.find((book) => book.id === bookId);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { width: width, height: height*0.085 }]}>
          <BackButton />
          <Text style={styles.header_text}>Modules</Text>
        </View>

        <ScrollView  contentContainerStyle={[styles.container, {flexDirection: 'row', justifyContent: 'center', alignContent: 'center'
          , minHeight: height, width: width, flexWrap: 'wrap', backgroundColor: colors.bgScreen,}]}>

        {book.modules.map((module) => (
        <ModuleEntry
          key={module.id}
          module={module.id}
          title={module.title}
        />
      ))}

        <BookEntry />
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
      backgroundColor: colors.primaryTint15,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
  },
 
  header_text: {
      fontSize: 22,
      fontWeight: "600",
      marginLeft: 10,
      color: colors.textBody,
  },

  text: {
    fontSize: 18,
    fontWeight: "600"
  },
});



