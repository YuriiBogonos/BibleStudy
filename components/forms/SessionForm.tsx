import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Formik, FormikHelpers } from "formik";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { InputType } from "@/components/ui/CustomInput/types";
import CustomSelect from "@/components/ui/CustomSelect";
import Counter from "@/components/ui/Counter";
import TagSelector from "@/components/ui/TagSelector";
import { SessionsGenerationSchema } from "@/validation/SessionsGenerationSchema";
import { Typography } from "@/types/Typography";
import CustomButton from "@/components/ui/CustomButton";
import NewSessionIcon from "@/assets/images/NewSessionIcon";
import { useRouter } from "expo-router";
import { GenerateSessionPayload } from "@/api/openaiApi";
import { useGenerateSessionMutation } from "@/api/baseQuery";
import { TopicColor } from "@/types/TopicColor";

interface FormValues {
  sessionName: string;
  numberOfQuestions: number;
  verses: number;
  focusTopic: string;
  preferredBible: string;
  complexity: string;
}

const initialFocusTopics = [
  "Empathy",
  "Love",
  "Understanding",
  "Calmness",
  "Forgiveness",
  "Wisdom",
  "Peace",
];

const BibleVersions = ["NIV", "KJV", "ESV"];
const ComplexityLevels = ["Study", "Meditation", "Devotional"];

