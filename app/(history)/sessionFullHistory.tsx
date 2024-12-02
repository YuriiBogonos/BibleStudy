import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import { RootState } from "@/store/store";
import CustomHistoryScreen from "@/templates/CustomHistoryScreen";

const SessionHistoryScreen = () => {
  const sessions = useSelector((state: RootState) => state.history.sessions);

  return (
    <View style={styles.container}>
      <CustomHistoryScreen data={sessions!} screenTitle="Session history" />
    </View>
  );
};

export default SessionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    // height: "100%",
  },
});
