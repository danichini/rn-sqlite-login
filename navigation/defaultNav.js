import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../views/signUp";
import Login from "../views/logIn";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "SignUp" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
}