const SessionForm: React.FC = () => {
  const [generateSession] = useGenerateSessionMutation();
  const router = useRouter();
  const [availableTopics, setAvailableTopics] =
    useState<string[]>(initialFocusTopics);
  const [tagColors, setTagColors] = useState<{ [key: string]: string }>(() => {
    const colors: { [key: string]: string } = {};
    const topicColorValues = Object.values(TopicColor);

    initialFocusTopics.forEach((topic, index) => {
      colors[topic] = topicColorValues[index % topicColorValues.length];
    });

    return colors;
  });

  const initialValues: FormValues = {
    sessionName: "",
    numberOfQuestions: 1,
    verses: 1,
    focusTopic: "",
    preferredBible: "",
    complexity: "",
  };

  const handleAddTag = (newTag: string, color: string) => {
    setAvailableTopics((prevTopics) => [...prevTopics, newTag]);
    setTagColors((prevColors) => ({
      ...prevColors,
      [newTag]: color,
    }));
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const payload: GenerateSessionPayload = {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for Bible study sessions.",
          },
          {
            role: "user",
            content: `Generate ${values.numberOfQuestions} questions based on the topic: ${values.focusTopic} and provide ${values.verses} Bible verses as answers. Use the ${values.preferredBible} version and set complexity to ${values.complexity}.`,
          },
        ],
        sessionInfo: {
          sessionName: values.sessionName,
          focusTopics: values.focusTopic,
          numberOfQuestions: values.numberOfQuestions,
          preferredBible: values.preferredBible,
          complexity: values.complexity,
          numberOfVerses: values.verses,
        },
        max_tokens: 500,
      };

      const result = await generateSession(payload).unwrap();

      if (result) {
        const serializedSessionData = JSON.stringify(result);
        router.navigate({
          pathname: "/(sessions)/answersSession",
          params: { sessionData: serializedSessionData },
        });
        resetForm();
      }
    } catch (error) {
      console.error("Error during session generation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SessionsGenerationSchema}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({
        handleBlur,
        handleSubmit: formikHandleSubmit,
        values,
        setFieldValue,
        errors,
        touched,
        isSubmitting,
        isValid,
      }) => {
        return (
          <ScrollView>
            <View>
              <Text style={[Typography.bodySemibold, styles.label]}>
                Session name
              </Text>
              <CustomInput
                type={InputType.Text}
                placeholder="Create a name"
                value={values.sessionName}
                onChangeText={(text) => {
                  setFieldValue("sessionName", text);
                }}
                onBlur={handleBlur("sessionName")}
              />
              {touched.sessionName && errors.sessionName && (
                <Text style={styles.errorText}>{errors.sessionName}</Text>
              )}

              <View style={styles.counterWrapper}>
                <View style={styles.counterContent}>
                  <Text style={[Typography.bodySemibold, styles.label]}>
                    Number of questions
                  </Text>
                  <Text style={styles.helperText}>
                    Select the number of questions you would like to research
                  </Text>
                </View>
                <Counter
                  value={values.numberOfQuestions}
                  onIncrement={() => {
                    const newValue = values.numberOfQuestions + 1;
                    setFieldValue("numberOfQuestions", newValue);
                  }}
                  onDecrement={() => {
                    const newValue = Math.max(values.numberOfQuestions - 1, 1);
                    setFieldValue("numberOfQuestions", newValue);
                  }}
                />
              </View>
              {touched.numberOfQuestions && errors.numberOfQuestions && (
                <Text style={styles.errorText}>{errors.numberOfQuestions}</Text>
              )}

              <View style={styles.counterWrapper}>
                <View style={styles.counterContent}>
                  <Text style={[Typography.bodySemibold, styles.label]}>
                    Number of verses
                  </Text>
                  <Text style={styles.helperText}>
                    Select the number of verses you would like to research
                  </Text>
                </View>
                <Counter
                  value={values.verses}
                  onIncrement={() => {
                    const newValue = values.verses + 1;
                    setFieldValue("verses", newValue);
                  }}
                  onDecrement={() => {
                    const newValue = Math.max(values.verses - 1, 1);
                    setFieldValue("verses", newValue);
                  }}
                />
              </View>
              {touched.verses && errors.verses && (
                <Text style={styles.errorText}>{errors.verses}</Text>
              )}

              <Text style={[Typography.bodySemibold, styles.label]}>
                Focus Topic
              </Text>
              <TagSelector
                tags={availableTopics}
                selectedTag={values.focusTopic}
                onTagPress={(tag) => {
                  console.log("Selected Tag:", tag);
                  setFieldValue("focusTopic", tag);
                }}
                onAddTag={(newTag: string, color: string) =>
                  handleAddTag(newTag, color)
                }
                tagColors={tagColors}
                style={styles.TagSelector}
              />
              {touched.focusTopic && errors.focusTopic && (
                <Text style={styles.errorText}>{errors.focusTopic}</Text>
              )}

              <Text style={[Typography.bodySemibold, styles.label]}>
                Preferred Bible
              </Text>
              <CustomSelect
                options={BibleVersions}
                value={values.preferredBible}
                onValueChange={(value) => {
                  setFieldValue("preferredBible", value);
                }}
                placeholder="Select preferred Bible"
              />
              {touched.preferredBible && errors.preferredBible && (
                <Text style={styles.errorText}>{errors.preferredBible}</Text>
              )}

              <Text style={[Typography.bodySemibold, styles.label]}>
                Complexity
              </Text>
              <CustomSelect
                options={ComplexityLevels}
                value={values.complexity}
                onValueChange={(value) => {
                  console.log("Complexity selected:", value);
                  setFieldValue("complexity", value);
                }}
                placeholder="Select level"
              />
              {touched.complexity && errors.complexity && (
                <Text style={styles.errorText}>{errors.complexity}</Text>
              )}

              <CustomButton
                text="Create a new session"
                onPress={() => {
                  console.log("Form Validity:", isValid);
                  console.log("Errors:", errors);

                  if (!isValid) {
                    console.log("Form is invalid, validation errors:", errors);
                    return;
                  }
                  formikHandleSubmit();
                }}
                Icon={NewSessionIcon}
                disabled={isSubmitting || !isValid}
              />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  counterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  counterContent: {
    flex: 1,
    paddingRight: 16,
  },
  helperText: {
    color: "#C1C1C1",
    fontSize: 12,
    marginTop: 4,
  },
  TagSelector: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

export default SessionForm;
