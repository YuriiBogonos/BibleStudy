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
        }}
      />
      <Tabs.Screen
        name="accountSettings"
        options={{
          title: "Account Settings",
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
