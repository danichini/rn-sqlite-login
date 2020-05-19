import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";

import SignUp from "../views/signUp";
import Login from "../views/logIn";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("db.db");

export default function MyStack() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, email text, password text);"
      );
    }, null);
    
  }, [])

  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "SignUp", headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
