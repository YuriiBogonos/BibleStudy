import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import SessionNavigation from "@/components/SessionsNavigation";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomModal from "@/components/ui/CustomModal";

import { Typography } from "@/types/Typography";
import { SessionsStackParamList } from "@/types/SessionsTypes";
import { Colors } from "@/types/Colors";

import NivIcon from "@/assets/images/NivIcon";
import ProcessIcon from "@/assets/images/ProcessIcon";

export type QuestionsRouteProp = RouteProp<
  SessionsStackParamList,
  "questionResult"
>;

const VerseResults = () => {
  const navigation = useNavigation<any>();

  const { params } = useRoute<QuestionsRouteProp>();
  const { complexity, preferredBible, question, verses } = params.questionsData;

  const [expandedVerses, setExpandedVerses] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
    setIsLoading(false);
    setModalVisible(true);
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
            <TouchableOpacity
              key={index}
              style={styles.verseCard}
              onPress={() => toggleExpand(index)}
            >
              <View style={styles.verseHeader}>
                <Text style={[Typography.smallBold, styles.verseReference]}>
                  {`${verse.book} : ${verse.chapter}`}
                </Text>
                <View>
                  <AntDesign
                    name={expandedVerses[index] ? "up" : "down"}
                    size={14}
                    color={Colors.DarkBlue}
                  />
                </View>
              </View>
              <Text style={[Typography.verseText, styles.verseText]}>
                {expandedVerses[index]
                  ? verse.full_verse
                  : `${verse.full_verse.slice(0, 50)}...`}
              </Text>
              <View style={styles.versesNumberContainer}>
                <Text style={styles.verseNumber}>Verses: {verse.verse}</Text>
              </View>
            </TouchableOpacity>
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
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          navigation.goBack();
          // navigation.navigate("questions");
        }}
        message="Would you like to end the session?"
        confirmText="Yes, thanks"
        cancelText="Cancel"
        showWarning={false}
      />
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
    paddingVertical: 14,
    paddingHorizontal: 14,
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
