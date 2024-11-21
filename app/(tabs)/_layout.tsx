import React from "react";
// import { Tab } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TabIconHome from "@/assets/images/TabIconHome";
import TabIconQuestions from "@/assets/images/TabIconQuestions";
import TabAccountIcon from "@/assets/images/TabIconAccount";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./home";
import Questions from "./questions";
import Account from "./account";
import AccountSettings from "./accountSettings";
import QuestionHistoryScreen from "./questionFullHistory";
import SessionHistoryScreen from "./sessionFullHistory";
import MultipleSession from "./multipleSession";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tab.Screen
        name="home"
        options={{
          tabBarIcon: TabIconHome,
          title: "Home",
          headerShown: false,
        }}
        component={MainScreen}
      />
      <Tab.Screen
        name="questions"
        options={{
          title: "Questions",
          tabBarIcon: TabIconQuestions,
          headerShown: false,
        }}
        component={Questions}
      />
      <Tab.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: TabAccountIcon,
          headerShown: false,
        }}
        component={Account}
      />
      <Tab.Screen
        name="accountSettings"
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
        component={AccountSettings}
      />

      <Tab.Screen
        name="questionFullHistory"
        options={{
          title: "Question History",
          tabBarButton: () => null,
          headerShown: false,
        }}
        component={QuestionHistoryScreen}
      />
      <Tab.Screen
        name="sessionFullHistory"
        options={{
          title: "Session History",
          tabBarButton: () => null,
          headerShown: false,
        }}
        component={SessionHistoryScreen}
      />
      <Tab.Screen
        name="multipleSession"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
        component={MultipleSession}
      />
    </Tab.Navigator>
  );
}
