import {
  ActivityIndicator,
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FC, useCallback, useEffect, useState } from "react";
import ShareIcon from "@/assets/images/ShareIcon";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";
import { IVerse, getVerseOfTheWeekById } from "@/services/verseWeekService";

const defaultVerse: string =
  "Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.";

const VerseOfWeek: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successGetVerse, setSuccessGetVerse] = useState<IVerse | null>();
  const [errorGetVerse, setErrorGetVerse] = useState<string>();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: successGetVerse?.verse ? successGetVerse?.verse : defaultVerse,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const getVerseOfTheWeek = useCallback(async () => {
    try {
      setLoading(true);
      setErrorGetVerse("");
      setSuccessGetVerse(null);

      const verseWeek = await getVerseOfTheWeekById();

      if (verseWeek?.proverbs === "" || verseWeek?.verse === "") {
        setSuccessGetVerse({
          proverbs: "Proverbs 3:5-6",
          verse: defaultVerse,
        });
        return;
      }

      setSuccessGetVerse(verseWeek);
    } catch (error: any) {
      console.log("error in getVerseWeek", error);
      setErrorGetVerse("Error in verse of the week");
    } finally {
      setLoading(false);
    }
  }, [defaultVerse]);

  useEffect(() => {
    getVerseOfTheWeek();
  }, [getVerseOfTheWeek]);

  return (
    <View style={styles.verseContainer}>
      <View style={styles.verseHeader}>
        <Text style={[Typography.smallMedium, styles.verseTitle]}>
          Verse of the week
        </Text>
        <TouchableOpacity onPress={onShare}>
          <ShareIcon />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <Text style={[Typography.verseText]}>
            {errorGetVerse
              ? `"Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.""`
              : `"${successGetVerse?.verse}"`}
          </Text>
          <Text style={styles.proverbs}>
            {errorGetVerse ? "Proverbs 3:5-6" : successGetVerse?.proverbs}
          </Text>
        </View>
      )}
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
  proverbs: { textAlign: "right", color: "#696969", fontWeight: "bold" },
});

export default VerseOfWeek;
