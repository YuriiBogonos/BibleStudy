import {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
} from "react-native-reanimated";

export const SplashScreenViewModel = () => {
  const pathLength = 600;
  const animationProgress = useSharedValue(0);

  const startAnimation = () => {
    animationProgress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  };

  return {
    pathLength,
    animationProgress,
    startAnimation,
  };
};
