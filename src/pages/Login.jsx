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
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as API from "../redux/Api";
import {
  newUser,
  loginUser,
  authLoading,
  errorUser,
  authLogout,
  falseLoading,
} from "../redux/slice/authSlice";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Empty Credentials");
    }
    dispatch(authLoading());
    try {
      const res = await axios.post(
        API.login,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.status === 201) {
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        dispatch(loginUser(res.data.loggedIn));
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
          style={tw`my-auto`}
          onPress={() => dispatch(falseLoading())}
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
            Login
          </Text>
          <Text style={tw`text-[#8F959E] text-center font-light`}>
            Please enter your data to continue
          </Text>
          <View style={tw`  w-[90%] mx-auto gap-y-2  my-auto   `}>
            <View style={tw`border-b py-1 gap-y-1 my-2 border-[#E7E8EA]`}>
              <Text style={tw`text-[#8F959E] font-light`}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter Email"
                style={tw`text-[#F5F8FB] text-[15px] my-2`}
                placeholderTextColor="#F5F8FB"
              />
            </View>

            <View style={tw`border-b py-1 gap-y-1 border-[#E7E8EA] my-2`}>
              <Text style={tw`text-[#8F959E] font-light`}>Password</Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter Password"
                style={tw`text-[#F5F8FB] text-[15px] my-2`}
                placeholderTextColor="#F5F8FB"
              />
            </View>

            <TouchableOpacity
              style={tw`ml-auto mt-8`}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={tw`text-[#E96459]`}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={tw`flex-row items-center justify-between mt-8`}>
              <TouchableOpacity>
                <Text style={tw`text-[#F5F8FB] text-[13px]`}> Remember Me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="switch" size={22} color="green" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`w-[80%] mx-auto my-6`}>
            <Text style={tw`text-center text-[#8F959E] font-light leading-5`}>
              By connecting your account confirm that you agree with our
              <Text style={tw`text-[#F5F8FB]`}> Term and Condition</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center`}
          >
            <Text style={tw`text-[#F5F8FB] text-[17px]`}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </PageWrapper>
  );
};

export default Login;
