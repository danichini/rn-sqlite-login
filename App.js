import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import DefaultNav from "./navigation/defaultNav";
import { useFonts } from "@use-expo/font";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="pink" />
        <DefaultNav />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
