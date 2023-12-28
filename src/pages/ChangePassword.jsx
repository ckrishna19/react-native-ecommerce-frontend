import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import PageWrapper from "./PageWrapper";
import { FontAwesome } from "react-native-vector-icons";
import colors from "../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  changePassword,
  falseLoading,
  errorUser,
  authLoading,
} from "../redux/slice/authSlice";
import * as API from "../redux/Api";
import { useDispatch, useSelector } from "react-redux";
const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!newPassword || !confirmNewPassword || !oldPassword) {
      Alert.alert("Empty credentials");
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert("new password and confirm password doesnot match");
    }
    dispatch(authLoading());
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        API.changePassword,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      dispatch(changePassword(res.data.changedPassword));
      if (res.status === 201) {
        navigation.navigate("Drawer");
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
          <ActivityIndicator size={96} color="#F5F8FB" />
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
            Change Password
          </Text>

          <View style={tw`  w-[90%] mx-auto gap-y-2  my-auto   `}>
            <View style={tw`border-b py-1 gap-y-1 my-2 border-[#E7E8EA]`}>
              <Text style={tw`text-[#8F959E] font-light`}>Old Password</Text>
              <TextInput
                placeholder=" old Password"
                style={tw`text-[#F5F8FB] text-[15px] my-2`}
                placeholderTextColor="#F5F8FB"
                secureTextEntry={true}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
              />
            </View>

            <View style={tw`border-b py-1 gap-y-1 my-2 border-[#E7E8EA]`}>
              <Text style={tw`text-[#8F959E] font-light`}>New Password</Text>
              <TextInput
                placeholder="New Password"
                style={tw`text-[#F5F8FB] text-[15px] my-2`}
                placeholderTextColor="#F5F8FB"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
              />
            </View>

            <View style={tw`border-b py-1 gap-y-1 my-2 border-[#E7E8EA]`}>
              <Text style={tw`text-[#8F959E] font-light`}>
                Confirm new Password
              </Text>
              <TextInput
                secureTextEntry={true}
                placeholder="Confirm new Password"
                style={tw`text-[#F5F8FB] text-[15px] my-2`}
                placeholderTextColor="#F5F8FB"
                onChangeText={(text) => setConfirmNewPassword(text)}
                value={confirmNewPassword}
              />
            </View>
          </View>
          <View style={tw`w-[90%] mx-auto my-6`}>
            <Text style={tw`text-center text-[#8F959E] font-light leading-5`}>
              Please change your password.
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleChangePassword}
            style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center`}
          >
            <Text style={tw`text-[#F5F8FB] text-[17px]`}>Change Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </PageWrapper>
  );
};

export default ChangePassword;
