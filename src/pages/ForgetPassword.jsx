import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import PageWrapper from "./PageWrapper";
import colors from "../utils/colors";
import { FontAwesome, Entypo } from "react-native-vector-icons";
import { TextInput } from "react-native";
import axios from "axios";
import * as API from "../redux/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  authLoading,
  errorUser,
  falseLoading,
  forgetPassword,
} from "../redux/slice/authSlice";
const ForgetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const [email, setEmail] = useState("");
  const ForgetPasswordMessage = async () => {
    dispatch(authLoading());
    try {
      const res = await axios.post(
        API.sendForgetPasswordToken,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(forgetPassword(res.data.updated));
      if (res.status === 201) {
        navigation.navigate("VerificationCode");
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
          <ActivityIndicator size={80} />
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
            Forgot Password
          </Text>
          <View style={tw`  w-[90%] mx-auto gap-y-2  my-auto   `}>
            <ImageBackground
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/10/24/08/23/lock-4573711_1280.png",
              }}
              style={tw`w-full aspect-square`}
            >
              <View style={tw`border-b py-3 gap-y-1 my-auto border-[#E7E8EA]`}>
                <Text style={tw`text-[#8F959E] font-light`}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Enter Email"
                  style={tw`text-[#F5F8FB] text-[15px]`}
                  placeholderTextColor="#F5F8FB"
                />
              </View>
            </ImageBackground>
          </View>
          <View style={tw`w-[80%] mx-auto my-6`}>
            <Text style={tw`text-center text-[#8F959E] font-light leading-5`}>
              Please write your email to receive a confirmation code to set a
              new password.
            </Text>
          </View>
          <TouchableOpacity
            onPress={ForgetPasswordMessage}
            style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center`}
          >
            <Text style={tw`text-[#F5F8FB] text-[17px]`}>Confrim Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </PageWrapper>
  );
};

export default ForgetPassword;
