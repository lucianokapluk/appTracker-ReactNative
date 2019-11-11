import React, {Component} from 'react';

import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const AppNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

export default AppNavigator;
