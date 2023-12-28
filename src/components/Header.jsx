import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Header = () => {
  const navigation = useNavigation();
  const { user } = useSelector((s) => s.auth);
  return (
    <View style={tw`mt-3 pb-4`}>
      <View style={tw`flex-row items-center justify-between`}>
        <TouchableOpacity
          onPress={user !== null ? () => navigation.openDrawer() : null}
          style={tw`items-center justify-center bg-[#222E34] p-2 rounded-full`}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <Path
              d="M22 7L2 7"
              stroke="#8F959E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M19 12L5 12"
              stroke="#8F959E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M16 17H8"
              stroke="#8F959E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`items-center justify-center bg-[#222E34] p-2 rounded-full`}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <Path
              d="M9.99998 9.75C9.58576 9.75 9.24998 9.41421 9.24998 9C9.24998 8.58579 9.58576 8.25 9.99998 8.25H14C14.3033 8.25 14.5768 8.43273 14.6929 8.71299C14.809 8.99324 14.7448 9.31583 14.5303 9.53033L11.8106 12.25H14C14.4142 12.25 14.75 12.5858 14.75 13C14.75 13.4142 14.4142 13.75 14 13.75H9.99998C9.69663 13.75 9.42315 13.5673 9.30707 13.287C9.19098 13.0068 9.25515 12.6842 9.46965 12.4697L12.1893 9.75H9.99998Z"
              fill="#8F959E"
            />
            <Path
              fillRule="evenodd"
              cliRule="evenodd"
              d="M4.25004 9C4.25004 4.71979 7.71983 1.25 12 1.25C16.2802 1.25 19.75 4.71979 19.75 9V9.7041C19.75 10.401 19.9563 11.0824 20.3429 11.6622L21.4915 13.3851C22.8246 15.3848 21.8069 18.1028 19.4883 18.7351C18.7327 18.9412 17.9706 19.1155 17.2042 19.2581L17.2023 19.2632C16.4333 21.3151 14.378 22.75 12 22.75C9.62198 22.75 7.56667 21.3151 6.79768 19.2632L6.79578 19.2581C6.02937 19.1155 5.26738 18.9412 4.51177 18.7351C2.19318 18.1028 1.17547 15.3848 2.50856 13.3851L3.65717 11.6622C4.04375 11.0824 4.25004 10.401 4.25004 9.7041V9ZM8.62349 19.5369C9.33444 20.5585 10.571 21.25 12 21.25C13.4289 21.25 14.6655 20.5585 15.3764 19.537C13.1335 19.805 10.8664 19.8049 8.62349 19.5369ZM12 2.75C8.54826 2.75 5.75004 5.54822 5.75004 9V9.7041C5.75004 10.6972 5.45609 11.668 4.90524 12.4943L3.75664 14.2172C2.99147 15.3649 3.57561 16.925 4.90644 17.288C9.5507 18.5546 14.4494 18.5546 19.0936 17.288C20.4245 16.925 21.0086 15.3649 20.2434 14.2172L19.0948 12.4943C18.544 11.668 18.25 10.6972 18.25 9.7041V9C18.25 5.54822 15.4518 2.75 12 2.75Z"
              fill="#8F959E"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={tw`mt-4 gap-y-2`}>
        <Text style={tw`text-[#F5F8FB] text-[28px] font-bold tracking-tight`}>
          Hello
        </Text>
        <Text style={tw`text-[#8F959E] text-[15px] font-light leading-4 `}>
          WELCOME TO MY STORE
        </Text>
      </View>
    </View>
  );
};

export default Header;
