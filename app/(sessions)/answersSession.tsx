import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomHeader from "@/components/ui/CustomHeader";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";
import { BibleVerse, Question } from "@/api/openaiApi";
import { AntDesign } from "@expo/vector-icons";
import NivIcon from "@/assets/images/NivIcon";
import ProcessIcon from "@/assets/images/ProcessIcon";
import TagSelector from "@/components/ui/TagSelector";
import SessionNavigation from "@/components/SessionsNavigation";
import { TopicColor } from "@/types/TopicColor";

export default function AnswersSession() {
  const router = useRouter();
  const { sessionData } = useLocalSearchParams();
  const parsedSessionData = sessionData
    ? JSON.parse(sessionData as string)
    : null;

  useEffect(() => {
    console.log(JSON.stringify(parsedSessionData, null, 2));
  }, [parsedSessionData]);
  const initialFocusTopics = [
    "Empathy",
    "Love",
    "Understanding",
    "Calmness",
    "Forgiveness",
    "Wisdom",
    "Peace",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedVerses, setExpandedVerses] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tagColors, setTagColors] = useState<{ [key: string]: string }>(() => {
    const colors: { [key: string]: string } = {};
    const topicColorValues = Object.values(TopicColor);

    initialFocusTopics.forEach((topic, index) => {
      colors[topic] = topicColorValues[index % topicColorValues.length];
    });

    return colors;
  });
  const questions: Question[] = parsedSessionData?.questions || [];
  const preferredBible = parsedSessionData?.preferredBible || "N/A";
  const complexity = parsedSessionData?.complexity || "N/A";
  const focusTopic = parsedSessionData?.focusTopic || [];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleFinish = () => {
    setIsLoading(true);
    console.log("Session Finished");
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)/multipleSession");
    }, 1000);
  };

  const toggleExpand = (index: number) => {
    const newExpandedVerses = [...expandedVerses];
    newExpandedVerses[index] = !newExpandedVerses[index];
    setExpandedVerses(newExpandedVerses);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader screenTitle={"Active Session"} />

        <View style={styles.infoContainer}>
          <View style={styles.topicBlock}>
            <TagSelector
              tags={Array.isArray(focusTopic) ? focusTopic : [focusTopic]}
              selectedTag={""} // вибір першого тегу або null
              onTagPress={() => {}} // No action needed as we're just displaying the tag
              tagColors={tagColors}
              style={styles.tagSelector}
            />
          </View>

          <View style={styles.detail}>
            <NivIcon />
            <Text style={Typography.sessionCardElem}>{preferredBible}</Text>
          </View>
          <View style={styles.detail}>
            <ProcessIcon />
            <Text style={Typography.sessionCardElem}>{complexity}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {questions.length > 0 && (
            <View>
              <View style={styles.itemContainer}>
                <Text style={[Typography.smallMedium, styles.questionQueue]}>
                  {`${currentIndex + 1}/${questions.length} question`}
                </Text>
                <Text style={[Typography.verseText, styles.questionText]}>
                  {questions[currentIndex]?.content || "Question not available"}
                </Text>
              </View>

              {questions[currentIndex].bible_verse.map(
                (verse: any, index: number) => (
                  <View key={index} style={styles.verseBlock}>
                    <View style={styles.verseHeader}>
                      <Text style={[Typography.smallBold, styles.verseItem]}>
                        {`${verse.book} ${verse.chapter}`}
                      </Text>
                      <TouchableOpacity onPress={() => toggleExpand(index)}>
                        <AntDesign
                          name={expandedVerses[index] ? "up" : "down"}
                          size={14}
                          color={Colors.DarkBlue}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={[Typography.verseText, styles.answerText]}>
                      {expandedVerses[index]
                        ? verse.full_verse
                        : `${verse.full_verse.slice(0, 150)}...`}
                    </Text>
                    <View style={styles.versesNumberContainer}>
                      <Text style={styles.versesNumber}>
                        Verses: {verse.verse}
                      </Text>
                    </View>
                  </View>
                ),
              )}
            </View>
          )}
        </ScrollView>

        <SessionNavigation
          isMultipleQuestions={questions.length > 1}
          currentQuestionIndex={currentIndex}
          totalQuestions={questions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFinish={handleFinish}
          isLoading={isLoading}
          previousText="Previous"
          nextText="Next"
          finishText="Finish"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
    marginBottom: 30,
    marginTop: 20,
  },
  topicBlock: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    flex: 1,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: Colors.LightBlue,
    backgroundColor: Colors.LightBlue,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  questionQueue: {
    color: Colors.DarkBlue,
    marginBottom: 8,
  },
  questionText: {
    fontWeight: "700",
  },
  answerText: {
    color: Colors.Black,
  },
  versesNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  versesNumber: {
    color: Colors.DarkBlue,
  },
  verseBlock: {
    borderWidth: 1,
    borderColor: Colors.DarkBlue,
    backgroundColor: Colors.LightBlue,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  verseItem: {
    color: Colors.DarkGray,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  tagSelector: {
    width: "100%",
  },
});
