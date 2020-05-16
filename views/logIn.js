import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { Formik } from "formik";
import * as yup from "yup";

export default function logIn({ route, navigation }) {
  const db = SQLite.openDatabase("db.db");

  return (
    <View style={styles.container}>
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
                        Alert,alert('Incorrect Password')
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
            <View>
              <TextInput
                style={styles.textInputStyle}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="E-mail"
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
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
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}
            </View>
            <Button
              title="Log In"
              // disabled={isValid}
              onPress={handleSubmit}
            />
            <View>
              <Text>go to</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text>sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});
