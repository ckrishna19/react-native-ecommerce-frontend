import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import tw from "twrnc";
import { FontAwesome, Feather } from "react-native-vector-icons";
import CartItem from "../components/CartItem";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../redux/Api";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { orderLoading, newOrder } from "../redux/slice/orderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeAllCartItem } from "../redux/slice/cartSlice";
const CartPage = ({ navigation }) => {
  const { user } = useSelector((s) => s.auth);
  const { cart } = useSelector((s) => s.cart);
  const myCart = cart.filter((x) => x.cartBy === user?._id);
  console.log(myCart);
  const stripe = useStripe();
  const dispatch = useDispatch();

  const totalPrice = Number(
    myCart.reduce((a, c) => {
      const itemPrice = c.price * c.quantity;
      return itemPrice + a;
    }, 0)
  );
  const total = totalPrice.toFixed(2);
  const shippingCost = (total / 10).toFixed(2);
  const grandTotal = (totalPrice + Number(shippingCost)).toFixed(2);

  const newArray = myCart.map((item) => {
    const { cartBy, ...rest } = item;
    return rest;
  });

  const onCheckOut = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      const res = await axios.post(
        API.payment,
        { amount: Math.floor(grandTotal) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const clientSecret = res.data.clientSecret;

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Krish",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);

      const orderResponse = await axios.post(
        API.newOrder,
        {
          amount: grandTotal,
          orderItems: newArray,
          shippingCost,
          total,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      dispatch(newOrder(orderResponse.data?.newOrder));
      dispatch(removeAllCartItem());
      Alert.alert("Payment completed");
      navigation.navigate("ConfirmOrder");
    } catch (error) {
      console.log(error);
      return Alert.alert(error.response.data.message);
      //   console.log(error.response.data.message);
    }
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
        <>
          <View style={tw`w-[90%] mx-auto mt-10`}>
            <View style={tw`flex-row mb-6  items-center `}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw`w-[45px]  aspect-square rounded-full bg-[#222E34] items-center justify-center `}
              >
                <FontAwesome name="long-arrow-left" size={25} color="#F5F8FB" />
              </TouchableOpacity>

              <Text style={tw`text-[#F5F8FB] font-bold text-[17px] mx-auto`}>
                Cart
              </Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={tw`h-[50%]`}
            >
              {myCart?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>

          <View style={tw`absolute bottom-1 left-0 w-full`}>
            <View style={tw`w-[90%] mx-auto`}>
              <View style={tw`flex-row items-center justify-between my-2`}>
                <Text style={tw`text-[#F5F8FB] text-[17px]`}>
                  Delivery Address
                </Text>
                <TouchableOpacity
                  style={tw`w-8 aspect-square rounded-full border border-[#DEDEDE] items-center justify-center`}
                >
                  <Feather name="chevron-right" size={25} color="#DEDEDE" />
                </TouchableOpacity>
              </View>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-x-3 items-center`}>
                  <View style={tw`w-12 aspect-square rounded-md`}>
                    <Image
                      source={{
                        uri: "https://ehrpinspection.nra.gov.np/static/images/maps/CHITWAN.jpg",
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
                  <View>
                    <Text style={tw`text-[#F5F8FB] font-light`}>
                      Bharatpur, 09 Gondrang
                    </Text>
                    <Text style={tw`text-[#8F959E]`}>Chitwan</Text>

                    <Text style={tw`text-[#8F959E]`}> Phone: 1234567890</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={tw`w-8 aspect-square rounded-full bg-[#4AC76D] items-center justify-center`}
                >
                  <Feather name="check" size={20} color="#F5F8FB" />
                </TouchableOpacity>
              </View>
              <View style={tw`py-2 gap-y-2`}>
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>
                  Order Info
                </Text>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-[#8F959E] font-light text-[15px]`}>
                    Subtotal
                  </Text>
                  <Text style={tw`text-[#F5F8FB]  text-[15px]`}>{total}</Text>
                </View>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-[#8F959E] font-light text-[15px]`}>
                    Shipping const
                  </Text>
                  <Text style={tw`text-[#F5F8FB]  text-[15px]`}>
                    ${shippingCost}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-[#8F959E] font-light text-[15px]`}>
                    Grand Total
                  </Text>
                  <Text style={tw`text-[#F5F8FB]  text-[15px]`}>
                    ${grandTotal}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onCheckOut}
                  style={tw`bg-[${colors.btnColor}] py-4 rounded-md mt-4`}
                >
                  <Text
                    style={tw`text-[#F5F8FB] font-light text-[17px] text-center`}
                  >
                    Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </PageWrapper>
  );
};

export default CartPage;
