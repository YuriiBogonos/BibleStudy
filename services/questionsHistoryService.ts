import firestore from "@react-native-firebase/firestore";
import {
  IFirestoreQuestion,
  IQuestionNavigationData,
  IQuestionsData,
} from "@/types/QuestionsTypes";
import { useCallback } from "react";

const QUESTIONS_COLLECTION = "questions";

export const getQuestionsHistory = async (
  userId: string
): Promise<IFirestoreQuestion[]> => {
  try {
    if (!userId) {
      console.log("!userId in createQuestion");
      throw new Error("User ID is required to create a question.");
    }

    const querySnapshot = await firestore()
      .collection(QUESTIONS_COLLECTION)
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IFirestoreQuestion),
      id: doc.id,
    }));
  } catch (error) {
    console.log("error in getQuestionsHistory", error);
    throw new Error(
      "Unable to retrieve the list of questions. Try again later."
    );
  }
};

export const createQuestion = async (
  userId: string | undefined,
  questionsData: IQuestionsData
) => {
  console.log("inside createQuestion");

  if (!userId) {
    console.log("!userId in createQuestion");
    throw new Error("User ID is required to create a question.");
  }

  try {
    const timestamp = Date.now();

    const userQuestionsRef = firestore().collection(QUESTIONS_COLLECTION).doc();

    const newQuestion = {
      id: userQuestionsRef.id,
      userId,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...questionsData,
    };

    await userQuestionsRef.set(newQuestion);
    console.log("Question successfully added!");

    // return newQuestion;
  } catch (error) {
    console.error("Error adding question:", error);
    throw new Error("Failed to create a new question.");
  }
};

export const getQuestionById = async (
  questionId: string
): Promise<IQuestionNavigationData | null> => {
  try {
    const doc = await firestore()
      .collection(QUESTIONS_COLLECTION)
      .doc(questionId)
      .get();

    if (!doc.exists) {
      return null;
    }

    return {
      ...(doc.data() as IQuestionNavigationData),
      // id: doc.id,
    };
  } catch (error) {
    console.error("Error getting session by ID:", error);
    throw new Error("Failed to get session");
  }
};
