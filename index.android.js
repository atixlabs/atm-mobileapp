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

const humanAtm = StackNavigator({
  HomeScreen: { screen: HomeScreen },
});


AppRegistry.registerComponent('humanAtm', () => humanAtm);
