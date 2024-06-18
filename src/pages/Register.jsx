import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import PageWrapper from "./PageWrapper";
import colors from "../utils/colors";
import { FontAwesome, Entypo } from "react-native-vector-icons";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../redux/Api";
import {
  newUser,
  loginUser,
  authLoading,
  errorUser,
  falseLoading,
} from "../redux/slice/authSlice";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const { loading, error } = useSelector((s) => s.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  console.log("loading:", loading, "error:", error);
  const userRegister = async () => {
    console.log(API.register);
    if (!fullName || !email || !password || !confirmPassword) {
      return Alert.alert("Empty credentials");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Password doesnot match");
    }
    dispatch(authLoading());
    //  dispatch(authLoading(false));
    try {
      const res = await axios.post(
        API.register,
        { fullName, email, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        await AsyncStorage.setItem("accessToken", res.data?.accessToken);
        dispatch(newUser(res?.data?.user));

        navigation.reset({ index: 0, routes: [{ name: "Drawer" }] });
      }
    } catch (error) {
      dispatch(errorUser(error.response.data.message));
      Alert.alert(error.response.data.message);
    }
  };
  return (
    <PageWrapper>
      {loading ? (
        <TouchableOpacity
          onPress={() => dispatch(falseLoading())}
          style={tw`my-auto`}
        >
          <ActivityIndicator size={80} color="#F5F8FB" />
        </TouchableOpacity>
      ) : (
        <View style={tw`relative  h-full `}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`w-[45px] ml-[10%] aspect-square rounded-full bg-[#222E34] items-center justify-center mt-10`}
          >
            <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
          </TouchableOpacity>

          <Text
            style={tw`text-[#F5F8FB] font-bold text-[28px] text-center mt-4`}
          >
            Sign Up
          </Text>
          <View style={tw`  w-[90%] mx-auto gap-y-2  my-auto   `}>
            <KeyboardAvoidingView>
              <View style={tw`border-b py-1 gap-y-1 border-[#E7E8EA] my-2`}>
                <Text style={tw`text-[#8F959E] font-light`}>Full Name</Text>
                <TextInput
                  onChangeText={(text) => setFullName(text)}
                  value={fullName}
                  placeholder="Enter Full Name"
                  style={tw`text-[#F5F8FB] text-[15px] my-2`}
                  placeholderTextColor="#F5F8FB"
                />
              </View>
              <View style={tw`border-b py-1 gap-y-1 border-[#E7E8EA] my-2`}>
                <Text style={tw`text-[#8F959E] font-light`}>Email</Text>
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Enter Email"
                  style={tw`text-[#F5F8FB] text-[15px] my-2`}
                  placeholderTextColor="#F5F8FB"
                />
              </View>

              <View style={tw`border-b py-1 gap-y-1 border-[#E7E8EA] my-2`}>
                <Text style={tw`text-[#8F959E] font-light`}>Password</Text>
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Enter Password"
                  style={tw`text-[#F5F8FB] text-[15px] my-2`}
                  placeholderTextColor="#F5F8FB"
                />
              </View>

              <View style={tw`border-b py-1 gap-y-1 border-[#E7E8EA] my-2`}>
                <Text style={tw`text-[#8F959E] font-light`}>
                  Confirm Password
                </Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  style={tw`text-[#F5F8FB] text-[15px] my-2`}
                  placeholderTextColor="#F5F8FB"
                />
              </View>
            </KeyboardAvoidingView>

            <View style={tw`flex-row items-center justify-between mt-8`}>
              <TouchableOpacity>
                <Text style={tw`text-[#F5F8FB] text-[13px]`}> Remember Me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="switch" size={22} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={userRegister}
            style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center`}
          >
            <Text style={tw`text-[#F5F8FB] text-[17px]`}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </PageWrapper>
  );
};

export default Register;
