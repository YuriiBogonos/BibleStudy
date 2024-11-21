import auth from "@react-native-firebase/auth";
import { sanitizeUser } from "@/services/authServices/SignUpServive";

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);

    const sanitizedUser = sanitizeUser(user);

    return { success: true, user: sanitizedUser };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unexpected error occurred." };
    }
  }
};
