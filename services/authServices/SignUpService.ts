import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";

export const signUpWithEmailPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    const querySnapshot = await firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!querySnapshot.empty) {
      console.log("A user with this email already exists.");
      return {
        success: false,
        error: "A user with this email already exists.",
      };
    }

    await firestore().collection("users").doc(userCredential.user.uid).set({
      email: email,
      createdAt: firestore.FieldValue.serverTimestamp(),
      fullName: displayName,
    });

    await sendVerificationEmail();

    await auth().signOut();

    // const userDocRef = firestore()
    //   .collection("users")
    //   .doc(userCredential.user.uid);

    // await userDocRef.set({
    //   displayName,
    //   email,
    //   createdAt: firestore.FieldValue.serverTimestamp(),
    // });

    // const userSnapshot = await userDocRef.get();
    // const userData = userSnapshot.data();

    // const sanitizedUser = {
    //   ...sanitizeUser(userCredential.user),
    //   displayName: userData?.displayName,
    // };

    // return { success: true, user: sanitizedUser };
    return {};
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

export const sanitizeUser = (
  user: FirebaseAuthTypes.User,
  displayName: string | null
) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: displayName,
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
