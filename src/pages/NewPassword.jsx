import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import PageWrapper from "./PageWrapper";
import colors from "../utils/colors";
import { FontAwesome, Entypo } from "react-native-vector-icons";
import { TextInput } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import * as API from "../redux/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  falseLoading,
  authLoading,
  errorUser,
  updatePassword as updts,
} from "../redux/slice/authSlice";
const NewPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useSelector((s) => s.auth);
  const { params } = useRoute();
  const otp = params.otp;
  const updatePassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Empty credentials");
    }
    if (password !== confirmPassword) {
      Alert.alert("password and confirm password doesnot match please retype");
    }
    dispatch(authLoading());
    try {
      const res = await axios.post(
        API.updatePassword,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            otp: otp,
          },
        }
      );
      dispatch(updts(res.data.updated));
      if (res.status === 201) {
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
          style={tw`my-auto mx-auto`}
          onPress={() => dispatch(falseLoading())}
        >
          <ActivityIndicator size={80} color="#F5F8FB" />
        </TouchableOpacity>
      ) : (
        <View style={tw`relative  h-full `}>
          <View
            style={tw`w-[45px] ml-[10%] aspect-square rounded-full bg-[#222E34] items-center justify-center mt-10`}
          >
            <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
          </View>

          <Text
            style={tw`text-[#F5F8FB] font-bold text-[28px] text-center mt-4`}
          >
            New Password
          </Text>

          <View style={tw`  w-[90%] mx-auto gap-y-2  my-auto   `}>
            <View style={tw`border-b py-1 gap-y-1 my-2 border-[#E7E8EA]`}>
              <Text style={tw`text-[#8F959E] font-light`}>Password</Text>
              <TextInput
                placeholder="Password"
                style={tw`text-[#F5F8FB] text-[15px] my-2`}
                placeholderTextColor="#F5F8FB"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={tw`border-b py-1 gap-y-1 my-2 border-[#E7E8EA]`}>
              <Text style={tw`text-[#8F959E] font-light`}>
                Confirm Password Password
              </Text>
              <TextInput
                secureTextEntry={true}
                placeholder="Confirm  Password"
                style={tw`text-[#F5F8FB] text-[15px] my-2`}
                placeholderTextColor="#F5F8FB"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>
          </View>
          <View style={tw`w-[90%] mx-auto my-6`}>
            <Text style={tw`text-center text-[#8F959E] font-light leading-5`}>
              Please write your new password.
            </Text>
          </View>
          <TouchableOpacity
            onPress={updatePassword}
            style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center`}
          >
            <Text style={tw`text-[#F5F8FB] text-[17px]`}>Confirm Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </PageWrapper>
  );
};

export default NewPassword;
