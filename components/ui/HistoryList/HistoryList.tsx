import React from "react";
import { View, StyleSheet } from "react-native";
import HistoryHeader from "./HistoryHeader";
import HistoryItem from "./HistoryItem";
import HistoryEmptyState from "./HistoryEmptyState";
import {
  BaseHistoryItem,
  HistoryType,
  HistoryTypeEnum,
  Session,
} from "./types";

interface HistoryListProps<T extends BaseHistoryItem> {
  items: T[];
}

const HistoryList = <T extends BaseHistoryItem>({
  items,
}: HistoryListProps<T>) => {
  const isSession = (item: BaseHistoryItem): item is Session =>
    "questions" in item;

  const determineHistoryType = (): HistoryTypeEnum => {
    if (items.length === 0) {
      return HistoryType.QUESTION;
    }
    return isSession(items[0]) ? HistoryType.SESSION : HistoryType.QUESTION;
  };

  const historyType = determineHistoryType();

  return (
    <View style={styles.container}>
      <HistoryHeader
        title={
          historyType === HistoryType.SESSION
            ? "Session History"
            : "Question History"
        }
        historyType={historyType}
      />
      {items.length === 0 ? (
        <HistoryEmptyState
          isSessionHistory={historyType === HistoryType.SESSION}
        />
      ) : (
        <View style={styles.itemList}>
          {items.map((item) => (
            <View style={styles.itemWrapper}>
              <HistoryItem item={item} />
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
  itemList: {
    flexDirection: "column",
  },
  itemWrapper: {
    marginBottom: 10,
  },
});

export default HistoryList;
