import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import MoneyRequestScreen from './MoneyRequestScreen';
import Loading from '../components/Loading';
import OneSignal from 'react-native-onesignal';
import API from '../services/API/API';
import SessionUser from '../state/SessionUser';
import WalletService from '../services/WalletService';

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

  componentDidMount() {
    console.log('Loading');
    API.user.getUserData('n2eMqTT929pb1RDNuqEnxdaLau1rxy3efr')
    .then((user) => {
      console.log('Loaded');
      this.setState({ user, loadedUser: true });
    })
    .catch((error) => {
      console.error('login error', error);
    });
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
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.loadedUser ? (
          <ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarPosition='bottom'
          >
            <MoneyRequestScreen tabLabel="Request Label" />
            {/*
              Add ListScreen
            */}
          </ScrollableTabView>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
