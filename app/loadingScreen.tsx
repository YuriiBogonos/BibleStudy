import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CrossLoadingIcon = ({ isAppLoaded }: { isAppLoaded: boolean }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const pathLength = 540; // Replace with the actual length of your SVG path
  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [pathLength, 0],
  });

  useEffect(() => {
    if (!isAppLoaded) {
      // Restart animation if the app is not yet loaded
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000, // Duration in milliseconds
          useNativeDriver: false,
        })
      ).start();
    } else {
      // If app is loaded, stop animation and keep the cross fully drawn
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000, // Smoothly complete the animation
        useNativeDriver: false,
      }).start();
    }
  }, [isAppLoaded]);

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Svg width={116} height={153} viewBox="0 0 124 161" fill="none">
        <AnimatedPath
          d="M81 4H43.5V41.5H4V81.5H43.5V157H81V81.5H120V41.5H81V4Z"
          stroke="#292929"
          strokeWidth={8}
          strokeDasharray={`${pathLength}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
};

export default CrossLoadingIcon;
