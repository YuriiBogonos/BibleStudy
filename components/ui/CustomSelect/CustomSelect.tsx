import { FC, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
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
        <Text style={styles.placeholderText}>
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
  placeholderText: {
    color: "#888",
  },
  arrowIcon: {
    fontSize: 16,
    color: "#888",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default CustomSelect;
