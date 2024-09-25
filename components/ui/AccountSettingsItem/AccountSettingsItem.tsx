import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Typography } from "@/types/Typography";

interface SettingsItemProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[Typography.bodyMedium, styles.text]}>{text}</Text>
      <View style={styles.arrowContainer}>
        <AntDesign name="right" size={14} color={Colors.DarkBlue} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9FF",
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
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
    color: Colors.Black,
  },
  arrowContainer: {
    width: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsItem;
