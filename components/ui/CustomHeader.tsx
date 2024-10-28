import React from "react";
import { Header } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/types/Colors";
import { StyleSheet } from "react-native";
import { Typography } from "@/types/Typography";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CustomHeaderProps {
  screenTitle: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ screenTitle }) => {
  const navigation: any = useNavigation();

  return (
    <Header
      leftComponent={
        <AntDesign
          name="left"
          size={20}
          color={Colors.DarkBlue}
          onPress={() => console.log(navigation.goBack())}
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
