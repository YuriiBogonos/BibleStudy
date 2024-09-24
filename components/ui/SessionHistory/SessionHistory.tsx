import { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ClearHistory from "@/assets/images/ClearHistory";
import { Typography } from "@/types/Typography";
import QuestionsIcon from "@/assets/images/QuestionsIcon";
import VersesIcon from "@/assets/images/VersesIcon";
import ProcessIcon from "@/assets/images/ProcessIcon";
import { Colors } from "@/types/Colors";
import NivIcon from "@/assets/images/NivIcon";
import { TopicColor } from "@/types/TopicColor";

interface Session {
  title: string;
  questions: number;
  verses: number;
  version: string;
  status: string;
  topic: string;
  date: string;
}

interface SessionHistoryProps {
  sessions: Session[];
}

const SessionHistory: FC<SessionHistoryProps> = ({ sessions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={Typography.h3}>Session history</Text>
        <TouchableOpacity>
          <Text style={[Typography.smallMedium, styles.viewFullHistory]}>
            View full history
          </Text>
        </TouchableOpacity>
      </View>
      {sessions.length === 0 ? (
        <View style={styles.emptySession}>
          <Text style={styles.emptyText}>
            Here, you can review all your past sessions and track your progress
            on your spiritual journey.
          </Text>
          <ClearHistory />
        </View>
      ) : (
        <View style={styles.sessionList}>
          {sessions.map((session, index) => (
            <View key={index} style={styles.sessionCard}>
              <View style={styles.sessionInfo}>
                <Text style={[Typography.bodyMedium, styles.sessionTitle]}>
                  {session.title}
                </Text>
                <View style={styles.sessionDetails}>
                  <View style={styles.sessionDetail}>
                    <QuestionsIcon />
                    <Text style={Typography.sessionCardElem}>
                      {session.questions} Questions
                    </Text>
                  </View>
                  <View style={styles.sessionDetail}>
                    <VersesIcon />
                    <Text style={Typography.sessionCardElem}>
                      {session.verses} Verses
                    </Text>
                  </View>
                  <View style={styles.sessionDetail}>
                    <NivIcon />
                    <Text style={Typography.sessionCardElem}>
                      {session.version}
                    </Text>
                  </View>
                </View>
                <View style={styles.sessionDetail}>
                  <ProcessIcon />
                  <Text style={Typography.sessionCardElem}>
                    {session.status}
                  </Text>
                </View>
                <View style={styles.TopicWithDatePositions}>
                  <View style={styles.blockStyles}>
                    <Text style={styles.sessionTopic}>{session.topic}</Text>
                  </View>
                  <Text
                    style={[Typography.sessionCardDate, styles.sessionDate]}
                  >
                    {session.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewFullHistory: {
    color: "#007BFF",
  },
  sessionList: {
    flexDirection: "column",
    gap: 10,
  },
  sessionCard: {
    backgroundColor: Colors.White,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.29,
    shadowRadius: 4,

    // Android shadow properties
    elevation: 4,
  },
  sessionInfo: {
    display: "flex",
    alignItems: "flex-start",
  },
  sessionTitle: {
    marginBottom: 8,
  },
  sessionDetails: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    marginBottom: 6,
  },
  sessionDetail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  blockStyles: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    backgroundColor: TopicColor.MintGreen,
  },
  sessionTopic: {
    color: Colors.Black,
  },
  sessionDate: {
    color: Colors.DarkGray,
  },
  emptySession: {
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  TopicWithDatePositions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SessionHistory;
