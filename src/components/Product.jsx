import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import ProductCard from "./ProductCard";

import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/action/productAction";
const Product = () => {
  const dispatch = useDispatch();

  const { productList, loading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <View>
      <View style={tw`flex-row items-center justify-between  py-1 mb-3 `}>
        <Text style={tw`text-[#F5F8FB] text-[17px]`}>New Arrival</Text>
        <TouchableOpacity>
          <Text style={tw`text-[#8F959E] font-light text-[13px]`}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row w-full  flex-wrap gap-y-3 `}>
        {loading ? (
          <View style={tw` flex-1   mt-32  items-center justify-center`}>
            <ActivityIndicator size={80} color="#F5F8FB" />
          </View>
        ) : (
          productList?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </View>
    </View>
  );
};

export default Product;
