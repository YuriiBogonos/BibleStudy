import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import CustomHistoryScreen from "@/templates/CustomHistoryScreen";
import { RootState } from "@/store/store";
import { getQuestionsHistory } from "@/services/questionsHistoryService";
import { setQuestions } from "@/store/slices/historySlice";

const QuestionHistoryScreen = () => {
  const question = useSelector((state: RootState) => state.history.questions);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const loadQuestions = useCallback(async () => {
    console.log("Loading questions...");

    try {
      const firestoreSession = await getQuestionsHistory(user!.uid);

      const convertedQuestions = firestoreSession.map((question) => ({
        id: question.id,
        title: question.question,
        version: question.preferredBible,
        verses: question.verses.length,
        date: new Date(question.createdAt).toLocaleDateString(),
        status: question.complexity,
      }));

      dispatch(setQuestions(convertedQuestions));
    } catch (error) {
      console.error("Error in getQuestionsHistory:", error);
    }
  }, [user?.uid, getQuestionsHistory, dispatch]);

  return (
    <View style={styles.container}>
      <CustomHistoryScreen
        data={question!}
        screenTitle="Question history"
        loadSessions={loadQuestions}
      />
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
