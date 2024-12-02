import { createStackNavigator } from "@react-navigation/stack";

import SessionHistoryScreen from "./sessionFullHistory";
import QuestionHistoryScreen from "./questionFullHistory";
import AccountSettings from "./accountSettings";

import { HistoryStackParamList } from "@/types/SessionsTypes";
import MultipleSession from "../(tabs)/multipleSession";

const Stack = createStackNavigator<HistoryStackParamList>();

export default function HistoryLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sessionFullHistory"
        options={{
          headerShown: false,
          header: () => null,
        }}
        component={SessionHistoryScreen}
      />
      <Stack.Screen
        name="questionFullHistory"
        options={{
          headerShown: false,
          header: () => null,
        }}
        component={QuestionHistoryScreen}
      />
      <Stack.Screen
        name="accountSettings"
        options={{
          headerShown: false,
          header: () => null,
        }}
        component={AccountSettings}
      />
      <Stack.Screen
        name="multipleSession"
        options={{
          headerShown: false,
          header: () => null,
        }}
        component={MultipleSession}
      />
    </Stack.Navigator>
  );
}
