import { View, Text, StatusBar, SafeAreaView, Platform } from "react-native";
import React from "react";
import { StatusBar as ExpoBar } from "expo-status-bar";
import colors from "../utils/colors";
const PageWrapper = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: colors.bgColor,
        flex: 1,
      }}
    >
      {children}
      <ExpoBar backgroundColor={colors.bgColor} style="light" />
    </SafeAreaView>
  );
};

export default PageWrapper;
