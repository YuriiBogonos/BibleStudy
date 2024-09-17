import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { SplashScreenViewModel } from "@/viewmodels/SplashScreenViewModel/SplashScreenViewModel"; // Use useRouter for navigation

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Splash: React.FC = () => {
  const router = useRouter();

  const viewModel = SplashScreenViewModel();

  useEffect(() => {
    viewModel.startAnimation();

    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [viewModel, router]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      viewModel.pathLength -
      ((viewModel.animationProgress.value * viewModel.pathLength) %
        viewModel.pathLength),
  }));

  return (
    <View style={styles.container}>
      <Svg height="200" width="200" viewBox="0 0 124 161">
        <AnimatedPath
          d="M81 4H43.5V41.5H4V81.5H43.5V157H81V81.5H120V41.5H81V4Z"
          stroke="#292929"
          strokeWidth={8}
          strokeDasharray={viewModel.pathLength}
          animatedProps={animatedProps}
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Splash;
