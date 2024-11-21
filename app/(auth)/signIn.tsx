import { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import ScreenWrapper from "@/components/ScreenWrapper";
import SignInForm from "@/components/forms/SignInForm";
import AuthButton from "@/components/ui/AuthButton";

import GoogleIcon from "@/assets/images/GoogleIcon";
import AppleIcon from "@/assets/images/AppleIcon";
import ChildrenInGarden from "@/assets/images/ChildrenWithGarden";

import { Typography } from "@/types/Typography";
import { signInWithGoogleFunc } from "@/services/authServices/GoogleSignIn";

// import { signInWithGoogleFunc } from "@/services/authServices/GoogleSignIn";

const SignIn: FC = () => {
  const [googleLoginLoading, setGoogleLoginLoading] = useState<boolean>(false);
  const [appleLoginLoading, setAppleLoginLoading] = useState<boolean>(false);

  const [firebaseError, setFirebaseError] = useState<string>("");

  const signInWithGoogle = () => {
    setGoogleLoginLoading(true);
    setFirebaseError("");
    signInWithGoogleFunc({ setGoogleLoginLoading, setFirebaseError });
  };

  const signInWithApple = async () => {
    setAppleLoginLoading(true);
    setFirebaseError("");
  };

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
            text="Sign in with Google"
            onPress={signInWithGoogle}
            isLoading={googleLoginLoading}
          />
          <AuthButton
            Icon={AppleIcon}
            text="Sign in with Apple"
            onPress={signInWithApple}
            isLoading={appleLoginLoading}
          />
        </View>

        {firebaseError && (
          <View>
            <Text style={styles.errorText}>{firebaseError}</Text>
          </View>
        )}

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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },
});

export default SignIn;
