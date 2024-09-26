import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import ShareIcon from "@/assets/images/ShareIcon";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";

const VerseOfWeek: FC = () => {
  return (
    <View style={styles.verseContainer}>
      <View style={styles.verseHeader}>
        <Text style={[Typography.smallMedium, styles.verseTitle]}>
          Verse of the week
        </Text>
        <ShareIcon />
      </View>
      <Text style={[Typography.verseText]}>
        "Trust in the Lord with all your heart, and lean not on your own
        understanding; in all your ways acknowledge Him, and He shall direct
        your paths."
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  verseContainer: {
    backgroundColor: Colors.LightBlue,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.DarkBlue,
    padding: 16,
    marginVertical: 15,
  },
  verseTitle: {
    color: Colors.DarkBlue,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default VerseOfWeek;
