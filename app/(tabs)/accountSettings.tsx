import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import AccountSettingsForm from "@/components/forms/AccountSettingsForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { sendPasswordResetEmail } from "@/services/authServices/changePasswordService";
import { deleteAccountService } from "@/services/authServices/DeleteAccountService";
import CustomModal from "@/components/ui/CustomModal";
import { Colors } from "@/types/Colors";
import DeleteAccountIcon from "@/assets/images/DeleteAccountIcon";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Typography } from "@/types/Typography";
import CustomHeader from "@/components/ui/CustomHeader";

const AccountSettings: FC = () => {
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
    <>
      <ScreenWrapper>
        <View style={styles.container}>
          <CustomHeader screenTitle="Account Settings" backScreen={"account"} />
          <AccountSettingsForm initialValues={initialValues} />

          <TouchableOpacity onPress={handleChangePassword}>
            <Text style={styles.changePasswordLink}>Change password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.deleteButtonLeft}>
              <DeleteAccountIcon />
              <Text style={[Typography.bodyMedium, styles.deleteText]}>
                Delete my account
              </Text>
            </View>
            <AntDesign name="right" size={14} color={Colors.DarkBlue} />
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
      <CustomModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={async () => {
          await handleDeleteAccount();
          setModalVisible(false);
        }}
        message="Are you sure you want to delete your account?"
        confirmText="Delete account"
        cancelText="Cancel"
        showWarning={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },

  changePasswordLink: {
    color: Colors.DarkBlue,
    fontSize: 16,
    textAlign: "right",
    marginVertical: 10,
  },
  deleteButton: {
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderColor: "#F8F6FF",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteText: {
    marginLeft: 10,
    color: Colors.Black,
  },
});

export default AccountSettings;
