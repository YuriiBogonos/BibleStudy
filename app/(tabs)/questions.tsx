import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikHelpers } from "formik";

import CustomInput from "../../components/ui/CustomInput/CustomInput";
import CustomSelect from "../../components/ui/CustomSelect";
import { InputType } from "@/components/ui/CustomInput/types";
import ScreenWrapper from "../../components/ScreenWrapper";
import Counter from "@/components/ui/Counter";
import HistoryList from "@/components/ui/HistoryList/HistoryList";

import { Typography } from "@/types/Typography";
import { Colors } from "@/types/Colors";
// import { questionHistory } from "@/mock/mockQuestionsHistory";
import { QuestionsGenerationSchema } from "@/validation/QuestionsGenerationSchema";
import { useGenerateResponseMutation } from "@/api/baseQuery";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { NavigationProp } from "@/types/SessionsTypes";
import {
  IQuestionNavigationData,
  IQuestionsData,
  IQuestionsFormValues,
  IVerses,
} from "@/types/QuestionsTypes";
import {
  createQuestion,
  getQuestionsHistory,
} from "@/services/questionsHistoryService";
import { setQuestions } from "@/store/slices/historySlice";
import { HistoryType } from "@/components/ui/HistoryList/types";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function Questions() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [generateResponse] = useGenerateResponseMutation();

  const user = useSelector((state: RootState) => state.auth.user);
  const questions = useSelector((state: RootState) => state.history.questions);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const [questionsError, setQuestionsError] = useState<string>("");

  // const [questionsList, setQuestionsList] = useState<any>([]);

  const initialValues: IQuestionsFormValues = {
    question: "",
    verses: 1,
    preferredBible: "",
    complexity: "",
  };

  const handleSubmit = async (
    values: IQuestionsFormValues,
    { resetForm }: FormikHelpers<IQuestionsFormValues>
  ) => {
    try {
      setError(null);
      setIsLoading(true);

      const result = await generateResponse({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that answers Bible-related questions.",
          },
          {
            role: "user",
            content: `Question: ${values.question}\nNumber of verses: ${values.verses}\nPreferred Bible: ${values.preferredBible}\nComplexity: ${values.complexity}`,
          },
        ],
        max_tokens: 300,
      });

      console.log("API Response on Question: ====>", result);

      if ("data" in result && result.data && "verses" in result.data) {
        const verses = result.data.verses || [];
        const serializedVersesData = JSON.stringify(verses);
        console.log("Serialized verses data:", serializedVersesData);

        const questionsData: IQuestionNavigationData = {
          verses: serializedVersesData,
          question: values.question,
          preferredBible: values.preferredBible,
          complexity: values.complexity,
        };

        const questionsDataFirebase: IQuestionsData = {
          verses: verses as IVerses[],
          question: values.question,
          preferredBible: values.preferredBible,
          complexity: values.complexity,
        };

        await createQuestion(
          user?.uid,
          questionsDataFirebase as IQuestionsData
        );

        setIsLoading(false);

        navigation.navigate("(sessions)", {
          screen: "questionResult",
          params: { questionsData },
        });

        resetForm();
      } else {
        console.log("data is not a data", error);
        throw new Error(
          error
            ? error
            : "An error occurred while generating the response. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Error generating response:", error);
      setIsLoading(false);

      setError(
        error.message ||
          "An error occurred while generating the response. Please try again."
      );
    }
  };

  const loadQuestions = useCallback(async () => {
    console.log("Loading questions...");
    setLoadingQuestions(true);
    setQuestionsError("");
    setError("");

    if (!user?.uid) {
      setLoadingQuestions(false);
      return;
    }

    try {
      const firestoreSession = await getQuestionsHistory(user.uid);

      const convertedQuestions = firestoreSession.map((question) => ({
        id: question.id,
        title: question.question,
        version: question.preferredBible,
        verses: question.verses.length,
        date: new Date(question.createdAt).toLocaleDateString(),
        status: question.complexity,
      }));

      dispatch(setQuestions(convertedQuestions));
    } catch (error) {
      console.error("Error in getQuestionsHistory:", error);
      setQuestionsError("Failed to load questions. Please try again later.");
    } finally {
      setLoadingQuestions(false);
    }
  }, [user?.uid, getQuestionsHistory, dispatch]);

  useFocusEffect(
    useCallback(() => {
      loadQuestions();
    }, [loadQuestions])
  );

  return (
    <View style={styles.wrapper}>
      <ScreenWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={QuestionsGenerationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.container}>
              <Text style={[Typography.homeTitle]}>Bible Inquiries</Text>
              <View style={{ paddingVertical: 12 }}>
                <Text style={[Typography.bodySemibold, styles.label]}>
                  Ask Your Question
                </Text>
                <CustomInput
                  type={InputType.Text}
                  placeholder="Type your question here..."
                  value={values.question}
                  onChangeText={handleChange("question")}
                />
                {touched.question && errors.question && (
                  <Text style={styles.errorText}>{errors.question}</Text>
                )}
              </View>

              <View style={styles.versesWrapper}>
                <View style={{ flex: 1 }}>
                  <Text style={[Typography.bodySemibold, styles.label]}>
                    Number of verses
                  </Text>
                  <Text style={[Typography.smallRegular, styles.helperText]}>
                    Select the number of verses you would like to research
                  </Text>
                </View>
                <Counter
                  value={values.verses}
                  onIncrement={() => setFieldValue("verses", values.verses + 1)}
                  onDecrement={() =>
                    setFieldValue("verses", Math.max(values.verses - 1, 1))
                  }
                />
                {touched.verses && errors.verses && (
                  <Text style={styles.errorText}>{errors.verses}</Text>
                )}
              </View>
              <View style={{ paddingVertical: 12 }}>
                <Text style={[Typography.bodySemibold, styles.label]}>
                  Preferred Bible
                </Text>
                <CustomSelect
                  options={["NIV", "KJV", "ESV"]}
                  value={values.preferredBible}
                  onValueChange={(value) =>
                    setFieldValue("preferredBible", value)
                  }
                  placeholder="Select preferred Bible"
                />
                {touched.preferredBible && errors.preferredBible && (
                  <Text style={styles.errorText}>{errors.preferredBible}</Text>
                )}
              </View>
              <View>
                <Text style={[Typography.bodySemibold, styles.label]}>
                  Level of complexity
                </Text>
                <CustomSelect
                  options={[
                    "Kids",
                    "Teen",
                    "Family",
                    "New to Faith",
                    "Study",
                    "Deep Dive",
                  ]}
                  value={values.complexity}
                  onValueChange={(value) => setFieldValue("complexity", value)}
                  placeholder="Select level"
                />
                {touched.complexity && errors.complexity && (
                  <Text style={styles.errorText}>{errors.complexity}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.submitButton}
                disabled={isLoading}
              >
                <Text style={[Typography.bodyMedium, styles.submitButtonText]}>
                  + Submit
                </Text>
                {isLoading && (
                  <View style={styles.loader}>
                    <ActivityIndicator color={"white"} />
                  </View>
                )}
              </TouchableOpacity>
              {error && <Text style={styles.errorText}>{error}</Text>}

              <View style={styles.historyContainer}>
                <HistoryList
                  items={questions?.length ? questions : []}
                  isLoading={loadingQuestions}
                  historyType={HistoryType.QUESTION}
                  shouldDisabledItem={isLoading}
                  loadSessions={loadQuestions}
                  // returnToFullHistory={true}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    paddingVertical: 2,
    color: Colors.Black,
  },
  helperText: {
    color: "#C1C1C1",
    width: "80%",
  },
  submitButton: {
    backgroundColor: Colors.DarkBlue,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: Colors.White,
  },
  historyContainer: {
    marginTop: 30,
  },
  versesWrapper: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  loader: {
    position: "absolute",
    top: 14,
    right: 20,
  },
});
