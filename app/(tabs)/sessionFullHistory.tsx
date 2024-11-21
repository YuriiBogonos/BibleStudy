import React from "react";
import CustomHistoryScreen from "@/templates/CustomHistoryScreen";
import ScreenWrapper from "@/components/ScreenWrapper";
import { sessionHistory } from "@/mock/mockSessionHistory";

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
