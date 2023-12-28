import { View, Text } from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import { ScrollView } from "react-native";
import tw from "twrnc";
import { TextInput } from "react-native";
const CreateProduct = () => {
  return (
    <PageWrapper>
      <ScrollView style={tw`w-[90%] mx-auto mt-4`}>
        <View style={tw`gap-y-4`}>
          <View style={tw`gap-y-2`}>
            <Text style={tw`text-[#F5F8FB] text-[17px] `}>Product Name</Text>
            <View style={tw`bg-[#222E34] h-[50px] rounded-lg`}>
              <TextInput
                placeholder="Product name"
                placeholderTextColor="#8F959E"
                style={tw`h-full px-2 text-[#8F959E]`}
              />
            </View>
          </View>

          <View style={tw`gap-y-2`}>
            <Text style={tw`text-[#F5F8FB] text-[17px] `}>Product Price</Text>
            <View style={tw`bg-[#222E34] h-[50px] rounded-lg`}>
              <TextInput
                placeholder="Price"
                placeholderTextColor="#8F959E"
                keyboardType="numeric"
                style={tw`h-full px-2 text-[#8F959E]`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </PageWrapper>
  );
};

export default CreateProduct;
