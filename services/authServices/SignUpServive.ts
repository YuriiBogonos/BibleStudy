import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { User } from "@/types/User";

export const signUpWithEmailPassword = async (
  email: string,
  password: string,
  fullName: string,
) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    const userDocRef = firestore()
      .collection("users")
      .doc(userCredential.user.uid);
    await userDocRef.set({
      fullName: fullName,
      email: email,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    await sendVerificationEmail();

    const userSnapshot = await userDocRef.get();
    const userData = userSnapshot.data();

    const sanitizedUser = {
      ...sanitizeUser(userCredential.user),
      fullName: userData?.fullName,
    };

    return { success: true, user: sanitizedUser };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

export const sanitizeUser = (user: any): User => {
  return {
    uid: user.uid,
    email: user.email,
    fullName: user.fullName,
    photoURL: user.photoURL || "",
    emailVerified: user.emailVerified,
  };
};
export const sendVerificationEmail = async () => {
  const user = auth().currentUser;
  if (user) {
    await user.sendEmailVerification();
  }
};
