import { View, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomHeader from "@/components/ui/CustomHeader";
import SessionForm from "@/components/forms/SessionForm";

export default function MultipleSession() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <CustomHeader screenTitle="New session" />
        <SessionForm />
      </View>
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
