import { View, Text, StyleSheet } from "react-native";
import { Typography } from "@/types/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";
import VerseOfWeek from "@/components/ui/VerseOfWeek";
import CustomButton from "@/components/ui/CustomButton";
import PlusIconButton from "@/assets/images/PlusIconButton";
import SessionHistory from "@/components/ui/SessionHistory";
import { sessionHistory } from "@/mock/mockSessionHistory";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import HistoryList from "@/components/ui/HistoryList/HistoryList";

export default function MainScreen() {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const mockHandlePress = () => {
    console.log("Button pressed in Home screen");
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text
          style={Typography.homeTitle}
        >{`God Bless You, ${user ? user.fullName : null}!`}</Text>
        <VerseOfWeek />
        <CustomButton
          onPress={mockHandlePress}
          Icon={PlusIconButton}
          text={"Start new session"}
        />
        <View style={styles.sessionHistory}>
          <HistoryList items={sessionHistory} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  sessionHistory: {
    paddingVertical: 24,
  },
});
