import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Home} from './screens/Home';

export const App = () => {
  return (
    <View style={styles.appContainer}>
      <Home></Home>
    </View>
  );
};
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})