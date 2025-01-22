import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import QuestionsIcon from "@/assets/images/QuestionsIcon";
import VersesIcon from "@/assets/images/VersesIcon";
import NivIcon from "@/assets/images/NivIcon";
import ProcessIcon from "@/assets/images/ProcessIcon";
import ThreeDotIcon from "@/assets/images/ThreeDotIcon";
import ShareIcon from "@/assets/images/ShareIcon";
import RemoveIcon from "@/assets/images/RemoveIcon";

import { Colors } from "@/types/Colors";
import { TopicColor } from "@/types/TopicColor";
import { Typography } from "@/types/Typography";
import { NavigationProp } from "@/types/SessionsTypes";

import {
  BaseHistoryItem,
  HistoryType,
  Session,
} from "@/components/ui/HistoryList/types";
import {
  getQuestionById,
  removeQuestionBySessionId,
} from "@/services/questionsHistoryService";

import {
  removeSessionBySessionId,
  useGetSessionById,
} from "@/services/SessionHistoryService";
import CustomModal from "../CustomModal";

interface HistoryItemProps<T extends BaseHistoryItem> {
  item: T;
  shouldDisabledItems?: boolean;
  loadSessions: () => void;
  historyType?: string;
  // returnToFullSessionHistory: boolean;
}

const isSession = (item: BaseHistoryItem): item is Session =>
  "questions" in item;

const HistoryItem = <T extends BaseHistoryItem>({
  item,
  shouldDisabledItems,
  loadSessions,
  historyType,
}: // returnToFullSessionHistory,
HistoryItemProps<T>) => {
  const navigation = useNavigation<NavigationProp>();
  const getSessionById = useGetSessionById();

  const [getSessionLoading, setGetSessionLoading] = useState<boolean>(false);
  const [getSessionError, setGetSessionError] = useState<string>("");

  const [openedOptionsBlock, setOpenedOptionsBlock] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const getSessionInfo = async () => {
    setOpenedOptionsBlock(false);

    try {
      setGetSessionLoading(true);
      setGetSessionError("");
      if (isSession(item)) {
        const session = await getSessionById(item.id);

        if (!session) {
          throw new Error("Invalid session generation result");
        }

        navigation.navigate("(sessions)", {
          screen: "answersSession",
          params: {
            sessionData: session,
            // returnToFullSessionHistory: returnToFullSessionHistory,
          },
        });

        return;
      }

      const question = await getQuestionById(item.id);

      if (!question) {
        throw new Error("Invalid question generation result");
      }
      const preparedData = {
        ...question,
        verses: JSON.stringify(question.verses),
        // ...question,
      };

      navigation.navigate("(sessions)", {
        screen: "questionResult",
        params: {
          questionsData: preparedData,
          // returnToQuestionPage: returnToFullSessionHistory,
        },
      });
    } catch (error: any) {
      console.log("error in getSessionById ====>", error);
      setGetSessionError(error.message);
    } finally {
      setGetSessionLoading(false);
    }
  };

  const removeSession = async () => {
    historyType === HistoryType.SESSION
      ? await removeSessionBySessionId(item.id)
      : await removeQuestionBySessionId(item.id);

    setModalVisible(false);

    loadSessions();
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={getSessionInfo}
      disabled={getSessionLoading || shouldDisabledItems}
    >
      <View style={styles.info}>
        <View style={styles.cardHeader}>
          <Text style={[Typography.bodyMedium, styles.title]}>
            {item.title}
          </Text>
          {getSessionLoading && (
            <View>
              <ActivityIndicator />
            </View>
          )}

          {!getSessionLoading && (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setOpenedOptionsBlock(!openedOptionsBlock)}
            >
              <ThreeDotIcon />
            </TouchableOpacity>
          )}

          {openedOptionsBlock && (
            <View style={styles.optionBlock}>
              {/* <TouchableOpacity style={styles.optionBlockButton}>
                <Text style={[Typography.bodyRegular]}>Share the session</Text>
                <View>
                  <ShareIcon />
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.optionBlockButton}
                onPress={() => {
                  setOpenedOptionsBlock(false);
                  setModalVisible(true);
                }}
              >
                <Text style={[Typography.bodyRegular]}>Remove</Text>
                <RemoveIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.detailRow}>
          {isSession(item) && (
            <View style={styles.detail}>
              <QuestionsIcon />
              <Text style={Typography.sessionCardElem}>
                {item.questions} Questions
              </Text>
            </View>
          )}

          <View style={styles.detail}>
            <VersesIcon />
            <Text style={Typography.sessionCardElem}>{item.verses} Verses</Text>
          </View>
          <View style={styles.detail}>
            <NivIcon />
            <Text style={Typography.sessionCardElem}>{item.version}</Text>
          </View>

          {!isSession(item) && (
            <View style={styles.detail}>
              <ProcessIcon />
              <Text style={Typography.sessionCardElem}>{item.status}</Text>
            </View>
          )}
        </View>

        {isSession(item) && (
          <View style={styles.detail}>
            <ProcessIcon />
            <Text style={Typography.sessionCardElem}>{item.status}</Text>
          </View>
        )}

        <View style={styles.topicDateContainer}>
          {isSession(item) && (
            <View style={styles.topicBlock}>
              <Text style={styles.topic}>{item.topic}</Text>
            </View>
          )}
          <Text style={[Typography.sessionCardDate, styles.date]}>
            {item.date}
          </Text>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={removeSession}
        message={`Would you like to remove the ${
          historyType === HistoryType.SESSION ? "session" : "question"
        }?`}
        confirmText="Yes"
        cancelText="Cancel"
        showWarning={false}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",

    backgroundColor: Colors.White,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.29,
    shadowRadius: 4,
    elevation: 4,
  },
  info: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    color: Colors.Black,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    marginBottom: 8,
    zIndex: -1,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
    zIndex: -1,
  },
  topicDateContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    zIndex: -1,
  },
  topicBlock: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    backgroundColor: TopicColor.MintGreen,
  },
  topic: {
    color: Colors.Black,
  },
  date: {
    color: Colors.DarkGray,
    marginLeft: "auto",
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  optionButton: {
    width: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  optionBlock: {
    position: "absolute",
    top: 30,
    right: -10,

    paddingVertical: 4,
    paddingHorizontal: 14,

    width: 240,

    borderRadius: 16,
    backgroundColor: Colors.White,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.29,
    shadowRadius: 4,
    elevation: 4,
  },
  optionBlockButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
    // backgroundColor: "pink",
  },
});

export default HistoryItem;
