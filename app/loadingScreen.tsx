// import CrossLoadingIcon from "@/assets/images/crossLoadingIcon";
// import {
//   ActivityIndicator,
//   ImageBackground,
//   StyleSheet,
//   View,
// } from "react-native";

// const LoadingScreen = () => {
//   // return (
//   //   <View style={styles.container}>
//   //     {/* <ActivityIndicator /> */}
//   //     <CrossLoadingIcon />
//   //   </View>
//   // );
// };

// export default LoadingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// import { View } from "react-native";
{
  /* <View
  style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
></View>; */
}

// import React, { useEffect, useRef } from "react";
// import { Animated } from "react-native";
// import Svg, { Path } from "react-native-svg";

// const AnimatedPath = Animated.createAnimatedComponent(Path);

// const CrossLoadingIcon = ({
//   setEndAnimation,
//   endAnimation,
// }: {
//   setEndAnimation: any;
//   endAnimation: any;
// }) => {
//   const animation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (!endAnimation) return;

//     Animated.timing(animation, {
//       toValue: 1,
//       duration: 2000, // Duration in milliseconds
//       useNativeDriver: false,
//     }).start(() => {
//       // Notify the parent component that the animation has ended
//       if (setEndAnimation) {
//         setEndAnimation(false);
//       }
//     });
//   }, [animation, setEndAnimation]);

//   // Path length must match the actual length of your cross path
//   const pathLength = 540; // Replace with your measured value
//   const strokeDashoffset = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [pathLength, 1],
//   });

//   return (
//     <View
//       style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
//     >
//       <Svg width={116} height={153} viewBox="0 0 124 161" fill="none">
//         <AnimatedPath
//           d="M81 4H43.5V41.5H4V81.5H43.5V157H81V81.5H120V41.5H81V4Z"
//           stroke="#292929"
//           strokeWidth={8}
//           strokeDasharray={`${pathLength}`}
//           strokeDashoffset={strokeDashoffset}
//         />
//       </Svg>
//     </View>
//   );
// };

// export default CrossLoadingIcon;

import React, { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CrossLoadingIcon = ({
  setEndAnimation,
  isAnimationComplete,
  setIsAnimationComplete,
}: {
  setEndAnimation: (isComplete: boolean) => void;
  isAnimationComplete: any;
  setIsAnimationComplete: any;
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const pathLength = 540; // Replace with the actual length of your SVG path
  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [pathLength, 0],
  });

  useEffect(() => {
    if (isAnimationComplete) {
      return;
    }

    Animated.timing(animation, {
      toValue: 1,
      duration: 2000, // Duration in milliseconds
      useNativeDriver: false,
    }).start(() => {
      // Animation is complete, notify parent and stop re-triggering
      setIsAnimationComplete(true);
      setEndAnimation(false); // Notify parent that animation is done
    });
  }, [animation, isAnimationComplete, setEndAnimation]);

  return (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
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
