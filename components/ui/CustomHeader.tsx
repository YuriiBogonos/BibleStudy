import React from "react";
import { Header } from "@rneui/themed";
import { Colors } from "@/types/Colors";
import { SafeAreaView, StyleSheet } from "react-native";
import { Typography } from "@/types/Typography";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

interface CustomHeaderProps {
  screenTitle: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ screenTitle }) => {
  // const navigation: any = useNavigation();
  const router = useRouter();

  return (
    <Header
      leftComponent={
        <AntDesign
          name="left"
          size={20}
          color={Colors.DarkBlue}
          onPress={() => router.replace("/account")}
        />
      }
      centerComponent={{
        text: screenTitle,
        style: Typography.h2,
      }}
      containerStyle={styles.containerStyle}
      backgroundColor={Colors.White}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 0,
  },
  centerTextStyle: {
    color: Colors.White,
  },
  iconStyle: {
    color: Colors.Black,
  },
});

export default CustomHeader;
