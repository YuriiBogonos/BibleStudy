import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Question } from "@/api/openaiApi";
import { AntDesign } from "@expo/vector-icons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import CustomHeader from "@/components/ui/CustomHeader";
import SessionNavigation from "@/components/SessionsNavigation";
import TagSelector from "@/components/ui/TagSelector";
import CustomModal from "@/components/ui/CustomModal";

import { TopicColor } from "@/types/TopicColor";
import { Colors } from "@/types/Colors";
import { Typography } from "@/types/Typography";

import NivIcon from "@/assets/images/NivIcon";
import ProcessIcon from "@/assets/images/ProcessIcon";
import { NavigationProp, SessionsStackParamList } from "@/types/SessionsTypes";

export type AnswersSessionRouteProp = RouteProp<
  SessionsStackParamList,
  "answersSession"
>;

export default function AnswersSession() {
  const navigation = useNavigation();
  const route = useRoute<AnswersSessionRouteProp>();
  const { sessionData: parsedSessionData } = route.params;

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

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null); // Ref for the ScrollView

  const questions: Question[] = parsedSessionData?.questions || [];
  const preferredBible = parsedSessionData?.preferredBible || "N/A";
  const complexity = parsedSessionData?.complexity || "N/A";
  const focusTopic = parsedSessionData?.focusTopic || [];

  // Scroll to top on screen focus
  useFocusEffect(
    React.useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }, [])
  );

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsLoading(false);

        // Scroll to top on question change
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsLoading(false);

        // Scroll to top on question change
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
      }, 500);
    }
  };

  const handleFinish = () => {
    setIsLoading(false);
    setModalVisible(true);
  };

  const toggleExpand = (index: number) => {
    const newExpandedVerses = [...expandedVerses];
    newExpandedVerses[index] = !newExpandedVerses[index];
    setExpandedVerses(newExpandedVerses);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, Platform.OS === "android" && { paddingTop: 40 }]}
    >
      <View style={styles.container}>
        <CustomHeader screenTitle={"Active Session"} />

        <View style={styles.infoContainer}>
          <View style={styles.topicBlock}>
            <TagSelector
              tags={Array.isArray(focusTopic) ? focusTopic : [focusTopic]}
              selectedTag={""}
              onTagPress={() => {}}
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

        <ScrollView
          ref={scrollViewRef} // Attach the ref to the ScrollView
          contentContainerStyle={styles.scrollViewContent}
        >
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
                  <TouchableOpacity
                    key={index}
                    style={styles.verseBlock}
                    onPress={() => toggleExpand(index)}
                  >
                    <View style={styles.verseHeader}>
                      <Text style={[Typography.smallBold, styles.verseItem]}>
                        {`${verse.book} ${verse.chapter}`}
                      </Text>
                      <View>
                        <AntDesign
                          name={expandedVerses[index] ? "up" : "down"}
                          size={14}
                          color={Colors.DarkBlue}
                        />
                      </View>
                    </View>
                    <Text style={[Typography.verseText, styles.answerText]}>
                      {expandedVerses[index]
                        ? verse.full_verse
                        : `${verse.full_verse.slice(0, 50)}...`}
                    </Text>
                    <View style={styles.versesNumberContainer}>
                      <Text style={styles.versesNumber}>
                        Verses: {verse.verses}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
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
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        message="Would you like to end the session?"
        confirmText="Yes, thanks"
        cancelText="Cancel"
        showWarning={false}
      />
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

// export default function AnswersSession() {
//   const navigation = useNavigation<NavigationProp>();

//   const route = useRoute<AnswersSessionRouteProp>();
//   const { sessionData: parsedSessionData } = route.params;

//   const initialFocusTopics = [
//     "Empathy",
//     "Love",
//     "Understanding",
//     "Calmness",
//     "Forgiveness",
//     "Wisdom",
//     "Peace",
//   ];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [expandedVerses, setExpandedVerses] = useState<boolean[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [tagColors, setTagColors] = useState<{ [key: string]: string }>(() => {
//     const colors: { [key: string]: string } = {};
//     const topicColorValues = Object.values(TopicColor);

//     initialFocusTopics.forEach((topic, index) => {
//       colors[topic] = topicColorValues[index % topicColorValues.length];
//     });

//     return colors;
//   });

