import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";
import CustomInput from "../../components/ui/CustomInput/CustomInput";
import CustomSelect from "../../components/ui/CustomSelect/CustomSelect";
import { InputType } from "@/components/ui/CustomInput/types";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Typography } from "@/types/Typography";
import { questionHistory } from "@/mock/mockQuestionsHistory";
import { Formik, FormikHelpers } from "formik";
import { QuestionsGenerationSchema } from "@/validation/QuestionsGenerationSchema";
import Counter from "@/components/ui/Counter/Counter";
import { useGenerateResponseMutation } from "@/api/openaiApi";

interface FormValues {
  question: string;
  verses: number;
  preferredBible: string;
  complexity: string;
}

export default function Questions() {
  const [generateResponse] = useGenerateResponseMutation();
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
      const prompt = `Question: ${values.question}\nNumber of verses: ${values.verses}\nPreferred Bible: ${values.preferredBible}\nComplexity: ${values.complexity}`;

      const result = await generateResponse({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that answers Bible-related questions.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 150, // Adjust as needed
      });

      console.log("API Response:", result);

      // If the API call is successful, reset the form
      resetForm();
    } catch (error) {
      console.error("Error generating response:", error);
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
            <Text style={[Typography.homeTitle, styles.title]}>
              Bible Inquiries
            </Text>

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

            <Text style={[Typography.bodySemibold, styles.label]}>
              Preferred Bible
            </Text>
            <CustomSelect
              options={["NIV", "KJV", "ESV"]}
              value={values.preferredBible}
              onValueChange={(value) => setFieldValue("preferredBible", value)}
              placeholder="Select preferred Bible"
            />
            {touched.preferredBible && errors.preferredBible && (
              <Text style={styles.errorText}>{errors.preferredBible}</Text>
            )}

            <Text style={styles.label}>Level of complexity</Text>
            <CustomSelect
              options={["Study", "Meditation", "Devotional"]}
              value={values.complexity}
              onValueChange={(value) => setFieldValue("complexity", value)}
              placeholder="Select level"
            />
            {touched.complexity && errors.complexity && (
              <Text style={styles.errorText}>{errors.complexity}</Text>
            )}

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>+ Submit</Text>
            </TouchableOpacity>

            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Question history</Text>
                <TouchableOpacity>
                  <Text style={styles.viewHistory}>View full history</Text>
                </TouchableOpacity>
              </View>

              {questionHistory.map((item) => (
                <View key={item.id} style={styles.historyItem}>
                  <Text style={styles.historyQuestion}>{item.question}</Text>
                  <View style={styles.historyDetails}>
                    <Text>{item.verses}</Text>
                    <Text>{item.bible}</Text>
                    <Text>{item.complexity}</Text>
                    <Text>{item.date}</Text>
                  </View>
                </View>
              ))}
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
  title: {
    marginBottom: 20,
  },
  label: {
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  historyContainer: {
    marginTop: 30,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyTitle: {
    fontSize: 18,
  },
  viewHistory: {
    color: Colors.DarkBlue,
    textDecorationLine: "underline",
  },
  historyItem: {
    backgroundColor: Colors.LightGray,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  historyQuestion: {
    marginBottom: 5,
  },
  historyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  versesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
