import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import tw from "twrnc";
const ChatHeader = () => {
  return (
    <View style={tw`flex-row gap-x-3 items-center my-3 `}>
      <Ionicons name="chevron-back" size={30} color="#7C7C7C" />
      <Image
        source={{
          uri: "https://watermark.lovepik.com/photo/40027/7318.jpg_wh1200.jpg",
        }}
        style={tw`w-12 aspect-square rounded-full`}
      />
      <View>
        <Text style={tw`text-[#FFF] text-[18px]`}>My Store Online</Text>
        <Text style={tw`text-[#7C7C7C] font-light`}>Online</Text>
      </View>
      <View style={tw`flex-row gap-x-3 ml-auto`}>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color="#04D900" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="videocam" size={24} color="#04D900" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
