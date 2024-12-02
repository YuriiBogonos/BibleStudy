import { firestore } from "@/config/config";

export interface IVerse {
  proverbs: string;
  verse: string;
}

export const getVerseOfTheWeekById = async (): Promise<IVerse | null> => {
  try {
    // Ensure you're accessing the correct document by specifying its ID
    const docRef = firestore().collection("verseOfTheWeek").doc("verseID");
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      console.log("No document found with ID 'verseID'");
      return null;
    }

    // Extract all fields as defined in IVerse
    const data = docSnapshot.data() as IVerse;

    // console.log("Retrieved verse data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching verseOfTheWeek:", error);
    throw new Error("Failed to fetch verse of the week. Please try again.");
  }
};
