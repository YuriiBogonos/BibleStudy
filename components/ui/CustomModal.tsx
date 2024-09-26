import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Typography } from "@/types/Typography";
import { Colors } from "@/types/Colors";
import { Portal } from "@gorhom/portal";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText: string;
  cancelText: string;
  showWarning?: boolean;
}

export default function CustomModal({
  visible,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
  showWarning = false,
}: CustomModalProps) {
  return (
    <Portal>
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[Typography.bodySemibold, styles.message]}>
              {message}
            </Text>
            {showWarning && (
              <Text style={[Typography.bodyRegular, styles.warningText]}>
                You will lose all data in the associated app using the same
                email address. This can’t be undone.
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  showWarning && styles.deleteButton,
                ]}
                onPress={onConfirm}
              >
                <Text style={[Typography.bodyMedium, styles.confirmText]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={[Typography.bodyMedium, styles.cancelText]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  message: {
    marginBottom: 10,
    textAlign: "center",
    color: Colors.Black,
  },
  warningText: {
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: Colors.Red,
    borderRadius: 50,
  },
  confirmText: {
    color: Colors.White,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.DarkBlue,
  },
  cancelText: {
    color: Colors.DarkBlue,
  },
});
