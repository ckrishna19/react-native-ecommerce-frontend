import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import tw from "twrnc";
import PageWrapper from "./PageWrapper";
import colors from "../utils/colors";
import { FontAwesome, Entypo } from "react-native-vector-icons";
import { TextInput } from "react-native";
import axios from "axios";
import * as API from "../redux/Api";
import { useDispatch, useSelector } from "react-redux";
import { falseLoading, errorUser, authLoading } from "../redux/slice/authSlice";
const VerificationCode = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to store OTP digits
  const refs = [useRef(), useRef(), useRef(), useRef()]; // Refs for each TextInput

  const handleOtpChange = (index, value) => {
    // Update the OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move focus to the next input or the previous one if deleting
    if (value && index < 3) {
      refs[index + 1].current.focus();
    } else if (!value && index > 0) {
      refs[index - 1].current.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otps = Number(otp.join(""));
    try {
      const verify = await axios.post(
        API.resetPassword,
        { otps },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (verify.status === 201) {
        navigation.navigate("NewPassword", { otp: otps });
      }
    } catch (error) {
      Alert.alert(error.response.data.message);
    }
  };

  return (
    <PageWrapper>
      {}
      <View style={tw`relative  h-full `}>
        <View
          style={tw`w-[45px] ml-[10%] aspect-square rounded-full bg-[#222E34] items-center justify-center mt-10`}
        >
          <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
        </View>

        <Text style={tw`text-[#F5F8FB] font-bold text-[28px] text-center mt-4`}>
          Verification Code
        </Text>
        <View style={tw`  w-[90%] mx-auto gap-y-2  my-auto   `}>
          <ImageBackground
            source={{
              uri: "https://cdn.pixabay.com/photo/2019/10/24/08/23/lock-4573711_1280.png",
            }}
            style={tw`w-full aspect-square`}
          >
            <View style={tw` py-3 gap-y-1 my-auto flex-row justify-around `}>
              {otp.map((digit, index) => (
                <View
                  key={index}
                  style={tw`w-[80px] border aspect-square border-[#E7E8EA] rounded-lg`}
                >
                  <TextInput
                    ref={refs[index]}
                    style={tw`flex-1 text-[#E7E8EA] text-[50px] text-center`}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(index, value)}
                  />
                </View>
              ))}
            </View>
          </ImageBackground>
        </View>
        <View style={tw`w-[80%] mx-auto my-6`}>
          <Text style={tw`text-center text-[#8F959E] font-light leading-5`}>
            <Text style={tw`text-[#F5F8FB]`}>00:20 </Text>
            resend confirmation code.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleVerifyOTP}
          style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center`}
        >
          <Text style={tw`text-[#F5F8FB] text-[17px]`}>Confrim Code</Text>
        </TouchableOpacity>
      </View>
    </PageWrapper>
  );
};

export default VerificationCode;

/*
  <View
                style={tw`w-[80px] border aspect-square border-[#E7E8EA] rounded-lg`}
              >
                <TextInput
                  style={tw`flex-1 text-[#E7E8EA] text-[50px] text-center`}
                  keyboardType="numeric"
                  value={OTP}
                  onChangeText={(text) => setOTP(text)}
                />
              </View>

*/
