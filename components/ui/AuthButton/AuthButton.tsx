import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Typography } from "@/types/Typography";

interface AuthButtonProps {
  Icon: FC;
  text: string;
  onPress: () => void;
}

const AuthButton: FC<AuthButtonProps> = ({ Icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon />
      <Text style={[Typography.smallMedium, styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F8F6FF",
    marginBottom: 8,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "#000",
    marginLeft: 10,
  },
});

export default AuthButton;
