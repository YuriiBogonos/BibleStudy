import React from "react";
import CustomHistoryScreen from "@/templates/CustomHistoryScreen";
import { sessionHistory } from "@/mock/mockSessionHistory";
import ScreenWrapper from "@/components/ScreenWrapper";

const SessionHistoryScreen = () => {
  return (
    <ScreenWrapper>
      <CustomHistoryScreen
        data={sessionHistory}
        screenTitle="Session history"
      />
    </ScreenWrapper>
  );
};

export default SessionHistoryScreen;
