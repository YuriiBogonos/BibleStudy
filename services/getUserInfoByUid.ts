import { firestore } from "@/config/config";

export const getUserInfoByUid = async (uid: string) => {
  try {
    const userDoc = await firestore().collection("users").doc(uid).get();

    if (userDoc.exists) {
      const userData = userDoc.data();

      return userData!.fullName as string;
    } else {
      console.log("No user found with the given UID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data.");
  }
};
