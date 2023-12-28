import {
  fetchAllProduct,
  fetchLoading,
  fetchSingleProduct,
} from "../slice/productSlice";
import { newUser, loginUser, authLoading, errorUser } from "../slice/authSlice";
import axios from "axios";
import * as API from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { orderLoading, getAllOrder } from "../slice/orderSlice";
//https://dummyjson.com/products

export const getAllProduct = () => async (dispatch) => {
  dispatch(fetchLoading());
  try {
    const res = await axios.get("https://dummyjson.com/products", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    dispatch(fetchAllProduct(res?.data?.products));
  } catch (error) {
    console.log("error:", error);
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  dispatch(fetchLoading());
  try {
    const res = await axios.get(`https://dummyjson.com/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    dispatch(fetchSingleProduct(res.data));
  } catch (error) {
    console.log("errors:", error);
  }
};

export const SignUp = (data) => async (dispatch) => {
  dispatch(authLoading());
  try {
    const res = await axios.post(API.register, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    if (res.status === 201) {
      await AsyncStorage.setItem("accesssToken", res.data.accessToken);
      dispatch(newUser(res.data));
    }
  } catch (error) {
    console.log(error);
    Alert.alert(error.response.data.message);
    dispatch(errorUser(error.response.data.message));
  }
};

export const getOrderList = () => async (dispatch) => {
  dispatch(orderLoading());
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const res = await axios.get(API.orderList, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    dispatch(getAllOrder(res.data.allOrder));
  } catch (error) {
    console.log(error);
  }
};
