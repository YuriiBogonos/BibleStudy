import React from "react";
import CustomHistoryScreen from "@/templates/CustomHistoryScreen";
import ScreenWrapper from "@/components/ScreenWrapper";
import { sessionHistory } from "@/mock/mockSessionHistory";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Text, View } from "react-native";

const SessionHistoryScreen = () => {
  const sessions = useSelector((state: RootState) => state.history.sessions);

  return (
    <ScreenWrapper>
      <CustomHistoryScreen data={sessions!} screenTitle="Session history" />
    </ScreenWrapper>
  );
};

export default SessionHistoryScreen;
