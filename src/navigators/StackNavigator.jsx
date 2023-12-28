import React, { Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import Splash from "../pages/Splash";
import Skip from "../pages/Skip";
import LoginSplash from "../pages/LoginSplash";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import VerificationCode from "../pages/VerificationCode";
import NewPassword from "../pages/NewPassword";
import ProductDetails from "../pages/ProductDetails";
import AddReview from "../pages/AddReview";
import CreateReview from "../pages/CreateReview";
import ConfirmOrder from "../pages/ConfirmOrder";
import CreateProduct from "../pages/CreateProduct";
import OrderList from "../pages/OrderList";
import ChangePassword from "../pages/ChangePassword";
import VerifyToken from "../pages/TokenVerify";

// const DrawerNavigator = lazy(() => import("./DrawerNavigator"));
// const Splash = lazy(() => import("../pages/Splash"));
// const Skip = lazy(() => import("../pages/Skip"));
// const LoginSplash = lazy(() => import("../pages/LoginSplash"));
// const Register = lazy(() => import("../pages/Register"));
// const Login = lazy(() => import("../pages/Login"));
// const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
// const VerificationCode = lazy(() => import("../pages/VerificationCode"));
// const NewPassword = lazy(() => import("../pages/NewPassword"));
// const ProductDetails = lazy(() => import("../pages/ProductDetails"));
// const AddReview = lazy(() => import("../pages/AddReview"));
// const CreateReview = lazy(() => import("../pages/CreateReview"));
// const ConfirmOrder = lazy(() => import("../pages/ConfirmOrder"));
// const CreateProduct = lazy(() => import("../pages/CreateProduct"));
// const OrderList = lazy(() => import("../pages/OrderList"));

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ animationEnabled: false, headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="CreateReview" component={CreateReview} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen component={LoginSplash} name="LoginSplash" />
      <Stack.Screen component={Skip} name="Skip" />
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
      <Stack.Screen name="VerifyToken" component={VerifyToken} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

/*
  <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="CreateReview" component={CreateReview} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen component={LoginSplash} name="LoginSplash" />
      <Stack.Screen component={Skip} name="Skip" />
      <Stack.Screen name="OrderList" component={OrderList} />
    


*/
