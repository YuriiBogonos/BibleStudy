import auth from "@react-native-firebase/auth";

export const signOutService = async () => {
  try {
    await auth().signOut();
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: "An unknown error occurred during sign-out.",
    };
  }
};
