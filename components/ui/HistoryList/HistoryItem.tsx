import { View, Text, StyleSheet } from "react-native";
import QuestionsIcon from "@/assets/images/QuestionsIcon";
import VersesIcon from "@/assets/images/VersesIcon";
import NivIcon from "@/assets/images/NivIcon";
import ProcessIcon from "@/assets/images/ProcessIcon";
import { Typography } from "@/types/Typography";
import { Colors } from "@/types/Colors";
import { TopicColor } from "@/types/TopicColor";
import { BaseHistoryItem, Session } from "@/components/ui/HistoryList/types";

interface HistoryItemProps<T extends BaseHistoryItem> {
  item: T;
}

const isSession = (item: BaseHistoryItem): item is Session =>
  "questions" in item;

const HistoryItem = <T extends BaseHistoryItem>({
  item,
}: HistoryItemProps<T>) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={[Typography.bodyMedium, styles.title]}>{item.title}</Text>

        <View style={styles.detailRow}>
          {isSession(item) && (
            <View style={styles.detail}>
              <QuestionsIcon />
              <Text style={Typography.sessionCardElem}>
                {item.questions} Questions
              </Text>
            </View>
          )}

          <View style={styles.detail}>
            <VersesIcon />
            <Text style={Typography.sessionCardElem}>{item.verses} Verses</Text>
          </View>
          <View style={styles.detail}>
            <NivIcon />
            <Text style={Typography.sessionCardElem}>{item.version}</Text>
          </View>

          {!isSession(item) && (
            <View style={styles.detail}>
              <ProcessIcon />
              <Text style={Typography.sessionCardElem}>{item.status}</Text>
            </View>
          )}
        </View>

        {isSession(item) && (
          <View style={styles.detail}>
            <ProcessIcon />
            <Text style={Typography.sessionCardElem}>{item.status}</Text>
          </View>
        )}

        <View style={styles.topicDateContainer}>
          {isSession(item) && (
            <View style={styles.topicBlock}>
              <Text style={styles.topic}>{item.topic}</Text>
            </View>
          )}
          <Text style={[Typography.sessionCardDate, styles.date]}>
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.White,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.29,
    shadowRadius: 4,
    elevation: 4,
  },
  info: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    color: Colors.Black,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    marginBottom: 8,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  topicDateContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  topicBlock: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    backgroundColor: TopicColor.MintGreen,
  },
  topic: {
    color: Colors.Black,
  },
  date: {
    color: Colors.DarkGray,
    marginLeft: "auto",
  },
});

export default HistoryItem;
