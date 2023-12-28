import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import PageWrapper from "./PageWrapper";
import Header from "../components/Header";
import tw from "twrnc";
import Search from "../components/Search";
import Product from "../components/Product";
import Modal from "../components/Modal";

const Home = () => {
  return (
    <PageWrapper>
      <View style={tw`w-[90%] mx-auto`}>
        <Header />
        <ScrollView style={tw`h-[80%]  `} showsVerticalScrollIndicator={false}>
          <Search />

          <Product />
        </ScrollView>
      </View>
    </PageWrapper>
  );
};

export default Home;
