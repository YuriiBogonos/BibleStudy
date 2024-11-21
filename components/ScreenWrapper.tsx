import React, { FC, ReactNode } from "react";
import { View, StyleSheet, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "@/types/Colors";
import { StatusBar } from "expo-status-bar";

interface ScreenWrapperProps extends ScrollViewProps {
  children: ReactNode;
}

const ScreenWrapper: FC<ScreenWrapperProps> = ({ children, ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar translucent={true} />
      <KeyboardAwareScrollView
        {...props}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <View>{children}</View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.White,
  },
});

export default ScreenWrapper;
