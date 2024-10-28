import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "@/types/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Typography } from "@/types/Typography";

interface SessionNavigationProps {
  isMultipleQuestions: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  // Optional Props for Customization
  previousText?: string;
  nextText?: string;
  finishText?: string;
  isLoading?: boolean;
  // Optional Styles
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  finishButtonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  finishButtonTextStyle?: StyleProp<TextStyle>;
}

const SessionNavigation: React.FC<SessionNavigationProps> = ({
  isMultipleQuestions,
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onFinish,
  previousText = "Prev",
  nextText = "Next",
  finishText = "Finish",
  isLoading = false,
  containerStyle,
  buttonStyle,
  finishButtonStyle,
  buttonTextStyle,
  finishButtonTextStyle,
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  if (!isMultipleQuestions) {
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          style={[styles.finishButton, finishButtonStyle]}
          onPress={onFinish}
          accessibilityLabel="Finish Session"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.White} />
          ) : (
            <Text
              style={[
                Typography.bodyMedium,
                styles.buttonText,
                styles.finishButtonText,
                finishButtonTextStyle,
              ]}
            >
              {finishText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.navigationButton,
          isFirstQuestion && styles.disabledButton,
          buttonStyle,
          isFirstQuestion && buttonStyle && { opacity: 0.5 },
        ]}
        onPress={onPrevious}
        disabled={isFirstQuestion || isLoading}
        accessibilityLabel="Previous Question"
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.DarkGray} />
        ) : (
          <View style={styles.buttonWithIcons}>
            <AntDesign name="arrowleft" size={25} color={Colors.White} />
            <Text
              style={[
                Typography.bodyMedium,
                styles.buttonText,
                styles.navigationButtonText,
                isFirstQuestion && styles.disabledButtonText,
                buttonTextStyle,
                isFirstQuestion &&
                  buttonTextStyle && { color: Colors.DarkGray },
              ]}
            >
              {previousText}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {isLastQuestion ? (
        <TouchableOpacity
          style={[styles.finishButton, finishButtonStyle]}
          onPress={onFinish}
          accessibilityLabel="Finish Session"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.White} />
          ) : (
            <Text
              style={[
                Typography.bodyMedium,
                styles.finishButtonText,
                finishButtonTextStyle,
              ]}
            >
              {finishText}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.navigationButton, buttonStyle]}
          onPress={onNext}
          accessibilityLabel="Next Question"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.White} />
          ) : (
            <View style={styles.buttonWithIcons}>
              <AntDesign name="arrowright" size={25} color={Colors.White} />
              <Text
                style={[
                  styles.buttonText,
                  styles.navigationButtonText,
                  buttonTextStyle,
                ]}
              >
                {nextText}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    gap: 10,
  },
  navigationButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.DarkBlue,
    flex: 1,
    alignItems: "center",
  },
  finishButton: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.DarkBlue,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.White,
  },
  navigationButtonText: {
    color: Colors.White,
  },
  finishButtonText: {
    color: Colors.White,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: Colors.White,
  },
  buttonWithIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default SessionNavigation;
