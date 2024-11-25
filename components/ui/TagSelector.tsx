import React, { useEffect, useRef, useState } from "react";
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
import { Formik, FormikHelpers } from "formik";
import { AddNewTagSchema } from "@/validation/AddNewTagSchema";

interface TagSelectorProps {
  tags: string[] | string;
  selectedTag: string | null;
  onTagPress: (tag: string) => void;
  onAddTag?: (newTag: string, color: string) => void;
  tagColors: { [key: string]: string };
  style?: any;
}

interface IFormValues {
  tagName: string;
}

const initialValues = {
  tagName: "",
};

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTag,
  onTagPress,
  onAddTag,
  tagColors,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const tagArray = Array.isArray(tags) ? tags : [tags];

  const colorOptions = Object.values(tagColors);

  const getRandomColor = () => {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  const handleAddTag = (
    values: IFormValues,
    { resetForm }: { resetForm: FormikHelpers<IFormValues>["resetForm"] }
  ) => {
    if (values.tagName.trim()) {
      const randomColor = getRandomColor();

      if (onAddTag) {
        onAddTag(values.tagName, randomColor);
      }

      resetForm();
      setModalVisible(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddNewTagSchema}
      onSubmit={handleAddTag}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
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
                <Text style={[Typography.bodyRegular, styles.tagText]}>
                  {tag}
                </Text>
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
            animationType="fade"
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
                  value={values.tagName}
                  onChangeText={handleChange("tagName")}
                />
                {errors.tagName && (
                  <Text style={styles.inputErrorText}>{errors.tagName}</Text>
                )}

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleSubmit()}
                  disabled={!!errors.tagName}
                >
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
      )}
    </Formik>
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
    borderWidth: 1,
    borderColor: Colors.DarkGray,
  },
  addButton: {
    backgroundColor: Colors.DarkBlue, // Змінено колір кнопки на DarkBlue
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 14,
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
  inputErrorText: {
    textAlign: "left",
    color: "red",
    marginTop: 8,
  },
});

export default TagSelector;
