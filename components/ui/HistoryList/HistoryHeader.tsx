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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigation } from "@react-navigation/native";
import {
  RootStackParamList,
  TabsNavigationProp,
  TabsStackParamList,
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
  // const router = useRouter();

  // const { sessions, questions } = useSelector(
  //   (state: RootState) => state.history
  // );

  // const routesMap: Record<HistoryTypeEnum, Href<string>> = {
  //   [HistoryType.SESSION]: "/sessionFullHistory" as Href<string>,
  //   [HistoryType.QUESTION]: "/questionFullHistory" as Href<string>,
  // };

  // const handleNavigation = () => {
  //   const route = routesMap[historyType];
  //   if (route) {
  //     router.push(route);
  //   }
  // };

  const navigation = useNavigation<TabsNavigationProp>();

  const { sessions, questions } = useSelector(
    (state: RootState) => state.history
  );

  // Define the routes mapping
  // const routesMap = {
  //   [historyType]: "sessionFullHistory",
  //   [historyType]: "questionFullHistory",
  // };

  const handleNavigation = () => {
    // const route = routesMap[historyType];
    // if (route) {
    //   navigation.navigate(route as never); // Add type assertion if necessary
    // }
    navigation.navigate("(tabs)", {
      screen: historyType as keyof TabsStackParamList,
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
