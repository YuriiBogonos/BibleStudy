import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import ClearHistory from "@/assets/images/ClearHistory";

interface HistoryEmptyStateProps {
  isSessionHistory: boolean;
}

const HistoryEmptyState: FC<HistoryEmptyStateProps> = ({
  isSessionHistory,
}) => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        {isSessionHistory
          ? "Here, you can review all your past sessions and track your progress on your spiritual journey."
          : "No questions history found."}
      </Text>
      <ClearHistory />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default HistoryEmptyState;
