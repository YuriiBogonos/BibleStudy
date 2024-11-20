import { createStackNavigator } from "@react-navigation/stack";
import AnswersSession from "./answersSession";
import VerseResults from "./questionResult";

const Stack = createStackNavigator();

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
