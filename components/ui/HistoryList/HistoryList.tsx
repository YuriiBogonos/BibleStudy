import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
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
  isLoading?: boolean;
  error?: string | null;
  historyType: HistoryTypeEnum | string;
  shouldDisabledItem: boolean;
  loadSessions: () => void;
}

const HistoryList = <T extends BaseHistoryItem>({
  items,
  isLoading = false,
  historyType,
  shouldDisabledItem,
  loadSessions,
}: // returnToFullSessionHistory,
HistoryListProps<T>) => {
  // const isSession = (item: BaseHistoryItem): item is Session =>
  //   "questions" in item;

  // const determineHistoryType = (): HistoryTypeEnum => {
  //   if (items.length === 0) {
  //     return HistoryType.QUESTION;
  //   }
  //   return isSession(items[0]) ? HistoryType.SESSION : HistoryType.QUESTION;
  // };

  // const historyType = determineHistoryType();
  // console.log("historyType ===>", historyType);

  return (
    <View style={styles.container}>
      <HistoryHeader
        title={
          historyType === HistoryType.SESSION
            ? "Session History"
            : "Question History"
        }
        historyType={historyType}
        loading={isLoading}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : items.length === 0 ? (
        <HistoryEmptyState
          isSessionHistory={historyType === HistoryType.SESSION}
        />
      ) : (
        <View style={styles.itemList}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              <HistoryItem
                item={item}
                shouldDisabledItems={shouldDisabledItem}
                loadSessions={loadSessions}
                historyType={historyType}
                // returnToFullSessionHistory={returnToFullSessionHistory}
              />
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
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HistoryList;
