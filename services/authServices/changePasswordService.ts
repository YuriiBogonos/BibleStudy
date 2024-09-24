import auth from "@react-native-firebase/auth";

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
