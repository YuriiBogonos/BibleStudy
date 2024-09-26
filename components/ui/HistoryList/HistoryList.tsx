import { View, StyleSheet } from "react-native";
import HistoryHeader from "./HistoryHeader";
import HistoryItem from "./HistoryItem";
import HistoryEmptyState from "./HistoryEmptyState";
import { BaseHistoryItem, Session } from "./types";

interface HistoryListProps<T extends BaseHistoryItem> {
  items: T[];
}

const HistoryList = <T extends BaseHistoryItem>({
  items,
}: HistoryListProps<T>) => {
  const isSession = (item: BaseHistoryItem): item is Session =>
    "questions" in item;

  return (
    <View style={styles.container}>
      <HistoryHeader
        title={isSession(items[0]) ? "Session History" : "Question History"}
      />
      {items.length === 0 ? (
        <HistoryEmptyState isSessionHistory={isSession(items[0])} />
      ) : (
        <View style={styles.itemList}>
          {items.map((item, index) => (
            <HistoryItem key={index} item={item} />
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
  itemList: {
    flexDirection: "column",
    gap: 10,
  },
});

export default HistoryList;
