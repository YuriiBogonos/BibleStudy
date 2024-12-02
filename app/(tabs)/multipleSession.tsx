import { View, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomHeader from "@/components/ui/CustomHeader";
import SessionForm from "@/components/forms/SessionForm";

export default function MultipleSession() {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <CustomHeader screenTitle="New session" path="home" />
        <SessionForm />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    flex: 1,
    height: "auto",
  },
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
});
