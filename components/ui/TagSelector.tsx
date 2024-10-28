import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";
import { Ionicons } from "@expo/vector-icons";

interface TagSelectorProps {
  tags: string[] | string;
  selectedTag: string | null;
  onTagPress: (tag: string) => void;
  onAddTag?: (newTag: string, color: string) => void;
  tagColors: { [key: string]: string };
  style?: any;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTag,
  onTagPress,
  onAddTag,
  tagColors,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTag, setNewTag] = useState("");

  const tagArray = Array.isArray(tags) ? tags : [tags];

  const colorOptions = Object.values(tagColors);

  const getRandomColor = () => {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      const randomColor = getRandomColor();
      if (onAddTag) {
        onAddTag(newTag, randomColor);
      }
      setNewTag("");
      setModalVisible(false);
    }
  };

  return (
    <View style={[styles.tagContainer, style]}>
      {tagArray.map((tag) => {
        const isSelected = selectedTag === tag;
        const backgroundColor = tagColors[tag] || Colors.LightGray;

        return (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              { backgroundColor },
              isSelected && styles.tagSelected,
            ]}
            onPress={() => onTagPress(tag)}
          >
            <Text style={[Typography.bodyRegular, styles.tagText]}>{tag}</Text>
          </TouchableOpacity>
        );
      })}

      {onAddTag && (
        <TouchableOpacity
          style={[styles.tag, styles.addTagButton]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color={Colors.Black} />
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Tag</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter tag name"
              value={newTag}
              onChangeText={setNewTag}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
              <Text style={styles.addButtonText}>Add Tag</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    gap: 10,
    marginTop: 10,
    width: "100%",
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tagSelected: {
    borderWidth: 2,
    borderColor: Colors.Black,
  },
  tagText: {
    color: Colors.Black,
  },
  addTagButton: {
    backgroundColor: Colors.LightGray,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Злегка затемнене фон
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Тінь для Android
    shadowColor: Colors.Black, // Тінь для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.LightGray,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.DarkGray,
  },
  addButton: {
    backgroundColor: Colors.DarkBlue, // Змінено колір кнопки на DarkBlue
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: Colors.White,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.Red,
    fontWeight: "bold",
  },
});

export default TagSelector;
