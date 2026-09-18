//Global StyleSheet
import { Dimensions, StyleSheet } from "react-native";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;


const globalSheet = StyleSheet.create({
  SafeArea: {
    flex: 1,
    position: "relative",
  },


  HeadingContainer: {
    height: screenHeight * 0.08,
    width: screenWidth,
    backgroundColor: "rgba(166, 101, 223, 0.20)",
  },


  Heading: {
    fontSize: 30,
    color: "rgb(164, 113, 208)",
  },


  DashboardContainer: {
    alignSelf: "center",
    height: screenHeight * 0.1,
    width: screenWidth * 0.95,
  },


  Dashboard: {
    height: "100%",
    width: "75%",
    backgroundColor: "rgba(166, 101, 223, 0.20)",
    borderRadius: 38,
    flex: 1,
    flexDirection: "row",
  },


  NoteButton: {
    height: "90%",
    width: "20%",
    backgroundColor: "rgba(166, 101, 223, 0.20)",
    position: "absolute",
    left: "80%",
    borderRadius: 68,
  },


  DashboardIcon: {
    height: "60%",
    width: "13%",
  },


  DashboardText: {
    height: "40%",
    width: 100,
    position: "relative",
    fontSize: 12,
  },
});


export default globalSheet;