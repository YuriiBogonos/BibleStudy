import React, { FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: FC<CounterProps> = ({ value, onIncrement, onDecrement }) => {
  return (
    <View style={styles.counterContainer}>
      <TouchableOpacity onPress={onDecrement} style={styles.counterButton}>
        <Text style={[Typography.bodyRegular, styles.buttonText]}>-</Text>
      </TouchableOpacity>
      <Text style={[Typography.bodyRegular, styles.valueText]}>{value}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.counterButton}>
        <Text style={[Typography.bodyRegular, styles.buttonText]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LightGray,
    borderColor: "#F8F6FF",
    borderWidth: 1,
    borderRadius: 16,
  },
  counterButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: Colors.DarkBlue,
  },
  valueText: {
    marginHorizontal: 16,
    color: Colors.Black,
  },
});

export default Counter;
