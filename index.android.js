/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import './shim.js';
import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/containers/HomeScreen';
import SendScreen from './src/components/SendScreen';

const humanAtm = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  SendScreen: { screen: SendScreen },
});


AppRegistry.registerComponent('humanAtm', () => humanAtm);
