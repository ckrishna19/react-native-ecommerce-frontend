import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { AntDesign } from "react-native-vector-icons";
import { useSelector } from "react-redux";
const Reviews = () => {
  const { product: singleProduct } = useSelector((s) => s.products);
  let actualRating =
    singleProduct.rating >= Math.floor(singleProduct.rating) + 0.5
      ? Math.floor(singleProduct.rating) + 1
      : Math.floor(singleProduct.rating);

  const filledStar = Array.from({ length: actualRating }, (_, i) => (
    <AntDesign name="star" color="gold" key={i} />
  ));

  const EmptyStar = Array.from({ length: 5 - actualRating }, (_, i) => (
    <AntDesign name="staro" color="gold" key={i} />
  ));
  return (
    <View style={tw`my-2 `}>
      <View style={tw`flex-row h-[40px] items-center justify-between`}>
        <View style={tw`flex-row gap-x-4`}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
            }}
            style={tw`h-full aspect-square rounded-full`}
          />
          <View>
            <Text style={tw`text-[#F5F8FB] text-[15px]`}>Ronald Richards</Text>
            <View style={tw`flex-row items-center gap-x-2`}>
              <AntDesign name="clockcircleo" size={14} color="#8F959E" />
              <Text style={tw`text-[#8F959E]`}>13 Sep, 2020</Text>
            </View>
          </View>
        </View>

        <View style={tw`gap-y-1`}>
          <View style={tw`flex-row items-center gap-x-2`}>
            <Text style={tw`text-[#F5F8FB] text-[15px]`}>{actualRating}</Text>
            <Text style={tw`text-[#8F959E] text-[11px]`}>Rating</Text>
          </View>
          <View style={tw`flex-row gap-x-[2px]`}>
            {filledStar}
            {EmptyStar}
          </View>
        </View>
      </View>
      <Text style={tw`text-[#8F959E] text-[15px] font-light mt-3`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae autem
        deleniti sapiente ipsam hic? Quas odio rerum incidunt ab ex......
      </Text>
    </View>
  );
};

export default Reviews;
