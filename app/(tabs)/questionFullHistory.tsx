import React from "react";
import CustomHistoryScreen from "@/templates/CustomHistoryScreen";

import ScreenWrapper from "@/components/ScreenWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const QuestionHistoryScreen = () => {
  const question = useSelector((state: RootState) => state.history.questions);
  return (
    <ScreenWrapper>
      <CustomHistoryScreen data={question!} screenTitle="Question history" />
    </ScreenWrapper>
  );
};

export default QuestionHistoryScreen;
