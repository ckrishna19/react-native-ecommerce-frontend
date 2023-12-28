import { View, Text } from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import { FontAwesome, AntDesign, Ionicons } from "react-native-vector-icons";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import colors from "../utils/colors";
import Reviews from "../components/ReviewCard";

const AddReview = ({ navigation }) => {
  return (
    <PageWrapper>
      <ScrollView
        style={tw`w-[80%] mx-auto`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw` mt-10`}>
          <TouchableOpacity
            style={tw`w-[45px] ml-[15%] aspect-square rounded-full bg-[#222E34] items-center justify-center `}
          >
            <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
          </TouchableOpacity>

          <Text style={tw`text-[#F5F8FB] font-bold text-[28px] text-center  `}>
            Reviews
          </Text>
          <View />
        </View>
        <View style={tw`flex-row justify-between items-start my-4`}>
          <View>
            <Text style={tw`text-[#F5F8FB] font-bold text-[15px]`}>
              245 Reviews
            </Text>
            <View style={tw`flex-row items-center gap-x-2`}>
              <Text style={tw`text-[#F5F8FB] text-[13px] font-light`}>4.8</Text>
              <View style={tw`flex-row gap-x-[2px]`}>
                <AntDesign name="star" size={10} color="gold" />

                <AntDesign name="star" size={10} color="gold" />
                <AntDesign name="star" size={10} color="gold" />
                <AntDesign name="star" size={10} color="gold" />
                <AntDesign name="staro" size={10} color="#8F959E" />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateReview")}
            style={tw`bg-[${colors.btnColor}] flex-row py-2 px-4 rounded-md items-center gap-x-1 `}
          >
            <Ionicons name="create-outline" size={13} color="#F5F8FB" />
            <Text style={tw`text-[#F5F8FB] text-[13px] `}>Add Review</Text>
          </TouchableOpacity>
        </View>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Reviews key={i} />
          ))}
      </ScrollView>
    </PageWrapper>
  );
};

export default AddReview;
