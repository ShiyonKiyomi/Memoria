import { View } from "react-native";


import globalSheet from "../components/GlobalStyleSheet.js";
import { HomeButton_Dashboard, ProfileButton_Dashboard, RemindersButton_Dashboard, ScheduleButton_Dashboard } from "./Input.js";


export function Dashboard() {
  return (
    <View style={globalSheet.DashboardContainer}>
      <View style={globalSheet.Dashboard}>
        <HomeButton_Dashboard
          style={[globalSheet.DashboardIcon, { left: "10%", top: "5%" }]}
        />


        <ScheduleButton_Dashboard
          style={[globalSheet.DashboardIcon, { left: "17%", top: "5%" }]}
        />


        <RemindersButton_Dashboard style = {[globalSheet.DashboardIcon, { left: "30%", top: "5%" }]}
        />


        <ProfileButton_Dashboard style = {[globalSheet.DashboardIcon, { left: "40%", top: "5%" }]}
        />
      </View>
      <View style={globalSheet.NoteButton}></View>
    </View>
  );
}









