import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigators/StackNavigator";
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";

const App = () => {
  // stripe password:e@3_TG#_T&y9Wia
  const publishableKey =
    "pk_test_51NrEayKjXMZ1cUEfmPiI4tS8nRGLIAuMZVQElCp64qpoMsjwOP69DkPQ11zTTVMT5M6tWWuAROaj3I4XpXyBqU9a00IoCEiJDc";
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={publishableKey}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </PersistGate>
      </StripeProvider>
    </Provider>
  );
};

export default App;
