import { FC, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { Colors } from "@/types/Colors";

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
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.input}
      >
        <Text>{value || placeholder || "Select an option"}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item);
                    setModalVisible(false);
                  }}
                  style={styles.option}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 16,
    backgroundColor: Colors.LightGray,
    borderRadius: 16,
    borderColor: "#F8F6FF",
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default CustomSelect;
