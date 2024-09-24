import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";

interface SettingsItemProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.arrowContainer}>
        <Text>{">"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9FF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: Colors.Black,
  },
  arrowContainer: {
    width: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsItem;
