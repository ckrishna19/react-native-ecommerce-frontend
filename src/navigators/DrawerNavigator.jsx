import { View, Text } from "react-native";
import React, { useState, Suspense, lazy } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CostumDrawer from "../components/CostumDrawer";
import { useSelector } from "react-redux";

import TabNavigator from "./TabNavigator";

const DrawerNavigator = () => {
  const { auth } = useSelector((s) => s.auth);
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
        },

        swipeEnabled: auth ? true : false,
      }}
      drawerContent={(props) => <CostumDrawer {...props} />}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
