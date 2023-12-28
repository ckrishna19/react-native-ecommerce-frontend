import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import ChatHeader from "../components/ChatHeader";
import PageWrapper from "./PageWrapper";
import tw from "twrnc";
import { FontAwesome } from "react-native-vector-icons";
import ChatFooter from "../components/ChatFooter";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
const MessagePage = ({ navigation }) => {
  const { user } = useSelector((s) => s.auth);
  const scrollRef = useRef();
  const handleContentSizeChange = () => {
    scrollRef.current.scrollToEnd({ animated: true });
  };
  return (
    <PageWrapper>
      {user === null ? (
        <View style={tw`h-full items-center justify-center w-[90%] mx-auto`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginSplash")}
            style={tw`bg-[${colors.btnColor}] w-full py-3 rounded-md`}
          >
            <Text style={tw`text-[#F5F8FB] text-center font-bold`}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={tw`flex-1 w-[90%] mx-auto`}>
          <ChatHeader />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={tw`flex-1`}
            contentContainerStyle={tw`py-2`}
            ref={scrollRef}
            onContentSizeChange={handleContentSizeChange}
          >
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <View key={i}>
                  <View style={tw`flex-row items-start gap-x-3 w-[70%] my-2`}>
                    <Image
                      source={{
                        uri: "https://watermark.lovepik.com/photo/40027/7318.jpg_wh1200.jpg",
                      }}
                      style={tw`w-10 aspect-square rounded-full`}
                    />
                    <View style={tw`bg-[#ccc] px-2 py-1 rounded-2xl`}>
                      <Text
                        style={tw`text-[${colors.bgColor}] text-xs font-light`}
                      >
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quia quae autem, laboriosam ducimus atque optio
                        quidem pariatur voluptates obcaecati aspernatur
                        voluptatem et facere saepe ab nisi omnis amet fugit
                        itaque!
                      </Text>
                    </View>
                  </View>

                  <View
                    style={tw`flex-row items-start gap-x-3 w-[70%] my-2 ml-auto`}
                  >
                    <View style={tw`bg-[#B3FCB1] px-2 py-1 rounded-2xl`}>
                      <Text
                        style={tw`text-[${colors.bgColor}] text-xs font-light`}
                      >
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quia quae autem, laboriosam ducimus atque optio
                        quidem pariatur voluptates obcaecati aspernatur
                        voluptatem et facere saepe ab nisi omnis amet fugit
                        itaque!
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>

          <ChatFooter />
        </View>
      )}
    </PageWrapper>
  );
};

export default MessagePage;
