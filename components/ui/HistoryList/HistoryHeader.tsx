import { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Typography } from "@/types/Typography";
import { Colors } from "@/types/Colors";

import {
  HistoryType,
  HistoryTypeEnum,
} from "@/components/ui/HistoryList/types";
import { RootState } from "@/store/store";
import {
  HistoryStackParamList,
  TabsNavigationProp,
} from "@/types/SessionsTypes";

interface HistoryHeaderProps {
  title: string;
  historyType: HistoryTypeEnum | string;
  loading: boolean;
}

const HistoryHeader: FC<HistoryHeaderProps> = ({
  title,
  historyType,
  loading,
}) => {
  const navigation = useNavigation<TabsNavigationProp>();

  const { sessions, questions } = useSelector(
    (state: RootState) => state.history
  );

  const handleNavigation = () => {
    navigation.navigate("(history)", {
      screen: historyType as keyof HistoryStackParamList,
    });
  };

  return (
    <View style={styles.header}>
      <Text style={Typography.h3}>{title}</Text>

      {(historyType === HistoryType.SESSION && sessions?.length !== 0) ||
      (historyType === HistoryType.QUESTION && questions?.length !== 0) ? (
        <TouchableOpacity onPress={handleNavigation} disabled={loading}>
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
      ) : null}
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
