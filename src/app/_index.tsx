//Main Screen
// Put all your application code in /src, only screens and layout files should be in /src/app.


import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dashboard } from "../components/ui/FunctionStyle.js";
import globalSheet from "../components/ui/GlobalStyleSheet.js";
import { Module_Button } from "../components/ui/Input.js";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;


//Layout for Home
export default function Index() {
  return (
    <SafeAreaView style={globalSheet.SafeArea}>
      <ScrollView
        contentContainerStyle={[styles.HomeBackground, { flexGrow: 1 }]}
      >
        <View style={globalSheet.HeadingContainer} />
        <Text style={globalSheet.Heading}> LEARNINGS </Text>
        <View style={styles.LearningContainer}>
          <Text style={styles.LearningText1}> CURRENT BOOK </Text>
          <View style={styles.LearningContent}>
            <Text> PLACEHOLDER </Text>
          </View>
          <Module_Button style={styles.HomeModule}>
            <Text style={styles.HomeBText}> VIEW BOOKS </Text>
          </Module_Button>
        </View>
        <View style={styles.LearningContainer}>
          <Text style={styles.LearningText1}> CURRENT LESSON </Text>
          <View style={styles.LearningContent}>
            <Text> PLACEHOLDER </Text>
          </View>
          <Module_Button style={styles.HomeModule}>
            <Text style={styles.HomeBText}> CONTINUE LESSONS </Text>
          </Module_Button>
        </View>
        <Text style={globalSheet.Heading}> REMINDERS </Text>
        <ScrollView contentContainerStyle={styles.ReminderContainer}>
          <Text>No Reminders Currently!</Text>
        </ScrollView>


        <View style={{ flex: 1 }} />


        <Dashboard />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  HomeBackground: {
    alignItems: "center",
    paddingBottom: 10,
  },


  LearningContainer: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.95,
    backgroundColor: "rgba(166, 101, 223, 0.08)",
    borderRadius: 13,
    marginBottom: "5%",
  },


  ReminderContainer: {
    minHeight: screenHeight * 0.1,
    width: screenWidth * 0.95,
    backgroundColor: "rgba(166, 101, 223, 0.08)",
    borderRadius: 13,
    marginBottom: "5%",
  },


  LearningContent: {
    alignSelf: "center",
    height: screenHeight * 0.05,
    width: screenWidth * 0.9,
    backgroundColor: "rgb(251, 247, 255)",
    marginBottom: "5%",
    borderRadius: 13,
  },


  LearningText1: {
    alignSelf: "center",
    color: "rgb(164, 113, 208)",
    fontSize: 25,
  },


  HomeModule: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.9,
    borderRadius: 68,
    backgroundColor: "rgb(164, 113, 208)",
    alignSelf: "center",
    justifyContent: "center",
  },


  HomeBText: {
    alignSelf: "center",
    color: "rgb(251, 247, 255)",
    fontSize: 25,
  },
});





