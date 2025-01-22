import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, StyleSheet, Text, View } from "react-native";

import { RootState } from "@/store/store";
import CustomHistoryScreen from "@/templates/CustomHistoryScreen";
import { IConvertedSessions, setSessions } from "@/store/slices/historySlice";
import { useGetUserSessions } from "@/services/SessionHistoryService";

const SessionHistoryScreen = () => {
  const sessions = useSelector((state: RootState) => state.history.sessions);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const getUserSessions = useGetUserSessions();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    if (!user?.uid) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const firestoreSessions = await getUserSessions(user.uid);

      const convertedSessions: IConvertedSessions[] = firestoreSessions.map(
        (firestoreSession) => ({
          id: firestoreSession.id,
          title: firestoreSession.sessionName,
          verses: firestoreSession.questions.reduce(
            (acc, q) => acc + q.bible_verse.length,
            0
          ),
          version: firestoreSession.preferredBible,
          topic: firestoreSession.focusTopic,
          status: firestoreSession.complexity,
          date: new Date(firestoreSession.createdAt).toLocaleDateString(),
          questions: firestoreSession.questions.length,
        })
      );

      dispatch(setSessions(convertedSessions));
    } catch (error) {
      console.error("Error loading sessions:", error);
      setError("Failed to load sessions. Please try again later.");
      Alert.alert("Error", "Failed to load sessions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, dispatch, getUserSessions]);

  return (
    <View style={styles.container}>
      <CustomHistoryScreen
        data={sessions!}
        screenTitle="Session history"
        loadSessions={loadSessions}
      />
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
