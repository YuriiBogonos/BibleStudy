import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Typography } from "@/types/Typography";
import HomeGardenSvg from "@/assets/images/HomeGarden";
import AuthButton from "@/components/ui/AuthButton/AuthButton";
import GoogleIcon from "@/assets/images/GoogleIcon";
import AppleIcon from "@/assets/images/AppleIcon";
import ScreenWrapper from "@/components/ScreenWrapper";
import SignUpForm from "@/components/forms/SignUpForm";

const SignUp: React.FC = () => {
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

export default SignUp;
