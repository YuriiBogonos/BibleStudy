import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "@/types/Colors";

interface CustomButtonProps {
  Icon?: FC;
  text: string;
  onPress: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ Icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonFlex}>
        {Icon && <Icon />}
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.DarkBlue,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonFlex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default CustomButton;
