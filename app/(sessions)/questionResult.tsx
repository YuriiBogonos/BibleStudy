import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Typography } from "@/types/Typography";
import { Colors } from "@/types/Colors";
import CustomHeader from "@/components/ui/CustomHeader";
import { AntDesign } from "@expo/vector-icons";
import SessionNavigation from "@/components/SessionsNavigation";
import NivIcon from "@/assets/images/NivIcon";
import ProcessIcon from "@/assets/images/ProcessIcon";

const VerseResults = () => {
  const { verses, question, preferredBible, complexity } =
    useLocalSearchParams();
  const [expandedVerses, setExpandedVerses] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const parsedVerses: any[] = Array.isArray(verses)
    ? JSON.parse(verses[0])
    : verses
      ? JSON.parse(verses)
      : [];

  const toggleExpand = (index: number) => {
    const newExpandedVerses = [...expandedVerses];
    newExpandedVerses[index] = !newExpandedVerses[index];
    setExpandedVerses(newExpandedVerses);
  };

  const handleFinish = () => {
    setIsLoading(true);
    console.log("Session Finished");

    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)/questions");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader screenTitle={"Active Session"} />
        <View style={styles.questionHeader}>
          <View style={styles.headerRow}>
            <Text style={[Typography.bodySemibold, styles.questionLabel]}>
              Question
            </Text>
            <View style={styles.details}>
              <View style={styles.detail}>
                <NivIcon />
                <Text style={Typography.sessionCardElem}>{preferredBible}</Text>
              </View>
              <View style={styles.detail}>
                <ProcessIcon />
                <Text style={Typography.sessionCardElem}>{complexity}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[Typography.bodySemibold, styles.question]}>
              {question}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {parsedVerses.map((verse, index: number) => (
            <View key={index} style={styles.verseCard}>
              <View style={styles.verseHeader}>
                <Text style={[Typography.smallBold, styles.verseReference]}>
                  {`${verse.book} : ${verse.chapter}`}
                </Text>
                <TouchableOpacity onPress={() => toggleExpand(index)}>
                  <AntDesign
                    name={expandedVerses[index] ? "up" : "down"}
                    size={14}
                    color={Colors.DarkBlue}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[Typography.verseText, styles.verseText]}>
                {expandedVerses[index]
                  ? verse.full_verse
                  : `${verse.full_verse.slice(0, 150)}...`}
              </Text>
              <View style={styles.versesNumberContainer}>
                <Text style={styles.verseNumber}>Verses: {verse.verse}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <SessionNavigation
          isMultipleQuestions={false}
          currentQuestionIndex={0}
          totalQuestions={1}
          onPrevious={() => {}}
          onNext={() => {}}
          onFinish={handleFinish}
          isLoading={isLoading}
          finishText="Finish"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  question: {
    borderRadius: 8,
    marginBottom: 10,
  },
  questionHeader: {
    backgroundColor: Colors.LightBlue,
    flexDirection: "column",
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  verseCard: {
    borderWidth: 1,
    borderColor: Colors.DarkBlue,
    backgroundColor: Colors.LightBlue,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  verseReference: {
    color: Colors.DarkBlue,
  },
  verseText: {
    color: Colors.Black,
  },
  verseNumber: {
    color: Colors.DarkGray,
  },
  versesNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  questionLabel: {
    color: Colors.DarkBlue,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default VerseResults;
