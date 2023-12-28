import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import PageWrapper from "./PageWrapper";
import tw from "twrnc";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import OrderItem from "../components/OrderItem";
const Account = ({ navigation }) => {
  const { user } = useSelector((s) => s.auth);
  const { cart } = useSelector((s) => s.cart);
  const myCart = cart.filter((x) => x.cartBy !== user?._id);

  const { allOrder } = useSelector((s) => s.order);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Image
              source={{
                uri: "https://png.pngtree.com/thumb_back/fh260/background/20211116/pngtree-dark-blue-plain-background-for-design-template-image_916068.png",
              }}
              style={tw`w-full aspect-video`}
            />
          </View>
          <View
            style={tw` w-60 aspect-square rounded-full mx-auto items-center justify-center bg-[${colors.bgColor}] -mt-24`}
          >
            <Image
              style={tw`w-48 aspect-square rounded-full`}
              source={{
                uri:
                  user.image?.url !== undefined
                    ? user.image.url
                    : "https://www.shutterstock.com/image-vector/person-icon-flat-symbol-design-260nw-424612276.jpg",
              }}
            />
          </View>

          <View style={tw`items-center`}>
            <View style={tw`my-3`}>
              <Text
                style={tw`text-[#F5F8FB] text-[28px] font-bold tracking-tight mt-2`}
              >
                {user?.fullName}
              </Text>

              <Text style={tw`text-[#F5F8FB] font-light`}>{user?.email}</Text>
            </View>
            <Text style={tw`text-[#F5F8FB] font-light`}>
              Bharatpur, 09 Gondrang
            </Text>
            <Text style={tw`text-[#8F959E]`}>Chitwan</Text>

            <Text style={tw`text-[#8F959E]`}> Phone: 1234567890</Text>
            <View style={tw`flex-row gap-x-4 my-2`}>
              <Text style={tw`text-[#F5F8FB] font-light`}>
                {allOrder?.length} Orders
              </Text>
              <Text style={tw`text-[#F5F8FB] font-light`}>
                {myCart?.length} CartItems
              </Text>
            </View>
          </View>
          <View style={tw`w-[90%] mx-auto my-2`}>
            <Text style={tw`text-[#F5F8FB] font-bold text-[17px] my-3`}>
              Cart List
            </Text>

            {myCart?.length === 0 ? (
              <View>
                <Text style={tw`text-[#F5F8FB] font-light`}>
                  Cart List is Empty go and Shopping
                </Text>
              </View>
            ) : (
              myCart?.map((item) => <CartItem key={item.id} item={item} />)
            )}

            <Text style={tw`text-[#F5F8FB] font-bold text-[17px] my-3`}>
              Order List
            </Text>
            {allOrder?.length === 0 ? (
              <View>
                <Text style={tw`text-[#F5F8FB] font-light`}>
                  Order List is Empty go and Shopping
                </Text>
              </View>
            ) : (
              allOrder?.map((item) => <OrderItem key={item._id} item={item} />)
            )}
          </View>
        </ScrollView>
      )}
    </PageWrapper>
  );
};

export default Account;
