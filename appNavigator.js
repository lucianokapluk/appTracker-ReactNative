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
import {Text} from 'react-native';
import SignOut from './src/components/signOut';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: '           Tracking',
        headerTintColor: 'white',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#212121',
      },
      headerRight: <SignOut />,
      headerTitleStyle: {
        flex: 5,
        textAlign: 'center',
      },
    },
    cardStyle: {backgroundColor: '#212121'},
  },
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
        headerTintColor: 'white',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#212121',
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
    },
    cardStyle: {backgroundColor: '#212121'},
  },
);
const AppNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: HomeStack,
    Login: LoginStack,
  },
  {
    initialRouteName: 'Login',
  },
);

export default AppNavigator;
