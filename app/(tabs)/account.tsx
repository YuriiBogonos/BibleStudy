import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

import { View } from "@/components/Themed";
import SettingsItem from "@/components/ui/AccountSettingsItem";
import CustomModal from "@/components/ui/CustomModal";
import ScreenWrapper from "@/components/ScreenWrapper";

import AccountSettingsIcon from "@/assets/images/AccountSettingsIcon";
import AccountSettingsAboutIcon from "@/assets/images/AccountSettingsAboutIcon";
import AccountSettingSupportIcon from "@/assets/images/AccountSettingSupportIcon";
import AccountSettingsWebsiteIcon from "@/assets/images/AccountSettingsWebsiteIcon";
import AccountSettingsSignOutIcon from "@/assets/images/AccountSettingsSignOutIcon";
import SignOutIcon from "@/assets/images/SignOutIcon";

import { signOutService } from "@/services/authServices/SignOutService";
import { signOutFailure, signOutSuccess } from "@/store/slices/authSlice";
import { Typography } from "@/types/Typography";
import { TabsNavigationProp } from "@/types/SessionsTypes";

export default function Account() {
  const dispatch = useDispatch();
  const router = useRouter();

  const navigation = useNavigation<TabsNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = async () => {
    const result = await signOutService();

    if (result.success) {
      dispatch(signOutSuccess());
      Alert.alert("Success", "You have signed out.");
      router.replace("/signIn");
    } else {
      const errorMessage = result.error ?? "An unknown error occurred";
      dispatch(signOutFailure(errorMessage));
      Alert.alert("Error", result.error);
    }
  };

  const handleSignOutClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmSignOut = () => {
    handleSignOut();
    setModalVisible(false);
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={Typography.h1}>User</Text>
        <SettingsItem
          icon={<AccountSettingsIcon />}
          text="Account Settings"
          onPress={() =>
            navigation.navigate("(history)", {
              screen: "accountSettings",
            })
          }
        />
        <SettingsItem
          icon={<AccountSettingsAboutIcon />}
          text="About us"
          onPress={() => console.log("Navigate to About us")}
        />
        <SettingsItem
          icon={<AccountSettingSupportIcon />}
          text="Support us"
          onPress={() => console.log("Navigate to Support us")}
        />
        <SettingsItem
          icon={<AccountSettingsWebsiteIcon />}
          text="Website"
          onPress={() => console.log("Navigate to Website")}
        />
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOutClick}
        >
          <AccountSettingsSignOutIcon />
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
        {/* <CustomButton text={"Donate"} onPress={() => console.log("Donate")} /> */}
      </View>
      <CustomModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSignOut}
        message="Are you sure you want to log out now?"
        confirmText="Confirm"
        cancelText="Cancel"
        showWarning={false}
        icon={<SignOutIcon />}
      />

      {/* </SafeAreaView> */}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  signOutButton: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 12,
    borderRadius: 10,
  },
  signOutText: {
    marginLeft: 12,
  },
});
