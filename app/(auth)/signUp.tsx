import { FC, useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Typography } from "@/types/Typography";
import HomeGardenSvg from "@/assets/images/HomeGarden";
import AuthButton from "@/components/ui/AuthButton";
import GoogleIcon from "@/assets/images/GoogleIcon";
import AppleIcon from "@/assets/images/AppleIcon";
import ScreenWrapper from "@/components/ScreenWrapper";
import SignUpForm from "@/components/forms/SignUpForm";
import { signInWithGoogleFunc } from "@/services/authServices/GoogleSignIn";
import { signInWithAppleFunc } from "@/services/AppleSignIn";

const SignUp: FC = () => {
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

    try {
      await signInWithAppleFunc({ setFirebaseError });
    } catch (error) {
      console.log("error in signInWithAppleFunc ===>", error);
    } finally {
      setAppleLoginLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={[Typography.h1, styles.title]}>
          Welcome {"\n"} to Bible Study
        </Text>
        <Text style={[Typography.subheading, styles.subtitle]}>
          We pray that you may deepen your knowledge and understanding of the
          Bible and that your relationship with God grow daily
        </Text>
        <View style={styles.svgContainer}>
          <HomeGardenSvg />
        </View>
        <View style={styles.authButtons}>
          <AuthButton
            Icon={GoogleIcon}
            text="Sign up with Google"
            onPress={signInWithGoogle}
            isLoading={googleLoginLoading}
          />
          {Platform.OS === "ios" && (
            <AuthButton
              Icon={AppleIcon}
              text="Sign up with Apple"
              onPress={signInWithApple}
              isLoading={appleLoginLoading}
            />
          )}
        </View>

        {firebaseError && (
          <View>
            <Text style={styles.errorText}>{firebaseError}</Text>
          </View>
        )}

        <Text style={[Typography.subheading, styles.text]}>or</Text>
        <SignUpForm />
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
    marginTop: 10,
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

export default SignUp;
