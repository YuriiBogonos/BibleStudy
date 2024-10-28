import { Stack } from "expo-router";

export default function SessionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="answersSession"
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="questionResult"
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
    </Stack>
  );
}
