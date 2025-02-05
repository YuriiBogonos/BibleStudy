import React from "react";
import { Header } from "@rneui/themed";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CustomHeaderProps {
  screenTitle: string;
  path?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ screenTitle, path }) => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.iconBlock}>
        <AntDesign
          name="left"
          size={20}
          color={Colors.DarkBlue}
          onPress={navigation.goBack}
        />
      </View>
      <View style={styles.titleBlock}>
        <Text style={styles.titleText}>{screenTitle}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    marginBottom: 20,
  },
  titleBlock: {
    width: "90%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
  },
  iconBlock: {
    width: "10%",
    height: 30,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomHeader;
