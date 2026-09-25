//Adjusted File

//Needs to sync with other functions for full completion
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { colors } from "../../src/theme";
import DashboardFunction from "../../src/components/dashboard-component";

export default function DashboardStub() {
  const {height, width,} = useWindowDimensions();

  return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { width: width, height: height*0.085 }]}>
        <Text style={styles.header_text}>Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.bodycontainer, { width: width, minHeight: height*0.915 }]}>
        <Text style={styles.dashboardheading}>Learnings</Text>
        <DashboardFunction path={'/books'} title={'Dementia and Its Stages'} buttontext={'VIEW BOOKS'}/>
        <DashboardFunction path={'/books'} title={'Course 1: What is Dementia?'} buttontext={'CONTINUE LESSONS'}/>

        <Text style={styles.dashboardheading}>Reminders</Text>
      </ScrollView>

    </SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bodycontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.bgScreen,  
  },

  header: {
    backgroundColor: colors.primaryTint15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  header_text: {
    fontSize: 22,
    fontWeight: "600",
    margin: 10,
    color: colors.textDark,
  },

  dashboardheading: {
    fontSize: 26,
    fontWeight: "600",
    marginLeft: 10,
    color: colors.textDark,
  },

  button_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.bgScreen,
  },
});





