import firestore from "@react-native-firebase/firestore";
import { Question } from "@/api/openaiApi";
import { useCallback } from "react";
import { CreateSessionDTO, FirestoreSession } from "@/types/SessionsTypes";

const SESSIONS_COLLECTION = "sessions";

export const useCreateSession = () => {
  return useCallback(
    async (
      userId: string,
      sessionData: CreateSessionDTO
    ): Promise<FirestoreSession> => {
      try {
        const timestamp = Date.now();
        const sessionRef = firestore().collection(SESSIONS_COLLECTION).doc();

        const newSession: FirestoreSession = {
          id: sessionRef.id,
          userId,
          createdAt: timestamp,
          updatedAt: timestamp,
          ...sessionData,
        };

        await sessionRef.set(newSession);

        return newSession;
      } catch (error) {
        console.error("Error creating session:", error);
        throw new Error("Failed to create session");
      }
    },
    []
  );
};

// Хук для отримання сесій користувача
export const useGetUserSessions = () => {
  return useCallback(async (userId: string): Promise<FirestoreSession[]> => {
    try {
      const querySnapshot = await firestore()
        .collection(SESSIONS_COLLECTION)
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

      return querySnapshot.docs.map((doc) => ({
        ...(doc.data() as FirestoreSession),
        id: doc.id,
      }));
    } catch (error) {
      console.error("Error getting user sessions:", error);
      throw new Error("Failed to get user sessions");
    }
  }, []);
};

// Хук для оновлення сесії
export const useUpdateSession = () => {
  return useCallback(
    async (
      sessionId: string,
      updates: Partial<CreateSessionDTO>
    ): Promise<void> => {
      try {
        await firestore()
          .collection(SESSIONS_COLLECTION)
          .doc(sessionId)
          .update({
            ...updates,
            updatedAt: Date.now(),
          });
      } catch (error) {
        console.error("Error updating session:", error);
        throw new Error("Failed to update session");
      }
    },
    []
  );
};

export const removeSessionBySessionId = async (
  sessionId: string
): Promise<void> => {
  try {
    await firestore().collection(SESSIONS_COLLECTION).doc(sessionId).delete();
  } catch (error) {
    console.error("Error removing session:", error);
    throw new Error("Failed to remove session.");
  }
};

// Хук для отримання сесії за ID
export const useGetSessionById = () => {
  return useCallback(
    async (sessionId: string): Promise<FirestoreSession | null> => {
      try {
        const doc = await firestore()
          .collection(SESSIONS_COLLECTION)
          .doc(sessionId)
          .get();

        if (!doc.exists) {
          return null;
        }

        return {
          ...(doc.data() as FirestoreSession),
          id: doc.id,
        };
      } catch (error) {
        console.error("Error getting session by ID:", error);
        throw new Error("Failed to get session");
      }
    },
    []
  );
};

// Хук для підписки на сесії користувача в реальному часі
export const useSubscribeToUserSessions = () => {
  return useCallback(
    (
      userId: string,
      onUpdate: (sessions: FirestoreSession[]) => void,
      onError?: (error: Error) => void
    ) => {
      return firestore()
        .collection(SESSIONS_COLLECTION)
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (snapshot) => {
            const sessions = snapshot.docs.map((doc) => ({
              ...(doc.data() as FirestoreSession),
              id: doc.id,
            }));
            onUpdate(sessions);
          },
          (error) => {
            console.error("Error in sessions subscription:", error);
            if (onError) {
              onError(error as Error);
            }
          }
        );
    },
    []
  );
};

// Утиліти для використання поза компонентами
export const sessionUtils = {
  // Створення сесії
  createSession: async (
    userId: string,
    sessionData: CreateSessionDTO
  ): Promise<FirestoreSession> => {
    const timestamp = Date.now();
    const sessionRef = firestore().collection(SESSIONS_COLLECTION).doc();

    const newSession: FirestoreSession = {
      id: sessionRef.id,
      userId,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...sessionData,
    };

    await sessionRef.set(newSession);

    return newSession;
  },

  // Отримання сесій користувача
  getUserSessions: async (userId: string): Promise<FirestoreSession[]> => {
    const querySnapshot = await firestore()
      .collection(SESSIONS_COLLECTION)
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return querySnapshot.docs.map((doc) => ({
      ...(doc.data() as FirestoreSession),
      id: doc.id,
    }));
  },

  // Оновлення сесії
  updateSession: async (
    sessionId: string,
    updates: Partial<CreateSessionDTO>
  ): Promise<void> => {
    await firestore()
      .collection(SESSIONS_COLLECTION)
      .doc(sessionId)
      .update({
        ...updates,
        updatedAt: Date.now(),
      });
  },

  // Видалення сесії
  deleteSession: async (sessionId: string): Promise<void> => {
    await firestore().collection(SESSIONS_COLLECTION).doc(sessionId).delete();
  },

  // Отримання сесії за ID
  getSessionById: async (
    sessionId: string
  ): Promise<FirestoreSession | null> => {
    const doc = await firestore()
      .collection(SESSIONS_COLLECTION)
      .doc(sessionId)
      .get();

    if (!doc.exists) {
      return null;
    }

    return {
      ...(doc.data() as FirestoreSession),
      id: doc.id,
    };
  },
};
