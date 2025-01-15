import { Dispatch, SetStateAction } from "react";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { formatFirebaseErrorMessage } from "./formatFirebaseError";

interface IAppleSignIn {
  setFirebaseError: Dispatch<SetStateAction<string>>;
}

export const signInWithAppleFunc = async ({
  setFirebaseError,
}: IAppleSignIn) => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error("Apple Sign-In failed - no identify token returned");
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

    return auth().signInWithCredential(appleCredential);
  } catch (error: any) {
    console.log("error in ===>", error);
    if (error instanceof Error) {
      setFirebaseError(formatFirebaseErrorMessage(error.message));
    } else {
      setFirebaseError("Something went wrong. Try again later!");
    }
  }
};
