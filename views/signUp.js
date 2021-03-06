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

export default function SignUp({ navigation }) {
  const db = SQLite.openDatabase("db.db");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/purple.jpg")}
        style={styles.image}
      >
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={(values) => {
            db.transaction((tx) => {
              tx.executeSql(
                "create table if not exists items (id integer primary key not null, email text, password text);"
              );
              tx.executeSql(
                "SELECT EXISTS(SELECT 1 FROM items WHERE email=(?));",
                [values.email],
                (_, { rows }) => {
                  if (Object.values(rows._array[0])[0] > 0) {
                    Alert.alert(
                      `The email ${values.email} is already in the database`
                    );
                  } else {
                    tx.executeSql(
                      "insert into items (email, password) values (?, ?)",
                      [values.email, values.password]
                    );
                    navigation.navigate("Login", {
                      email: values.email,
                      password: values.password,
                    });
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
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            confirmPassword: yup
              .string()
              .required()
              .label("Confirm password")
              .test(
                "passwords-match",
                "Passwords must match",
                function (value) {
                  return this.parent.password === value;
                }
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
                <Text style={styles.header}>REGISTER!</Text>
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
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  placeholder="Confirm password"
                  secureTextEntry={true}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={{ fontSize: 10, color: "crimson" }}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
              <Button title="Sign In" onPress={handleSubmit} color={"#B266B2"} />
              <View style={styles.bottomText}>
                <Text style={{ color: "white", fontFamily: "Montserrat" }}>
                  already have an accout?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ color: "pink", fontFamily: "Montserrat" }}>
                    login
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
