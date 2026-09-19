// app/register.jsx
// STUB — new account sign-up
// Replace this with: import RegisterForm from "../src/screens/.../RegisterForm";
//                     export default RegisterForm;

import { View, Text, StyleSheet } from "react-native";

export default function RegisterFormStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RegisterForm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
