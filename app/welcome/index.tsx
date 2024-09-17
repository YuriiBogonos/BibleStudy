import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Index: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Index;
