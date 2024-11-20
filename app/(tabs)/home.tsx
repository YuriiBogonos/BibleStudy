import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

import { Typography } from "@/types/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";
import VerseOfWeek from "@/components/ui/VerseOfWeek";
import CustomButton from "@/components/ui/CustomButton";
import HistoryList from "@/components/ui/HistoryList/HistoryList";
import { Session } from "@/components/ui/HistoryList/types";

import { useGetUserSessions } from "@/services/SessionHistoryService";
import { getUsernameFromEmail } from "@/services/formatMailName";

import PlusIconButton from "@/assets/images/PlusIconButton";
import { RootState } from "@/store/store";

export default function MainScreen() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const getUserSessions = useGetUserSessions();
  const [sessions, setSessions] = useState<Session[]>([]);
  console.log("sessions ===>", sessions);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSessions = async () => {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const firestoreSessions = await getUserSessions(user.uid);
        console.log("firestoreSessions ===>", firestoreSessions);
        const convertedSessions = firestoreSessions.map((firestoreSession) => ({
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
        }));

        setSessions(convertedSessions);
      } catch (error) {
        console.error("Error loading sessions:", error);
        setError("Failed to load sessions. Please try again later.");
        Alert.alert(
          "Error",
          "Failed to load sessions. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, [user?.uid, getUserSessions]);

  const handleNewSession = () => {
    if (!user?.uid) {
      Alert.alert("Error", "You need to be logged in to create a new session.");
      return;
    }
    router.replace("/(tabs)/multipleSession");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={Typography.homeTitle}>
          {`God Bless You, ${
            user?.displayName
              ? user?.displayName
              : user?.email
              ? getUsernameFromEmail(user?.email)
              : "Guest"
          }!`}
        </Text>
        <VerseOfWeek />
        <CustomButton
          onPress={handleNewSession}
          Icon={PlusIconButton}
          text="Start new session"
        />
        <View style={styles.sessionHistory}>
          <HistoryList items={sessions} isLoading={isLoading} error={error} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  sessionHistory: {
    paddingVertical: 24,
  },
});
