import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './views/signUp'

export default function App() {
  return (
    <View style={styles.container}>
      <SignUp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
