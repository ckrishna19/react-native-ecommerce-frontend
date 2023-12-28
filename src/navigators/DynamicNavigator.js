import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import loadable from "react-loadable";
const DynamicNavigator = (path) => {
  const Dynamic = loadable({
    loader: () => import(path),
    loading: () => <ActivityIndicator size="large" color="red" />,
  });
  return Dynamic;
};

export default DynamicNavigator;
