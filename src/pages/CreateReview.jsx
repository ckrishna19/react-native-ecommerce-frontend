import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import colors from "../utils/colors";
import { TextInput } from "react-native";
const CreateReview = () => {
  return (
    <PageWrapper>
      <View style={tw`w-[80%] mx-auto mt-10`}>
        <View style={tw`flex-row  items-center `}>
          <TouchableOpacity
            style={tw`w-[45px]  aspect-square rounded-full bg-[#222E34] items-center justify-center `}
          >
            <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
          </TouchableOpacity>

          <Text style={tw`text-[#F5F8FB] font-bold text-[17px] mx-auto`}>
            Add Review
          </Text>
        </View>

        <ScrollView>
          <View style={tw`mt-10 `}>
            <View style={tw`gap-y-2`}>
              <Text style={tw`text-[#F5F8FB] text-[17px] `}>Name</Text>
              <View style={tw`bg-[#222E34] h-[50px] rounded-lg`}>
                <TextInput
                  placeholder="Type your name"
                  placeholderTextColor="#8F959E"
                  style={tw`h-full px-2`}
                />
              </View>
            </View>
            <View style={tw`gap-y-2 mt-4`}>
              <Text style={tw`text-[#F5F8FB] text-[17px] `}>
                How was your experience ?
              </Text>
              <View style={tw`bg-[#222E34] rounded-lg `}>
                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  placeholder="Describe your experience?"
                  placeholderTextColor="#8F959E"
                  style={{
                    height: 300,
                    textAlignVertical: "top",
                    padding: 10,
                    color: "#8F959E",
                    fontSize: 14,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={tw`bg-[${colors.btnColor}] h-[75px] justify-center items-center absolute bottom-0 left-0 w-full`}
      >
        <Text style={tw`text-[#F5F8FB] text-[17px]`}>Submit</Text>
      </TouchableOpacity>
    </PageWrapper>
  );
};

export default CreateReview;
