import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/types/Colors";
import CustomInput from "../../components/ui/CustomInput/CustomInput";
import CustomSelect from "../../components/ui/CustomSelect/CustomSelect";
import { InputType } from "@/components/ui/CustomInput/types";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Typography } from "@/types/Typography";
import { questionHistory } from "@/mock/mockQuestionsHistory";

export default function Questions() {
  const [question, setQuestion] = useState("");
  const [verses, setVerses] = useState(1);
  const [preferredBible, setPreferredBible] = useState("");
  const [complexity, setComplexity] = useState("");

  const incrementVerses = () => setVerses((prev) => prev + 1);
  const decrementVerses = () => setVerses((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScreenWrapper>
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
          value={question}
          onChangeText={setQuestion}
        />

        <Text style={styles.label}>Number of verses</Text>
        <View style={styles.versesContainer}>
          <TouchableOpacity
            onPress={decrementVerses}
            style={styles.versesButton}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.versesText}>{verses}</Text>
          <TouchableOpacity
            onPress={incrementVerses}
            style={styles.versesButton}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.helperText}>
          Select the number of verses you would like to research
        </Text>

        <Text style={styles.label}>Preferred Bible</Text>
        <CustomSelect
          options={["NIV", "KJV", "ESV"]}
          value={preferredBible}
          onValueChange={setPreferredBible}
          placeholder="Select preferred Bible"
        />

        <Text style={styles.label}>Level of complexity</Text>
        <CustomSelect
          options={["Study", "Meditation", "Devotional"]}
          value={complexity}
          onValueChange={setComplexity}
          placeholder="Select level"
        />

        <TouchableOpacity style={styles.submitButton}>
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
    marginVertical: 10,
  },
  helperText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 20,
  },
  versesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  versesButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.LightGray,
  },
  buttonText: {
    fontSize: 18,
  },
  versesText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  historyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
