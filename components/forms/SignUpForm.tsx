import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { InputType } from "@/components/ui/CustomInput/types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";
import { useDispatch } from "react-redux";
import { signUpWithEmailPassword } from "@/services/authServices/SignUpServive";
import { useRouter } from "expo-router";
import { SignUpSchema } from "@/validation/SignUpSchema";
import { signUpFailure, signUpSuccess } from "@/store/slices/auhtSlice";

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
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUp = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>,
  ) => {
    const { email, password, fullName } = values;
    const result = await signUpWithEmailPassword(email, password, fullName);

    setSubmitting(false);

    if (result.success) {
      dispatch(signUpSuccess(result.user));
      Alert.alert("Success", "Please check your email for verification!");
      router.replace("/home");
    } else {
      const errorMessage = result.error ?? "An unknown error occurred";
      dispatch(signUpFailure(errorMessage));
      Alert.alert("Error", errorMessage);
    }
  };
  const navigateToSignIn = () => {
    router.replace("/signIn");
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
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
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToSignIn}>
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
    marginTop: 20,
  },
});

export default SignUpForm;
