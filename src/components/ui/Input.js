//Input Maker
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import GlobalKey from "../hooks/Navigation.js";
import globalSheet from "./GlobalStyleSheet.js";


export function Module_Button({ style, children }) {
  const { gotoModule } = GlobalKey();


  return (
    <Pressable style={style} onPress={gotoModule}>
      {children}
    </Pressable>
  );
}


export function HomeButton_Dashboard({ style }) {
  const { gotoHome } = GlobalKey();
  const [color, setColor] = useState("rgba(164, 113, 208, 1)");
  const [tColor, tSetColor] = useState("rgba(164, 113, 208, 1)");


  return (
    <Pressable
      style={style}
      onPress={() => {
        setColor(
          color === "rgba(164, 113, 208, 1)"
            ? "rgba(76, 37, 111, 0.83)"
            : "rgba(164, 113, 208, 1)",
        );
        tSetColor(
          tColor === "rgba(164, 113, 208, 1)"
            ? "rgba(76, 37, 111, 0.83)"
            : "rgba(164, 113, 208, 1)",
        );
        gotoHome();
      }}
      hitSlop={14}
    >
      <Image
        source={require("../../assets/images/HomeIcon.png")}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />


      <Text
        style={[
          globalSheet.DashboardText,
          { left: "8%", color: tColor },
        ]}
      >
        Home
      </Text>
    </Pressable>
  );
}


export function ScheduleButton_Dashboard({ style }) {
  const { gotoSchedule } = GlobalKey();
  const [color, setColor] = useState("rgba(76, 37, 111, 0.83)");
  const [tColor, tSetColor] = useState("rgba(76, 37, 111, 0.83)");


  return (
    <Pressable
      style={style}
      onPress={() => {
        setColor(
          color === "rgba(76, 37, 111, 0.83)"
            ? "rgba(164, 113, 208, 1)"
            : "rgba(76, 37, 111, 0.83)",
        );
        tSetColor(
          tColor === "rgba(76, 37, 111, 0.83)"
            ? "rgba(164, 113, 208, 1)"
            : "rgba(76, 37, 111, 0.83)",
        );
        gotoSchedule();
      }}
      hitSlop={14}
    >
      <Image
        source={require("../../assets/images/ScheduleIcon.png")}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />


      <Text
         style={[
          globalSheet.DashboardText,
          { left: "-15%", color: tColor }
        ]}
      >
        Schedule
      </Text>
    </Pressable>
  );
}


export function RemindersButton_Dashboard({ style }) {
  const { gotoReminders } = GlobalKey();
  const [color, setColor] = useState("rgba(76, 37, 111, 0.83)");
  const [tColor, tSetColor] = useState("rgba(76, 37, 111, 0.83)");


  return (
    <Pressable
      style={style}
      onPress={() => {
        setColor(
          color === "rgba(76, 37, 111, 0.83)"
            ? "rgba(164, 113, 208, 1)"
            : "rgba(76, 37, 111, 0.83)",
        );
        tSetColor(
          tColor === "rgba(76, 37, 111, 0.83)"
            ? "rgba(164, 113, 208, 1)"
            : "rgba(76, 37, 111, 0.83)",
        );
        gotoReminders();
      }}
      hitSlop={14}
    >
      <Image
        source={require("../../assets/images/RemindersIcon.png")}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />


      <Text
       style={[
          globalSheet.DashboardText,
          { left: "-33%", color: tColor }
        ]}
      >
        Reminders
      </Text>
    </Pressable>
  );
}


export function ProfileButton_Dashboard({ style }) {
  const { gotoProfile } = GlobalKey();
  const [color, setColor] = useState("rgba(76, 37, 111, 0.83)");
  const [tColor, tSetColor] = useState("rgba(76, 37, 111, 0.83)");


  return (
    <Pressable
      style={style}
      onPress={() => {
        setColor(
          color === "rgba(76, 37, 111, 0.83)"
            ? "rgba(164, 113, 208, 1)"
            : "rgba(76, 37, 111, 0.83)",
        );
        tSetColor(
          tColor === "rgba(76, 37, 111, 0.83)"
            ? "rgba(164, 113, 208, 1)"
            : "rgba(76, 37, 111, 0.83)",
        );
        gotoProfile();
      }}
      hitSlop={14}
    >
      <Image
        source={require("../../assets/images/ProfileIcon.png")}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />


      <Text
       style={[
          globalSheet.DashboardText,
          { left: "0%", color: tColor }
        ]}
      >
        Profile
      </Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  icon: {
    width: "100%",
    height: "100%",
  },
});