import { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Typography } from "@/types/Typography";
import { Colors } from "@/types/Colors";
import { useRouter, Href } from "expo-router";
import {
  HistoryType,
  HistoryTypeEnum,
} from "@/components/ui/HistoryList/types";
import AntDesign from "@expo/vector-icons/AntDesign";

interface HistoryHeaderProps {
  title: string;
  historyType: HistoryTypeEnum;
}

const HistoryHeader: FC<HistoryHeaderProps> = ({ title, historyType }) => {
  const router = useRouter();

  const routesMap: Record<HistoryTypeEnum, Href<string>> = {
    [HistoryType.SESSION]: "/sessionFullHistory" as Href<string>,
    [HistoryType.QUESTION]: "/questionFullHistory" as Href<string>,
  };

  const handleNavigation = () => {
    const route = routesMap[historyType];
    if (route) {
      router.push(route);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={Typography.h3}>{title}</Text>

      <TouchableOpacity onPress={handleNavigation}>
        <View style={styles.viewFullHistoryContainer}>
          <Text style={[Typography.smallMedium, styles.viewFullHistory]}>
            View full history
          </Text>
          <AntDesign
            name="right"
            size={12}
            color={Colors.DarkBlue}
            style={styles.arrowIcon}
          />
        </View>
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
  viewFullHistoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewFullHistory: {
    color: Colors.DarkBlue,
  },
  arrowIcon: {
    marginLeft: 5,
  },
});

export default HistoryHeader;
