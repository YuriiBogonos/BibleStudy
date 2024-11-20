import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./signIn";
import SignUp from "./signUp";

const Stack = createStackNavigator();

export default function AuthLayout({ route }: any) {
  console.log("route", route);
  return (
    <Stack.Navigator initialRouteName="signUp">
      <Stack.Screen
        name="signUp"
        options={{ headerShown: false }}
        component={SignUp}
      />
      <Stack.Screen
        name="signIn"
        options={{ headerShown: false }}
        component={SignIn}
      />
    </Stack.Navigator>
  );
}
