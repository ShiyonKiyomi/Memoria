// app/login-role.jsx
// STUB — caregiver / family path
// Replace this with: import LoginRoleSelect from "../src/screens/.../LoginRoleSelect";
//                     export default LoginRoleSelect;

import { View, Text, StyleSheet } from "react-native";

export default function LoginRoleSelectStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoginRoleSelect</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
