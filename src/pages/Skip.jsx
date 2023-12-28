import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import colors from "../utils/colors";
import tw from "twrnc";

const Skip = ({ navigation }) => {
  const width = Dimensions.get("screen").width;
  const leftposition = (width.toFixed(0) - 345) / 2;
  return (
    <PageWrapper>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/preview.png")} // Replace with your image path
          style={styles.backgroundImage}
        >
          <View style={tw`w-full    absolute bottom-4 left-0`}>
            <View
              style={tw`w-[345px]  h-[244px] mx-auto bg-[#29363D] rounded-lg`}
            >
              <Text
                style={tw`text-[25px] font-semibold capitalize text-[#F5F8FB] mx-auto mt-3 `}
              >
                look good, feel good
              </Text>
              <Text
                style={tw`text-[#8F959E] text-[15px] text-center font-light leading-snug	my-2`}
              >
                Create your individual & unique style and look amazing everyday.
              </Text>
              <View style={tw`flex-row gap-x-[10px] mx-auto my-2 `}>
                <TouchableOpacity
                  style={tw`w-[152px] h-[60px] p-[10px] items-center justify-center bg-[#222E34] rounded-[10px]`}
                >
                  <Text style={tw`text-[#8F959E] text-[17px]`}>Men</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`w-[152px] h-[60px] p-[10px] items-center justify-center bg-[${colors.btnColor}] rounded-[10px]`}
                >
                  <Text style={tw`text-[#F5F8FB] text-[17px]`}>Women</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={tw`mt-2`}
                onPress={() => navigation.navigate("LoginSplash")}
              >
                <Text style={tw`text-[#8F959E] text-[17px] text-center`}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </PageWrapper>
  );
};

export default Skip;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container fill the available space
  },
  backgroundImage: {
    flex: 1, // Make the image fill the available space
    resizeMode: "contain", // Adjust the resizeMode as needed (cover, contain, stretch, etc.)
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    position: "relative",
  },
});
