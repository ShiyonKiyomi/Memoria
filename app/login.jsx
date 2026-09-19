// app/login.jsx
// STUB — email + password sign-in
// Replace this with: import LoginForm from "../src/screens/.../LoginForm";
//                     export default LoginForm;

import { View, Text, StyleSheet } from "react-native";

export default function LoginFormStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoginForm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
