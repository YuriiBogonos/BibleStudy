import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import CustomHistoryScreen from "@/templates/CustomHistoryScreen";
import { RootState } from "@/store/store";

const QuestionHistoryScreen = () => {
  const question = useSelector((state: RootState) => state.history.questions);

  return (
    <View style={styles.container}>
      <CustomHistoryScreen data={question!} screenTitle="Question history" />
    </View>
  );
};

export default QuestionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
