import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EVSU_Canteen_Login from "./EVSU_Canteen_Login";
import EVSU_Canteen_Signup from "./EVSU_Canteen_Signup";
import EVSU_Canteen_Forgot from "./EVSU_Canteen_Forgot";
import EVSU_Student_DashBoard from "./EVSU_Student_DashBoard";
import ResetPassword from "./resetpassword";
import VerifyOTP from "./VerifyOTP";
import Profile from "./Profile";
import resetpassword from "./resetpassword";
import UserTypeSelection from "./UserTypeSelection";
import VendorDashboard from "./VendorDashboard";
import StoreProduct from "./StoreProduct";
import Basket from "./Basket";
import { BasketProvider } from "./BasketContext";
const Stack = createStackNavigator();

export default function App() {
  return (
    <BasketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={EVSU_Canteen_Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={EVSU_Canteen_Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forgot"
            component={EVSU_Canteen_Forgot}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyOTP" // Add this screen
            component={VerifyOTP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Stud_Dashboard"
            component={EVSU_Student_DashBoard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="resetpassword"
            component={resetpassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserTypeSelection"
            component={UserTypeSelection}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VendorDashboard"
            component={VendorDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StoreProduct"
            component={StoreProduct}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Basket"
            component={Basket}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BasketProvider>
  );
}
