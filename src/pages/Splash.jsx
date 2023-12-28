import { View, Text } from "react-native";
import React, { useEffect } from "react";
import colors from "../utils/colors";
import PageWrapper from "./PageWrapper";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      handleChangeScreen();
    }, 2000);
  }, []);

  const handleChangeScreen = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        navigation.replace("Drawer");
      } else {
        navigation.replace("LoginSplash");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageWrapper>
      <View style={tw`h-full justify-center items-center`}>
        <Text
          style={tw`text-[#F5F8FB] font-bold capitalize text-lg tracking-widest italic `}
        >
          WELCOME TO MY STORE
        </Text>
      </View>
    </PageWrapper>
  );
};

export default Splash;
