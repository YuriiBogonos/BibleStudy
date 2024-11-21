import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { InputType } from "@/components/ui/CustomInput/types";
import { AccountSettingsSchema } from "@/validation/AccountSettingsSchema";

interface AccountSettingsFormProps {
  initialValues: { fullName: string; email: string };
}

const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  initialValues,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AccountSettingsSchema}
      onSubmit={(values) => {
        console.log("Form values:", values);
      }}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        <View>
          <Text style={styles.label}>Full name</Text>
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

          <Text style={styles.label}>Email</Text>
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
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default AccountSettingsForm;
