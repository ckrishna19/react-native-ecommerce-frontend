// module import
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageWrapper from "../pages/PageWrapper";
import tw from "twrnc";
import Svg, { Defs, G, Path, Rect } from "react-native-svg";
import {
  Entypo,
  Ionicons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  authLoading,
  authLogout,
  errorUser,
  updateProfileImage,
  falseLoading,
  verifyRequest,
} from "../redux/slice/authSlice";
import { getOrderList } from "../redux/action/productAction";
import colors from "../utils/colors";
import * as ImagePicker from "expo-image-picker";
import * as API from "../redux/Api";
import axios from "axios";

// module import

const CostumDrawer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, loading } = useSelector((s) => s.auth);
  const { allOrder } = useSelector((s) => s.order);
  console.log(user);
  const [photo, setPhoto] = useState(null);
  const [showDisplayImage, setShowDisplayImage] = useState(false);
  const openImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result?.canceled) {
      setPhoto(result?.assets[0]);
    }
  };

  const uploadImage = async () => {
    const file = photo?.uri?.split("/");

    const name = file[file.length - 1];
    console.log("name:", name);
    const formData = new FormData();
    formData.append("image", {
      name,
      type: "image/*",
      uri: photo?.uri,
    });
    dispatch(authLoading());
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(API.uploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      dispatch(updateProfileImage(res.data.updateProfileImage));
      console.log(res.data.updateProfileImage);
      setPhoto(null);
    } catch (error) {
      Alert.alert(error.response.data.message);
      dispatch(errorUser(error.response.data.message));
    }
  };

  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  const handleLogout = async () => {
    dispatch(authLoading());
    try {
      dispatch(authLogout());
      await AsyncStorage.removeItem("accessToken");
      navigation.replace("LoginSplash");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestForVerify = async () => {
    dispatch(authLoading());
    if (user?.verified) {
      Alert.alert("Verified");
    } else {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const res = await axios.get(API.requestForVerifyToken, {
          headers: { "Content-Type": "application/json", Authorization: token },
        });

        if (res.status === 201) {
          dispatch(verifyRequest(res.data.updated));
          navigation.navigate("VerifyToken");
        }
      } catch (error) {
        Alert.alert(error.response.data.message);
        dispatch(errorUser(error.response.data.message));
      }
    }
  };

  return (
    <PageWrapper>
      <View style={tw`mt-10 mx-8 h-full`}>
        <TouchableOpacity
          style={tw`w-[45px] aspect-square rounded-full bg-[#222E34] items-center justify-center`}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <Path
              d="M18 15.75V3.25M13 22V3.25M8 22V9.5"
              stroke="#F5F8FB"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <View style={tw`flex-row justify-between my-4 `}>
          <View style={tw`flex-row gap-x-3 `}>
            <TouchableOpacity
              onLongPress={openImage}
              onPress={() => setShowDisplayImage(true)}
            >
              <Image
                source={{
                  uri:
                    user?.image?.url !== undefined
                      ? user?.image?.url
                      : "https://www.shutterstock.com/image-vector/person-icon-flat-symbol-design-260nw-424612276.jpg",
                }}
                style={tw`w-10 aspect-square rounded-full`}
              />
            </TouchableOpacity>

            <View>
              <Text style={tw`text-[#F5F8FB] text-[15px] font-bold`}>
                {user?.fullName}
              </Text>
              <View style={tw`flex-row items-center gap-x-1`}>
                <TouchableOpacity onPress={handleRequestForVerify}>
                  <Text style={tw`text-[#8F959E] text-[13px] font-light`}>
                    {user?.verified
                      ? "Verified Profile"
                      : "  Unverified Profile"}
                  </Text>
                </TouchableOpacity>

                <View
                  style={tw.style(
                    `w-2 aspect-square rounded-full `,
                    user?.verified ? "bg-green-500" : "bg-red-500"
                  )}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={tw`p-[10px] bg-[#222E34] rounded-md`}
            onPress={() => navigation.navigate("OrderList")}
          >
            <Text style={tw`text-[#8F959E] text-[11px] text-center`}>
              {allOrder?.length} {allOrder?.length > 1 ? "orders" : "order"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`mt-4 gap-y-6 `}>
          <View style={tw`flex-row justify-between items-center`}>
            <TouchableOpacity style={tw`flex-row gap-x-2`}>
              <Entypo name="light-up" size={18} color="#F5F8FB" />
              <Text style={tw` text-[#F5F8FB] font-light text-[15px]`}>
                Dark Mode
              </Text>
            </TouchableOpacity>
            <Entypo name="switch" size={25} color="#34C759" />
          </View>

          <TouchableOpacity style={tw`flex-row gap-x-2`}>
            <Ionicons name="alert-circle-outline" size={18} color="#F5F8FB" />
            <Text style={tw` text-[#F5F8FB] font-light text-[15px]`}>
              Account Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row gap-x-2`}
            onPress={() => navigation.navigate("changePassword")}
          >
            <Ionicons name="lock-closed-outline" size={18} color="#F5F8FB" />
            <Text style={tw` text-[#F5F8FB] font-light text-[15px]`}>
              change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-row gap-x-2`}>
            <FontAwesome name="shopping-bag" size={18} color="#F5F8FB" />
            <Text style={tw` text-[#F5F8FB] font-light text-[15px]`}>
              Other
            </Text>
          </TouchableOpacity>

          <View style={tw`flex-row gap-x-2`}>
            <FontAwesome name="credit-card" size={18} color="#F5F8FB" />
            <Text style={tw` text-[#F5F8FB] font-light text-[15px]`}>
              My Cards
            </Text>
          </View>

          <View style={tw`flex-row gap-x-2`}>
            <AntDesign name="hearto" size={18} color="#F5F8FB" />
            <Text style={tw` text-[#F5F8FB] font-light text-[15px]`}>
              Wishlist
            </Text>
          </View>

          <View style={tw`flex-row gap-x-3`}>
            <AntDesign name="setting" size={18} color="#F5F8FB" />
            <Text style={tw` text-[#F5F8FB] font-light text-[15px]`}>
              Setting
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={tw` my-auto flex-row items-center gap-x-2`}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={18} color="#FF5757" />
          <Text style={tw`text-[15px] text-[#FF5757]`}>Logout</Text>
        </TouchableOpacity>
      </View>
      {photo && (
        <Modal
          style={tw` w-full h-full justify-center items-center   `}
          onRequestClose={() => setPhoto(null)}
        >
          <PageWrapper>
            <View style={tw`w-full h-[60%] my-auto relative `}>
              <Image style={tw`w-full h-full  `} source={{ uri: photo?.uri }} />

              {loading ? (
                <TouchableOpacity
                  onPress={() => dispatch(falseLoading())}
                  style={tw` items-center flex-row justify-center px-4 py-2  absolute left-[45%] top-[45%]`}
                >
                  <ActivityIndicator size={80} color={colors.bgColor} />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={uploadImage}
                    style={tw`bg-[${colors.bgColor}] items-center flex-row justify-center px-4 py-2 rounded-lg gap-x-2 absolute right-4 bottom-4`}
                  >
                    <FontAwesome size={30} name="send-o" color="#8F959E" />
                    <Text style={tw`text-[#8F959E] font-light text-[14px]`}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setPhoto(null)}
                    style={tw`bg-[${colors.bgColor}] items-center flex-row justify-center px-4 py-2 rounded-lg gap-x-2 absolute left-4 top-4`}
                  >
                    <AntDesign size={30} name="close" color="#8F959E" />
                    <Text style={tw`text-[#8F959E] font-light text-[14px]`}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </PageWrapper>
        </Modal>
      )}

      {showDisplayImage && (
        <Modal
          transparent={false}
          onRequestClose={() => setShowDisplayImage(false)}
        >
          <PageWrapper>
            <View style={tw`w-full h-[60%] my-auto`}>
              <Image
                source={{
                  uri:
                    user.image?.url !== undefined
                      ? user.image.url
                      : "https://www.shutterstock.com/image-vector/person-icon-flat-symbol-design-260nw-424612276.jpg",
                }}
                style={tw`w-full h-full  `}
              />
            </View>
          </PageWrapper>
        </Modal>
      )}
    </PageWrapper>
  );
};

export default CostumDrawer;
