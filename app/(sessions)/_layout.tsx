import { createStackNavigator } from "@react-navigation/stack";
import AnswersSession from "./answersSession";
import VerseResults from "./questionResult";
import { INavigationData } from "@/components/forms/SessionForm";

export type RootStackParamList = {
  "(tabs)": undefined;
  "(sessions)": {
    screen: keyof SessionsStackParamList;
    params?: SessionsStackParamList["answersSession"];
  };
  "(auth)": undefined;
};

export type SessionsStackParamList = {
  answersSession: { sessionData: INavigationData };
  questionResult: undefined;
};

const Stack = createStackNavigator<SessionsStackParamList>();

export default function SessionsLayout() {
  return (
    <Stack.Navigator initialRouteName="answersSession">
      <Stack.Screen
        name="answersSession"
        options={{
          headerShown: false,
          header: () => null,
        }}
        component={AnswersSession}
      />
      <Stack.Screen
        name="questionResult"
        options={{
          headerShown: false,
          header: () => null,
        }}
        component={VerseResults}
      />
    </Stack.Navigator>
  );
}
