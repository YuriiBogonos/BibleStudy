import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export { ErrorBoundary } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { PortalHost, PortalProvider } from "@gorhom/portal";

import { useColorScheme } from "@/components/useColorScheme";
import { RootState, store } from "@/store/store";
import { signInSuccess } from "@/store/slices/auhtSlice";
import { sanitizeUser } from "@/services/authServices/SignUpService";
import LoadingScreen from "./loadingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AuthLayout from "./(auth)/_layout";
import TabLayout from "./(tabs)/_layout";
import SessionsLayout, { RootStackParamList } from "./(sessions)/_layout";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID } from "@/constants/keys";

import { getUserInfoByUid } from "@/services/getUserInfoByUid";

export const unstable_settings = {
  initialRouteName: "home",
};

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

// TODO: change type of safety data about user after google signin

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  // iosClientId: IOS_CLIENT_ID,

  offlineAccess: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({});

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
      if (!user) {
        SplashScreen.hideAsync();
        setAppLoading(false);
        return;
      }

      if (user.emailVerified) {
        const userInfoFromDatabase = await getUserInfoByUid(user.uid);

        dispatch(signInSuccess(sanitizeUser(user, userInfoFromDatabase!)));
        SplashScreen.hideAsync();
        setAppLoading(false);
        return;
      }

      setAppLoading(false);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [dispatch]);

  if (appLoading) {
    return <LoadingScreen />;
  }

  return (
    <PortalProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {user ? (
          <Stack.Navigator initialRouteName="(tabs)">
            <Stack.Screen
              name="(tabs)"
              component={TabLayout}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="(sessions)"
              component={SessionsLayout}
              options={{
                header: () => null,
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="(auth)">
            <Stack.Screen
              name="(auth)"
              component={AuthLayout}
              options={{
                header: () => null,
              }}
            />
          </Stack.Navigator>
        )}

        <PortalHost name={"Modals"} />
      </ThemeProvider>
    </PortalProvider>
  );
};

// import { useEffect, useState } from "react";
// import { Provider, useDispatch } from "react-redux";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import "react-native-reanimated";
// import auth from "@react-native-firebase/auth";

// export { ErrorBoundary } from "expo-router";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { PortalHost, PortalProvider } from "@gorhom/portal";

// import { useColorScheme } from "@/components/useColorScheme";
// import { store } from "@/store/store";
// import { signInSuccess } from "@/store/slices/auhtSlice";
// // import { FIREBASE_AUTH } from "@/config/config";

// export const unstable_settings = {
//   initialRouteName: "home",
// };

// // SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const dispatch = useDispatch();
//   const [loaded, error] = useFonts({});

//   const onAuthStateChanged = (user: any) => {
//     console.log("onAuthStateChanged ===>", user);

//     if (user) {
//       dispatch(signInSuccess(user));
//     }
//     // setUser(user);
//     // if (initializing) setInitializing(false);
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;
//   }, []);

//   // useEffect(() => {
//   //   const authStateChanged = onAuthStateChanged(
//   //     FIREBASE_AUTH,
//   //     (authUser: User | null) => {
//   //       console.log("authUser ==>", authUser);
//   //       if (!authUser) {
//   //         console.log("BBBBBBB");
//   //         // setIsAuthenticated(false);
//   //         // SplashScreen.hideAsync();
//   //         // setAppLoading(false);

//   //         return;
//   //       }
//   //       console.log("AAAAA");
//   //       // setIsAuthenticated(!!authUser);
//   //       // SplashScreen.hideAsync();
//   //       // setAppLoading(false);
//   //     }
//   //   );

//   //   return () => {
//   //     authStateChanged();
//   //   };
//   // }, []);

//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//   return (
//     <PortalProvider>
//       <Provider store={store}>
//         <ThemeProvider
//           value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//         >
//           <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="(tabs)" />
//             <Stack.Screen name="(auth)" />
//             <Stack.Screen name="(sessions)" />
//           </Stack>
//           <PortalHost name={"Modals"} />
//         </ThemeProvider>
//       </Provider>
//     </PortalProvider>
//   );
// }

{
  /* 
        {/* {user ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(sessions)" />
          </Stack>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
          </Stack>
        )} */
}

{
  /* <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(sessions)" />
        </Stack> */
}
{
  /* {user ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(sessions)" />
          </>
        ) : (
          <Stack.Screen name="(auth)" />
        )} */
}
{
  /* {user ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" component={TabLayout} />
            <Stack.Screen name="(sessions)" component={SessionsLayout} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" component={AuthLayout} />
          </Stack.Navigator>
        )} */
}
