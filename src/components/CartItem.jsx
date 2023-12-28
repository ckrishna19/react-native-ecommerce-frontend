import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import {
  EvilIcons,
  Feather,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeById,
  addToCart,
  decreseQuantity,
  increaseQuantity,
} from "../redux/slice/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={tw`my-1 bg-[#222E34] rounded-lg p-2`}>
      <View style={tw`flex-row gap-x-3 items-center `}>
        <View style={tw`w-[100px] aspect-square rounded-lg bg-[#29363D]`}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={tw`flex-1`}>
          <View style={tw`w-[150px] gap-y-2`}>
            <Text style={tw`text-[#F5F8FB] leading-5`}>{item.productName}</Text>
            <Text style={tw`text-[#DEDEDE] font-bold`}>{item.price} </Text>
          </View>
          <View style={tw`flex-row justify-between items-end`}>
            <View style={tw`flex-row mt-2 items-center gap-x-2`}>
              <TouchableOpacity
                onPress={() => dispatch(decreseQuantity(item.id))}
                style={tw`w-8 aspect-square rounded-full border border-[#DEDEDE] items-center justify-center`}
              >
                <Feather name="chevron-down" size={25} color="#DEDEDE" />
              </TouchableOpacity>
              <Text style={tw`text-[#DEDEDE] text-lg`}>{item.quantity} </Text>
              <TouchableOpacity
                onPress={() => dispatch(increaseQuantity(item.id))}
                style={tw`w-8 aspect-square rounded-full border border-[#DEDEDE] items-center justify-center`}
              >
                <Feather name="chevron-up" size={25} color="#DEDEDE" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(removeById(item.id))}
              style={tw`w-8 aspect-square rounded-full border border-[#DEDEDE] items-center justify-center`}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#DEDEDE" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
