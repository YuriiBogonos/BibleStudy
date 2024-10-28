import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";
import CustomInput from "../../components/ui/CustomInput/CustomInput";
import CustomSelect from "../../components/ui/CustomSelect";
import { InputType } from "@/components/ui/CustomInput/types";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Typography } from "@/types/Typography";
import { questionHistory } from "@/mock/mockQuestionsHistory";
import { Formik, FormikHelpers } from "formik";
import { QuestionsGenerationSchema } from "@/validation/QuestionsGenerationSchema";
import Counter from "@/components/ui/Counter";
import HistoryList from "@/components/ui/HistoryList/HistoryList";
import { useGenerateResponseMutation } from "@/api/baseQuery";
import { useRouter } from "expo-router";

interface FormValues {
  question: string;
  verses: number;
  preferredBible: string;
  complexity: string;
}

export default function Questions() {
  const [generateResponse] = useGenerateResponseMutation();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const initialValues: FormValues = {
    question: "",
    verses: 1,
    preferredBible: "",
    complexity: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      setError(null);

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
        max_tokens: 200,
      });

      console.log("API Response:", result);

      if ("data" in result && result.data && "verses" in result.data) {
        const verses = result.data.verses || [];
        const serializedVersesData = JSON.stringify(verses);
        console.log("Serialized verses data:", serializedVersesData);
        router.replace({
          pathname: "/(sessions)/questionResult",
          params: {
            verses: serializedVersesData,
            question: values.question,
            preferredBible: values.preferredBible, // Додаємо preferredBible
            complexity: values.complexity, // Додаємо complexity
          },
        });

        resetForm();
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setError(
        "An error occurred while generating the response. Please try again.",
      );
    }
  };
  return (
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
                options={["Study", "Meditation", "Devotional"]}
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
            >
              <Text style={[Typography.bodyMedium, styles.submitButtonText]}>
                + Submit
              </Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.historyContainer}>
              <HistoryList items={questionHistory} />
            </View>
          </View>
        )}
      </Formik>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
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
});
