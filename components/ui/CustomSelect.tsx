import { FC, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Typography } from "@/types/Typography";

interface CustomSelectProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setDropdownVisible(!isDropdownVisible)}
        style={styles.input}
      >
        <Text
          style={[
            Typography.bodyRegular,
            styles.text,
            value ? styles.selectedText : styles.placeholderText,
          ]}
        >
          {value || placeholder || "Select an option"}
        </Text>
        <AntDesign name="down" size={14} color={Colors.DarkBlue} />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                onValueChange(item);
                setDropdownVisible(false);
              }}
              style={styles.option}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    padding: 16,
    backgroundColor: Colors.LightGray,
    borderRadius: 16,
    borderColor: "#F8F6FF",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  placeholderText: {
    color: "#C1C1C1", // Gray color for placeholder
  },
  selectedText: {
    color: Colors.Black, // Black color for selected value
  },
  dropdown: {
    backgroundColor: Colors.LightGray,
    borderColor: "#F8F6FF",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  option: {
    padding: 10,
  },
});

export default CustomSelect;
