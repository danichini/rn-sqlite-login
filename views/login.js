import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import { Formik } from "formik";
import * as yup from 'yup'

export default function Login() {
  // const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formStyle}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="E-mail"
            />
            <TextInput
              style={styles.textInputStyle}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Button onPress={handleSubmit} title="Submit" />
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
  },
});
