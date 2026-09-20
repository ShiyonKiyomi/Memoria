import WelcomeScreen from "../src/screens/auth/WelcomeScreen";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function IndexRoute() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (user) {
		return <Redirect href="/(tabs)/dashboard" />;
	}

	return <WelcomeScreen />;
}