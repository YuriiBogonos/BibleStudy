import React from "react";
import CustomHistoryScreen from "@/templates/CustomHistoryScreen";
import { questionHistory } from "@/mock/mockQuestionsHistory";
import ScreenWrapper from "@/components/ScreenWrapper";

const QuestionHistoryScreen = () => {
  return (
    <ScreenWrapper>
      <CustomHistoryScreen
        data={questionHistory}
        screenTitle="Question history"
      />
    </ScreenWrapper>
  );
};

export default QuestionHistoryScreen;
