import React, { FC } from "react";
import { View, FlatList, StyleSheet, Platform, Text } from "react-native";
import {
  BaseHistoryItem,
  HistoryType,
  Session,
} from "@/components/ui/HistoryList/types";
import HistoryItem from "@/components/ui/HistoryList/HistoryItem";
import CustomHeader from "@/components/ui/CustomHeader";
import ClearHistory from "@/assets/images/ClearHistory";
import ClearSessionHistory from "@/assets/images/ClearSessionHistoryIcon";
import { Typography } from "@/types/Typography";

interface CustomHistoryScreenProps<T extends BaseHistoryItem> {
  data: T[];
  screenTitle: string;
  loadSessions: () => void;
}

const CustomHistoryScreen: FC<
  CustomHistoryScreenProps<BaseHistoryItem | Session>
> = ({ data, screenTitle, loadSessions }) => {
  return (
    <View
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: 40 },
      ]}
    >
      <CustomHeader
        screenTitle={screenTitle}
        // path={screenTitle === "Question history" ? "questions" : "home"}
      />
      {data.length === 0 ? (
        <View style={styles.clearHistoryBlock}>
          <Text style={[Typography.smallRegular, { color: "#696969" }]}>
            You don't have any{" "}
            {screenTitle === "Question history" ? "questions" : "sessions"}{" "}
            created yet
          </Text>
          <ClearSessionHistory />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <HistoryItem
                item={item}
                loadSessions={loadSessions}
                historyType={
                  screenTitle === "Question history"
                    ? HistoryType.QUESTION
                    : HistoryType.SESSION
                }
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
  },
  header: {
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    paddingBottom: 120,
  },
  itemWrapper: {
    marginBottom: 10,
  },
  clearHistoryBlock: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomHistoryScreen;
