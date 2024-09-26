import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Typography } from "@/types/Typography";
import AuthButton from "@/components/ui/AuthButton";
import GoogleIcon from "@/assets/images/GoogleIcon";
import AppleIcon from "@/assets/images/AppleIcon";
import ScreenWrapper from "@/components/ScreenWrapper";
import SignInForm from "@/components/forms/SignInForm";
import ChildrenInGarden from "@/assets/images/ChildrenWithGarden";

const SignIn: FC = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={[Typography.h1, styles.title]}>Welcome back!</Text>
        <View style={styles.svgContainer}>
          <ChildrenInGarden />
        </View>
        <View style={styles.authButtons}>
          <AuthButton
            Icon={GoogleIcon}
            text="Sign up with Google"
            onPress={() => {
              console.log("Sign up with Google");
            }}
          />
          <AuthButton
            Icon={AppleIcon}
            text="Sign up with Apple"
            onPress={() => {
              console.log("Sign up with Apple");
            }}
          />
        </View>

        <Text style={[Typography.subheading, styles.text]}>or</Text>
        <SignInForm />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 5,
    marginTop: 16,
  },
  text: {
    textAlign: "center",
    marginBottom: 24,
  },
  svgContainer: {
    alignItems: "center",
    marginVertical: 27,
  },
  authButtons: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
});

export default SignIn;