//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   const questions: Question[] = parsedSessionData?.questions || [];
//   const preferredBible = parsedSessionData?.preferredBible || "N/A";
//   const complexity = parsedSessionData?.complexity || "N/A";
//   const focusTopic = parsedSessionData?.focusTopic || [];

//   const handleNext = () => {
//     if (currentIndex < questions.length - 1) {
//       setIsLoading(true);
//       setTimeout(() => {
//         setCurrentIndex(currentIndex + 1);
//         setIsLoading(false);
//       }, 500);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setIsLoading(true);
//       setTimeout(() => {
//         setCurrentIndex(currentIndex - 1);
//         setIsLoading(false);
//       }, 500);
//     }
//   };

//   const handleFinish = () => {
//     setIsLoading(false);
//     setModalVisible(true);
//   };

//   const toggleExpand = (index: number) => {
//     const newExpandedVerses = [...expandedVerses];
//     newExpandedVerses[index] = !newExpandedVerses[index];
//     setExpandedVerses(newExpandedVerses);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <CustomHeader
//           screenTitle={"Active Session"}
//           // path={() => navigation.goBack()}
//         />

//         <View style={styles.infoContainer}>
//           <View style={styles.topicBlock}>
//             <TagSelector
//               tags={Array.isArray(focusTopic) ? focusTopic : [focusTopic]}
//               selectedTag={""} // вибір першого тегу або null
//               onTagPress={() => {}} // No action needed as we're just displaying the tag
//               tagColors={tagColors}
//               style={styles.tagSelector}
//             />
//           </View>

//           <View style={styles.detail}>
//             <NivIcon />
//             <Text style={Typography.sessionCardElem}>{preferredBible}</Text>
//           </View>
//           <View style={styles.detail}>
//             <ProcessIcon />
//             <Text style={Typography.sessionCardElem}>{complexity}</Text>
//           </View>
//         </View>

//         <ScrollView contentContainerStyle={styles.scrollViewContent}>
//           {questions.length > 0 && (
//             <View>
//               <View style={styles.itemContainer}>
//                 <Text style={[Typography.smallMedium, styles.questionQueue]}>
//                   {`${currentIndex + 1}/${questions.length} question`}
//                 </Text>
//                 <Text style={[Typography.verseText, styles.questionText]}>
//                   {questions[currentIndex]?.content || "Question not available"}
//                 </Text>
//               </View>

//               {questions[currentIndex].bible_verse.map(
//                 (verse: any, index: number) => (
//                   <View key={index} style={styles.verseBlock}>
//                     <View style={styles.verseHeader}>
//                       <Text style={[Typography.smallBold, styles.verseItem]}>
//                         {`${verse.book} ${verse.chapter}`}
//                       </Text>
//                       <TouchableOpacity onPress={() => toggleExpand(index)}>
//                         <AntDesign
//                           name={expandedVerses[index] ? "up" : "down"}
//                           size={14}
//                           color={Colors.DarkBlue}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     <Text style={[Typography.verseText, styles.answerText]}>
//                       {expandedVerses[index]
//                         ? verse.full_verse
//                         : `${verse.full_verse.slice(0, 50)}...`}
//                     </Text>
//                     <View style={styles.versesNumberContainer}>
//                       <Text style={styles.versesNumber}>
//                         Verses: {verse.verses}
//                       </Text>
//                     </View>
//                   </View>
//                 )
//               )}
//             </View>
//           )}
//         </ScrollView>

//         <SessionNavigation
//           isMultipleQuestions={questions.length > 1}
//           currentQuestionIndex={currentIndex}
//           totalQuestions={questions.length}
//           onPrevious={handlePrevious}
//           onNext={handleNext}
//           onFinish={handleFinish}
//           isLoading={isLoading}
//           previousText="Previous"
//           nextText="Next"
//           finishText="Finish"
//         />
//       </View>
//       <CustomModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onConfirm={() => {
//           setModalVisible(false);
//           navigation.goBack();
//           // navigation.navigate(
//           //   returnToFullSessionHistory ? "sessionFullHistory" : "home"
//           // );
//         }}
//         message="Would you like to end the session?"
//         confirmText="Yes, thanks"
//         cancelText="Cancel"
//         showWarning={false}
//       />
//     </SafeAreaView>
//   );
// }
