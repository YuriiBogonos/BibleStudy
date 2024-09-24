import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router, useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import AccountSettingsForm from "@/components/forms/AccountSettingsForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { sendPasswordResetEmail } from "@/services/authServices/changePasswordService";
import { deleteAccountService } from "@/services/authServices/DeleteAccountService";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";

const AccountSettings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleDeleteAccount = async () => {
    const result = await deleteAccountService();
    if (result.success) {
      Alert.alert(
        "Account Deleted",
        "Your account has been successfully deleted.",
      );
      router.replace("/signIn");
    } else {
      Alert.alert("Error", result.error || "Failed to delete account.");
    }
  };

  const handleChangePassword = async () => {
    if (!user?.email) {
      Alert.alert("Error", "User email is not available.");
      return;
    }

    const result = await sendPasswordResetEmail(user.email);
    if (result.success) {
      Alert.alert(
        "Password Reset",
        `A password reset link has been sent to ${user.email}.`,
      );
    } else {
      Alert.alert(
        "Error",
        result.error || "Failed to send password reset email.",
      );
    }
  };

  const initialValues = {
    fullName: user?.fullName || "Joshua Williams",
    email: user?.email || "youremail@gmail.com",
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Account Settings</Text>

        <AccountSettingsForm initialValues={initialValues} />

        <TouchableOpacity onPress={handleChangePassword}>
          <Text style={styles.changePasswordLink}>Change password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.deleteText}>Delete my account</Text>
        </TouchableOpacity>
        <DeleteAccountModal
          visible={isModalVisible}
          onCancel={() => setModalVisible(false)}
          onDelete={async () => {
            await handleDeleteAccount();
            setModalVisible(false);
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  changePasswordLink: {
    color: "#1e90ff",
    fontSize: 16,
    textAlign: "right",
    marginVertical: 10,
  },
  deleteButton: {
    marginTop: 30,
    backgroundColor: "#fff5f5",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ff4d4f",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteText: {
    color: "#ff4d4f",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AccountSettings;
