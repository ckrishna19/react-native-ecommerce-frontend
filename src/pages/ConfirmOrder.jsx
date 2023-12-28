import { View, Text, ImageBackground } from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import colors from "../utils/colors";
const ConfirmOrder = ({ navigation }) => {
  return (
    <PageWrapper>
      <View style={tw`w-full aspect-square mx-auto  flex-row items-center`}>
        <ImageBackground
          source={require("../assets/confirmOrder.png")}
          style={tw`w-full  h-full relative`}
        ></ImageBackground>
      </View>

      <View style={tw`absolute bottom-10 left-0 w-full gap-y-3 `}>
        <View style={tw`w-[90%] mx-auto gap-y-3`}>
          <Text style={tw`text-[#F5F8FB] text-[28px] font-bold text-center`}>
            Order Confirmed!
          </Text>
          <Text style={tw`text-[15px] text-[#8F959E] text-center my-2`}>
            Your order has been confirmed, we will send you confirmation email
            shortly.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("OrderList")}
          style={tw`py-3 bg-[#222E34] rounded-md w-[90%] mx-auto`}
        >
          <Text style={tw`text-[#8F959E] text-[17px] text-center`}>
            Go to Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={tw`py-5 bg-[${colors.btnColor}] rounded-md w-[90%] mx-auto`}
        >
          <Text style={tw`text-[#F5F8FB] text-[17px] text-center`}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </PageWrapper>
  );
};

export default ConfirmOrder;
