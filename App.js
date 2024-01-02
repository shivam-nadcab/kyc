import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './Screen/Login'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})