import { Dispatch, SetStateAction } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import { formatFirebaseErrorMessage } from "../formatFirebaseError";
import { firestore } from "@/config/config";

interface IGoogleSignIn {
  setGoogleLoginLoading: Dispatch<SetStateAction<boolean>>;
  setFirebaseError: Dispatch<SetStateAction<string>>;
}

export const signInWithGoogleFunc = async ({
  setGoogleLoginLoading,
  setFirebaseError,
}: IGoogleSignIn) => {
  console.log("inside signInWithGoogleFunc ===>");

  setGoogleLoginLoading(true);
  setFirebaseError("");

  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    await GoogleSignin.signOut();

    const { data } = await GoogleSignin.signIn();

    if (data?.idToken) {
      const googleCredential = auth.GoogleAuthProvider.credential(
        data?.idToken
      );

      const { user } = await auth().signInWithCredential(googleCredential);

      const querySnapshot = await firestore()
        .collection("users")
        .where("email", "==", user.email)
        .get();

      if (!querySnapshot.empty) {
        return {
          success: false,
          error: "A user with this email already exists.",
        };
      }

      await firestore().collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        fullName: user.displayName,
      });

      return;
    }

    setFirebaseError("Something went wrong. Try again later.");
  } catch (error: any) {
    console.log("error in GoogleSignin ====>", error);
    setFirebaseError(formatFirebaseErrorMessage(error.code));
  } finally {
    setGoogleLoginLoading(false);
  }
};
