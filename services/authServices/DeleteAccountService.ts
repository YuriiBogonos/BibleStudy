import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const deleteAccountService = async () => {
  try {
    const user = auth().currentUser;
    if (!user) {
      console.log("No user is logged in.");
      return { success: false, error: "User is not logged in." };
    }

    const userId = user.uid;

    const firestoreResult = await deleteUserFromFirestoreService(userId);
    if (!firestoreResult.success) {
      return { success: false, error: firestoreResult.error };
    }

    const authResult = await deleteUserFromAuthService();
    if (!authResult.success) {
      return { success: false, error: authResult.error };
    }

    return { success: true };
  } catch (error: any) {
    console.log(
      "Error occurred during account deletion:",
      error.message || error,
    );
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
};

export const deleteUserFromFirestoreService = async (documentId: string) => {
  try {
    await firestore().collection("users").doc(documentId).delete();
    console.log(
      `Firestore user with document ID ${documentId} has been deleted.`,
    );
    return { success: true };
  } catch (error: any) {
    console.log("Error deleting user from Firestore:", error.message || error);
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
};

export const deleteUserFromAuthService = async () => {
  try {
    const user = auth().currentUser;
    if (!user) {
      console.log("No user is logged in.");
      return { success: false, error: "User is not logged in." };
    }

    const userId = user.uid;
    await user.delete();
    console.log(`Firebase Auth user with ID ${userId} has been deleted.`);
    return { success: true };
  } catch (error: any) {
    if (error.code === "auth/requires-recent-login") {
      console.log("Recent authentication required. Please sign in again.");
      return {
        success: false,
        error: "Recent authentication required. Please sign in again.",
      };
    }
    console.log(
      "Error deleting user from Firebase Auth:",
      error.message || error,
    );
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
};
