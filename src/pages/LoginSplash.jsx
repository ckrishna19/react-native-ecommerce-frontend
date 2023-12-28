import { View, Text } from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import colors from "../utils/colors";
import { FontAwesome, EvilIcons, Ionicons } from "react-native-vector-icons";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
const LoginSplash = ({ navigation }) => {
  return (
    <PageWrapper>
      <View style={tw`relative  h-full `}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`w-[45px] ml-[10%] aspect-square rounded-full bg-[#222E34] items-center justify-center mt-10`}
        >
          <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
        </TouchableOpacity>

        <Text style={tw`text-[#F5F8FB] font-bold text-[28px] text-center mt-4`}>
          Let’s Get Started
        </Text>
        <View style={tw`  w-[80%] mx-auto  my-auto   `}>
          <View style={tw` mx-auto  gap-y-2 w-full`}>
            <TouchableOpacity
              style={tw`flex-row h-[50px] bg-[#4267B2] items-center justify-center rounded-md gap-x-2`}
            >
              <EvilIcons name="sc-facebook" color="#F5F8FB" size={22} />
              <Text style={tw`text-[#F5F8FB] text-[17px] font-bold`}>
                Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row h-[50px] bg-[#1DA1F2] items-center justify-center rounded-md gap-x-2`}
            >
              <EvilIcons name="sc-twitter" color="#F5F8FB" size={22} />
              <Text style={tw`text-[#F5F8FB] text-[17px] font-bold`}>
                Twitter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row h-[50px] bg-[#EA4335] items-center justify-center rounded-md gap-x-2`}
            >
              <Ionicons name="logo-google" color="#F5F8FB" size={18} />
              <Text style={tw`text-[#F5F8FB] text-[17px] font-bold`}>
                Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex-row justify-center items-center gap-x-2 mb-4`}>
          <Text style={tw`  text-[#8F959E] font-light`}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={tw`flex-row items-center justify-center`}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={tw`text-[#F5F8FB] font-light`}>Signin</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-center items-center gap-x-2 mb-4`}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-center`}
            onPress={() => navigation.navigate("Drawer")}
          >
            <Text style={tw`text-[#F5F8FB] font-light`}>
              Use without Account
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center`}
        >
          <Text style={tw`text-[#F5F8FB] text-[17px]`}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </PageWrapper>
  );
};

export default LoginSplash;
