import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import PageWrapper from "./PageWrapper";
import tw from "twrnc";
import colors from "../utils/colors";
import Reviews from "../components/ReviewCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/action/productAction";
import { addToCart } from "../redux/slice/cartSlice";

const ProductDetails = () => {
  const navigation = useNavigation();
  const { loading, product } = useSelector((s) => s.products);

  const { user } = useSelector((s) => s.auth);

  const dispatch = useDispatch();

  const { params } = useRoute();
  const id = params.params;
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const item = {
    image: product.thumbnail,
    price: product.price,
    productName: product.title,
    category: product.category,
    description: product.description,
    quantity: 1,
    id: product.id,
    cartBy: user?._id,
  };

  return (
    <PageWrapper>
      {loading ? (
        <View style={tw` flex-1   mt-32  items-center justify-center`}>
          <ActivityIndicator size={80} color="#F5F8FB" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`mb-2`}>
          <View style={tw`w-full aspect-square bg-cyan-50`}>
            <Image
              source={{
                uri: product?.thumbnail,
              }}
              style={{
                flex: 1,
                width: null,
                height: null,
              }}
              contentFit="contain"
            />
          </View>
          <View style={tw`w-[90%] mx-auto`}>
            <View style={tw`my-2 flex-row justify-between`}>
              <Text style={tw`text-[#8F959E] font-light text-[13px] `}>
                {product.category}
              </Text>
              <Text style={tw`text-[#8F959E] font-light text-[13px] `}>
                Price
              </Text>
            </View>
            <View style={tw`my-2 flex-row justify-between`}>
              <Text style={tw`text-[#F5F8FB] font-bold text-[22px] `}>
                {product.title}
              </Text>
              <Text style={tw`text-[#F5F8FB] font-bold text-[22px] `}>
                ${product.price}
              </Text>
            </View>

            <View style={tw`flex-row justify-between my-2`}>
              {product.images?.map((img, i) => (
                <View
                  key={i}
                  style={tw`w-1/6 aspect-square bg-cyan-100 rounded-md`}
                >
                  <Image
                    source={{ uri: img }}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                    }}
                    contentFit="contain"
                  />
                </View>
              ))}
            </View>
            <View style={tw`my-2 flex-row justify-between my-2`}>
              <Text style={tw`text-[#F5F8FB] font-bold text-[15px] `}>
                Size
              </Text>
              <TouchableOpacity>
                <Text
                  style={tw`text-[${colors.btnColor}] font-light text-[15px] `}
                >
                  Size Guide
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row flex-wrap  gap-4`}>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>XS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>S</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>L</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>XL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>
                  2XL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>
                  3XL
                </Text>
              </TouchableOpacity>
            </View>

            <View style={tw`my-2`}>
              <Text style={tw`text-[#F5F8FB] text-[17px] font-bold`}>
                Description
              </Text>
              <Text
                style={tw`text-[#8F959E] font-light text-[15px] leading-[1.25rem]`}
              >
                {product.description}
                <Text style={tw`text-[#F5F8FB]`}> Read More..</Text>
              </Text>
            </View>
            <View style={tw`my-2 flex-row justify-between my-2`}>
              <Text style={tw`text-[#F5F8FB] font-bold text-[15px] `}>
                Reviews
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddReview")}
              >
                <Text
                  style={tw`text-[${colors.btnColor}] font-light text-[15px] `}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            {product?.rating > 0 &&
              Array(Math.floor(product?.rating))
                .fill(0)
                .map((_, i) => <Reviews key={i} />)}
          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={
          user === null
            ? () => navigation.navigate("LoginSplash")
            : () => dispatch(addToCart(item))
        }
        style={tw`bg-[${colors.btnColor}] h-[70px] justify-center items-center  `}
      >
        <Text style={tw`text-[#F5F8FB] text-[17px] `}>Add to Cart</Text>
      </TouchableOpacity>
    </PageWrapper>
  );
};

export default ProductDetails;

/*

    <PageWrapper>
      {loading ? (
        <View style={tw` flex-1   mt-32  items-center justify-center`}>
          <ActivityIndicator size={80} color="#F5F8FB" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`mb-2`}>
          <View style={tw`w-full aspect-square bg-cyan-50`}>
            <Image
              source={{
                uri: product?.thumbnail,
              }}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
            />
          </View>
          <View style={tw`w-[90%] mx-auto`}>
            <View style={tw`my-2 flex-row justify-between`}>
              <Text style={tw`text-[#8F959E] font-light text-[13px] `}>
                {product.category}
              </Text>
              <Text style={tw`text-[#8F959E] font-light text-[13px] `}>
                Price
              </Text>
            </View>
            <View style={tw`my-2 flex-row justify-between`}>
              <Text style={tw`text-[#F5F8FB] font-bold text-[22px] `}>
                {product.title}
              </Text>
              <Text style={tw`text-[#F5F8FB] font-bold text-[22px] `}>
                ${product.price}
              </Text>
            </View>

            <View style={tw`flex-row justify-between my-2`}>
              {product.images?.map((img, i) => (
                <View
                  key={i}
                  style={tw`w-1/6 aspect-square bg-cyan-100 rounded-md`}
                >
                  <Image
                    source={{ uri: img }}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              ))}
            </View>
            <View style={tw`my-2 flex-row justify-between my-2`}>
              <Text style={tw`text-[#F5F8FB] font-bold text-[15px] `}>
                Size
              </Text>
              <TouchableOpacity>
                <Text
                  style={tw`text-[${colors.btnColor}] font-light text-[15px] `}
                >
                  Size Guide
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row flex-wrap  gap-4`}>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>XS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>S</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>L</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>XL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>
                  2XL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[60px] h-[60px] rounded-lg bg-[#222E34] items-center justify-center `}
              >
                <Text style={tw`text-[#F5F8FB] font-bold text-[17px]`}>
                  3XL
                </Text>
              </TouchableOpacity>
            </View>

            <View style={tw`my-2`}>
              <Text style={tw`text-[#F5F8FB] text-[17px] font-bold`}>
                Description
              </Text>
              <Text
                style={tw`text-[#8F959E] font-light text-[15px] leading-[1.25rem]`}
              >
                {product.description}
                <Text style={tw`text-[#F5F8FB]`}> Read More..</Text>
              </Text>
            </View>
            <View style={tw`my-2 flex-row justify-between my-2`}>
              <Text style={tw`text-[#F5F8FB] font-bold text-[15px] `}>
                Reviews
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddReview")}
              >
                <Text
                  style={tw`text-[${colors.btnColor}] font-light text-[15px] `}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            {Array(Math.floor(product?.rating))
              .fill(0)
              .map((_, i) => (
                <Reviews key={i} />
              ))}
          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={
          user === null
            ? () => navigation.navigate("LoginSplash")
            : () => dispatch(addToCart(item))
        }
        style={tw`bg-[${colors.btnColor}] h-[70px] justify-center items-center  `}
      >
        <Text style={tw`text-[#F5F8FB] text-[17px] `}>Add to Cart</Text>
      </TouchableOpacity>
    </PageWrapper>

*/
