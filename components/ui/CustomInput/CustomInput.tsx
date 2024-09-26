import { FC, useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  CustomInputProps,
  InputType,
  KeyboardType,
} from "@/components/ui/CustomInput/types";
import { Colors } from "@/types/Colors";
import PasswordEyeIcon from "@/assets/images/PasswordEyeIcon";
import ShowPasswordEyeIcon from "@/assets/images/ShowPasswordEyeIcon";

const CustomInput: FC<CustomInputProps> = ({
  type,
  placeholder,
  value,
  onChangeText,
}) => {
  const [isSecure, setIsSecure] = useState(type === InputType.Password);

  return (
    <View style={styles.container}>
      <TextInput
        key={isSecure ? "password" : "text"}
        style={styles.input}
        secureTextEntry={isSecure}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        keyboardType={
          type === InputType.Email
            ? KeyboardType.EmailAddress
            : KeyboardType.Default
        }
      />
      {type === InputType.Password && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.icon}
        >
          {isSecure ? <PasswordEyeIcon /> : <ShowPasswordEyeIcon />}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LightGray,
    borderColor: "#F8F6FF",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },
});

export default CustomInput;
