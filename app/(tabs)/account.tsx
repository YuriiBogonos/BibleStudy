import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import { View } from "@/components/Themed";
import SettingsItem from "@/components/ui/AccountSettingsItem";
import AccountSettingsIcon from "@/assets/images/AccountSettingsIcon";
import AccountSettingsAboutIcon from "@/assets/images/AccountSettingsAboutIcon";
import AccountSettingSupportIcon from "@/assets/images/AccountSettingSupportIcon";
import AccountSettingsWebsiteIcon from "@/assets/images/AccountSettingsWebsiteIcon";
import AccountSettingsSignOutIcon from "@/assets/images/AccountSettingsSignOutIcon";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { signOutService } from "@/services/authServices/SignOutService";
import { signOutFailure, signOutSuccess } from "@/store/slices/auhtSlice";
import CustomButton from "@/components/ui/CustomButton";
import { Typography } from "@/types/Typography";

export default function Account() {
  const dispatch = useDispatch();
  const router = useRouter();

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
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={Typography.h1}>User</Text>
        <SettingsItem
          icon={<AccountSettingsIcon />}
          text="Account Settings"
          onPress={() => router.replace("/accountSettings")}
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
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <AccountSettingsSignOutIcon />
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
        <CustomButton text={"Donate"} onPress={() => console.log("Donate")} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
