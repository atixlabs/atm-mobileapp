import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableNativeFeedback,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import OneSignal from 'react-native-onesignal';
import API from '../services/API/API';
import SessionUser from '../state/SessionUser';
import WalletService from '../services/WalletService';
import MoneyRequestScreen from './MoneyRequestScreen';
import List from './List';

import Constants from '../components/Constants';

const sendDeviceId = function(userData) {
  console.log('sendDeviceIdkdljaskldjaskldjasklajdkl');
  API.oneSignal.sendDeviceId(userData)
  .then((response) => {
    console.log('Device id saved', response);
  })
  .catch((error) => {
    console.log('Device id error', error);
  });
};

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }

<<<<<<< HEAD
  componentWillMount() {
    AsyncStorage.getItem('userId')
    .then((userId) => {
      this.state({ userId });
    })
    .catch(() => {
      AsyncStorage.setItem('userId', 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efr')
      .then(() => {
        this.state({ userId: 'n2eMqTT929pb1RDNuqEnxdaLau1rxy3efr' });
      })
      .catch((error) => {
        console.error('login error', error);
=======
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loadedUser: false,
    }
  }

  componentWillMount() {
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    console.log('Device info: ', device);
    SessionUser.loadUser().then((loadedUser) => {
      if (loadedUser) {
        sendDeviceId({
          address: loadedUser.address,
          deviceId: device.userId,
          username: 'atix',
          password: 'atixlabs'
        });
      }
    }).catch((error) => {
      console.log('loadUser error', error);
      const wallet = WalletService.generateNewWallet();
      SessionUser.saveUser(wallet).then((savedUser) => {
        sendDeviceId({
          address: savedUser.address,
          deviceId: device.userId,
          username: 'atix',
          password: 'atixlabs'
        });
      })
      .catch((error) => {
        console.log('SessionUser.savedUser', error);
>>>>>>> e6e475fb8a0ff0f2c12ec5c4b0f1cdb0abae519b
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor='#ffc211'
          tabBarUnderlineStyle={{ backgroundColor: '#ffc211'}}
          renderTabBar={() => <DefaultTabBar />}
          tabBarPosition='bottom'
        >
          <MoneyRequestScreen userId={this.state.userId} tabLabel="Request" />
          <List navigation={this.props.navigation} tabLabel="List"/>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});