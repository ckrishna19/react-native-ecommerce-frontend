import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
// import { Image } from "react-native";
import tw from "twrnc";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tw`w-1/2 px-2`}
      onPress={() =>
        navigation.navigate("ProductDetails", { params: product?.id })
      }
    >
      <View
        style={tw`w-full relative   h-[203px] bg-[#D3D3D3]  opacity-70 rounded-md `}
      >
        <TouchableOpacity
          style={tw`w-8 aspect-square absolute right-2 top-2 rounded-full items-center justify-center border border-red-500 z-10`}
        >
          <AntDesign name="heart" color="red" size={20} />
        </TouchableOpacity>
        <Image
          source={{ uri: product.thumbnail }}
          style={{ flex: 1, width: null, height: null }}
          contentFit="contain"
          transition={500}
          placeholder="hello"
        />
      </View>
      <View style={tw`w-[117px] ml-2 mt-2`}>
        <Text style={tw`text-[11px] text-[#F5F8FB] leading-[1rem]`}>
          {product.title}
        </Text>
        <Text style={tw`text-[15px] text-[#F5F8FB]`}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
