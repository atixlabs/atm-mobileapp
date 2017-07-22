import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import API from '../services/API/API';

// JUST FOR TESTING
// DELETE ME
const user = {};
user.getAddress = () => {
  return 'dasjdklsajdlkas';
};


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
    const userAddress = user.getAddress();
    API.oneSignal.sendDeviceId({
      userAddress,
      deviceId: device.userId,
      username: 'atix',
      password: 'atixlabs'
    })
    .then((response) => {
      console.log('Device id saved', response);
    })
    .catch((error) => {
      console.log('Device id error', error);
    });
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