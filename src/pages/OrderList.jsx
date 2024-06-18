import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { FontAwesome } from "react-native-vector-icons";
import OrderItem from "../components/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "./PageWrapper";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OrderList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allOrder } = useSelector((s) => s.order);

  // useEffect(() => {
  //   const getAllShopping = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("accessToken");
  //       const res = await axios.get("http://192.168.254.1:3001/order/all", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //       });

  //       dispatch(allShopping(res.data.allOrder));
  //     } catch (error) {
  //       Alert.alert(error.response.data.message);
  //     }
  //   };

  //   getAllShopping();
  // }, []);
  return (
    <PageWrapper>
      <View style={tw`w-[90%] mx-auto mt-10`}>
        <View style={tw`flex-row mb-6  items-center `}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Drawer")}
            style={tw`w-[45px]  aspect-square rounded-full bg-[#222E34] items-center justify-center `}
          >
            <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
          </TouchableOpacity>

          <Text style={tw`text-[#F5F8FB] font-bold text-[17px] mx-auto`}>
            Order List
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`h-[90%]`}>
          {allOrder
            ?.slice()
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
        </ScrollView>
      </View>
    </PageWrapper>
  );
};

export default OrderList;
