import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { Formik } from "formik";
import * as yup from "yup";

export default function logIn({ route, navigation }) {
  const db = SQLite.openDatabase("db.db");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/purple.jpg")}
        style={styles.image}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            db.transaction((tx) => {
              tx.executeSql(
                "SELECT EXISTS(SELECT 1 FROM items WHERE email=(?));",
                [values.email],
                (_, { rows }) => {
                  if (Object.values(rows._array[0])[0] > 0) {
                    tx.executeSql(
                      "SELECT * FROM items WHERE email = (?);",
                      [values.email],
                      (_, { rows }) => {
                        if (rows._array[0].password === values.password) {
                          Alert.alert(`Welcome ${values.email}`);
                        } else {
                          Alert, alert("Incorrect Password");
                        }
                      }
                    );
                  } else {
                    Alert.alert(
                      `${values.email}`,
                      "this email is not in our database"
                    );
                  }
                }
              );
            }, null);
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Not a valid e-mail")
              .required("E-mail is required"),
            password: yup
              .string()
              .min(8)
              .required()
              .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*..?&])[A-Za-z\d@$!%..*?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Number and one special case Character"
              ),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={styles.formStyle}>
              <View style={styles.header}>
                <Text style={styles.header}>LOG IN!</Text>
              </View>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  placeholder="E-mail"
                />
                {touched.email && errors.email && (
                  <Text style={{ fontSize: 10, color: "crimson" }}>
                    {errors.email}
                  </Text>
                )}
              </View>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 10, color: "crimson" }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <Button title="Log In" onPress={handleSubmit} color={"#B266B2"} />
              <View style={styles.bottomText}>
                <Text style={{ color: "white", fontFamily: "Montserrat" }}>
                  dont have an acount?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={{ color: "pink", fontFamily: "Montserrat" }}>
                    sign up here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    color: "white",
    fontSize: 40,
    fontFamily: "Montserrat",
    flexDirection: "row",
    justifyContent: "center",
  },
  formStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  textInputStyle: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "black",
    borderWidth: 1,
    marginBottom: 2,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    padding: 20,
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
