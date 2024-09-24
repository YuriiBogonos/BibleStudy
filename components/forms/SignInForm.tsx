import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { InputType } from "@/components/ui/CustomInput/types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";
import { useDispatch } from "react-redux";
import { signInWithEmailPassword } from "@/services/authServices/SignInService";
import { router } from "expo-router";
import { signInFailure, signInSuccess } from "@/store/slices/auhtSlice";

const SignInForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleContinue = async () => {
    try {
      setError(null);

      const result = await signInWithEmailPassword(email, password);

      if (result.success) {
        dispatch(signInSuccess(result.user));
        router.replace("/home");
        Alert.alert("Success", "You are now signed in!");
      } else {
        const errorMessage = result.error ?? "An unknown error occurred";
        dispatch(signInFailure(errorMessage));
        setError(errorMessage);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err); // Log error for debugging
    }
  };
  const navigateToSignUp = () => {
    router.replace("/signUp");
  };
  const handleGoogleSignIn = () => {
    // Add your Google sign-in logic here
  };

  const handleAppleSignIn = () => {
    // Add your Apple sign-in logic here
  };

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <Text style={[Typography.bodySemibold, styles.label]}>Email</Text>
      <CustomInput
        type={InputType.Email}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={[Typography.bodySemibold, styles.label]}>Password</Text>
      <CustomInput
        type={InputType.Password}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={[Typography.smallRegular, styles.loginLink]}
          onPress={navigateToSignUp}
        >
          Sign up
        </Text>
        <Text style={[Typography.smallRegular, styles.loginText]}>
          Don't have an account yet?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
  },
  label: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.DarkBlue,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.Black,
  },
  loginLink: {
    textAlign: "center",
    color: Colors.Black,
    textDecorationLine: "underline",
    marginTop: 20,
  },
});

export default SignInForm;
