import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { InputType } from "@/components/ui/CustomInput/types";
import { AccountSettingsSchema } from "@/validation/AccountSettingsSchema";
import { Colors } from "@/types/Colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { auth, firestore } from "@/config/config";
import { formatFirebaseErrorMessage } from "@/services/formatFirebaseError";

import { FirebaseError } from "@firebase/util";
import { changeFullName } from "@/store/slices/authSlice";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { sendVerificationEmail } from "@/services/authServices/SignUpService";
import { getUsernameFromEmail } from "@/services/formatMailName";

// interface AccountSettingsFormProps {
//   initialValues: { fullName: string; email: string };
// }

interface IAccountSettingsForm {
  fullName: string;
  email: string;
}

const AccountSettingsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const initialValues = {
    fullName: user?.displayName
      ? user?.displayName
      : user && user.email
      ? getUsernameFromEmail(user?.email)
      : "user",
    email: user?.email || "email.example@gmail.com",
  };

  const [changeUserInfoLoading, setChangeUserInfoLoading] =
    useState<boolean>(false);
  const [changeUserInfoError, setChangeUserInfoError] = useState<string>("");
  const [changeUserInfoSuccess, setChangeUserInfoSuccess] =
    useState<string>("");

  const changeUserInfo = async (value: IAccountSettingsForm) => {
    try {
      setChangeUserInfoError("");
      setChangeUserInfoLoading(true);
      setChangeUserInfoSuccess("");

      const firebaseUser = auth().currentUser;

      if (user?.displayName === value.fullName && user?.email === value.email) {
        console.log("Change necessary value for make update");
        setChangeUserInfoError("Change necessary value for make update");
        setChangeUserInfoLoading(false);
        return;
      }

      if (!firebaseUser || !user) {
        console.log("Change necessary value for make update");
        setChangeUserInfoError("User not authenticated");
        setChangeUserInfoLoading(false);
        return;
      }

      const userRef = firestore().collection("users").doc(firebaseUser.uid);

      // Update email if it has changed
      if (user.email !== value.email) {
        const update = await updateUserEmail(
          firebaseUser,
          userRef,
          value.email
        );

        if (update) {
          await sendVerificationEmail();

          Alert.alert("Success", "A new verification email has been sent.");

          setChangeUserInfoSuccess("You have successfully changed your email!");
        }
      }

      if (user.displayName !== value.fullName) {
        const update = await updateUserFullName(userRef, value.fullName);

        if (update) {
          setChangeUserInfoSuccess(
            "You have successfully changed your username!"
          );
        }
      }

      setChangeUserInfoLoading(false);
    } catch (error: any) {
      console.error("Error updating user info: ", error.message);
      setChangeUserInfoError(formatFirebaseErrorMessage(error.message));
      setChangeUserInfoLoading(false);
    }
  };

  const updateUserEmail = async (
    user: FirebaseAuthTypes.User,
    userRef: FirebaseFirestoreTypes.DocumentReference,
    email: string
  ) => {
    try {
      await user.updateEmail(email);
      await userRef.update({ email });

      return true;
    } catch (error: any) {
      throw new Error(`Failed to update email: ${error.message}`);
    }
  };

  const updateUserFullName = async (
    userRef: FirebaseFirestoreTypes.DocumentReference,
    fullName: string
  ) => {
    try {
      await userRef.update({ fullName });
      dispatch(changeFullName(fullName));

      return true;
    } catch (error: any) {
      throw new Error(`Failed to update full name: ${error.message}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AccountSettingsSchema}
      onSubmit={(value) => changeUserInfo(value)}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
      }) => (
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

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              disabled={changeUserInfoLoading}
              onPress={() => handleSubmit()}
              style={styles.changeUserInfoButton}
            >
              {changeUserInfoLoading && (
                <View style={styles.loader}>
                  <ActivityIndicator color={"black"} />
                </View>
              )}
              <Text style={styles.changeUserInfoText}>Change user info</Text>
            </TouchableOpacity>
          </View>

          {changeUserInfoError && (
            <View>
              <Text style={[styles.errorText, { textAlign: "center" }]}>
                {changeUserInfoError}
              </Text>
            </View>
          )}

          {changeUserInfoSuccess && (
            <View>
              <Text style={[styles.successText, { textAlign: "center" }]}>
                {changeUserInfoSuccess}
              </Text>
            </View>
          )}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 8,
  },
  successText: {
    color: "green",
    fontSize: 14,
    marginVertical: 8,
  },
  loader: {
    paddingTop: 10,
    marginRight: 10,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  changeUserInfoButton: {
    flexDirection: "row",
  },
  changeUserInfoText: {
    color: Colors.DarkBlue,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default AccountSettingsForm;
