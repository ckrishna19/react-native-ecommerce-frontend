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

const OrderItem = ({ item: itms }) => {
  const dispatch = useDispatch();

  const date = new Date(itms?.createdAt);
  function formatCreatedAtDate(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  const formatDate = formatCreatedAtDate(date);
  return (
    <View style={tw`my-1 bg-[#222E34] rounded-lg px-6 py-2`}>
      <Text style={tw`text-[#F5F8FB] leading-5 text-right mb-2`}>
        {formatDate}
      </Text>
      {itms?.orderItems?.map((item) => (
        <View
          key={item.id}
          style={tw`flex-row items-center gap-x-5 my-2 border border-[#8F959E] p-1 rounded-lg `}
        >
          <View style={tw`w-[50px] aspect-square rounded-lg bg-[#29363D]`}>
            <Image
              source={{
                uri: item
                  ? item.image
                  : "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
              }}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
                borderRadius: 5,
              }}
            />
          </View>

          <View style={tw`flex-row  gap-x-3 items-center`}>
            <View style={tw`flex-1`}>
              <View style={tw`w-[250px]  gap-y-2`}>
                <Text style={tw`text-[#F5F8FB] text-sm leading-5`}>
                  {item.productName}
                </Text>
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-[#DEDEDE] font-bold`}>
                    Quantity: {item.quantity}
                  </Text>

                  <Text style={tw`text-[#DEDEDE] font-bold`}>
                    Price: $ {item.price}.00
                  </Text>
                </View>
                <View style={tw``}>
                  <Text style={tw`text-[#DEDEDE] font-light text-[11px]`}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
      <View style={tw` mt-2 `}>
        <View style={tw`py-2 gap-y-1`}>
          <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>
            Order Info
          </Text>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-[#8F959E] font-light text-[15px]`}>
              Subtotal
            </Text>
            <Text style={tw`text-[#F5F8FB]  text-[15px]`}>
              ${itms.total}.00
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-[#8F959E] font-light text-[15px]`}>
              Shipping const
            </Text>
            <Text style={tw`text-[#F5F8FB]  text-[15px]`}>
              ${itms.shippingCost}
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-[#8F959E] font-light text-[15px]`}>
              Grand Total
            </Text>
            <Text style={tw`text-[#F5F8FB]  text-[15px]`}>${itms.amount}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`w-8 aspect-square rounded-full border border-[#DEDEDE] items-center justify-center ml-auto`}
        >
          <MaterialCommunityIcons name="delete" size={20} color="#DEDEDE" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderItem;
