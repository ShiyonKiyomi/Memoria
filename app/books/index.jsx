//Adjusted File

import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { colors } from "../../src/theme";
import BackButton from "../../src/components/back-button"
import { BookEntry } from "../../src/components/module-component";

export default function BookList() {
  const {height, width,} = useWindowDimensions();
  return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>

        <View style={[styles.header, { width: width, height: height*0.085 }]}>
          <BackButton />
          <Text style={styles.header_text}>Books</Text>
        </View>

        <View style={styles.button_container}>
          <BookEntry path={ '/books/1' } book={'Book 1'} title={'Dementia and Its Stages'}/>
          <BookEntry path={ '/books/2' } book={'Book 2'} title={'Navigating Day-to-Day Interactions and Behavior Changes'}/>
          <BookEntry path={ '/books/3' } book={'Book 3'} title={'Daily Caregiving Skills for the Early Stage'}/>
          <BookEntry path={ '/books/4' } book={'Book 4'} title={'Daily Caregiving Skills for the Middle to Late Stage'}/>
          <BookEntry path={ '/books/5' } book={'Book 5'} title={'Signs of an Incoming Episode or Emergency'}/>
          <BookEntry path={ '/books/6' } book={'Book 6'} title={'Emergency Preparation and Drills'}/>
        </View>

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

  button_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.bgScreen,
  },
});
