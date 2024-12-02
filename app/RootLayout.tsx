import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { store } from "@/store/store";
import CrossLoadingIcon from "./loadingScreen";
import { RootLayoutNav } from "./_layout";

export default function RootLayout() {
  const [loaded, error] = useFonts({});

  const [endAnimation, setEndAnimation] = useState<boolean>(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);

  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      setTimeout(() => {
        // setIsAppLoaded(false); // Mark app as loaded
        // }, 2000);
      });
    }
    [loaded];
  });

  if (!loaded || isAppLoaded) {
    return (
      <CrossLoadingIcon
        // setEndAnimation={setEndAnimation}
        // setIsAnimationComplete={setIsAnimationComplete}
        // isAnimationComplete={isAnimationComplete}
        isAppLoaded={isAppLoaded}
      />
    );
  }

  return (
    <Provider store={store}>
      <RootLayoutNav
        setEndAnimation={setEndAnimation}
        setIsAnimationComplete={setIsAnimationComplete}
        isAnimationComplete={isAnimationComplete}
        endAnimation={endAnimation}
      />
    </Provider>
  );
}
