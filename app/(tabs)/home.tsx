import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Typography } from "@/types/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";
import VerseOfWeek from "@/components/ui/VerseOfWeek";
import CustomButton from "@/components/ui/CustomButton";
import PlusIconButton from "@/assets/images/PlusIconButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import HistoryList from "@/components/ui/HistoryList/HistoryList";
import { useRouter } from "expo-router";
import { useGetUserSessions } from "@/services/SessionHistoryService";
import { Session } from "@/components/ui/HistoryList/types";
import { Alert } from "react-native";

export default function MainScreen() {
	const user = useSelector((state: RootState) => state.auth.user);
	const router = useRouter();
	const getUserSessions = useGetUserSessions();
	const [sessions, setSessions] = useState<Session[]>([]);
	console.log(sessions);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadSessions = async () => {
			if (!user?.uid) {
				setIsLoading(false);
				return;
			}

			try {
				setIsLoading(true);
				setError(null);

				const firestoreSessions = await getUserSessions(user.uid);
				console.log(firestoreSessions);
				const convertedSessions = firestoreSessions.map((firestoreSession) => ({
					id: firestoreSession.id,
					title: firestoreSession.sessionName,
					verses: firestoreSession.questions.reduce(
						(acc, q) => acc + q.bible_verse.length,
						0
					),
					version: firestoreSession.preferredBible,
					topic: firestoreSession.focusTopic,
					status: firestoreSession.complexity,
					date: new Date(firestoreSession.createdAt).toLocaleDateString(),
					questions: firestoreSession.questions.length,
				}));

				setSessions(convertedSessions);
			} catch (error) {
				console.error("Error loading sessions:", error);
				setError("Failed to load sessions. Please try again later.");
				Alert.alert(
					"Error",
					"Failed to load sessions. Please try again later."
				);
			} finally {
				setIsLoading(false);
			}
		};

		loadSessions();
	}, [user?.uid, getUserSessions]);

	const handleNewSession = () => {
		if (!user?.uid) {
			Alert.alert("Error", "You need to be logged in to create a new session.");
			return;
		}
		router.replace("/(tabs)/multipleSession");
	};

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Text style={Typography.homeTitle}>
					{`God Bless You, ${user?.fullName || "Guest"}!`}
				</Text>
				<VerseOfWeek />
				<CustomButton
					onPress={handleNewSession}
					Icon={PlusIconButton}
					text="Start new session"
				/>
				<View style={styles.sessionHistory}>
					<HistoryList items={sessions} isLoading={isLoading} error={error} />
				</View>
			</View>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 20,
	},
	sessionHistory: {
		paddingVertical: 24,
	},
});
