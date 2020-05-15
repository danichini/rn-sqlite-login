import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";

import { Formik } from "formik";
import * as yup from "yup";

export default function SignUp() {
  // const [count, setCount] = useState(0);
  const db = SQLite.openDatabase("db.db");

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          db.transaction((tx) => {
            tx.executeSql(
              "create table if not exists items (id integer primary key not null, email text, password text);"
            );
            tx.executeSql("insert into items (email, password) values (?, ?)", [
              values.email,
              values.password,
            ]);
            // tx.executeSql("select * from items", [], (_, { rows }) =>
            //   console.log(rows)
            // );
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
            .test("passwords-match", "Passwords must match ya fool", function (
              value
            ) {
              return this.parent.password === value;
            }),
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
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
            <Button
              title="Sign In"
              // disabled={isValid}
              onPress={handleSubmit}
            />
            <View>
              <Text>go to</Text>
              <TouchableOpacity>
                <Text>login</Text>
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
