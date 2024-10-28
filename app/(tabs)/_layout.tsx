import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TabIconHome from "@/assets/images/TabIconHome";
import TabIconQuestions from "@/assets/images/TabIconQuestions";
import TabAccountIcon from "@/assets/images/TabIconAccount";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: TabIconHome,
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="questions"
        options={{
          title: "Questions",
          tabBarIcon: TabIconQuestions,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: TabAccountIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="accountSettings"
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="questionFullHistory"
        options={{
          title: "Question History",
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="sessionFullHistory"
        options={{
          title: "Session History",
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="multipleSession"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
