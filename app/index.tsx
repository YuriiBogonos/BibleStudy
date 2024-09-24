import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function IndexScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const user = auth().currentUser;
      console.log("user", user);
      setIsAuthenticated(!!user);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? (
    <Redirect href="/(tabs)/home" /> // Navigate to the main tabs for authenticated users
  ) : (
    <Redirect href="/(auth)/signUp" /> // Navigate to the login screen for unauthenticated users
  );
}
