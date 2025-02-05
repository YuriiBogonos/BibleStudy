import { useState, useCallback } from "react";
import { Alert, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@/types/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";
import VerseOfWeek from "@/components/ui/VerseOfWeek";
import CustomButton from "@/components/ui/CustomButton";
import HistoryList from "@/components/ui/HistoryList/HistoryList";
import { HistoryType } from "@/components/ui/HistoryList/types";
import { useGetUserSessions } from "@/services/SessionHistoryService";
import { getUsernameFromEmail } from "@/services/formatMailName";
import PlusIconButton from "@/assets/images/PlusIconButton";
import { RootState } from "@/store/store";
import { IConvertedSessions, setSessions } from "@/store/slices/historySlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { HistoryNavigationProp } from "@/types/SessionsTypes";

export default function MainScreen() {
  const dispatch = useDispatch();
  const getUserSessions = useGetUserSessions();

  const navigation = useNavigation<HistoryNavigationProp>();

  const user = useSelector((state: RootState) => state.auth.user);
  const sessions = useSelector((state: RootState) => state.history.sessions);

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

  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [loadSessions])
  );

  const handleNewSession = () => {
    if (!user?.uid) {
      Alert.alert("Error", "You need to be logged in to create a new session.");
      return;
    }
    navigation.navigate("(history)", {
      screen: "multipleSession",
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScreenWrapper>
        <View style={[[styles.container]]}>
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
            <HistoryList
              items={sessions?.length ? sessions : []}
              isLoading={isLoading}
              error={error}
              historyType={HistoryType.SESSION}
              shouldDisabledItem={isLoading}
              loadSessions={loadSessions}
            />
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  sessionHistory: {
    paddingVertical: 24,
  },
});
