import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import OneSignal from 'react-native-onesignal';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Human ATM',
  };

  componentWillMount() {
    console.log('daskldjkasldjlaskjdklasjdkal');
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Welcome to humanATM app</Text>
      </View>
    );
  }
}