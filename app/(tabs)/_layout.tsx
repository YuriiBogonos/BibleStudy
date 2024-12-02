import React from "react";
// import { Tab } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TabIconHome from "@/assets/images/TabIconHome";
import TabIconQuestions from "@/assets/images/TabIconQuestions";
import TabAccountIcon from "@/assets/images/TabIconAccount";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./MainScreen";
import Questions from "./questions";
import Account from "./account";

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
    </Tab.Navigator>
  );
}
