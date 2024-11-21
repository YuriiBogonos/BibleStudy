import CrossLoadingIcon from "@/assets/images/crossLoadingIcon";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator /> */}
      <CrossLoadingIcon />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
