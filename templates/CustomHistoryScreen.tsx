import React, { FC } from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
import { BaseHistoryItem, Session } from "@/components/ui/HistoryList/types";
import HistoryItem from "@/components/ui/HistoryList/HistoryItem";
import CustomHeader from "@/components/ui/CustomHeader";

interface CustomHistoryScreenProps<T extends BaseHistoryItem> {
  data: T[];
  screenTitle: string;
}

const CustomHistoryScreen: FC<
  CustomHistoryScreenProps<BaseHistoryItem | Session>
> = ({ data, screenTitle }) => {
  return (
    <View
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: 40 },
      ]}
    >
      <CustomHeader
        screenTitle={screenTitle}
        // path={screenTitle === "Question history" ? "questions" : "home"}ц
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <HistoryItem item={item} />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "100%",
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
});

export default CustomHistoryScreen;
