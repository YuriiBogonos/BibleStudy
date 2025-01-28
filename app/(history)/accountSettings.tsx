import React, { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";

import ScreenWrapper from "@/components/ScreenWrapper";
import AccountSettingsForm from "@/components/forms/AccountSettingsForm";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomModal from "@/components/ui/CustomModal";

import { RootState } from "@/store/store";
import { sendPasswordResetEmail } from "@/services/authServices/changePasswordService";
import { deleteAccountService } from "@/services/authServices/DeleteAccountService";
import DeleteAccountIcon from "@/assets/images/DeleteAccountIcon";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";
import { signOutSuccess } from "@/store/slices/authSlice";

const AccountSettings: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteAccount = async () => {
    const result = await deleteAccountService();
    if (result.success) {
      dispatch(signOutSuccess());
      Alert.alert(
        "Account Deleted",
        "Your account has been successfully deleted."
      );
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
        `A password reset link has been sent to ${user.email}.`
      );
    } else {
      Alert.alert(
        "Error",
        result.error || "Failed to send password reset email."
      );
    }
  };

  return (
    <>
      <View style={styles.content}>
        <View
          style={[
            styles.container,
            Platform.OS === "android" && { paddingTop: 40 },
          ]}
        >
          <CustomHeader screenTitle="Account Settings" />
          <AccountSettingsForm />

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={handleChangePassword}
              style={styles.changeUserInfoButton}
            >
              <Text style={styles.changePasswordLink}>Change password</Text>
            </TouchableOpacity>
          </View>

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
      </View>
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
  content: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  changePasswordLink: {
    color: Colors.DarkBlue,
    fontSize: 16,
    textAlign: "center",
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
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  changeUserInfoButton: {
    flexDirection: "row",
  },
});

export default AccountSettings;
