import { Stack } from "expo-router";

export default function AuthLayout({ route }: any) {
  console.log("route", route);
  return (
    <Stack>
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
    </Stack>
  );
}
