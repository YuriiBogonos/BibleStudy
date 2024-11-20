import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

import { InputType } from "@/components/ui/CustomInput/types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";

import { signUpWithEmailPassword } from "@/services/authServices/SignUpServive";
import { SignUpSchema } from "@/validation/SignUpSchema";

import { formatFirebaseErrorMessage } from "@/services/formatFirebaseError";

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignUpFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState<string>("");

  const handleSignUp = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    const { email, password, fullName } = values;

    setLoading(true);
    setFirebaseError("");

    try {
      const result = await signUpWithEmailPassword(email, password, fullName);

      setSubmitting(false);

      if (result.error) {
        const errorMessage = result.error ?? "An unknown error occurred scdsdc";

        setFirebaseError(formatFirebaseErrorMessage(errorMessage));
        setLoading(false);

        return;
      }

      Alert.alert(
        "You have successfully created an account",
        "Please check your email for verification!"
      );

      router.replace("/signIn");

      setLoading(false);
    } catch (error) {
      console.log("error in signUpWithEmailPassword", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      // TODO: return validationSchema
      // validationSchema={SignUpSchema}
      onSubmit={handleSignUp}
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
          <Text style={[Typography.bodySemibold, styles.label]}>Full name</Text>
          <CustomInput
            type={InputType.Text}
            placeholder="Full name"
            value={values.fullName}
            onChangeText={handleChange("fullName")}
            onBlur={handleBlur("fullName")}
          />
          {touched.fullName && errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          <Text style={[Typography.bodySemibold, styles.label]}>Email</Text>
          <CustomInput
            type={InputType.Email}
            placeholder="Enter your email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <Text style={[Typography.bodySemibold, styles.label]}>Password</Text>
          <CustomInput
            type={InputType.Password}
            placeholder="Create password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Text style={[Typography.bodySemibold, styles.label]}>
            Confirm password
          </Text>
          <CustomInput
            type={InputType.Password}
            placeholder="Confirm password"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>Continue</Text>
            {isLoading && (
              <View style={styles.loader}>
                <ActivityIndicator color={"white"} />
              </View>
            )}
          </TouchableOpacity>

          {firebaseError && (
            <View>
              <Text style={styles.firebaseErrorText}>{firebaseError}</Text>
            </View>
          )}

          <TouchableOpacity onPress={() => router.replace("/signIn")}>
            <Text style={[Typography.smallRegular, styles.loginText]}>
              Already have an account?
            </Text>
            <Text style={[Typography.smallRegular, styles.loginLink]}>
              Log in
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
  errorText: {
    color: "red",
    marginTop: 5,
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
    marginVertical: 20,
  },
  loader: {
    position: "absolute",
    top: 14,
    right: 20,
  },
  firebaseErrorText: {
    textAlign: "center",
    color: "red",
    marginTop: 14,
  },
});

export default SignUpForm;
