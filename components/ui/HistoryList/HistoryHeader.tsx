import { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Typography } from "@/types/Typography";
import { Colors } from "@/types/Colors";

interface HistoryHeaderProps {
  title: string;
}

const HistoryHeader: FC<HistoryHeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={Typography.h3}>{title}</Text>
      <TouchableOpacity>
        <Text style={[Typography.smallMedium, styles.viewFullHistory]}>
          View full history
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewFullHistory: {
    color: Colors.DarkBlue,
  },
});

export default HistoryHeader;
