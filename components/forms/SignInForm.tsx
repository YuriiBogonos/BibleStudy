import React, { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { Formik, FormikHelpers } from "formik";

import { InputType } from "@/components/ui/CustomInput/types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";

import { signInWithEmailPassword } from "@/services/authServices/SignInService";
import { signInFailure, signInSuccess } from "@/store/slices/auhtSlice";
import { formatFirebaseErrorMessage } from "@/services/formatFirebaseError";
import { SignInSchema } from "@/validation/SignInSchema";

interface ISignInFormValues {
  email: string;
  password: string;
}

const initialFormValue: ISignInFormValues = {
  email: "",
  password: "",
};

const SignInForm: FC = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState<string | null>(null);
  const [iaLoading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (
    values: ISignInFormValues,
    { setSubmitting }: FormikHelpers<ISignInFormValues>
  ) => {
    setError(null);
    const { email, password } = values;

    try {
      setError(null);
      setLoading(true);

      const result = await signInWithEmailPassword(email, password);

      if (result.error) {
        const errorMessage = result.error ?? "An unknown error occurred QQAAAA";
        dispatch(signInFailure(errorMessage));
        setError(errorMessage);
        setSubmitting(false);
        setLoading(false);

        return;
      }

      if (!result.user?.emailVerified) {
        Alert.alert(
          "",
          "Your email address is not verified. Please check your inbox and follow the instructions in the verification email to activate your account."
        );
        setSubmitting(false);
        setLoading(false);

        return;
      }

      dispatch(signInSuccess(result.user));
      setSubmitting(false);
      setLoading(false);

      return;
    } catch (err) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
      console.error("error in signInWithEmailPassword", err);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={SignInSchema}
      onSubmit={handleSignIn}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <Text style={[Typography.bodySemibold, styles.label]}>Email</Text>
          <CustomInput
            type={InputType.Email}
            placeholder="Enter your email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          {touched.email && errors.email && (
            <Text style={styles.inputErrorText}>{errors.email}</Text>
          )}

          <Text style={[Typography.bodySemibold, styles.label]}>Password</Text>
          <CustomInput
            type={InputType.Password}
            placeholder="Enter your password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
          />
          {touched.password && errors.password && (
            <Text style={styles.inputErrorText}>{errors.password}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>Continue</Text>
            {iaLoading && (
              <View style={styles.loader}>
                <ActivityIndicator color={"white"} />
              </View>
            )}
          </TouchableOpacity>

          {error && (
            <Text style={styles.errorText}>
              {formatFirebaseErrorMessage(error)}
            </Text>
          )}

          <TouchableOpacity onPress={() => router.replace("/signUp")}>
            <Text style={[Typography.smallRegular, styles.loginText]}>
              Don't have an account yet?
            </Text>
            <Text style={[Typography.smallRegular, styles.loginLink]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
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
    marginTop: 12,
    marginBottom: 8,
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
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 16,
  },
  inputErrorText: {
    textAlign: "left",
    color: "red",
    marginTop: 8,
  },
  loader: {
    position: "absolute",
    top: 14,
    right: 20,
  },
});

export default SignInForm;
